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
    const counter = db.collection("replyCounter");

    // const c = db.collection('Learning')
  //  let v = await counter.deleteMany({})
  //  let cf= await c.deleteMany({})
  //   await client.close();
  //   return console.log(v,cf)
    const id = await counter.findOneAndUpdate(
      { _id: "reply_id" },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" }
    );

    const dom = new JSDOM(req.body.reply);
    const document = dom.window.document;
    const images = document.querySelectorAll('img');
    let imagesSrc = [];

  images.forEach((image,i)=>{
  const date = Date.now();
  const imageDataUrl = image.getAttribute('src');
  const imageData = imageDataUrl.split(',')[1];
  const extension = imageDataUrl.match(/\/([a-zA-Z0-9]+);/)[1];

  const filePath = `./public/uploads/${date}s${i}replyId${id.value.count}.${extension}`;
  fs.writeFile(filePath, imageData, 'base64', (err) => {
    if (err) {
      console.error(err);
    }
    console.log('yes')
    image.src = `/uploads/${date}s${i}replyId${id.value.count}.${extension}`;
    image.alt = `reply-image-${date}-s${i}id${id.value.count}`;
    imagesSrc.push(image.src);
    })
 });
 
    await client.close();

try {
      await client.connect();
      const db = client.db("posts");
      const replies = db.collection(req.body.category+'Replies');
      const comments = db.collection(req.body.category+'Comments');
     
   try { 
       const data =   await replies.insertOne({
        replyId:'r'+id.value.count,
        reply: document.querySelector('body').innerHTML,
        postId: req.body.postId,
        replyTo: req.body.replyTo,
        commentId: req.body.commentId,
        date: Date(),
        replier: req.body.replier,
        replierId: req.body.replierId,
        category: req.body.category,
        likes: 0,
        shares: 0
       },(e,result)=>{
        console.log(e,result)
       });

       const insertedData = await replies.findOne({replyId: 'r'+id.value.count, commentId: req.body.commentId},{projection:{ _id:0 }})
       if(data.acknowledged === true){
        const incrementReplyCount =  await comments.updateOne({ commentId: req.body.commentId },{
          $inc:{ replyCount: 1 }
        });
        console.log(incrementReplyCount)
       }
       res.json({reply: insertedData});
       console.log({reply: insertedData})
     
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      res.json("error");
      if (e) console.log(e);
    } finally {
      await client.close();
    }
  } else res.json("chai");
}