import fs from 'fs';
import path from 'path';
import { MongoClient } from "mongodb";
const uri = process.env.DB_PASS;
import { JSDOM } from 'jsdom';


export async function saveRichTextWithImages(comment, commenter, saveCommentWithImages){
 const client = new MongoClient(uri)
 
 try{
    await client.connect();
    const db = client.db("microblog");
    const counter = db.collection("CommentCounter");

    
    const id = await counter.findOneAndUpdate(
      { _id: "comment_id" },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" }
    );

    const dom = new JSDOM(comment);
    const document = dom.window.document;
    const images = document.querySelectorAll('img');
    let imagesSrc = [];

    images.forEach((image,i)=>{
        const date = Date.now();
        const imageDataUrl = image.getAttribute('src');
        const imageData = imageDataUrl.split(',')[1];
        const extension = imageDataUrl.match(/\/([a-zA-Z0-9]+);/)[1];
      
        const filePath = path.join(process.cwd(), 'public', 'comment_uploads', `d${date}_sn${i+1}_id${id.value.count}.${extension}`);
        fs.writeFile(filePath, imageData, 'base64', (err) => {
          if (err) {
            return console.error(err);
          }
          console.log('yes')
          image.src = `/comment_uploads/d${date}_sn${i+1}_id${id.value.count}.${extension}`;
          image.alt = `${commenter}'s comment image number ${i} with comment id ${"c"+id.value.count}`;
          imagesSrc.push(image.src);
          if(i === images.length-1){
              saveCommentWithImages(id.value.count, document.querySelector('body').innerHTML, imagesSrc )
           }
          })
       });
 }catch(e){
    console.log(e)
 }finally{
    await client.close();
 }
 
}