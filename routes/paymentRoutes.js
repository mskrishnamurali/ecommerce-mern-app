import express from "express";
import { braintreeTokenController, brainTreePaymentController } from "../controllers/paymentController.js";
import { requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default router;