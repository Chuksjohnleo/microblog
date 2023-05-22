import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from './post.module.css';
import Footer from "./footer";
import Comment from "./comment";
import ImageView from "./imageView";
import Pagination from "./pagination";
import dynamic from "next/dynamic";
import HomeLayout from "./homeLayout";
const CommentEditor = dynamic(import("./commentEditor"), { ssr: false });

export const Context = React.createContext();

export default function Post({ post, shadow }) {

const [editor,showEditor] = useState(false);
const [date,setDate] = useState('date');
const [view,setView] = useState(false);
const [imageUrl,setImageUrl] = useState('');
const [linkDescription,setLinkDescription] = useState('');
const [linkTitle,setLinkTitle] = useState('');
const [linkIcon,setLinkIcon] = useState('');
const [comments, setComments] = useState(post.comments);
const [commentCount, setCommentCount] = useState(post.commentCount);
const [currentPage, setCurrentPage] = useState(0);
const [lastPage,setLastPage] = useState(null);
const [hasVisited, setHasVisited] = useState(false);
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [userData,setUserData] = useState({});


const [pages, setPages] = useState([]);

useEffect(()=>{
  if(localStorage.getItem('userdata')){
      setUserData(JSON.parse(localStorage.getItem('userdata')));
      setIsLoggedIn(true)
    }
},[]);

function getPages(){
  let pageNumber = commentCount/5;
  let pagesArray = [];
  for(let i=0; i<pageNumber; i++){
    pagesArray.push(i);
  }
  setPages(pagesArray)
}

useEffect(()=>getPages(),[commentCount])

function addToComments(newComment){
  setComments(prevComments=>[newComment, ...prevComments]);
  setCommentCount(commentCount+1)
}

 function viewImage(e){
  if(view===false){
    setImageUrl(e.target.src);
    setView(true);
  }
  else setView(false);
 }

 function siter(){
  if(!post.link.includes('https://')){
    post.link = 'https://'+post.link
  }

  fetch(post.link)
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const title = doc.querySelector('head title').textContent;
      const ogImage = doc.querySelector('head meta[property="og:image"]').getAttribute('content');
      const description = doc.querySelector('head meta[name="Description"]').getAttribute('content');
     // const ogt = doc.querySelector('head meta[name="og:title"]').getAttribute('content');
      
      setLinkDescription(description);
      setLinkTitle(title);
      setLinkIcon(ogImage)
      console.log(linkDescription, linkTitle, linkIcon)//,ogTitle);
    })
    .catch(error => console.error(error));
  }


useEffect(()=>{
    if(post.type==='linkText')siter()
    const theDate = new Date(post.date);
    return setDate(theDate.toLocaleString())//.toDateString())
  },[]);

 function handleEditor(){
   editor===false? showEditor(true):showEditor(false);
 }

 useEffect(()=>{
  if(post.type !== 'normalText' && post.type !== 'linkText'){
    const postBody = document.querySelector('#postBody');
   
    const pTags = postBody.querySelectorAll('p');
    pTags.forEach(pTag=>{
      const pTagImg = pTag.querySelector('img');
       if(pTagImg){
        pTag.style.padding = '0px'
       }
    })
    
    const images = postBody.querySelectorAll('img');
    images.forEach((image)=>{
      image.addEventListener('click',(e)=>{
         viewImage(e)
      })
    })
  }
 });

 useEffect(()=>{
  if(hasVisited && commentCount > 5){
 return currentPage === -1?fetchMoreComments(5*(pages.length-1)):fetchMoreComments(currentPage*5);
 }
},[hasVisited]);

 useEffect(()=>{
  if(sessionStorage.getItem(post.id+'currentPage')){
    setCurrentPage(Number(sessionStorage.getItem(post.id+'currentPage')));
    setHasVisited(true)
  }
 },[])

 function fetchMoreComments(skip,e){
     fetch(`/api/get-comments?skip=${skip}&postId=${post.id}&category=${post.category}`,{
      method: 'get',
      headers: {
        'Content-Type' : 'application/json'
      }
     })
     .then( res=>{
      return res.json();
      })
      .then(res=>{
        
        setComments(res.comments)

        if((skip/5) < pages.length-1){
          setCurrentPage(skip/5);
          setLastPage(null);
          sessionStorage.setItem(post.id+'currentPage', skip/5);
          
        }else {
          setCurrentPage(-1);
          setLastPage(pages.length-1);
          sessionStorage.setItem(post.id+'currentPage',-1);
        }
        e?.target.scrollIntoView()
      })
      .catch(err=>{
        console.error(err);
      })
}

