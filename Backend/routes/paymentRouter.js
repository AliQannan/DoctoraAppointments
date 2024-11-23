import express from 'express';
import {paymentPaypal} from '../controllers/paymentController.js';
const paymentRouter = express.Router();

paymentRouter.post('/create-order', paymentPaypal);



export default paymentRouter;