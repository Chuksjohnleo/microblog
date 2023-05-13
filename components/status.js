import { useEffect } from 'react';
import styles from './status.module.css';

export default function Status({text,handler}){

  const timer = setTimeout(()=>location.reload(),3000)
    return(
    <>
    <div style={{zIndex:999}} className={styles.statusContainer}>
       <div style={{zIndex:999}} className={styles.status}>
         <div className={styles.text}><strong>{text} Successfully</strong></div>
       </div>
    </div>
    </>)
}