import React, { useEffect, useState, useContext } from "react";
import { Context } from "./post";
import styles from './reply.module.css';
import Link from 'next/link';

export default function Reply({Image, reply, handleEditor, shadow, likedReplies}){

const [date,setDate] = useState('date');
const [checking, setChecking] = useState(true);
const [likes, setLikes] = useState(reply.likes);
const [liked, setLiked] = useState('no');

const userContext =  useContext(Context);

  function likeReply(){
    const user = userContext.user;
    const dd = {
      replyId: reply.replyId,
      liker: user.username,
      likerId: user.userId,
      category: userContext.category
    }
    fetch('/api/like-reply',{
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        replyId: reply.replyId,
        commentId: reply.commentId,
        liker: user.username,
        likerId: user.userId,
        category: userContext.category
      })
    })
    .then(res=>{
      return res.json()
    })
    .then(res=>{
      console.log(res)
      if(res === 'done'){
        setLikes(likes+1);
        setLiked('yes');
      }
    })
  }

     
    useEffect(()=>{
        if(likedReplies.includes(reply.replyId)) setLiked('yes');
        const theDate = new Date(reply.date);
        return setDate(theDate.toLocaleString());
      },[]);


    return(
        <>
          <div className={styles.replierDetails}>
            <Link href="/#" className={styles.replierId}>
                <Image className={styles.shadow} alt={reply.replier+"pics"} width={30} height={30} src={shadow} />
                <em className={styles.replierName} >{reply.replyId}{reply.replier?.length<1?'NWANONENYI CHUKWUKA':reply.replier}</em>
            </Link>
            { 
               reply.replierId !== userContext.user.userId ? <button onClick={(e)=>userContext.follow(e, reply.replierId)} className={styles.follow}>Follow</button>:
               ' '
             }
            <div className={styles.date}>{date}</div>
          </div><hr/> 
          <div className={styles.replyContainer}>
            <article className={styles.reply} dangerouslySetInnerHTML={{ __html: reply.reply}} />
            <div className={styles.actionsContainer}>
               {likes}
               <button disabled={liked==='yes'?true:false} onClick={likeReply} className={liked==='yes'?styles.likeReplyBtn+' '+styles.navybg:styles.likeReplyBtn}>{liked==='yes'?'Liked':'Like'}</button>
               <button onClick={()=>handleEditor(reply)} className={styles.replyReplyBtn}>Reply</button>
            </div>
          </div>
        </>
    )
}