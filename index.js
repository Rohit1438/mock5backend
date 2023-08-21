const express=require("express")
const mongoose=require("mongoose")

const cors = require("cors"); 
const userRouter = require("./routes/userRoutes");
const doctorRouter = require("./routes/postRoutes");
const app = express();
app.use(express.json());
app.use(cors());
const connection=async()=>{
try{
    await mongoose.connect("mongodb+srv://Rohit2002:20022003@cluster0.riuail2.mongodb.net/mock5?retryWrites=true&w=majority")

console.log("Connected to mongoose")
}catch(err){
    console.log(err)
}
}
app.get("/",(req,res)=>{
    res.send("welcome to homepage of the backend server")

})
app.use("/users",userRouter)
app.use("/appointments",doctorRouter)
app.listen(8080,async()=>{
console.log("server is connecting")
await connection()
console.log("connected to backend")

})

