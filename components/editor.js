import React, { useEffect, useState } from "react";
import Status from "./status";
import Progress from "./progress";
import styles from "./editor.module.css";
import ReactQuill from "react-quill";
// import "quill/dist/quill.snow.css";


export default function Editor({path,openAndCloseEditor}) {
  const [theme, setTheme] = useState({theme:"light",backgroundColor:"white",color:"black"});
  const [content, setContent] = useState('');
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [userId,setUserId] = useState('U1');
  const [username,setUsername] = useState('Chuks Commenter');
  const [category,setCategory] = useState('');
  const [descriptionCounter,setDescriptionCounter] = useState(0);
  const [postType,setPostType] = useState('richText');
  const [normalText,setNormalText] = useState('');
  const [linkText,setLinkText] = useState('');
  const [error, setError] = useState(false);
  const [progress,setProgress] = useState(false);
  const [status,setStatus] = useState(false);
  
  
  const quillRef = React.useRef(null);

function addLink() {
  const url = prompt('Enter the URL');
  if (url) {
    const range = quillRef.current.getEditor().getSelection();
    quillRef.current.getEditor().insertText(range.index, url, { 'link': url });
  }
  };


function handleRichText(value) {
    setContent(value);
    localStorage.setItem(path,value);
 };

function handleLinkText(link){
  setLinkText(link);
}

function handleNormalText(text){
  setNormalText(text);
}

function handleTitle(e){
  if(e)setTitle(e.target.value);
  localStorage.setItem(path+'title',title);
}

function handleDescription(e){
  if(e){
    setDescription(e.target.value);
  }
  setDescriptionCounter(description.length)
  localStorage.setItem(path+'description',description);
}


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

function save(){
  const parser = new DOMParser();
  const doc = parser.parseFromString(content,"text/html");
  const body = doc.childNodes[0].childNodes[1];
 
  console.log(body.childNodes.length)
}

function getCategory(e){
  if(e) setCategory(e.target.value);
  console.log(category)
};



function postRichText(){
  // console.log({
  //   title:title,
  //   description:description,
  //   post: content,
  //   poster: poster,
  //   category: path==='Chuksjohnleo'?category:path
  // })
  setProgress(true);
  if(error)setError(false);
  if(path==='Chuksjohnleo')localStorage.setItem('category',category);
  fetch('/api/save-rich-text',{
    method:'post',
    headers:{'Content-Type':'application/json'},
    body : JSON.stringify({
      title:title,
      description:description,
      post: content,
      poster: username,
      posterId: userId,
      category: path==='Chuksjohnleo'?category:path
    })
  }).then(r=>r.json())
    .then(response=>{
      console.log(response)
      if(response==='yes'){
        setStatus(true);
      }
      localStorage.setItem('text',response.postBody)
    })
    .catch(e=>{
      console.log('error:'+e);
      setProgress(false);
      setError(true);
    })
}


function postLinkText(){
  console.log({
    post: linkText,
    poster: username,
    category: path==='Chuksjohnleo'?category:path
  })
  setProgress(true);
  if(error) setError(false);
  if(path==='Chuksjohnleo')localStorage.setItem('category',category);
  fetch('/api/save-link-text',{
    method:'post',
    headers:{'Content-Type':'application/json'},
    body : JSON.stringify({
      post: linkText,
      poster: username,
      posterId: userId,
      category: path==='Chuksjohnleo'?category:path
    })
  }).then(r=>r.json())
    .then(response=>{
      console.log(response)
      if(response==='yes'){
        setStatus(true);
      }
    })
    .catch(e=>{
      console.log('error:'+e);
      setProgress(false)
    })
}


function postNormalText(){
  // console.log({
  //   title:title,
  //   description:description,
  //   post: content,
  //   poster: poster,
  //   category: path==='Chuksjohnleo'?category:path
  // })
  setProgress(true);
  if(error) setError(false);
  if(path==='Chuksjohnleo')localStorage.setItem('category',category);
  fetch('/api/save-normal-text',{
    method:'post',
    headers:{'Content-Type':'application/json'},
    body : JSON.stringify({
      title:title,
      post: normalText,
      poster: username,
      posterId: userId,
      category: path==='Chuksjohnleo'?category:path
    })
  }).then(r=>r.json())
    .then(response=>{
      console.log(response)
      if(response==='yes'){
        setStatus(true);
      }
      localStorage.setItem('normaltext',response.postBody)
    })
    .catch(e=>{
      console.log('error:'+e);
      setProgress(false);
      setError(true);
    })
}


useEffect(()=>{
  if(localStorage.getItem('userdata')){
    const userdata = JSON.parse(localStorage.getItem('userdata'));
    console.log(userdata,userId,username);
    setUserId(userdata.userId);
    setUsername(`${userdata.firstname} ${userdata.surname}`);
  }

 if(localStorage.getItem(path) &&  localStorage.getItem(path+'title')){
  setContent(localStorage.getItem(path));
  setTitle(localStorage.getItem(path+'title'))
  setDescription(localStorage.getItem(path+'description'));
  setDescriptionCounter(description.length)
if(path==='Chuksjohnleo') setCategory(localStorage.getItem('category'));
}

const qlEditor = document.getElementById('mainEditor');

if(qlEditor)
{

 qlEditor.querySelector('.ql-snow').style = 'border-radius:12px 12px 0 0;border:1px solid navy';
 qlEditor.querySelector('.ql-container').style = 'border-radius:0 0 12px 12px;border:1px solid navy';

  }
},[postType]);

useEffect(()=>{
  console.log(content)
  var encoder = new TextEncoder();
  var contentSize = encoder.encode(content).byteLength;
  console.log(contentSize/1024 + ' kb');
  console.log(content.length)
  // console.log(localStorage.getItem(path))
},[content]);


useEffect(()=>{
  handleDescription();
  handleTitle();
  getCategory();

});

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
//         ['link', 'image', 'video','formula'],
//         ['clean'],
//       ]
//    }
//   };
  
    // const formats = [
    //   'header', 'font', 'size',
    //   'bold', 'italic', 'underline',
    //   'strike', 'blockquote',
    //   'list', 'bullet', 'indent',
    //   'image', 'video','link',
    //   'code-block','superscript',
    //   'background','color','code'
    // ];

  /*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
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
    <section className={styles.editorSection}>
      {status===true?<Status text={'Posted'} handler={openAndCloseEditor}/>:''}
      <div className={styles.editorContainer}  >
      <div className={styles.postTypes}>
        <div className={styles.postTypeContainer}>
          <strong>Select Post Type</strong>
         <div className={styles.postType}>
          <button onClick={()=>setPostType('richText')} className={postType==='richText'?styles.currentType:styles.richTextType} >
             Rich Text
          </button>
          <button onClick={()=>setPostType('linkText')} className={postType==='linkText'?styles.currentType:styles.linkType}>
            Link
          </button>
          <button onClick={()=>setPostType('normalText')} className={postType==='normalText'?styles.currentType:styles.normalTextType}>
            Normal Text
          </button>
         </div>
        </div>
       {path=== 'Chuksjohnleo'?
       <div className={styles.categoriesContainer}>
       <label htmlFor="categories">choose category</label>
        <select className={styles.select} value={category} onChange={(e)=>getCategory(e)} name="categories">
          <optgroup label="categories">
            <option value={'none'}>None</option>
            <option value={'News'}>News</option>
            <option value={'Politics'}>Politics</option>
            <option value={'Learning'}>Learning</option>
            <option value={'Religion'}>Religion</option>
            <option value={'Sports'}>Sports</option>
            <option value={'Stories'}>Stories</option>
            <option value={'History'}>History</option>
            <option value={'LoveAndFamily'}>Love And Family</option>
            <option value={'ScienceAndTechnology'}>Science And Technology</option>
            <option value={'PetsAndAnimals'}>Pets And Animals</option>
            <option value={'Ict'}>I.C.T</option>
            <option value={'Health'}>Health</option>
          </optgroup>
        </select>
        </div>:
        <>
        </>
        }
      </div>
      {postType === 'richText'?
      <> 
       <div className={styles.titleContainer}>
         <label htmlFor="title" className={styles.titleInputLabel}>Title</label>
         <input value={title} onInput={(e)=>handleTitle(e)} type='text' placeholder="Write the title of your post" name="title" className={styles.title} />
        </div>
  
      <div className={styles.detail}>
        <label className={styles.descriptionLabel}>Description</label>
        <textarea value={description} onInput={(e)=>handleDescription(e)} placeholder="Write a short description of your post. Not less than 1 word and Not more than 100 words" rows={4} className={styles.description}></textarea>
        <span>{descriptionCounter}/200</span>
      </div>
      <div id="mainEditor" style={{backgroundColor:theme.backgroundColor,color:theme.color}} className={styles.richTextEditor}>
        <ReactQuill  
           placeholder="Write your Post here."
           value={content}
           modules={modules}
           formats={formats}
           ref={quillRef}  
           onChange={handleRichText} 
        /> 
      </div>
     </>:postType==='normalText'?
     <>
     <div className={styles.detail}>
      <textarea value={normalText} onInput={(e)=>handleNormalText(e.target.value)} style={{backgroundColor:theme.backgroundColor,color:theme.color}} className={styles.normalTextEditor} rows={4} placeholder='Write your post here'>
       
      </textarea>
     </div>
     </>:
     <>
       <div className={styles.detail} >
        <label className={styles.linkInputLabel} htmlFor="link">Post a Link</label>
        <input className={styles.linkText} value={linkText}  onInput={(e)=>handleLinkText(e.target.value)} style={{backgroundColor:theme.backgroundColor,color:theme.color}}  name="link" placeholder="Paste/Type your link here.." />
       </div>
     </>
     }
         {error?<div>An error occurred please retry</div>:''}
        <div className={styles.postBtnContainer} >
          <button onClick={postType==='richText'? postRichText : postType==='linkText'? postLinkText : postNormalText} disabled={progress?true:false} className={progress?styles.postBtn+' '+ styles.navyProgress:styles.postBtn} >{progress===true?<Progress height='50px' color='white' status={status} />:'Post'}</button>
        </div>
        <div className={styles.controls}>
          {/* <button onClick={changeBg} className={styles.themeBtn} >Change theme</button> */}
          <button onClick={()=>setContent('')} className={styles.clearBtn} >Clear</button>
          <button onClick={openAndCloseEditor} className={styles.cancelBtn} >
                Cancel
          </button>
        </div>
      </div>
    </section>
  );
}
