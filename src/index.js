import dotenv from "dotenv"
import connectMongoDB from "./db/index.js";

dotenv.config({
    path:'./env'
})

connectMongoDB()