import React, {useEffect, useRef} from "react";
import styles from  './sidebar.module.css';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <>
      <div className={styles.sidebar}>
        {/* <div>Menu</div> */}
        <ul className={styles.sidebarList}>
          <li className={styles.list}><Link href='/login'>Login</Link></li>
          <li className={styles.list}><Link href='/register'>Register</Link></li>
          <li className={styles.list}>Settings</li>
          <li className={styles.list}>Profile</li>
          <li className={styles.list}>Advertisements</li>
          <li className={styles.list}>Logs</li>
          <li className={styles.list}>FAQs</li>
          <li className={styles.list}>How to use</li>
          <li className={styles.list}>About</li>
          <li className={styles.list}>Contact</li>
          <li className={styles.list}>Privacy Policy</li>
          <li className={styles.list}>Team</li>
        </ul>
      </div>
    </>
  );
}
