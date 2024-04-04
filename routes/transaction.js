import express from "express"
import { AddMoneyInWallet,  checkExpense,  checkInCome,  getRecentExpenses,  getUsersAllTransaction,  SpendMoney } from "../controller/transaction.js";
// import verifyJWT from "../../middleware/auth.mjs";


const router = express.Router();

router.get('/all/:userId',getUsersAllTransaction);
router.get('/recentexpenses/:userId',getRecentExpenses)
router.post('/new/:userId',AddMoneyInWallet);
router.post('/spend/:userId',SpendMoney);
router.get('/checkIncome/:userId',checkInCome);
router.get('/checkExpense/:userId',checkExpense);

export default router;

