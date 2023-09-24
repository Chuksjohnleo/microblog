import Head from "next/head";
import Footer from "@/components/footer";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Sorting from "@/components/sorting";
import Posts from "@/components/posts";
import HomeLayout from "@/components/homeLayout";
import shadow from '@/components/images/shadow.svg';
import React,{ useEffect, useState } from "react";
// const inter = Inter({ subsets: ["latin"] });

import { MongoClient } from "mongodb";

const uri = process.env.DB_PASS;
// const a = 'KlllkjkjkL'
// console.log(a.toLowerCase())
export async function getServerSideProps() {
    const client = new MongoClient(uri);
    let posts = []
    try {
      await client.connect();
      const db = client.db("microblog");
      const categories = [
        'News','Politics','Learning','Religion','Sports',
        'Stories','History','LoveAndFamily',
        'ScienceAndTechnology','PetsAndAnimals','Ict','Health'
      ]
  
  //  posts = await db.collection('News').aggregate([
  //       { $sort: { _id: -1 } },
  //       {$project:{_id:0,postBody:0}}, 
  //       { $unionWith: { coll: "Learning", pipeline: [ { $project:{_id:0,postBody:0} } ] } },
  //       { $unionWith: { coll: "Religion", pipeline: [ { $project:{_id:0,postBody:0} } ] } },
  //       { $unionWith: { coll: "Sports", pipeline: [  { $project:{_id:0,postBody:0} } ] }},
  //       { $unionWith: { coll: "Stories", pipeline: [  { $project:{_id:0,postBody:0} } ] }},
  //       { $unionWith: { coll: "Ict", pipeline: [  { $project:{_id:0,postBody:0} } ] }},
  //       { $unionWith: { coll: "Health", pipeline: [  { $project:{_id:0,postBody:0} } ] }},
  //       { $unionWith: { coll: "Politics", pipeline: [  { $project:{_id:0,postBody:0} } ] }},
  //       { $unionWith: { coll: "Health", pipeline: [  { $project:{_id:0,postBody:0} } ] }},
  //       { $unionWith: { coll: "PetsAndAnimals", pipeline: [  { $project:{_id:0,postBody:0} } ] }},
  //       { $unionWith: { coll: "ScienceAndTechnology", pipeline: [  { $project:{_id:0,postBody:0} } ] }},
  //       { $unionWith: { coll: "LoveAndFamily", pipeline: [   { $project:{_id:0,postBody:0} } ] }},
  //       { $unionWith: { coll: "Motivation", pipeline: [   { $project:{_id:0,postBody:0} } ] }},
  //       { $unionWith: { coll: "ArtAndLiterature", pipeline: [  { $project:{_id:0,postBody:0} } ] }},
  //     ]).toArray()//.reverse();

  const n = db.collection('News');
  const p = db.collection('Ict');
  const r = db.collection('Religion');
  await r.deleteMany({type:'linkText'})

  posts = await db.collection('News').aggregate([
    { $unionWith: { coll: "Learning" } },
    { $unionWith: { coll: "Religion" } },
    { $unionWith: { coll: "Sports" } },
    { $unionWith: { coll: "Stories" } },
    { $unionWith: { coll: "Ict" } },
    { $unionWith: { coll: "Health" } },
    { $unionWith: { coll: "Politics" } },
    { $unionWith: { coll: "Health" } },
    { $unionWith: { coll: "PetsAndAnimals" } },
    { $unionWith: { coll: "ScienceAndTechnology" } },
    { $unionWith: { coll: "History" } },
    { $unionWith: { coll: "LoveAndFamily" } },
    { $unionWith: { coll: "Motivation" } },
    { $unionWith: { coll: "ArtAndLiterature"} },
    { $sort: { _id: -1 } },
    { $project: {_id:0,postBody:0} }
  ]).toArray()
      // console.log(posts)
      //end
      // const category = db.collection('Learning');
      // posts = await category.find({},{projection:{_id:0,postBody:0}}).toArray();
      // console.log(posts)

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



export default function Home({posts}) {
  const [sorting,setSorting] = useState('Recent posts');

  function sortSetting(sort){
    setSorting(sort)
  }


  useEffect(()=>{
     window.scrollTo(0,0)
  },[sorting])


  function fetcher(){
    fetch('/api/test',{
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({url: 'https://www.myschoolgist.com'})
    }).then(res=>{
      return res.json();
    }).then(res=>{
      console.log(res)
    }).catch(e=>{
      console.log(e)
    })
  }
  

  return (
    <>
      <Head>
        <title>Chuksjohnleo Blogs</title>
        <meta name="description" content="Chuksjohnleo blogs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon_io/favicon.ico" />
        <meta property="og:image" content="/favicon_io/android-chrome-192x192.png"/>
        <meta property="og:title" content="This is a microblog by Chuksjohnleo, a web developer. As a fullstack web developer, I will develop responsive and affordable websites that are performant and scalable for you." />
      </Head>
      <HomeLayout path={"Chuksjohnleo"} majorPath={"Chuksjohnleo"} >
      
      <main className={styles.main}>
        {/* <h1 className={styles.h1}>Chuksjohnleo Home</h1> */}
        {/* <button onClick={fetcher}>Test</button> */}
        <Sorting sorting={sorting} sortSetting={sortSetting} />
        <hr/>
        <section className={styles.posts}>
          
        <div>
           {posts.map(post=>{
            return <div key={post.id}><Posts post={post} /></div>
           })}
        </div>
        </section>
        <hr style={{backgroundColor:'navy'}}/>
        <ul>
            <li>News</li>
            <li>Learning</li>
        </ul>
      </main>
      </HomeLayout>
      <Footer />
    </>
  );
}

// const categories = [
//                      'News','Politics','Learning','Religion','Sports',
//                      'Stories','History','LoveAndFamily','ScienceAndTechnology',
//                      'ScienceAndTechnology','PetsAndAnimals','Ict','Health'
//                    ]