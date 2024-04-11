import Category from "../models/Category.js";
import { Transaction } from "../models/Transaction.js";
import User from "../models/User.js";

// Get ALL Transaction

export const getUsersAllTransaction = async(req,res)=>{
    const {userId} = req.params;
    const {sort} = req.query;
    let sortOrder = 1;
    if(sort==="desc"){
        sortOrder = -1
    }
    try {
        const transaction = await Transaction.find({userId:userId}).sort({createdAt:sortOrder});
        res.status(200).json(transaction);
    } catch (error) {
        res.status(404).json({msg:error.message})
    }
}

export const getRecentExpenses = async(req,res)=>{
    const {userId} = req.params;
    try {
        const Transactions = await Transaction.find({userId:userId,type:'debit'});
        const formattedTransaction = Transactions.sort((a,b)=>b.createdAt-a.createdAt);
        const recentTransactions = formattedTransaction.slice(0,2);
        res.status(200).json(recentTransactions);
    } catch (error) {
        res.status(404).json({msg:error.message})
    }
}

export const AddMoneyInWallet = async(req,res)=>{
        const {userId} = req.params;
        const {description,amount,type} = req.body;
        try{

            if(type==='credit'){
            const NewTransaction = new Transaction({
                amount:Number(amount),
                description:description,
                type:type,
                userId:userId
            });
            await NewTransaction.save();
            const user = await User.findById(userId);
            const upDateAmount = await user.amount + NewTransaction.amount;
            user.amount = upDateAmount;
            user.transactions.push(NewTransaction._id);
            await user.save();

            res.status(200).json({user,NewTransaction});
        }else{
            res.status(400).json({msg:"only credit allowed you might have selected other"})
        }
    } catch (error) {
        res.status(404).json({msg:error.message})
    }
}

// Spend Money

export const SpendMoney = async(req,res)=>{
    try {
        const {userId} = req.params;
        const {amount,description,type,category} = req.body;
        const foundUser = await User.findById(userId);
        if(type==='debit'){
            let newCategory = await Category.findOne({name:category});
            if(!newCategory){
                newCategory = new Category({
                    name:category,
                    transactions:[]
                })
                await newCategory.save();
            }

            if(foundUser.amount>amount){
                const newTransaction = new Transaction({
                    amount:amount,
                    description:description,
                    type:type,
                    userId:userId,
                    categoty:newCategory._id
                });
                await newTransaction.save();
                newCategory.transactions.push(newTransaction._id)
                await newCategory.save();
                const updatedAmount = foundUser.amount - newTransaction.amount;
                foundUser.amount = updatedAmount;
                foundUser.transactions.push(newTransaction._id);
                await foundUser.save();
                res.status(200).json({foundUser,newTransaction});
            }else{
                throw new Error("There should be atlest 100 rupees in wallet");
            }
        }else{
            res.status(400).json({msg:"only debit allowed you might have selected other"})
        }

    } catch (error) {
        res.status(404).json({msg:error.message})
    }
}

// How Much Income tillnow

export const checkInCome = async(req,res)=>{
    try {
        const {userId} = req.params;
        const IncomingMoney = await Transaction.find({userId:userId,type:'credit'});
        const totalAmount = IncomingMoney.reduce((total, transaction) => total + transaction.amount, 0);
        res.status(200).json({Total:totalAmount})

    } catch (error) {
        res.status(404).json({msg:error.message})
    }
}

export const checkExpense = async(req,res)=>{
    try {
        const {userId} = req.params;
        const ExpenseMoney = await Transaction.find({userId:userId,type:'debit'});
        const toalAmount = ExpenseMoney.reduce((total,transaction)=>total+transaction.amount,0);
        res.status(200).json({amount:toalAmount})
    } catch (error) {
        res.status(404).json({msg:error.message})
    }
}

