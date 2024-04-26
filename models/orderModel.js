import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    products: [{
        type: mongoose.Types.ObjectId,
        ref: 'Products',
    }],
    payment: {}, // Define payment schema based on your requirements
    buyer: {
        type: mongoose.ObjectId,
        ref: 'user',
    },
    status: {
        type: String,
        default: 'Not Process',
        enum: ["Not Process", "Processing", "Shipping", "Delivered", "Cancel"]
    }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
