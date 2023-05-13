import { MongoClient } from "mongodb";
const uri = process.env.DB_PASS;


export default async function handler(req, res) {
  if (req.method === "GET") {
    const client = new MongoClient(uri);
    console.log(req.query.postId, req.query.skip)

try {
    await client.connect();
    const db = client.db("posts");
    const comments = db.collection(req.query.category+'Comments');
    // const c = db.collection('Learning')
  //  let v = await counter.deleteMany({})
  //  let cf= await c.deleteMany({})
  //   await client.close();
  //   return console.log(v,cf)
   
       const theComments = await comments.find({
           postId: req.query.postId,
          },{projection:{_id:0}}).sort({_id: -1}).skip(Number(req.query.skip)).limit(5).toArray();

        res.json({
          comments: theComments
        });
    } catch (e) {
      res.json("error");
      if (e) console.log(e);
    } finally {
      await client.close();
    }
  } else res.json("chai");
}