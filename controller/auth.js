import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import User from "../models/User.js"

export const Login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(404).json({msg:"Cannot find User"});
        }
        const match = await bcrypt.compare(password,user.password);
        if(!match) return res.status(400).json({msg:"Invalid Password"});

        // JWT TOKEN
        const token = jwt.sign({id:user._id},process.env.SECREAT_KEY);
        res.status(200).json({user,token})

    } catch (error) {
        res.status(404).json(error.message)
    }
}

export const Register = async(req,res)=>{
    try {
        const {Email,Name,Password} = req.body;
        const salt = await bcrypt.genSalt();
        const hashedPass = await bcrypt.hash(Password,salt);

        const newUser = new User({
                email:Email,
                password:hashedPass,
                name:Name
        });

        await newUser.save();
        res.status(201).json({msg:"Created a New User"})
    } catch (error) {
        res.status(404).json(error.message)
    }
}
