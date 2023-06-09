import Head from "next/head";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/footer";
import { Inter } from "next/font/google";
import Posts from "@/components/posts";
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
   
      const category = db.collection('News');
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



const inter = Inter({ subsets: ["latin"] });

export default function News({posts}) {
  return (
    <>
      <Head>
        <title>News | Chuksjohnleo Blogs</title>
        <meta name="description" content="News posts on Chuksjohnleo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon_io/favicon.ico" />
      </Head>
      <HomeLayout path={"News"}>
      <h1 className={styles.h1} >News Category</h1>
      <main className={styles.main}>
        <div className={styles.description}>
          <h2>
            Hello, Welcome to Chuksjohnleo news.
          </h2>
        </div>
        <section className={styles.posts}>
        <div>          
           {posts.map(post=>{
            return <div key={post.id}><Posts post={post} /></div>
           })}
        </div>
        </section>
      </main>
      </HomeLayout>
      <Footer />
    </>
  );
}