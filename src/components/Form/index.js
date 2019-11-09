import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from '../Firebase';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { EditorState, convertToRaw, convertToHTML } from 'draft-js';
import MyEditor from './MyEditor';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const styles = {
  "editorClass": {
    backgroundColor: "#eee",
    minHeight: '200px',
  } 
};
const db = firebase.firestore();

export default props => {
  const [editorState, setEditorState] = useState(
    EditorState.createEmpty()
  );
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const values = {
    title,
    name,
    password,
    email,
    content,
  };

  const titleRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    
  }, []);

  const handleChange = (event) => {
    
    switch(event.target.id) {
      case "title":
        if (event.target.value.length > 30) {
          setTitle(values["title"]);
        } else {
          values.title = event.target.value;
          setTitle(event.target.value);
        }
        break;
      case "name":
        if (event.target.value.length > 15) {
          setName(values["name"]);
        } else {
          values["name"] = event.target.value;
          setName(event.target.value);
        }
        break;
      case "email":
        setEmail(event.target.value);
        break;
      case "password":
        if (event.target.value.length > 8) {
          setPassword(values["password"]);
        } else {
          values["password"] = event.target.value;
          setPassword(event.target.value);
        }
        break;
      default:
          
        break;
    }
  };

  const onChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    setContent(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
    setEditorState(editorState);
  }

  const handleSubmit = (e) => {
    const generalRef = db.collection("board").doc("general");
    const dataRef = db.collection("board/general/data").doc();
    let autoNum;
    e.preventDefault();
    
    generalRef.get().then(doc => {
      autoNum = doc.data().autoNum + 1;
      generalRef.update({
        "autoNum": firebase.firestore.FieldValue.increment(1),
      });
      console.log("values: ", values);
      const timestamp = new Date().toLocaleDateString('ko-KR');
      const data = {
        ...values,
        id: autoNum,
        timestamp,
        counts: 1,
      }
      dataRef.set(data)
        .then(doc => {
          console.log("doc: ",doc);
          history.push("/contact");
        }).catch(err => console.log(err));

    }).catch(err => console.log(err));
    
  }

  return (
    <Box px={{'xs':3, 'sm':8 , 'md': 12}} py={{'xs':3, 'sm': 5 }} >
      <form onSubmit={handleSubmit}>
      <Typography>내용을 빠짐없이 등록해주세요.</Typography>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
      
      <TextField 
        id="title"
        label="제목(30자 이하)"
        required={true}
        value={title}
        autoFocus
        inputRef={titleRef}
        style={{ margin: 8 }}
        placeholder=""
        helperText=""
        variant="filled"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChange}
      />
      <TextField 
        id="name"
        label="카카오ID 또는 전화번호"
        required={true}
        value={name}
        inputRef={nameRef}
        style={{ margin: 8 }}
        placeholder=""
        helperText=""
        variant="filled"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChange}
      />
      <TextField 
        id="email"
        label="이메일"
        type="email"
        value={email}
        inputRef={emailRef}
        style={{ margin: 8 }}
        placeholder=""
        helperText=""
        variant="filled"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChange}
      />
      <TextField 
        id="password"
        label="비밀번호(8자 이하)"
        type="password"
        value={password}
        required={true}
        inputRef={passwordRef}
        style={{ margin: 8 }}
        placeholder=""
        helperText=""
        variant="filled"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChange}
      />
      </Box>
      <Box
        mt={1}
        p={2}
        style={{backgroundColor: "#dfdfdf", color: "#000", minHeight: "200px"}}
      >
        {/* <MyEditor
          editorState={editorState}
          onChange={onChange}
        /> */}
        <Editor 
          // wrapperClassName={}
          editorStyle={styles.editorClass}
          // toolbarClassName={}
          // wrapperStyle={}
          // editorStyle={}
          // toolbarStyle={}
          editorState={editorState}
          onEditorStateChange={onChange}
          localization={{
            locale: 'ko',
          }}
          placeholder="전체 디자인을 자세하게 적어주세요."
          toolbar={{
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
                console.log("uploadCallback=> "+file+"/"+window.URL.createObjectURL(file));
                return new Promise(
                  (resolve, reject) => {
                    var reader=new FileReader();
                    resolve({ data: { link: "http://localhost:3000/c7cf367b-fc34-4bb0-bfaf-06bd06b9014d" }});
                    // resolve({ data: { link: "https://firebasestorage.googleapis.com/v0/b/color-world-a8c15.appspot.com/o/images%2Fsingle%2F1.JPG?alt=media&token=2041ac23-22b6-46fe-a18c-c27a378d070f" }});
                    reader.onloadend = function() {
                      // Meteor.call('fileStorage.uploadFile',reader.result,file.name,file.type,(err,response)=>{
                      //     console.log(response)
                      //    if(err){
                      //      reject(err)
                      //    }
            
                      //    resolve({ data: { link: response.data.url } });
                      // })
                    }
            
                    // reader.readAsDataURL(file);
                  }
                );
              }
            },
            embedded: {
              embedCallback: () => {
                
              },
            },
          }}
          
        />
      </Box>
      <Box textAlign="center" p={3}>
      <Button variant="contained" type="submit" style={{margin: '0 10px'}}>등록</Button><Button variant="contained" onClick={() => history.goBack()}>취소</Button>
      </Box>
      </form>
    </Box>
  )
}
// const Embed = ({ block, contentState }) => {
//   const entity = contentState.getEntity(block.getEntityAt(0));
//   const { src, height, width } = entity.getData();
//   return (<iframe height={height} width={width} src={src} frameBorder="0" allowFullScreen title="Wysiwyg Embedded Content" />);
// };