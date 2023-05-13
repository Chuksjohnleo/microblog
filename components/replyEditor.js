import React, { useEffect, useState } from "react";
import Progress from './progress';
import ReactQuill from "react-quill";


export default function ReplyEditor({post, replyTo, theComment, closeEditor, i, resetReplies}) {
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

    setContent(value);
    
 };


function changeBg() {
console.log(theme)
  // const blank =  document.querySelector('.ql-blank');
  // const toolbar =  document.querySelector('.ql-toolbar');
  //   if (theme.theme === 'light'){
  //     setTheme({theme:"dark",backgroundColor:"rgb(10,30,50)",color:"white"})
  //     blank?.classList.add('ql-placeholder');
  //     toolbar?.classList.add('ed');
  //   }else{
  //     blank?.classList.remove('ql-placeholder');
  //     toolbar?.classList.remove('ed');
  //     setTheme({theme:"light",backgroundColor:"white",color:"black"});
  //  } 
}

// function save(){
//   const parser = new DOMParser();
//   const doc = parser.parseFromString(content,"text/html");
//   const body = doc.childNodes[0].childNodes[1];
// }


function reply(){
  setProgress(true);
  const body = {
    reply: content,
    postId: post.id,
    replyTo: replyTo,
    replier: username,
    category: post.category,
    commentId: theComment.commentId,
    replierId: userId
 }
 
  fetch('/api/save-reply',{
    method:'post',
    headers:{'Content-Type':'application/json'},
    body : JSON.stringify({
      reply: content,
      postId: post.id,
      replyTo: replyTo,
      replier: username,
      category: post.category,
      commentId: theComment.commentId,
      replierId: userId
   })
  })
  .then(r=>{return r.json()})
  .then(response=>{
     if(response.reply){
      resetReplies(response.reply);
      closeEditor();
      setProgress(false);
      setStatus(false);
     }
    })
    .catch(e=>{
      console.log('error:'+e);
      
    })
}

useEffect(()=>{
  if(localStorage.getItem('userdata')){
    const userdata = JSON.parse(localStorage.getItem('userdata'));
    console.log(userdata,userId,username);
    setUserId(userdata.userId);
    setUsername(`${userdata.firstname} ${userdata.surname}`);
  }

const replyEditor = document.getElementById('replyEditor'+i);
const replyEditorSection = document.getElementById('replyEditorSection'+i);
replyEditorSection.scrollIntoView({block:'center'});

replyEditor.querySelector('.ql-snow').style = 'border-top:1px solid navy;border-bottom:0px';
replyEditor.querySelector('.ql-container').style = 'border-top:1px solid navy;border-bottom:1px solid navy;';
const qlEditor = replyEditor.querySelector('.ql-editor');

qlEditor.style = ` 
  box-sizing: border-box;
  line-height: 1.42;
  max-height: 50vh;
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
   <section id={'replyEditorSection'+i}  className={styles.editorSection}>
     <div className={styles.editorContainer}>
      <div className={styles.editor}>
        <div id={"replyEditor"+i} style={{backgroundColor:theme.backgroundColor,color:theme.color}} className={styles.reactQuilContainer}>
          <strong className={styles.info}>Replying to {replyTo.username} on {theComment.commenter}'s comment</strong>
          <ReactQuill  
           placeholder="Write your reply here"
           value={content}
           modules={modules}
           ref={quillRef}  
           onChange={handleChange} 
          /> 
          <div className={styles.sizeCounter}>1/50mb</div>
        </div>
        <div className={styles.submitBtnContainer}> 
           <button onClick={reply}  disabled={progress?true:false} className={progress?styles.submitBtn+' '+ styles.navyProgress: styles.submitBtn} >{progress===true?<Progress height='25px' color='white' status={status} />:'Submit'}</button>
        </div>
        <div className={styles.otherBtnContainer}> 
          <button onClick={()=>setContent('')} className={styles.clearBtn} >Clear</button>
          {/* <button className={styles.changeBgBtn} onClick={changeBg}>Change theme</button> */}
          {/* <button className={styles.addLinkBtn} onClick={addLink}>link</button> */}
          <button className={styles.cancelBtn} onClick={closeEditor}>Cancel</button>
        </div>
      </div>
     </div>
   </section>
  );
}
