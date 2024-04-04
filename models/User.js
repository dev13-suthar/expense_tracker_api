import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true,
        default:0,
    },
    password:{
        type:String,
        required:true
    },
    transactions:[{type:mongoose.Schema.Types.ObjectId, ref:'Transaction'}]
},{timestamps:true});

const User = mongoose.model('user',UserSchema);
export default User;