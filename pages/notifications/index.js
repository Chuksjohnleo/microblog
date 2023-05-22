import React, { useEffect, useState } from "react";
import Footer from "@/components/footer";
import Head from "next/head";
import HomeLayout from "@/components/homeLayout";
import styles from "@/styles/Home.module.css";
import Notifications from "@/components/notifications";

export default function Notification() {

  return (
    <>
     <Head>
        <title>Notifications | Chuksjohnleo Blogs</title>
        <meta name="description" content="Chuksjohnleo Notifications" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon_io/favicon.ico" sizes='any' />
     </Head>
     <HomeLayout path={"Notifications"} majorPath={"Notifications"}>
       <main className={styles.main}>
        <h1>NOTIFICATIONS</h1>
        <Notifications />
       </main>
       <Footer/>
     </HomeLayout>
    </>
  );
}
