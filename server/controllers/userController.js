import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// function to register a user /api/user/register



export const register = async (req,res) => {
    try{
        const {name, email, password} = req.body;
        if(!name || !email || !password) {
            return res.send({success:false, message:"Misssing Details"})
        }

        // we check by email
        const existingUser = await User.findOne({email})
        if(existingUser)  return res.send({success:false, message:"User already exists"})
        const hashedPassword = await bcrypt.hash(password,10)

        const user = await User.create({name,email,password:hashedPassword})

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});

        res.cookie('token',token,{
            httpOnly: true, // Prevent javascript to access cookie
            secure: process.env.NODE_ENV ==='production', // use secure cookie in production
            sameSite: process.env.NODE_ENV ==='production'?'none' : 'strict', // csrf protection
            maxAge: 7*24*60*60*1000 // Cookie expiration response
        })  
        return res.json({success:true, user: {email:user.email, name:user.name} })

    } catch(error) {
        console.log(error.message);
        res.json({success:false, message:error.message});
    }
}


export const login = async (req,res) => {
    try {
        const {email, password} =req.body;
        if(!email || !password){
            return res.json({success:false,message:'Email and password are required.'})
        }
        const user = await User.findOne({email});

        // if email do not exist 
        if(!user){
            return res.json({success:false,message:'Invalid email or password.'})
        }

        // Check password is matching or not 
        const isMatch = await bcrypt.compare(password,user.password);


        // if not matching
        if(!isMatch) {
            return res.json({success:false,message:'Invalid email or password.'})
        }

        // if everything is right -- same as above
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});

        res.cookie('token',token,{
            httpOnly: true, // Prevent javascript to access cookie
            secure: process.env.NODE_ENV ==='production', // use secure cookie in production
            sameSite: process.env.NODE_ENV ==='production'?'none' : 'strict', // csrf protection
            maxAge: 7*24*60*60*1000 // Cookie expiration response
        })  
        return res.json({success:true, user: {email:user.email, name:user.name} })

    } catch (error) {
        console.log(error.message);
        res.json({success:false, message: error.message})
    }
}


// check whether user is authenticated or not /api/user/is-auth
export const isAuth = async (req,res) => {
    try {
        const userId = req.userId; // ← NEW CODE (reading from req.userId set by middleware)
        
        if (!userId) {
            return res.json({success: false, message: "Not authenticated"});
        }
        
        const user = await User.findById(userId).select("-password");
        
        if (!user) {
            return res.json({success: false, message: "User not found"});
        }
        
        return res.json({success:true, user})
        
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message: error.message})
    }
}


// Logout User :  /api/user/logout  ----try code same as register cookie

export const logout =  async(req,res) => {
    try {
        // option	     meaning
        // httpOnly	     browser JS can’t read cookie (more secure)
        // secure	     cookie only sent over https in production
        // sameSite	     how cookie is shared between sites
        //these lines delete the login token cookie from browser. so user becomes logged out.
        res.clearCookie('token',{
            httpOnly: true,
            secure: process.env.NODE_ENV ==='production', 
            sameSite: process.env.NODE_ENV ==='production'?'none' : 'strict',
        })
        return res.json({success:true, message: 'Logged Out.'})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message: error.message})
    }
}