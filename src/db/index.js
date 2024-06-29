import mongoose from "mongoose";
import {db_name} from "../constants.js"

const connectMongoDB = async function(){
    try {
       const connnectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${db_name}`)
       console.log(`\nMongoDb is connected !!! DB Host:${connnectionInstance.connection.host}`)
    } catch (error) {
        console.error("mongoDb is Failed to connect", error)
        process.exit(1)
    }
}

export default connectMongoDB