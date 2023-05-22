import { saveRichTextWithImages } from '@/libs/saveReply';
import { JSDOM } from 'jsdom';
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
  const {postId, reply, replyTo, commentId, replier, replierId, category} = req.body;
  if (req.method === "POST") {

    const dom = new JSDOM(reply);
    const document = dom.window.document;
    const images = document.querySelectorAll('img');
  
    if(images.length > 0){
     return saveRichTextWithImages(reply, replier, saveReplyWithImages);
    }else{
     return saveReply()
    }


async function saveReply(){
       const client = new MongoClient(uri);
       await client.connect();

  try { 
       const db = client.db("microblog");
       const counter = db.collection("ReplyCounter");
       const replies = db.collection(category+'Replies');
       const comments = db.collection(category+'Comments');

       const id = await counter.findOneAndUpdate(
         { _id: "reply_id" },
         { $inc: { count: 1 } },
         { upsert: true, returnDocument: "after" }
        );

        const data =   await replies.insertOne({
          replyId:'r'+id.value.count,
          reply:`<div class='ql-container ql-snow richTextContainer' >
                  <div class='ql-editor richText'>
                   ${ reply }
                  </div>
                 </div>`,
          postId: postId,
          replyTo: replyTo,
          commentId: commentId,
          date: Date(),
          replier: replier,
          replierId: replierId,
          category: category,
          likes: 0,
          shares: 0
        });
  
         const insertedData = await replies.findOne({replyId: 'r'+id.value.count, commentId: req.body.commentId},{projection:{ _id:0 }})
         if(data.acknowledged === true){
          const incrementReplyCount =  await comments.updateOne({ commentId: req.body.commentId },{
            $inc:{ replyCount: 1 }
          });
          console.log(incrementReplyCount)
         }
         res.json({reply: insertedData});
         console.log({reply: insertedData})
    } catch (e) {
      res.json("error");
      console.log(e);
    } finally {
      await client.close();
    }
   }

   
async function saveReplyWithImages(id, replyBody, imagesSrc){
  const client = new MongoClient(uri);
  await client.connect();

try { 

  const db = client.db("microblog");
  const replies = db.collection(category+'Replies');
  const comments = db.collection(category+'Comments');
 
  const data =   await replies.insertOne({
    replyId:'r'+id,
    reply:  `<div class='ql-container ql-snow richTextContainer' >
              <div class='ql-editor richText'>
               ${ replyBody }
              </div>
             </div>`,
    postId: postId,
    replyTo: replyTo,
    commentId: commentId,
    images: imagesSrc,
    date: Date(),
    replier: replier,
    replierId: replierId,
    category: category,
    likes: 0,
    shares: 0
  });

   const insertedData = await replies.findOne({replyId: 'r'+id, commentId: commentId},{projection:{ _id:0 }})
   if(data.acknowledged === true){
    const incrementReplyCount =  await comments.updateOne({ commentId: commentId },{
      $inc:{ replyCount: 1 }
    });
    console.log(incrementReplyCount)
   }
   res.json({reply: insertedData});
   console.log({reply: insertedData})

} catch (e) {
 res.json("error");
 console.log(e);
} finally {
 await client.close();
}
}

  } else res.json("chai");
}