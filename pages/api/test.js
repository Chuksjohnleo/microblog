const https = require('https');

export default function handler(req,res){
    if(req.method === 'POST'){
       https.get(req.body.url, response=>{
        // response.setEncoding("utf8")
        let data = '';
        response.on('data',chunk=>{
            data+=chunk;
        })
        response.on('end', ()=>{
            res.json('ok');
            console.log(data,data.length)
        })
        console.log('data:',data)
       }).on('error', err=>{
        console.log(err);
        res.json('error in https')
       });
     
    }else{
        console.log('no');
        res.json('chai')
    }
}