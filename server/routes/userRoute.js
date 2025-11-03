import express from 'express'
import { isAuth, login, logout, register } from '../controllers/UserController.js';
import authUser from '../middlewares/authUser.js';

const userRouter = express.Router();


// register
userRouter.post('/register',register);

// login
userRouter.post('/login',login);

// authentication     get is used as we want to check is autherized or not
userRouter.get('/is-auth',authUser, isAuth); // authUser is middleware which decode cookies , isAuth gives all info when middleware run is good


//log out k liye
userRouter.get('/logout',authUser, logout); // same logic as above


export default userRouter;