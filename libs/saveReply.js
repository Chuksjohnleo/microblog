import fs from 'fs';
import { MongoClient } from "mongodb";
const uri = process.env.DB_PASS;
import { JSDOM } from 'jsdom';


export async function saveRichTextWithImages(reply, replier, saveReplyWithImages){
 const client = new MongoClient(uri)
 
 try{
    await client.connect();
    const db = client.db("microblog");
    const counter = db.collection("ReplyCounter");

    
    const id = await counter.findOneAndUpdate(
      { _id: "reply_id" },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" }
    );

    const dom = new JSDOM(reply);
    const document = dom.window.document;
    const images = document.querySelectorAll('img');
    let imagesSrc = [];

    images.forEach((image,i)=>{
        const date = Date.now();
        const imageDataUrl = image.getAttribute('src');
        const imageData = imageDataUrl.split(',')[1];
        const extension = imageDataUrl.match(/\/([a-zA-Z0-9]+);/)[1];
      
        const filePath = `./public/reply_uploads/${date}s${i}id${id.value.count}.${extension}`;
        fs.writeFile(filePath, imageData, 'base64', (err) => {
          if (err) {
            return console.error(err);
          }
          console.log('yes')
          image.src = `/reply_uploads/${date}s${i}id${id.value.count}.${extension}`;
          image.alt = `${replier}'s reply image number ${i} with reply id ${"r"+id.value.count}`;
          imagesSrc.push(image.src);
          if(i === images.length-1){
              saveReplyWithImages(id.value.count, document.querySelector('body').innerHTML, imagesSrc )
           }
          })
       });
 }catch(e){
    console.log(e)
 }finally{
    await client.close();
 }
 
}