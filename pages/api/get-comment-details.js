import { MongoClient } from "mongodb";
const uri = process.env.DB_PASS;


export default async function handler(req, res) {
  if (req.method === "GET" && req.query.type === 'all' ) {
    const client = new MongoClient(uri);

try {
    await client.connect();
    const db = client.db("posts");
    const ReplyLikers = db.collection(req.query.category+'ReplyLikers');
    // const c = db.collection('Learning')
  //  let v = await counter.deleteMany({})
  //  let cf= await c.deleteMany({})
  //   await client.close();
  //   return console.log(v,cf)
   
       const theReplyLikers = await ReplyLikers.find({
            replyId: req.query.replyId,
          },{projection:{_id:0}}).toArray();

       
       res.json({
          replyLikers: theReplyLikers
        });
    } catch (e) {
      res.json("error");
      if (e) console.log(e);
    } finally {
      await client.close();
    }
  } 
  if(req.method === 'GET' && req.query.type === 'check'){
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("posts");
        const ReplyLikers = db.collection(req.query.category+'ReplyLikers');
       
        const checkIfUserLiked = await ReplyLikers.findOne({
                replyId: req.query.replyId,
                likerId: req.query.userId
              },{projection:{_id:0}})
    console.log(checkIfUserLiked)
        if(checkIfUserLiked?.likerId === req.query.userId){
          res.json('yes');
        } else res.json('no');
        } catch (e) {
          res.json("error");
          if (e) console.log(e);
        } finally {
          await client.close();
        }
  } else res.json("chai");
}