import { MongoClient } from "mongodb";
const uri = process.env.DB_PASS;


export default async function handler(req, res) {
  if (req.method === "POST") {
    const client = new MongoClient(uri);

try {
    await client.connect();
    const db = client.db("posts");
    const Replies = db.collection(req.body.category+'Replies');
    const replyLikers = db.collection(req.body.category+'ReplyLikers');
 
    // const c = db.collection('Learning')
  //  let v = await counter.deleteMany({})
  //  let cf= await c.deleteMany({})
  //   await client.close();
  //   return console.log(v,cf)
   
       const theReplies = await Replies.find({
            commentId: req.body.commentId,
          },{projection:{_id:0}}).toArray();
          
        const idOfRepliesLikedByUser = await replyLikers.find({
          commentId:  req.body.commentId,
          likerId:  req.body.userId,
        },{projection:{ _id:0, replyId:1 }}).toArray();

        let theIds = [];
        idOfRepliesLikedByUser.forEach(id=>{
          theIds.push(id.replyId)
        });

        res.json({
          replies: theReplies,
          liked: theIds
        });
    } catch (e) {
      res.json("error");
      if (e) console.log(e);
    } finally {
      await client.close();
    }
  } else res.json("chai");
}