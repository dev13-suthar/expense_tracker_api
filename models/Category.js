import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    transactions:[{type:mongoose.Schema.Types.ObjectId, ref:'Transaction'}]
});

const Category = mongoose.model('Category',CategorySchema);
export default Category; 