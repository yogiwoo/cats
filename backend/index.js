const express=require('express');
const app=express();
const axios=require('axios')
const port =4006
const cors=require('cors')

app.use(cors()); // Allow all origins (Not recommended for production)

// OR allow specific origin
app.use(cors({
  origin: "*", // Replace with your frontend URL
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));
app.get("/",(req,res)=>{
    res.send("welcome to cat api")
})

app.get("/getCat",async (req,res)=>{
    const {page,limit,breedid}=req.query
    console.log('===========',breedid)
    const cats=await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedid}&page=${page}&limit=${limit}`)
    
    res.json({msg:"cats",data:cats.data})
})
app.get('/getBreeds',async (req,res)=>{
    console.log("uthis one")
    const brd=await axios.get(`https://api.thecatapi.com/v1/breeds`)
    console.log(brd)
    res.json({msg:"cats",data:brd.data})
})
app.listen(port,()=>{
    console.log(`app is running at ${port}`)
})