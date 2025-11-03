import express from 'express'
import { isSelllerAuth, sellerLogin, SellerLogout } from '../controllers/sellerController.js'; // Add .js
import authSeller from '../middlewares/authSeller.js'; // Add .js

const sellerRouter = express.Router();

sellerRouter.post('/login', sellerLogin);
sellerRouter.get('/is-auth', authSeller, isSelllerAuth);
sellerRouter.get('/logout', SellerLogout); 

export default sellerRouter;