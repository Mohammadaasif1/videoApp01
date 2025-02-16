import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new Schema({

    username:{
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        index: true
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    },
    fullname:{
        type: String,
        required: true,
        index: true,
        trim: true
    },
    avatar: {
        type: String,
        required : true
    },
    coverImage: {
        type : String,
    },
    watchHistory: [
        {
            type : Schema.Types.ObjectId,
            ref : 'Video'
        }
    ],
    password : {
        type : String,
        required: true,
        minlength: [6, "minimum 6 character are required"]
    },
    refreshToken : {
        type : String
    }
}, {
    timestamps: true
})

userSchema.pre('save', async function(next){

    if(!this.isModified('password')) return next()
    
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generatedAccessToken = function(){
    return jwt.sign({
        _id : this._id,
        username: this.username,
        email: this.email,
        fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generatedRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)