import mongoose from "mongoose"
import bodyParser from "body-parser"
import morgan from "morgan"
import helemt from "helmet"
import express from "express"
import cors from "cors";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.js"
import statsRoutes from "./routes/stats.js"
import transactionRoutes from "./routes/transaction.js"
import corsOptions from "./configs/Corsoptions.js"


// Configs
dotenv.config();
const app = express();
app.use(express.json());
app.use(helemt());
app.use(helemt.crossOriginResourcePolicy({policy:'cross-origin'}));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors(corsOptions));


// Routesss;

app.get("/",(req,res)=>res.send("connect"))

app.use('/auth',authRoutes)
app.use('/transactions',transactionRoutes);
app.use('/stats',statsRoutes);
// Mongo Connection

const PORT = process.env.PORT || 6008
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT,()=>console.log(`Server Port:${PORT}`))
})
.catch((err)=>console.log(err))
