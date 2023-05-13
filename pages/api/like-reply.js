import console from 'console';
import { MongoClient } from "mongodb";
const uri = process.env.DB_PASS;


export default async function handler(req, res) {
  if (req.method === "PUT") {
    // const client = new MongoClient(uri);

    // await client.connect();
    // const db = client.db("posts");
   // const counter = db.collection("replyCounter");

    // const c = db.collection('Learning')
  //  let v = await counter.deleteMany({})
  //  let cf= await c.deleteMany({})
  //   await client.close();
  //   return console.log(v,cf)
    // const id = await counter.findOneAndUpdate(
    //   { _id: "reply_id" },
    //   { $inc: { count: 1 } },
    //   { upsert: true, returnDocument: "after" }
    // );
  const client = new MongoClient(uri);
   try { 

    await client.connect();
    const db = client.db("posts");

    console.log(req.body)
    const replies = db.collection(req.body.category+'Replies');
    const replyLikers = db.collection(req.body.category+'ReplyLikers');
  // let tt = await replies.updateMany({},{$set:{likes:0,category: 'ScienceAndTechnology'}})
  // let tte = await replies.find().toArray()
  // console.log(tt,tte)
  // return
    const incrementLikes = await replies.updateOne({ replyId: req.body.replyId},{$inc:{likes:1}})
    
    if(incrementLikes.acknowledged === true){
    const data =   await replyLikers.insertOne({
                commentId: req.body.commentId,
                replyId: req.body.replyId,
                date: Date(),
                liker: req.body.liker,
                likerId: req.body.likerId
           });
 
    if(data.acknowledged === true){
          res.json('done');
          console.log(incrementLikes,data)
        }
       }
      } catch (e) {
        console.log(e);
      } finally {
      await client.close();
    }
  } else res.json("chai");
}