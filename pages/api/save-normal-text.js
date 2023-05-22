import { MongoClient } from "mongodb";
const uri = process.env.DB_PASS;


export default async function handler(req, res) {
  if (req.method === "POST") {
    const client = new MongoClient(uri);

try {
    await client.connect();
    const db = client.db("microblog");
    const category = db.collection(req.body.category);
    const counter = db.collection("counter");
    // const c = db.collection('Learning')
  //  let v = await counter.deleteMany({})
  //  let cf= await c.deleteMany({})
  //   await client.close();
  //   return console.log(v,cf)
    const id = await counter.findOneAndUpdate(
      { _id: "post_id" },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" }
    );

          await category.insertOne({
          id: "p"+id.value.count,
          poster: req.body.poster,
          date: Date(),
          category:req.body.category,
          text: req.body.post,
          type: 'normalText',
          commentCount: 0,
          likes: 0,
          shares: 0
        });

        res.json('yes');
    } catch (e) {
      res.json("error");
      if (e) console.log(e);
    } finally {
      await client.close();
    }
  } else res.json("chai");
}