import { Transaction } from "../models/Transaction.js";
import mongoose from "mongoose"


export const getStats = async(req,res)=>{
    const {userId} = req.params;
    try {
        
const userTransactions = await Transaction.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: '$categoty',
        count: { $sum: 1 }
      }
    },
    {
      $lookup: {
        from: 'categories',
        localField: '_id',
        foreignField: '_id',
        as: 'category'
      }
    },
    {
      $unwind: '$category'
    },
    {
      $project: {
        label: '$category.name',
        count: 1
      }
    }
  ]);
          res.status(200).json(userTransactions)
    } catch (error) {
        res.status(404).json({msg:error.message})
    }
}
