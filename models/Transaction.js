import mongoose from "mongoose"

const TransactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
      },
      type: {
        type: String,
        enum: ['credit', 'debit'],
        required: true
      },
      description: {
        type: String,
        required: true
      },
      userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
      },
      categoty:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
      }
},{timestamps:true});

export const Transaction = mongoose.model('Transaction',TransactionSchema);
