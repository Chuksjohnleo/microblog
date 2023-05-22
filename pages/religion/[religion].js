import Post from "@/components/post";
import { MongoClient } from "mongodb";
import shadow from '@/components/images/shadow.svg';
import Head from "next/head";



const uri = process.env.DB_PASS;

export async function getStaticProps({params}){
    const client = new MongoClient(uri);
    let post;
    try {
      await client.connect();
      const db = client.db("microblog");
      const category = db.collection('Religion');
      const commentCollection = db.collection('ReligionComments');
     
      
      let body = await category.findOne({id:params.religion},{projection:{_id:0}});
      let comments = await commentCollection.find({postId: params.religion},{projection:{_id:0}}).sort({_id: -1}).toArray()
      body.comments = comments;
      console.log(body.postBody)
      post = body;
    } catch (e) {
      console.log(e)
    } finally {
      await client.close();
    }

    return {
      props: {
       post
      },
    };
}

export async function getStaticPaths() {
    const client = new MongoClient(uri);
    let pathsArr;
    try {
      await client.connect();
      const db = client.db("microblog");
      const category = db.collection('Religion');
      pathsArr = await category.find({},{projection:{_id:0,id:1}}).toArray();
      // console.log(pathsArr)
    } catch (e) {
      console.log(e)
    } finally {
      await client.close();
    }

   const paths =  pathsArr.map((path)=>{
        return {
          params:{religion:  path.id.toString()}
        }
    });

// console.log(learning)
    return {paths,fallback: false}
  }

export default function Learning({post}){
    // console.log(post)
    return(
    <>
      <Head>
        <title>{`Religion: ${post.title} | Chuksjohnleo Blogs`}</title>
        <meta name="description" content={post.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon_io/favicon.ico" />
      </Head>
      <div><Post shadow={shadow} post={post}/></div>
    </>
    )
  }

 