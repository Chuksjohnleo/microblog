import { MongoClient } from "mongodb";
const uri = process.env.DB_PASS;

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body)
    const client = new MongoClient(uri);

try {
    await client.connect();
    const db = client.db("microblog");
    const followers = db.collection(req.body.userId+'Followers');

    const follow = await followers.insertOne({
      followerId: req.body.followerId,
      followerUsername: req.body.followerUsername,
      date: Date()
    });

    if(follow.acknowledged === true){
      res.json('done');
    }else{
      res.json(`error following`)
    }
    
    } catch (e) {
      res.json("error");
      if (e) console.log(e);
    } finally {
      await client.close();
    }
  }  else res.json("chai");
}