function follow(e, userId){
  fetch('/api/follow',{
    method: 'post',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({
      userId: userId,
      followerId: userData.userId,
      followerUsername: ` ${userData.firstname} ${userData.surname} `
    })
  })
  .then(res=>{
    return res.json()
  })
  .then(res=>{
    console.log(res)
    e.target.style.background = 'blue';
  })
  .catch(err=>{
    console.error(err)
  });
}

  return (
    <HomeLayout path={post.category}>
    <Context.Provider 
    value={{
      user:{
      firstname: userData.firstname,
      surname: userData.surname,
      username: `${userData.firstname} ${userData.surname}`,
      userId: userData.userId
    },
    category: post.category,
    isLoggedIn: isLoggedIn,
    follow: follow
    }}>
  {/* <Nav path={post.category}/>
  <div className={styles.generalContainer}>
  <div className={styles.sidebarContainer}> 
        <nav className={styles.sidebar}>
          <Sidebar />
        </nav>
      </div>
    <div className={styles.mains}>
    <PostNav path={post.category} /> */}
    {view===true?<ImageView viewImage={viewImage} image={imageUrl}/>:''}
    <main className={styles.main} >
      <div className={styles.container} >
      <div className={styles.wrapper}>
      <div className={styles.posterDetails}>
          <a href="#" className={styles.posterId}>
              <Image onClick={(e)=>viewImage(e)} className={styles.shadow} alt={post.poster+"pics"} width={30} height={30} src={shadow} />
              <em className={styles.posterName} >{post.poster.length<1?'NWANONENYI CHUKWUKA':post.poster}</em>
          </a>
          {
            post.posterId !== userData.userId ? <button onClick={(e)=>follow(e, post.posterId)} className={styles.follow}>Follow</button>:
            <span>Follow your self</span>
          }
           <div className={styles.date}>{date}</div>
        </div><hr/> 
      <div>
        <strong className={styles.category}>
          Category: {post.category==='LoveAndFamily'?"Love and Family":
          post.category==='ScienceAndTechnology'?"Science and Technology":
          post.category==='PetsAndAnimals'?"Pets and Animals":
          post.category==='Ict'?"I.C.T":post.category}
        </strong>
      </div><hr/> 
        <section className={styles.postContainer}>
           <div className={styles.posts} id="posts">
              { post.type === 'normalText'?
                 <div>{post.text}</div>:
                post.type === 'linkText'?
              <>
                <div>
                <h1 className={styles.h1}>
                  <a  href={post.link} target="_blank">{linkTitle}</a>
                </h1>
                  <div className={styles.postContainer}>
                   <div className={styles.posts} id="posts">
                    <div>{linkDescription}</div>
                     <div className={styles.imgContainer}>
                       {linkIcon?.length>0?<a href={post.link} target="_blank"><img className={styles.postImage} onClick={(e)=>viewImage(e)} alt={"image for"+linkIcon} src={linkIcon}/></a>:''}
                     </div>
                    </div>
                   </div>
                </div>
              </>:
                <>
                  <div>
                     <h1 className={styles.postTitle}>Title: {post.title}</h1>
                  </div>
                  <div id="postBody" className={styles.postBody} dangerouslySetInnerHTML={{__html: post.postBody}} />
                </>

              }
           </div>
        </section>
        <div className={styles.reaction}>
          <button>Like</button>
          <button onClick={handleEditor}>Comment</button>
          <button>Share</button>
        </div>
        <section className={styles.commentSection}>
          <div className={styles.commentSectionH1Container}><h1>Comments ({commentCount})</h1></div><hr/>
        {pages.length>1?  
           <Pagination 
              pages={pages} 
              currentPage={currentPage}
              lastPage={lastPage}
              fetchMoreComments={fetchMoreComments}
               />:''
        }
          <div className={styles.comments}>
             {comments?.map((comment,i)=>{
                return(
                  <div key={comment.commentId}>
                   <Comment post={post} i={i} shadow={shadow} comment={comment} />
                  </div>
                )
             })}
          </div>
        </section>
        {pages.length>1?  
          <Pagination 
              pages={pages} 
              currentPage={currentPage}
              lastPage={lastPage}
              fetchMoreComments={fetchMoreComments}
               />:''
        }
        {/* <div>
            <div className={styles.paginationBoxContainerWrapper}>
             <div className={styles.paginationBoxContainer}>
               {pages.map((page)=>{
          //maps through the pages to provide the buttons needed for navigation
         //It checks if is the current or last page to change the background.
                return(
            
                   <button 
                      key={page} 
                      disabled={page===currentPage || page === lastPage  ? true : false} 
                      className={page===currentPage || page === lastPage ? styles.navyPageBtn:styles.normalPageBtn}
                      onClick={(e)=>fetchMoreComments(page*5,e)} >{page+1}
                   </button>
            
                  )
               })  
              }
             </div>
            </div>
            <div className={styles.viewMoreBtnContainer}>
              <button className={styles.viewMoreBtn} 
                    onClick={(e)=>fetchMoreComments(((currentPage+1)*5),e)} >
                    View more comments
              </button>
            </div>
        </div> */}
        <div className={styles.commentBox}>
          <div className={styles.editorContainer}>{editor===true?<CommentEditor addToComments={addToComments} handleEditor={handleEditor} post={post}/>:''}</div>
          {editor ===false?<div onClick={handleEditor} className={styles.clickToComment}>Write a comment</div>:''}
        </div>
     </div>
    </div> 
    </main>
    <Footer/>
    {/*</div>
    <div className={styles.sidebarContainer}> 
        <nav className={styles.sidebar}>
          <Sidebar />
        </nav>
      </div>*/}
   {/*</div>*/}
    </Context.Provider>
    </HomeLayout>
  );
}
