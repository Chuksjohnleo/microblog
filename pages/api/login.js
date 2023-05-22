import { MongoClient } from "mongodb";
const uri = process.env.DB_PASS;


export default async function handler(req, res) {
  if (req.method === "POST") {
    const client = new MongoClient(uri);

try {
    await client.connect();
    const db = client.db("microblog");
    const users = db.collection('users');
 
    const data = await users.findOne({
          email: req.body.email,
          password: req.body.password,
        },{projection:{_id:0}});

      if(data?.firstname) {
        const followers = db.collection(data.id+'Followers');
        // const testfollowers = db.collection('Followers');
        // const getFollowers = await followers.aggregate([{ $unionWith: { coll: 'Followers' } }]).toArray();
        const getFollowers = await followers.find().toArray();
        res.json({userData: data, followers: getFollowers});
        console.log(getFollowers)
      } else{
        res.json('failed')
        console.log(data)
      }
       
    } catch (e) {
      res.json("error");
      if (e) console.log(e);
    } finally {
      await client.close();
    }
  } else res.json("chai");
}