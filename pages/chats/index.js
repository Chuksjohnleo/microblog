import React, { useState } from "react";
import Nav from "@/components/Nav";
import Head from "next/head";
import utilStyle from '@/styles/utils.module.css';
import ChatNav from "@/components/chatNav";
import Footer from "@/components/footer";

export default function Chats() {
  const [backgroundColor, setBackgroundColor] = useState("white");

  function changeBg() {
    if (backgroundColor === "white") return setBackgroundColor("blue");
    else return setBackgroundColor("white");
  }
  return (
    <>
      <Head>
        <title>Chats | Chuksjohnleo Blogs</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Nav path={"Chats"} majorPath={"Chats"} ProperNav={ChatNav} />
      <h1 className={utilStyle.headingXl}>he</h1>
      <section style={{ backgroundColor: backgroundColor }}>
        <div>
          <button onClick={changeBg}>changeBg</button>
        </div>
      </section>
      <Footer/>
    </>
  );
}
