import React, { useEffect, useState } from 'react';
import firebase from '../Firebase';
import MUIDataTable from "mui-datatables";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Button, Box } from '@material-ui/core';
import { useHistory } from 'react-router';

export default props => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  let history = useHistory();
  const [data, setData] = useState([]);
  
  const columnsDense = [
    {
     name: "id",
     label: "번호",
     options: {
      filter: false,
      sort: false,
     }
    },
    {
     name: "title",
     label: "제목",
     options: {
      filter: false,
      sort: false,
     }
    },
    {
     name: "name",
     label: "이름",
     options: {
      filter: false,
      sort: false,
     }
    },
    {
     name: "timestamp",
     label: "날짜",
     options: {
      filter: false,
      sort: false,
     },
    },
     {
      name: "counts",
      label: "조회",
      options: {
       filter: false,
       sort: false,
      }
    },
   ];
   const columnsSparse = [
    {
     name: "title",
     label: "제목",
     options: {
      filter: false,
      sort: false,
     }
    },
    {
     name: "name",
     label: "작성자",
     options: {
      filter: false,
      sort: false,
     }
    },
   ];

   const options = {
      sortFilterList: false,
      sort: false,
      filter: false,
      print: false,
      download: false,
      viewColumns: false,
      selectableRowsHeader: false,
      selectableRows: "none",
      responsive: "scrollFullHeight",
      selectableRowsOnClick: false,
      elevation: 0,
      onRowClick: (rowData, rowMeta) => {
        console.log("onRowsSelect => " + rowData);
      },
      customSort: (data, colIndex, order) => {
        console.log(`data: ${data}, colIndex: ${colIndex}, order: ${order}`);
        return data;
      }
   };

   useEffect(() => {
      const snapshotData = [];
      firebase.firestore().collection("board/general/data").orderBy("id", "desc").limit(100).get()
        .then(snapshot => {          
          snapshot.forEach(doc => {
            snapshotData.push(doc.data())
          })
        }).catch(err => console.log(err))
        .then(() => {
          console.log("data: ", snapshotData);
          setData(snapshotData);
        })
   }, []);

  const handleClick = (e) => {
    history.push("/form")
  };

  return (
    <div>
      <MUIDataTable 
        title={"견적의뢰"}
        data={data}
        columns={ matches ? columnsDense : columnsSparse }
        options={options}
      />
      <Box textAlign="center" p={2} size="large" >
        <Button variant="contained" color="primary" onClick={handleClick} >글쓰기</Button>
      </Box>
    </div>
  )

}
