import Image from "next/image";
import React, { useEffect, useState, createContext } from "react";
import styles from './homeLayout.module.css';
import Nav from './Nav';
import PostNav from "./postNav";
import Sidebar from "./sidebar";
import Noticebar from "./noticebar";



export const HomeContext = createContext();

export default function HomeLayout({children, path, majorPath}) {
 const [navPosition, setNavPosition] = useState('sticky');
 const [navZindex, setNavZindex] = useState(2);

 useEffect(()=>{
 console.log(navPosition)
},[navPosition])

  return (
<HomeContext.Provider
 value={{
   component: 'Homelayout',
   navZindex: navZindex,
   navPosition: navPosition,
   setNavZindex: setNavZindex,
   setNavPosition: setNavPosition
 }}
>
  <Nav path={path} majorPath={majorPath} />
  <div className={styles.generalContainer}>
  <div className={styles.sidebarContainer}> 
        <nav className={styles.sidebar}>
        <div className={styles.navContainers}><Noticebar /></div>
        </nav>
      </div>
    <div className={styles.mains}>
     <PostNav path={path} />
      {children}
     {/* <Footer/> */}
    </div>
      <div className={styles.sidebarContainer}> 
        <nav className={styles.sidebar}>
          <div className={styles.navContainers}><Sidebar /></div>
        </nav>
      </div>
    </div>
    </HomeContext.Provider>
  );
}
