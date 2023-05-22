import { saveRichTextWithImages } from '@/libs/saveComment';
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
  const {postId, comment, commenter, commenterId, category} = req.body;
  if (req.method === "POST") {

    const dom = new JSDOM(comment);
    const document = dom.window.document;
    const images = document.querySelectorAll('img');
  
    if(images.length > 0){
     return saveRichTextWithImages(comment, commenter, saveCommentWithImages);
    }else{
     return savePost()
    }


async function savePost(){
       const client = new MongoClient(uri);
       await client.connect();

  try { 
       const db = client.db("microblog");
       const counter = db.collection("CommentCounter");
       const commentCategory = db.collection(category);
       const comments = db.collection(category+'Comments');

       const id = await counter.findOneAndUpdate(
         { _id: "comment_id" },
         { $inc: { count: 1 } },
         { upsert: true, returnDocument: "after" }
        );

        const data =   await comments.insertOne({
          postId: postId,
          commenter: commenter,
          commenterId: commenterId,
          commentId: 'c'+id.value.count,
          comment: `<div class='ql-container ql-snow richTextContainer' >
                     <div class='ql-editor richText'>
                      ${ comment }
                     </div>
                    </div>`,
          category: category,
          date: Date(),
          replyCount: 0,
          likes: 0,
          shares: 0
        });
    if(data.acknowledged === true){
      const incrementCommentCount =  await commentCategory.updateOne({ id: req.body.postId },{
        $inc:{ commentCount: 1 }
      });
      console.log(incrementCommentCount)
    }
    
    const addedComment = await comments.findOne({ 
      commenterId: req.body.commenterId,
      commentId: 'c'+id.value.count},
      {projection:{_id:0}})

      if(data.acknowledged===true) res.json({comment: addedComment});
    
    } catch (e) {
      res.json("error");
      console.log(e);
    } finally {
      await client.close();
    }
   }

   
async function saveCommentWithImages(id, commentBody, imagesSrc){
  const client = new MongoClient(uri);
  await client.connect();

try { 

  const db = client.db("microblog");
  const commentCategory = db.collection(category);
  const comments = db.collection(category+'Comments');

  const data =   await comments.insertOne({
    postId: postId,
    commenter: commenter,
    commenterId: commenterId,
    commentId: 'c'+id,
    comment: `<div class='ql-container ql-snow richTextContainer' >
               <div class='ql-editor richText'>
                ${ commentBody }
               </div>
              </div>`,
    category: category,
    date: Date(),
    imagesSrc: imagesSrc,
    replyCount: 0,
    likes: 0,
    shares: 0
  });
if(data.acknowledged === true){
const incrementCommentCount =  await commentCategory.updateOne({ id: req.body.postId },{
  $inc:{ commentCount: 1 }
});
console.log(incrementCommentCount)
}

const addedComment = await comments.findOne({ 
commenterId: commenterId,
commentId: 'c'+id},
{projection:{_id:0}})

if(data.acknowledged===true){
  res.json({comment: addedComment});
}


} catch (e) {
 res.json("error");
 console.log(e);
} finally {
 await client.close();
}
}

  } else res.json("chai");
}