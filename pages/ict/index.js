import React, { useState } from "react";
import Nav from "@/components/Nav";
import Head from "next/head";
import Posts from "@/components/posts";
import Footer from "@/components/footer";
import utilStyle from '@/styles/utils.module.css';
import styles from "@/styles/Home.module.css";


import { MongoClient } from "mongodb";
import HomeLayout from "@/components/homeLayout";

const uri = process.env.DB_PASS;

export async function getServerSideProps() {
    const client = new MongoClient(uri);
    let posts = []
    try {
      await client.connect();
      const db = client.db("microblog");
   
      const category = db.collection('Ict');
      posts = await category.find({},{projection:{_id:0,postBody:0}}).sort({_id: -1}).toArray();
      console.log(posts)

    } catch (e) {
      console.log(e)
    } finally {
      await client.close();
    }
    return {
      props: {
       posts
      },
    };
}


export default function Ict({posts}) {
 
  return (
    <>
      <Head>
        <title>I.C.T | Chuksjohnleo Blogs</title>
        <meta name="description" content="ICT posts on Chuksjohnleo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon_io/favicon.ico" />
        <meta property="og:image" content="/favicon_io/android-chrome-192x192.png"/>
        <meta property="og:title" content="This is a microblog by Chuksjohnleo, a web developer. As a fullstack web developer, I will develop responsive and affordable websites that are performant and scalable for you." />
      </Head>
      <HomeLayout path={"Ict"}>
      <h1 className={styles.h1}>I.C.T Category</h1>
      <main className={styles.main}>
      <section className={styles.posts}>
        <div>          
           {posts.map(post=>{
            return <div key={post.id}><Posts post={post} /></div>
           })}
        </div>
        </section>
        </main>
      </HomeLayout>
      <Footer/>
    </>
  );
}
