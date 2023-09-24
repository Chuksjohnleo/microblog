import Post from "@/components/post";
import { MongoClient } from "mongodb";
import shadow from '@/components/images/shadow.svg';
import { useRouter } from 'next/router';
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";



const uri = process.env.DB_PASS;

export async function getStaticProps({params}){
    const client = new MongoClient(uri);
    let post;
    try {
      await client.connect();
      const db = client.db("microblog");
      const category = db.collection('News');
      const commentCollection = db.collection('NewsComments');
     
      
      let body = await category.findOne({id:params.news},{projection:{_id:0}});
      
      // console.log(comments)
      if(body === null || body === undefined ){
        console.log('something-->',body, typeof body);
        post = {};
        return {
          props: {
           post
          },
        };
      }
      let comments = await commentCollection.find({postId: params.news},{projection:{_id:0}}).sort({_id: -1}).toArray()
      body.comments = comments;
      post = body;
    } catch (e) {
      console.log('e');
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
      const category = db.collection('News');
      pathsArr = await category.find({},{projection:{_id:0,id:1}}).toArray();
      // console.log(pathsArr)
    } catch (e) {
      console.log(e)
    } finally {
      await client.close();
    }

   const paths =  pathsArr.map((path)=>{
        return {
          params:{news:  path.id.toString()}
        }
    });

// console.log(learning)
    return {paths, fallback: true}
  }

export default function Learning({post}){
    console.log(post)
    const router = useRouter()

    // If the page is not yet generated, this will be displayed
    // initially until getStaticProps() finishes running
    if (router.isFallback) {
      return(
        <>
          <div>
            <Image src='/favicon_io/favicon-16x16.png' alt='Chuksjohnleo logo' height={30} width={30} /> 
            <div> Loading Post..... </div>
          </div>
        </>
        )
    }

    if (!post.title) {
      return(
        <>
          <div>
            <div> 
              This post does not exist<br/> 
              <Link href='/'>Back To Home</Link>
            </div>
            <Image src='/favicon_io/favicon-16x16.png' alt='Chuksjohnleo logo' height={30} width={30} /> 
            <div> Loading Post..... </div>
          </div>
        </>
        )
    }

    return(
    <>
      <Head>
        <title>{`News: ${post.title} | Chuksjohnleo Blogs`}</title>
        <meta name="description" content={post.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon_io/favicon.ico" />
      </Head>
      <div><Post shadow={shadow} post={post}/></div>
    </>
    )
  }

 