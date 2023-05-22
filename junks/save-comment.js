import console from 'console';
import fs from 'fs';
import {JSDOM} from 'jsdom';
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
  if (req.method === "POST") {
    const client = new MongoClient(uri);

    await client.connect();
    const db = client.db("posts");
    const counter = db.collection("CommentCounter");
    // const c = db.collection('Learning')
  //  let v = await counter.deleteMany({})
  //  let cf= await c.deleteMany({})
  //   await client.close();
  //   return console.log(v,cf)
    const id = await counter.findOneAndUpdate(
      { _id: "comment_id" },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" }
    );

    const dom = new JSDOM(req.body.comment);
    const document = dom.window.document;
    const images = document.querySelectorAll('img');
    let imagesSrc = [];

  images.forEach((image,i)=>{
  const date = Date.now();
  const imageDataUrl = image.getAttribute('src');
  const imageData = imageDataUrl.split(',')[1];
  const extension = imageDataUrl.match(/\/([a-zA-Z0-9]+);/)[1];

  const filePath = `./public/comment-uploads/${date}s${i}commentId${id.value.count}.${extension}`;
  fs.writeFile(filePath, imageData, 'base64', (err) => {
    if (err) {
      console.error(err);
    }
    console.log('yes')
    image.src = `/comment-uploads/${date}s${i}commentId${id.value.count}.${extension}`;
    image.alt = `comment-image-${date}-s${i}id${id.value.count} by ${req.body.commenter}`;
    imagesSrc.push(image.src);
    })
 });
 
    await client.close();

try {
      await client.connect();
      const db = client.db("posts");
      const category = db.collection(req.body.category);
      const comments = db.collection(req.body.category+'Comments');
      


   try { 
       const data =   await comments.insertOne({
          postId: req.body.postId,
          commenter: req.body.commenter,
          commenterId: req.body.commenterId,
          commentId: 'c'+id.value.count,
          comment: document.querySelector('body').innerHTML,
          category: req.body.category,
          date: Date(),
          replyCount: 0,
          likes: 0,
          shares: 0
        });
    if(data.acknowledged === true){
      const incrementCommentCount =  await category.updateOne({ id: req.body.postId },{
        $inc:{ commentCount: 1 }
      });
      console.log(incrementCommentCount)
    }
    
    const addedComment = await comments.findOne({ 
      commenterId: req.body.commenterId,
      commentId: 'c'+id.value.count},
      {projection:{_id:0}})

      if(data.acknowledged===true) res.json({comment: addedComment});
    
     
      } catch (e) {
        res.json(e);
      }
    } catch (e) {
      res.json("error");
      if (e) console.log(e);
    } finally {
      await client.close();
    }
  } else res.json("chai");
}