import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config()
const app = express();
app.use(cors());
app.use(express.json());

app.get("/" , (req,res)=>{
    res.send("hello world");
})


app.listen(process.env.PORT ,()=>{
    console.log(`server started on ${process.env.PORT}`)
})