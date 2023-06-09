import React, {useState, useEffect, useContext} from "react";
import shadow from '@/components/images/shadow.svg';
import styles from './nav.module.css';
import Image from "next/image";
import settingIcon from '@/components/images/settingicon.svg';
import dynamic from "next/dynamic";
const Editor = dynamic(import("@/components/editor"), { ssr: false });
import { HomeContext } from "./homeLayout";

export default function PostNav({path}){
    
    const { setNavPosition } = useContext(HomeContext);

    const [editor, setEditor] = useState("hidden");

    function openAndCloseEditor() {
        if (editor === "hidden") setEditor("visible");
        else{ 
          setEditor("hidden");
          setNavPosition('sticky')
        }
      }
    
    return(
        <>
         {
           path === "Notifications" 
        || path === "Chats" 
        || path === "Login"
        || path === "Register"
         ? (
        <></>
      ) : (
        <>
        <div className={styles.postingContainer}>
          {editor === "visible" ? (
            <div>
              <Editor path={path} openAndCloseEditor={openAndCloseEditor} />
            </div>
          ) : (
            <div className={styles.posting}>
              <Image className={styles.profilePics} src={shadow} height={40} width={40} alt="Your profile picture"/>
              <button onClick={openAndCloseEditor} className={styles.postbtn}>
                Post on {path==='Ict'?'I.C.T'
                :path === 'PetsAndAnimals'?'Pets and Animals'
                :path === 'LoveAndFamily'?'Love and Family'
                :path === 'ScienceAndTechnology'? 'Science and Technology'
                :path
              } ✍️
              </button>
              <Image className={styles.settingIcon} src={settingIcon} height={40} width={40} alt="Settings"/>
            </div>
          )}
        </div>
        <hr/>
        </>
      )}
        </>
    )
}