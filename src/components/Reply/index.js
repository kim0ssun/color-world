import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import firebase from '../Firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import draftToHtml from 'draftjs-to-html';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { EditorState, convertToRaw, convertToHTML , AtomicBlockUtils } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const db = firebase.firestore();
const useStyles = makeStyles(theme => ({
  question: {
    margin: '20px',
    padding: '20px'
  },
  reply: {
    margin: '20px',
    padding: '20px'
  },
  replyAdmin: {
    margin: '20px',
    padding: '20px',
    backgroundColor: '#eee',
  },
  editor: {
    backgroundColor: "#eee",
    minHeight: '200px',
    padding: '10px',
  }
}));

let tmpCont = "";
let userData = {};

export default props => {
  const classes = useStyles();
  const history = useHistory();
  const { id, password } = useParams();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [question, setQuestion] = useState({});
  const [reply, setReply] = useState([]);
  const [loading, setloading] = useState(true);
  const [isAdmin, setAdmin] = useState(false);
  const [content, setContent] = useState("");
 

  useEffect(() => {
    console.log('password::', password);
    if (password === "admin2020") {
      setAdmin(true);
      console.log('관리자 모드...')
    }
    setQuestion({test: 'testing...'});
    db.collection(`board/general/data`).where('id', '==', parseInt(id))
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log("doc.id", doc.id );
          userData.uid = doc.id;
          userData.question = doc.data();
          setQuestion(doc.data());
          console.log("userData.question", userData.question );
          return userData;
        })
      }).then(() => {
        console.log('userData: ', userData);
        if (userData.question.isReply) {
          console.log('reply=> ', userData.question.isReply);
          const tmpArr = [];
          db.collection(`board/general/data/${userData.uid}/reply`).orderBy('timestamp', 'asc')
            .get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                console.log('REPLY: doc.data() => ', doc.data());
                tmpArr.push(doc.data());
              })
              userData.reply = tmpArr;
            }).then(() => {
              
              setReply(userData.reply);
            }).catch(err => console.log(err))
        } 
       
        setloading(false);
      }).then(() => {
        // console.log('question: ', question);
        // console.log('reply: ', reply);
      }) 
      .catch((err) => console.log(err))

  }, [id, password]);

  const createMarkup = (content) => {
    console.log('question.content=> ', content)
    const markup = {};
    if ( content === "") {
      markup.__html = "<p>No data...</p>";
    } else {
      markup.__html = draftToHtml(JSON.parse(content));
    }
    return markup;
  }

  const handleClick = () => {
    console.log('tmpContent: ', tmpCont);
    if (tmpCont !== "") {
      const name = isAdmin ? "관리자" : userData.question.name;
      const timestamp = new Date().toLocaleString();
      const content = tmpCont;
      const data = {
        name,
        timestamp,
        content
      }
      console.log('data: ', data);
      db.collection(`board/general/data/${userData.uid}/reply`).doc()
        .set(data)
        .then(res => {
          console.log('res=> ', res);
          const title = `${userData.question.title}${ isAdmin ? "[답변완료]" : "(문의)"}`;
          db.collection(`board/general/data`).doc(`${userData.uid}`)
            .update({ isReply: true, title: title, questionDate: timestamp})
            .then( res => {
              history.push("/contact");
            })
        })
      
    } else {  return; }
   
  };

  const onChange = (editorState) => {

    const contentState = editorState.getCurrentContent();
    setContent(JSON.stringify(convertToRaw(contentState)));
    tmpCont = JSON.stringify(convertToRaw(contentState));
    console.log('onChange tmpCont=> ', tmpCont);
    setEditorState(editorState);
    
  }

  return (
    <div>
      { !loading ? 
      <div>
        <Paper className={classes.question}>
          <Typography>
            {`${question.timestamp} by ${question.name}`}
          </Typography>
          <pre dangerouslySetInnerHTML={ createMarkup(question.content) } /> 
        </Paper>
          { reply.length !== 0 ? (
            reply.map((item ,index) => (
              <Paper className={ item.name === "관리자" ? classes.replyAdmin : classes.reply } key={index}>
                <Typography>{ item.timestamp } by { item.name }</Typography>
                <pre dangerouslySetInnerHTML={ createMarkup(item.content) } /> 
              </Paper>) 
            ))
            : null
            }
        <Box
          mt={1}
          p={2}
          style={{backgroundColor: "#fff", color: "#000", minHeight: "200px"}}
        >
        <Editor 
          wrapperClassName={classes.editor}
          // toolbarClassName={}
          // wrapperStyle={}
          // editorStyle={}
          // toolbarStyle={}
          editorState={editorState}
          onEditorStateChange={onChange}
          localization={{
            locale: 'ko',
          }}
          placeholder="답글을 자세하게 적어주세요."
          toolbar={{
            options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link','emoji', 'image', 'remove', 'history'],
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: false },
            image: {
              defaultSize: {
                height: '200px',
                width: 'auto',
              },
              previewImage: true,
              urlEnabled: true,
              uploadCallback: (file) => {

                return new Promise( (resolve, reject) => {
                  console.log("uploadCallback=> "+file.name);
                  const storageRef = firebase.storage().ref();
                  const uploadImageRef = storageRef.child(`uploadImages/${file.name}`);
                  console.log(`uploadImages/${file.name}`);
                  uploadImageRef.put(file).then( snapshot => {
                    snapshot.ref.getDownloadURL().then((url) => {
                      console.log(' downloadUrl: ',url);
                      
                      resolve({ data: { link: url}}); 
                    });
                  }).catch(err => {
                    console.log(err);
                    reject(err);
                  });
                });  
              },
            },
          }}
        />
        </Box>
        <Box textAlign="center" p={2} size="large" >
          <Button variant="contained" color="primary" onClick={ handleClick } >답글등록</Button>
        </Box> 
      </div> 
      : <Box align="center" p={20} ><CircularProgress /></Box> }
    </div>
  )
}