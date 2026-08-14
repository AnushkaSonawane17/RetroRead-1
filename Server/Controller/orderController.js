const Order = require("../Model/orderModel");
const Book = require("../Model/bookModel");

const handleClaimBook = async (req, res) => {
    try {

        const {
            bookId,
            buyerId,
            buyerName,
            buyerEmail,
            buyerPhone,
            deliveryAddress,
            city,
            pincode,
            message
        } = req.body;

        // Find the book being claimed
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({
                Message: "Book not found"
            });
        }

        // Check whether the book is still available
        if (!book.isAvailable) {
            return res.status(400).json({
                Message: "This book is no longer available"
            });
        }

        // Create order
        const order = await Order.create({
            bookId,
            sellerId: book.sellerId,
            buyerId,
            buyerName,
            buyerEmail,
            buyerPhone,
            deliveryAddress,
            city,
            pincode,
            message
        });

        return res.status(201).json({
            Message: "Book claimed successfully",
            order
        });

    } catch (err) {

        return res.status(500).json({
            Message: err.message
        });

    }
};
const handleGetBuyerOrders = async (req, res) => {
    try {
        const { buyerId } = req.params;

        const orders = await Order.find({ buyerId })
            .populate("bookId")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            orders
        });

    } catch (err) {
        return res.status(500).json({
            Message: err.message
        });
    }
};
const handleGetSellerOrders = async (req, res) => {
    try {
        const { sellerId } = req.params;

        const orders = await Order.find({ sellerId })
            .populate("bookId")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            orders
        });

    } catch (err) {
        return res.status(500).json({
            Message: err.message
        });
    }
};
const handleUpdateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        if (!["Completed", "Rejected"].includes(status)) {
            return res.status(400).json({
                Message: "Invalid status"
            });
        }

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({
                Message: "Order not found"
            });
        }

        if (order.status !== "Pending") {
            return res.status(400).json({
                Message: "This order has already been processed"
            });
        }

        order.status = status;

        await order.save();

        return res.status(200).json({
            Message: `Order ${status.toLowerCase()} successfully`,
            order
        });

    } catch (err) {
        return res.status(500).json({
            Message: err.message
        });
    }
};

module.exports = {
    handleClaimBook, handleGetBuyerOrders, handleGetSellerOrders, handleUpdateOrderStatus
};