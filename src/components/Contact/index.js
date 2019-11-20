import React, { useEffect, useState, useRef } from 'react';
import firebase from '../Firebase';
import MUIDataTable from "mui-datatables";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Button, Box } from '@material-ui/core';
import { useHistory } from 'react-router';
// import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';


export default props => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  let history = useHistory();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const passwordRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const MaskedName = ({ value }) => {
    const modified = value.substr(0, 1) + '*' + value.substr(2, 2);
    return <span>{modified}</span>
  }
  
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
      customBodyRender: (value, tableMeta, updateValue) => (
        <MaskedName
          value={value}
        />
      )
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
      customBodyRender: (value, tableMeta, updateValue) => (
        <MaskedName
          value={value}
        />
      )
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
        console.log('id: '+ data[rowMeta.dataIndex].id);
        setIndex(rowMeta.dataIndex);
        setOpen(true);
      },
      customSort: (data, colIndex, order) => {
        console.log(`data: ${data}, colIndex: ${colIndex}, order: ${order}`);
        return data;
      }
   };

   useEffect(() => {
      
      const unsubscribe = firebase.firestore().collection("board/general/data").orderBy("id", "desc").limit(100).onSnapshot( snapshot => {   
          const snapshotData = [];       
          snapshot.forEach(doc => {
            snapshotData.push(doc.data())
          })
          setData(snapshotData);
          setLoading(false);
        }, err => { console.log(err) }
      )

      return () => unsubscribe()
   }, []);

  const handleClick = (e) => {
    history.push("/form")
  };


  const handleClose = () => {
    setOpen(false);
    const inputText = passwordRef.current.value.trim();
    console.log('password => '+ inputText );
    if (inputText === data[index].password ) {
      console.log('password matched!!' );
      history.push(`/reply/${data[index].id}/${data[index].password}`);
    } else if ( inputText === "admin2020") {
      history.push(`/reply/${data[index].id}/admin2020`);
    }
  }

  return (
    <div>
      { !loading ? 
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
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">비밀번호를 입력하세요</DialogTitle>
        <DialogContent>
          
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="password"
            type="password"
            inputRef={passwordRef}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            취소
          </Button>
          <Button onClick={handleClose} color="primary">
            들어가기
          </Button>
        </DialogActions>
      </Dialog>
      </div>
      : <CircularProgress /> 
    }
    </div>
  )

}
