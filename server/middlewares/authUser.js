import jwt from 'jsonwebtoken'

const authUser = async (req,res,next) => {
    const {token} = req.cookies;

    // if token(token is like a secret ID card given to user after login.) is not present 
    if(!token) {
        return res.json({success:false, message: 'Not Autherized.'});
    }

    try {
        const tokenDecode = jwt.verify(token,process.env.JWT_SECRET);

        //check id availability
        if(tokenDecode.id){
            req.userId = tokenDecode.id;
        }else{
            return res.json({success:false, message: 'Not Autherized.'});
        }
        next();
    } catch (error) {
        return res.json({success:false, message:error.message});
    }
}

export default authUser;