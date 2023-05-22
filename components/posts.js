import Image from "next/image";
import { useEffect, useState } from "react";
import styles from './posts.module.css';
import ImageView from "./imageView";
import Link from "next/link";
// import shadow from './images/shadow.svg';
import shadow from './images/shadow2.jpg';

export default function Posts({ post }) {
  const [date,setDate] = useState('date');
  const [view,setView] = useState(false);
  const [imageUrl,setImageUrl] = useState('');
  const [linkDescription,setLinkDescription] = useState('');
  const [linkTitle,setLinkTitle] = useState('');
  const [linkIcon,setLinkIcon] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData,setUserData] = useState({});


 function viewImage(e){
  const html = document.querySelector("html");
  if(view===false){
    setImageUrl(e.target.src);
    setView(true);
    html.style.overflow = 'hidden';
  }
  else {
    setView(false);
    html.style.overflow = 'auto';
  }
 }

 function siter(){
  if(!post.link.includes('https://')){
    post.link = 'https://'+post.link
  }
  fetch(post.link,{
    method: 'Get',
    headers:{'Content-Type':'text/html'}
  })
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

  // for(let i=0;i<100;i++){
  //   follow({},'u2')
  //   console.log(i)
  // }

 if(localStorage.getItem('followers')){
  console.log(JSON.parse(localStorage.getItem('followers')));
 }
 
  if(localStorage.getItem('userdata')){
      setUserData(JSON.parse(localStorage.getItem('userdata')));
      setIsLoggedIn(true)
    }
  },[]);

  useEffect(()=>{
    if(post.type==='linkText')siter()
    const theDate = new Date(post.date);
    return setDate(theDate.toLocaleString())//.toDateString())
  },[]);

  function follow(e, userId){
    if(!isLoggedIn)return;
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
  <>
   {view===true?<ImageView viewImage={viewImage} image={imageUrl}/>:''}
    <div className={styles.container} >
      <article className={styles.article}>
      <div className={styles.posterDetails}>
          <a href="#" className={styles.posterId}>
              <Image onClick={(e)=>viewImage(e)} className={styles.shadow} alt={post.poster+"pics"} width={30} height={30} src={shadow} />
              <em className={styles.posterName} >{post.poster.length<1?'Anonymous Poster':post.poster}</em>
          </a>
           <button onClick={(e)=>follow(e, post.posterId)} className={styles.follow}>Follow</button>
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
      {/* start */}
    {
    post.type === 'normalText'?
    <>
      <div>
      <div>
        <h1 className={styles.h1}>{post.poster}</h1>
        <div className={styles.postContainer}>
           <div className={styles.posts} id="posts">
             <div>{post.text?post.text:'Text isnt here'}</div>
             <div className={styles.imgContainer}>
              {linkIcon?.length>0?<img onClick={(e)=>viewImage(e)} alt={"image for"+linkIcon} src={linkIcon}/>:''}
             </div>
           </div>
        </div>
      </div>
      </div>
    </>:
    post.type === 'linkText'?
    <>
      <div>
        <h1 className={styles.h1}>{linkTitle}</h1>
        <div className={styles.postContainer}>
           <div className={styles.posts} id="posts">
             <div>{linkDescription}</div>
             <div className={styles.imgContainer}>
              {linkIcon?.length>0?<img onClick={(e)=>viewImage(e)} alt={"image for"+linkIcon} src={linkIcon}/>:''}
             </div>
           </div>
        </div>
      </div>
    </>:
      <>
        <h1 className={styles.h1}>{post.title}</h1>
        <div className={styles.postContainer}>
           <div className={styles.posts} id="posts">
             <div className={styles.postDescription}>
               {post.description}
             </div>
             <div className={styles.imgContainer}>
              {post.images?.length>0?<img onClick={(e)=>viewImage(e)} alt={post.images[0]} src={post.images[0]}/>:''}
             </div>
           </div>
        </div>
      </>
    }
        {/* end */}
        <div className={styles.reaction}>
          <button>Like</button>
          <Link href={post.category === 'LoveAndFamily'?
                `/love_and_family/${post.id}`:
                post.category === 'ScienceAndTechnology'?
                `/science_and_technology/${post.id}`:
                post.category === 'PetsAndAnimals'?
                `/pets_and_animals/${post.id}`:
                `/${post.category.toLowerCase()}/${post.id}`
            }>Comment</Link>
          <button>Share</button>
        </div>
      </article>
    </div>
  </>
  );
}
