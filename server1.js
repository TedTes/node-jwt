require("dotenv").config();
const express=require('express');
const jwt=require('jsonwebtoken');
const app=express();

app.use(express.json());
const posts=[{
    name:"tedi",
    age:29
},
{
name:"James",
age:20
}
]
app.post('/login',authenticateToken,(req,res)=>{
   res.send(posts.filter(post=>post.name===req.user.name)) ;
   const username=req.body.username;
   const user={name:username}

   const token= jwt.sign(user,process.env.ACCESS_TOKEN);
  res.json({token:token});
});

function authenticateToken(req,res,next){
const authToken=req.header['authentication'];
const token=authToken && authToken.split(' ')[1];
jwt.verify(token,process.env.ACCESS_TOKEN,(err,user)=>{
    if(err)return res.sendStatus(403);
    req.user=user;
    next();
})
}

app.get('/login',(req,res)=>{
console.log("hello user");
})

app.listen(3000,()=>{
    console.log("server listening on port 3000");
})
