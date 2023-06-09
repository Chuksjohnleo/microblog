import React, { useState, useEffect,  useContext } from 'react';
import { Context } from "./post";
import styles from './comment.module.css';
import Image from 'next/image';
import Reply from './reply';
import Link from 'next/link';
import dynamic from "next/dynamic";
const ReplyEditor = dynamic(import("./replyEditor"), { ssr: false });


export default function Comment({post, comment, shadow, i}){
 
    const [date,setDate] = useState('date');
    const [repliesVisiblity,setRepliesVisiblity] = useState('hidden');
    const [editor,setEditor] = useState('hidden');
    const [hasFetchedReplies, setHasFetchedReplies] = useState(false);
    const [repliesIsLoading, isRepliesStillLoading] = useState('no');
    const [replies,setReplies] = useState([]);
    const [likedReplies, setLikedReplies] = useState([]);
    const [replyCount, setReplyCount] = useState(comment.replyCount);
    const [commentLength, setCommentLength] = useState('collapsed');
    const [clicked, setClicked] = useState(false);

    const [replyTo,setReplyTo] = useState({
      username: comment.commenter,
      userId: comment.commenterId
    });
    
    const userContext =  useContext(Context);

    function resetReplies(reply){
      //console.log(replies.push(reply))
      if(!hasFetchedReplies){
       setReplyCount(replyCount+1);
       return getReplies();
      }
       setReplies(prevReplies=>[...prevReplies,reply])
       setReplyCount(replyCount+1);
    }


    function getReplies(e){
      if(e) e.target.disabled = true;
      if(replies.length>0 && hasFetchedReplies)return replyVisibility();
      isRepliesStillLoading('yes');
      fetch('/api/get-replies',{
        method: 'post',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          commentId: comment.commentId,
          category: comment.category,
          userId: userContext.user.userId
        })
      })
      .then(resp=>{
        return resp.json()
      })
      .then(resp=>{
        if(resp.replies){
          setReplies(prevReplies=>[...prevReplies,...resp.replies]);
          replyVisibility();
          isRepliesStillLoading('no');
          setHasFetchedReplies(true);
        }
       setLikedReplies(resp.liked);
      //  console.log(resp.liked)
      })
      .catch(e=>{
          console.log(e)
      })
    }

// useEffect(()=>console.log(replies))

    function handleEditor(replyingTo){ 
       setEditor('visible');
       if(replyingTo) {
        setReplyTo({
          username: replyingTo.replier,
          userId: replyingTo.replierId
        })

    //  console.log(replyingTo)
     }
    }

    function closeEditor(){
       setEditor('hidden');
       setReplyTo({
         username: comment.commenter,
         userId: comment.commenterId
       })
      
     }
     
    function replyVisibility(){
       repliesVisiblity==='visible'? setRepliesVisiblity('hidden'):
       setRepliesVisiblity('visible');
    }

    useEffect(()=>{
        const parser = new DOMParser();
        const doc = parser.parseFromString(comment.comment,"text/html");
        const body = doc.childNodes[0].childNodes[1]; //html = [head, body] this var stores the content of the body tag
        body.innerText.length<200
        && body.querySelectorAll('img').length<1?
        setCommentLength('full'):
        body.innerText.length<50
        && body.querySelectorAll('img').length>3?
        setCommentLength('collasped'):
        body.innerText.length<500?
        setCommentLength('full'):
        setCommentLength('collapsed');
        const tbc = `wait - compiling... event - comait - compiling... event - comait - compiling... event - comait - compiling... event - comait - compiling... event - comait - compiling... event - comait - compiling... event - comait - compiling... event - comait - compiling... event - comait - compiling... event - comait - compiling... event - comait - compiling... event - comait - compiling... event - comait - compiling... event - comait - compiling... event - comait - compiling... event - comait - compiling... event - comait - compiling... event - comait - compiling... event - comait - compiling... event - comait - compiling... event - comait - compiling... event - comait - compiling... event - comait - compiling... event - comait - compiling... event - comait - compiling... event - comait - compiling... event - com`
        console.log(tbc.length,body.innerText.length + ' id = '+comment.commentId)
        const theDate = new Date(comment.date);
        return setDate(theDate.toLocaleString())//.toDateString())
      },[]);

    useEffect(()=>{
        const replyEditorSection = document.getElementById('replyEditorSection'+i);
        replyEditorSection?.scrollIntoView({block:'center'});
      },[replyTo]);


    return(
        <>
       <h1>{comment.commentId}</h1>
          <div className={styles.commentContainer}>
            <div className={styles.commenterDetails}>
             <Link href="/#" className={styles.commenterId}>
                <Image className={styles.shadow} alt={comment.commenter+"pics"} width={30} height={30} src={shadow} />
                <em className={styles.commenterName} >{comment.commenter?.length<1?'NWANONENYI CHUKWUKA':comment.commenter}</em>
             </Link>
             { 
               comment.commenterId !== userContext.user.userId ? <button onClick={(e)=>userContext.follow(e, comment.commenterId)} className={styles.follow}>Follow</button>:
               ' '
             }
             <div className={styles.date}>{date}</div>
            </div><hr/> 
            <article id={`comment${comment.commentId}`} className={commentLength==='full'?styles.fullComment:styles.comment} dangerouslySetInnerHTML={{__html:comment.comment}}/>
            {commentLength==='full' && clicked===false?'':
             commentLength==='full' && clicked===true?
              <div><button 
               onClick={()=>{
                 setCommentLength('collapsed');
                 setClicked(false);
                 document.getElementById(`comment${comment.commentId}`).scrollIntoView({behaviour: 'smooth'})
                 }
                } className={styles.likeBtn}>Collapse</button></div>:
                <div><button 
                   onClick={()=>{
                    setCommentLength('full');
                    setClicked(true);
                    }
                   } className={styles.likeBtn+' '+styles.readMoreBtn}>Read More</button></div>}
            <div className={styles.actionsContainer}>
              <button className={styles.likeBtn}>Like</button>
              <button onClick={()=>handleEditor({
                          replier: comment.commenter,
                          replierId: comment.commenterId
                        })} className={styles.replyBtn}>Reply</button>
            </div>
            <div className={styles.repliesContainer} >
            {
              replyCount > 0?<button disabled={ repliesIsLoading=== 'yes'?true:false } onClick={(e)=>{
                  getReplies(e);
                  }} className={styles.repliesBtn} >
                    <span> {replyCount} </span>
                    <span>{replyCount>1?'Replies':'reply'}</span>
                    <svg width="30" height="15" viewBox="0 0 1024 1024" className={ repliesIsLoading=== 'yes'?styles.loading+' ': repliesVisiblity==='hidden'?styles.downIcon: styles.downIcon+" "+styles.upIcon}  version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" />
                    </svg>
                </button>:<span  className={styles.repliesBtn2} >No replies</span>
              }
            <div className={repliesVisiblity === 'visible'?styles.normalHeight+" "+styles.replies: styles.replies}>
            {replies.map((reply,i)=>{
            return(
             
                <div key={reply.replyId} className={styles.reply}>
                    <div>{i+1}</div>
                    <Reply  handleEditor={handleEditor} likedReplies={likedReplies} shadow={shadow} Image={Image} reply={reply} />
                </div>
             
                )
               })
                }
            </div>
            </div>
            <div>{editor==='visible'?<ReplyEditor resetReplies={resetReplies} post={post} replyTo={replyTo} theComment={comment} i={i} closeEditor={closeEditor} />:''}</div>
          </div>
        </>
    )
}