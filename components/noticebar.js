import React, {useEffect, useState} from "react";
import styles from  './noticebar.module.css';
import Image from "next/image";
import shadow from '@/components/images/shadow.svg';



export default function Noticebar() {
  const [userData, setUserData] = useState({});
  const [date, setDate] = useState('')
  useEffect(()=>{
   const userdata = JSON.parse(localStorage.getItem('userdata'));
   console.log(userdata)
   setUserData(userdata);
   let date = new Date();
   setDate(date.toDateString())
  },[])

  return (
    <>
      <div>
        <div className={styles.userImageContainer} >
          <Image src={shadow} height={200} width={200} alt={'your profile pics'} />
        </div>
        <div className={styles.userDataContainer}>
          {userData?.userId?<strong className={styles.userData}>{`${userData.firstname} ${userData.surname}`}</strong>:<a href="login">Login to see your details</a>}
        </div>
        <div className={styles.userDataContainer}>
          <em>{date}</em>
        </div>
      </div>
      <div className={styles.sidebar}>
        {/* <div>Menu</div> */}
        <ul className={styles.sidebarList}>
          <li className={styles.list}><a href='/login'>Login</a></li>
          <li className={styles.list}><a href='/register'>Register</a></li>
          <li className={styles.list}>Settings</li>
          <li className={styles.list}>Profile</li>
        </ul>
      </div>
    </>
  );
}
