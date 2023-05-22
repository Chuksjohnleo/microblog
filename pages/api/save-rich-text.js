import { saveRichTextWithImages } from '@/libs/savePost';
import { JSDOM } from 'jsdom';
import { MongoClient } from "mongodb";
const uri = process.env.DB_PASS;

  export  const config = {
    api:{
      bodyParser:{
        sizeLimit:'5mb'
      }
    }
  }


export default async function handler(req, res) {
  const {post, poster, title, description, category} = req.body;
  if (req.method === "POST") {

    const dom = new JSDOM(post);
    const document = dom.window.document;
    const images = document.querySelectorAll('img');
  
    if(images.length > 0){
     return saveRichTextWithImages(post, savePostWithImages);
    }else{
     return savePost()
    }


async function savePost(){
       const client = new MongoClient(uri);
       await client.connect();

  try { 
       const db = client.db("microblog");
       const counter = db.collection("counter");
       const postCategory = db.collection(req.body.category);

       const id = await counter.findOneAndUpdate(
         { _id: "post_id" },
         { $inc: { count: 1 } },
         { upsert: true, returnDocument: "after" }
        );

       const addPost =   await postCategory.insertOne({
          id: "p"+id.value.count,
          poster: poster,
          date: Date(),
          title: title,
          description: description,
          images: [],
          category: category,
          type: 'richText',
          postBody: `<div class='ql-container ql-snow richTextContainer' >
                      <div class='ql-editor richText'>
                        ${ post }
                      </div>
                     </div>`,
          commentCount: 0,
          likes: 0,
          shares: 0
        });

      
      res.status(200).json({
          status:'success', 
          postId: "p"+id.value.count
        });

       console.log(addPost)

    } catch (e) {
      res.json("error");
      console.log(e);
    } finally {
      await client.close();
    }
   }

   
async function savePostWithImages(id, postBody, imagesSrc){
  const client = new MongoClient(uri);
  await client.connect();

try { 

  const db = client.db("microblog");
  const postCategory = db.collection(req.body.category);

  const addPost =   await postCategory.insertOne({
     id: "p"+id,
     poster: poster,
     date: Date(),
     title: title,
     description: description,
     images: imagesSrc,
     category: category,
     type: 'richText',
     postBody: `<div class='ql-container ql-snow richTextContainer' >
                 <div class='ql-editor richText'>
                   ${ postBody }
                 </div>
                </div>`,
     commentCount: 0,
     likes: 0,
     shares: 0
   });

  res.status(200).json({status:'success', postId: "p"+id});
  console.log(addPost)

} catch (e) {
 res.json("error");
 console.log(e);
} finally {
 await client.close();
}
}

  } else res.json("chai");
}