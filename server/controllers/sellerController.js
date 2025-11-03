
import jwt from 'jsonwebtoken'
// login seller  /api/seller/login


export const sellerLogin = async(req,res) => {
    try {
        const {email,password} = req.body;
    
    if(password===process.env.SELLER_PASSWORD && email===process.env.SELLER_EMAIL){
        const token = jwt.sign({email},process.env.JWT_SECRET,{expiresIn:'7d'})
        res.cookie('sellerToken',token,{
            httpOnly: true, // Prevent javascript to access cookie
            secure: process.env.NODE_ENV ==='production', // use secure cookie in production
            sameSite: process.env.NODE_ENV ==='production'?'none' : 'strict', // csrf protection
            maxAge: 7*24*60*60*1000 // Cookie expiration response
        });
        return res.json({success:true, message:'Logged In'})  
    }
    else{
        return res.json({success:false, message:'Invalid Credentials'})  
    }
    } catch (error) {
        return res.json({success:false, message:error.message})  
    }
}


//seller is authorized or not  /api/seller/is-auth
export const isSelllerAuth = async (req,res) => {
    try {
        
        return res.json({success:true})
        
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message: error.message})
    }
}


// logout seller api/seller/logout
export const SellerLogout =  async(req,res) => {
    try {
        // option	     meaning
        // httpOnly	     browser JS can’t read cookie (more secure)
        // secure	     cookie only sent over https in production
        // sameSite	     how cookie is shared between sites
        //these lines delete the login token cookie from browser. so user becomes logged out.
        res.clearCookie('sellerToken',{
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