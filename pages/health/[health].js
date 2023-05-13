import Post from "@/components/post";
import Nav from "@/components/Nav";
import { MongoClient } from "mongodb";
import shadow from '@/components/images/shadow.svg'



const uri = process.env.DB_PASS;

export async function getStaticProps({params}){
    const client = new MongoClient(uri);
    let post;
    try {
      await client.connect();
      const db = client.db("posts");
      const category = db.collection('Health');
      const commentCollection = db.collection('HeathComments');
     
      
      let body = await category.findOne({id:params.health},{projection:{_id:0}});
      let comments = await commentCollection.find({postId: params.health},{projection:{_id:0}}).sort({_id: -1}).toArray()
      body.comments = comments;
      console.log(comments)
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
      const db = client.db("posts");
      const category = db.collection('Health');
      pathsArr = await category.find({},{projection:{_id:0,id:1}}).toArray();
      // console.log(pathsArr)
    } catch (e) {
      console.log(e)
    } finally {
      await client.close();
    }

   const paths =  pathsArr.map((path)=>{
        return {
          params:{health:  path.id.toString()}
        }
    });

// console.log(learning)
    return {paths,fallback: false}
  }

export default function Learning({post}){
    // console.log(post)
    return(
    <>
      <div>
        <Post shadow={shadow} post={post}/>
      </div>
    </>
    )
  }
