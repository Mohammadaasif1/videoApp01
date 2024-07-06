import dotenv from "dotenv"
import connectMongoDB from "./db/index.js";
import {app} from "./app.js" 

dotenv.config({
    path:'./env'
})

connectMongoDB().then(
    ()=>{
        app.listen(process.env.PORT || 4000, ()=>{
            console.log(`server is listing on Port:${process.env.PORT}`);
        })
    }
).catch((err)=>{
    console.error("Mongo Db is Failed to connect", err);
})
