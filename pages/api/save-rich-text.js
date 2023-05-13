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
    const counter = db.collection("counter");

    
  //   const c = db.collection(req.body.category)
  //  let v = await counter.deleteMany({})
  //  let cf= await c.deleteMany({})
  //   await client.close();
  //   return console.log(v,cf)



    const id = await counter.findOneAndUpdate(
      { _id: "post_id" },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" }
    );

    const dom = new JSDOM(req.body.post);
    const document = dom.window.document;
    const images = document.querySelectorAll('img');
    let imagesSrc = [];

  images.forEach((image,i)=>{
  const date = Date.now();
  const imageDataUrl = image.getAttribute('src');
  const imageData = imageDataUrl.split(',')[1];
  const extension = imageDataUrl.match(/\/([a-zA-Z0-9]+);/)[1];

  const filePath = `./public/uploads/${date}s${i}id${id.value.count}.${extension}`;
  fs.writeFile(filePath, imageData, 'base64', (err) => {
    if (err) {
      console.error(err);
    }
    console.log('yes')
    image.src = `/uploads/${date}s${i}id${id.value.count}.${extension}`;
    image.alt = `post-image-${date}-s${i}id${id.value.count}`;
    imagesSrc.push(image.src);
    })
 });
 
    await client.close();

try {
      await client.connect();
      const db = client.db("posts");
      const category = db.collection(req.body.category);
     
  try { 
       const addPost =   await category.insertOne({
          id: "p"+id.value.count,
          poster: req.body.poster,
          date: Date(),
          title: req.body.title,
          description: req.body.description,
          images: imagesSrc,
          category:req.body.category,
          type: 'richText',
          postBody: `<div class='ql-container ql-snow' >
                      <div class='ql-editor'>
                        ${document.querySelector('body').innerHTML}
                      </div>
                     </div>`,
          commentCount: 0,
          likes: 0,
          shares: 0
        });

        res.json('yes');
        console.log(addPost)
     
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