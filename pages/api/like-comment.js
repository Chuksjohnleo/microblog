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
  
   try { 
    const client = new MongoClient(uri);

    await client.connect();
    const db = client.db("posts");

    
    const replies = db.collection(req.body.category+'Replies');
    const repliers = db.collection(req.body.category+'Repliers');
 
    const data =   await repliers.insertOne({
        replyId:req.body.replyId,
        date: Date(),
        liker: req.body.liker,
        likerId: req.body.likerId
       },(result)=>{
        console.log(result)
       });

    if(data.acknowledged === true){
        const incrementLikeCount =  await replies.updateOne({ replyId: req.body.replyId },{
          $inc: { likes: 1 }
        });
        console.log(incrementLikeCount)
       }
    res.json('done');
     
      } catch (e) {
        console.log(e);
      } finally {
      await client.close();
    }
  } else res.json("chai");
}