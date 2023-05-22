import React, { useState } from "react";
import styles from '@/styles/Home.module.css';
import Head from "next/head";
import Footer from "@/components/footer";
import HomeLayout from "@/components/homeLayout";
import Chats from "@/components/chats";

export default function Chat() {
  const [backgroundColor, setBackgroundColor] = useState("white");

  function changeBg() {
    if (backgroundColor === "white") return setBackgroundColor("blue");
    else return setBackgroundColor("white");
  }
  return (
    <>
      <Head>
        <title>Chats | Chuksjohnleo Blogs</title>
        <meta name="description" content="Chats on Chuksjohnleo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon_io/favicon.ico" />
      </Head>
      <HomeLayout majorPath={"Chats"} path={"Chats"}>
       <main className={styles.main}>
        <h1>CHATS</h1>
        <Chats />
       </main>
      </HomeLayout>
     <Footer/>
    </>
  );
}
