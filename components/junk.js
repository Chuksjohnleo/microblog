import React,{useEffect, useState} from "react";
import styles from './editor.module.css';
import { remark } from "remark";
import html from 'remark-html'

function Editor(){
    const [backgroundColor, setBackgroundColor] = useState("white");
    const [text,setText] = useState([]);
    const [space,setSpace] = useState(0);
    const [theHtml,setTheHtml] = useState('')

    function italicize(text){
        let b =  text.split(' ')
        for(let i = 0;i<b.length;i++){
          if(b[i].startsWith('[#I]')){
           // console.log(b[i])
            b[i] = `<em style="display:inline-block;margin:0 5px;font-style:default;"> ${b[i].replace('[#I]','')}</em>`
          }
        }
        return b.join(" ");
      }
    
      function changeBg() {
        let a = '[#B]if he comes [#B]home, for italics: [#I]if he comes [#I]home';
        function bolden(text){
          let b =  text.split(' ')
          for(let i = 0;i<b.length;i++){
            if(b[i].startsWith('[#B]')){
              console.log(b[i])
              b[i] = `<strong> ${b[i].replace('[#B]','')} </strong>`
            }
          }
          return b;
        }
    
        function italicize(text){
          let b =  text.split(' ')
          for(let i = 0;i<b.length;i++){
            if(b[i].startsWith('[#I]')){
              console.log(b[i])
              b[i] = `<em> ${b[i].replace('[#I]','')} </em>`
            }
          }
          return b.join(" ");
        }
        console.log(italicize(a),bolden(a))
        if (backgroundColor === "white") return setBackgroundColor("blue");
        else return setBackgroundColor("white");
      }

function editText(e){
  //  console.log(e.keyCode)
    setText([e.target.textContent+'\n']);
}
function detectKey(e){
    setSpace(space+1)
    if(e.keyCode===13){
        setText([...text,'\n']);
        console.log(e.keyCode,text,e.target.textContent)
        return;
    }
  }

useEffect(()=>{
   const processed = remark().use(html).processSync(text.join(' '));
   setTheHtml(processed)
    // console.log(text)
},[text,space])

return (
      <section style={{ backgroundColor: backgroundColor }}>
        <div>
        <div className={styles.preview} dangerouslySetInnerHTML={{__html: theHtml}}/>
          <button>---H1---</button><button>Paragraph</button><button>Italics</button><button>Bold</button>
          <div className={styles.editor}><div onKeyUp={(e)=>detectKey(e)} onInput={(e)=>editText(e)} contentEditable></div></div>
          <button onClick={changeBg}>Click</button>
        </div>
      </section>
      )
}

const a = 
{
  "_id": 1,
  "comments": [
    {
      "name": "item1",
      "replies":  ['a','b']
    },
    {
      "name": "item2",
      "replies": ['a','b']
    },
    {
      "name": "item3",
      "replies": ['a','b']
    }
  ]
}