const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },

    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    buyerName: {
        type: String,
        required: true
    },

    buyerEmail: {
        type: String,
        required: true
    },

    buyerPhone: {
        type: String,
        required: true
    },

    deliveryAddress: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    pincode: {
        type: String,
        required: true
    },

    message: {
        type: String
    },

    status: {
        type: String,
        enum: ["Pending", "Completed", "Rejected"],
        default: "Pending"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Order", orderSchema);