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
   
      const category = db.collection('History');
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


export default function History({posts}) {
  const [backgroundColor, setBackgroundColor] = useState("white");

  function changeBg() {
    if (backgroundColor === "white") return setBackgroundColor("blue");
    else return setBackgroundColor("white");
  }
  return (
    <>
      <Head>
        <title>History | Chuksjohnleo Blogs</title>
        <meta name="description" content="History on Chuksjohnleo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon_io/favicon.ico" />
      </Head>
      <HomeLayout path={"History"}>
        <h1 className={styles.h1}>History Category</h1>
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
