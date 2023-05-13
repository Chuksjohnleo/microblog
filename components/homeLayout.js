import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from './homeLayout.module.css';
import Nav from './Nav';
import Footer from "./footer";
import Pagination from "./pagination";
import PostNav from "./postNav";
import Sidebar from "./sidebar";
import Noticebar from "./noticebar";



export const Context = React.createContext();

export default function HomeLayout({children, path, majorPath}) {


  return (
<>
  <Nav path={path} majorPath={majorPath} />
  <div className={styles.generalContainer}>
  <div className={styles.sidebarContainer}> 
        <nav className={styles.sidebar}>
          <Noticebar />
        </nav>
      </div>
    <div className={styles.mains}>
     <PostNav path={path} />
      {children}
     {/* <Footer/> */}
    </div>
      <div className={styles.sidebarContainer}> 
        <nav className={styles.sidebar}>
          <Sidebar />
        </nav>
      </div>
    </div>
    </>
  );
}
