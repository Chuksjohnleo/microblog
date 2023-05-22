import { useEffect } from 'react';
import styles from './status.module.css';
import { useRouter } from 'next/router';

export default function Status({text, postId, category, path}){
  const router = useRouter();
  console.log(category)

  const timer = setTimeout(()=>{
    category==='PetsAndAnimals'? 
    router.push(`/pets_and_animals/${postId}`):
    category==='ScienceAndTechnology'? 
    router.push(`/science_and_technology/${postId}`):
    category==='LoveAndFamily'? 
    router.push(`/love_and_family/${postId}`):
    path==='Chuksjohnleo'?
    router.push(`/${category.toLowerCase()}/${postId}`):
    router.push(`${location.pathname}/${postId}`)
  }
    ,3000)
  
    return(
    <>
    <div style={{zIndex:999}} className={styles.statusContainer}>
       <div style={{zIndex:999}} className={styles.status}>
         <div className={styles.text}><strong>{text} Successfully</strong></div>
       </div>
    </div>
    </>)
}