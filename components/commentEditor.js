import React, { useEffect, useState } from "react";
import Progress from "./progress";
import ReactQuill from "react-quill";
import styles from './commentEditor.module.css';



export default function CommentEditor({addToComments, post, handleEditor}) {
  const [theme, setTheme] = useState({theme:"light",backgroundColor:"white",color:"black"});
  const [content, setContent] = useState('');
  const [userId,setUserId] = useState('U1');
  const [username,setUsername] = useState('Chuks Commenter');
  const [status,setStatus] = useState(false);
  const [progress,setProgress] = useState(false);
 
  
  
 
  const quillRef = React.useRef(null);

function addLink() {
  const url = prompt('Enter the URL');
  if (url) {
    const range = quillRef.current.getEditor().getSelection();
    quillRef.current.getEditor().insertText(range.index, url, { 'link': url });
  }
  };


function handleChange(value) {
  const commentEditor = document.getElementById('commentEditor');
  const blank =  commentEditor.querySelector('.ql-blank');
  blank?.classList.remove('ql-placeholder');
    setContent(value);
    localStorage.setItem(post.id.toString(),value);
 };


function changeBg() {
  const blank =  document.querySelector('.ql-blank');
  const toolbar =  document.querySelector('.ql-toolbar');
    if (theme.theme === 'light'){
      setTheme({theme:"dark",backgroundColor:"rgb(10,30,50)",color:"white"})
      blank?.classList.add('ql-placeholder');
      toolbar?.classList.add('ed');
    }else{
      blank?.classList.remove('ql-placeholder');
      toolbar?.classList.remove('ed');
      setTheme({theme:"light",backgroundColor:"white",color:"black"});
   } 
}

// function save(){
//   const parser = new DOMParser();
//   const doc = parser.parseFromString(content,"text/html");
//   const body = doc.childNodes[0].childNodes[1];
// }


function comment(){
  location.href+'/kli'
  console.log(location.href)
 setProgress(true);
  fetch('/api/save-comment',{
    method:'post',
    headers:{'Content-Type':'application/json'},
    body : JSON.stringify({
      postId: post.id,
      category: post.category,
      comment: content,
      commenter: username,
      commenterId: userId
   })
  })
  .then(r=>r.json())
    .then(response=>{
      if(response.comment){
        console.log(response)
        setProgress(false);
        setStatus(true);
        localStorage.setItem('text',response.comment);
        handleEditor();
        addToComments(response.comment)
        // setTimeout(()=>location.reload(),5000)
      }
    })
    .catch(e=>{
      console.log('error:'+e);
      handleEditor();
      setStatus(false);
      setProgress(false);
    })
}

useEffect(()=>{
  if(localStorage.getItem('userdata')){
    const userdata = JSON.parse(localStorage.getItem('userdata'));
    console.log(userdata,userId,username);
    setUserId(userdata.userId);
    setUsername(`${userdata.firstname} ${userdata.surname}`);
  }
 if(localStorage.getItem(post.id.toString())){
  setContent(localStorage.getItem(post.id.toString()));
}

const commentEditor = document.getElementById('commentEditor');
commentEditor.querySelector('.ql-snow').style = 'border-radius:12px 12px 0 0;border-bottom:0px';
commentEditor.querySelector('.ql-container').style = 'border-top:1px solid navy;border-bottom:1px solid navy;';
const qlEditor = commentEditor.querySelector('.ql-editor');

qlEditor.style = ` 
  box-sizing: border-box;
  line-height: 1.42;
  max-height: 50vh;
  max-width:750px;
  outline: none;
  overflow-y: auto;
  padding: 12px 15px;
  tab-size: 4;
  -moz-tab-size: 4;
  text-align: left;
  white-space: pre-wrap;
  word-wrap: break-word;
  `
},[]);

useEffect(()=>{
  console.log(content)
  var encoder = new TextEncoder();
  var contentSize = encoder.encode(content).byteLength;
  console.log(contentSize/1024 + ' kb');
  console.log(localStorage.getItem(post.id.toString()))
},[content]);

// const modules = {
//   toolbar: {
//   container:[
//         [{header:[1,2,3,4,5,6]}],
//         [{'font':[]}],
//         [{'size': []}],
//         ['bold', 'italic', 'underline', 'strike','code-block',
//          'blockquote',{'background':[]},{'color':[]},'code'],
//         [{'list': 'ordered'}, {'list': 'bullet'},
//          {'indent': '-1'}, {'indent': '+1'}],
//          [{'align':[]}],
//         ['link', 'image', 'video','formula']
//       ]
//    }
//   };

const modules = {};
modules.toolbar = [
  ['bold', 'italic', 'underline', 'strike', 'code'],       // toggled buttons
  ['blockquote', 'code-block'],                    // blocks
  [{ 'header': 1 }, { 'header': 2 }],              // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],    // lists
  [{ 'script': 'sub'}, { 'script': 'super' }],     // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],         // outdent/indent
  [{ 'direction': 'rtl' }],                        // text direction
  [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, true] }],       // header dropdown
  [{ 'color': [] }, { 'background': [] }],         // dropdown with defaults
  [{ 'font': [] }],                                // font family
  [{ 'align': [] }],  
  ['link', 'image', 'video','formula'],                             // text align
  ['clean'],                                       // remove formatting
]

/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'header', 'font', 'background', 'color', 'code', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent', 'script', 'align', 'direction',
  'link', 'image', 'code-block', 'formula', 'video'
]
  
return (
   <section  className={styles.editorSection}>
     <div className={styles.editorContainer}>
      <div className={styles.editor}>
        <div id="commentEditor" style={{backgroundColor:theme.backgroundColor,color:theme.color}} className={styles.reactQuilContainer}>
          <ReactQuill  
           placeholder="Write your comment here"
           value={content}
           modules={modules}
           ref={quillRef}  
           onChange={handleChange} 
          /> 
          <div className={styles.sizeCounter}>1/5mb</div>
        </div>
        <div className={styles.submitBtnContainer}> 
        <button onClick={comment}  disabled={progress?true:false} className={progress?styles.submitBtn+' '+ styles.navyProgress: styles.submitBtn} >{progress===true?<Progress height='25px' color='white' status={status} />:'Submit'}</button>
          {/* <button className={styles.submitBtn} onClick={comment} >Submit</button> */}
        </div>
        <div className={styles.otherBtnContainer}> 
          {/* <button className={styles.changeBgBtn} onClick={changeBg}>Change theme</button> */}
          <button onClick={()=>setContent('')} className={styles.clearBtn} >Clear</button>
          {/* <button className={styles.addLinkBtn} onClick={addLink}>link</button> */}
          <button className={styles.cancelBtn} onClick={handleEditor}>Cancel</button>
        </div>
      </div>
     </div>
   </section>
  );
}
