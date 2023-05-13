import styles from './imageView.module.css';
// import Image from 'next/image';


export default function ImageView({image, viewImage}){
    return(<>
             <div style={{position:'fixed',width:'100vw',height:'100vh',zIndex:999}}  className={styles.ImageView}>
                <div className={styles.container}>
                  <img className={styles.theImage} src={image} alt={image} />
                 <div className={styles.action}><a className={styles.save} href={image} download={'Chuksjohnleo'}>Save</a><button className={styles.cancel} onClick={viewImage}>Cancel</button></div>
                </div>
             </div>
           </>)
}