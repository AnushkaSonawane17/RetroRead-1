const user = require("../Model/userModel");

// ===============================
// REGISTER / ADD USER
// ===============================
const handleAddUserController = async (req, res) => {
    try {

        const data = req.body;

        const existingUser = await user.findOne({
            userEmail: data.userEmail
        });

        if (existingUser) {
            return res.status(409).json({
                Message: "Your account already exists, try to login"
            });
        }

        const newUser = await user.create(data);

        return res.status(200).json({
            Message: "User added",
            userId: newUser._id,
            userEmail: newUser.userEmail,
            userName: newUser.userName
        });

    } catch (err) {

        return res.status(500).json({
            Message: err.message
        });

    }
};


// ===============================
// LOGIN
// ===============================
const handleVerifyUserController = async (req, res) => {
    try {

        const { userEmail, userPassword } = req.body;

        const userdata = await user.findOne({
            userEmail
        });

        if (!userdata) {
            return res.status(404).json({
                Message: "User not found"
            });
        }

        if (userdata.userPassword !== userPassword) {
            return res.status(401).json({
                Message: "Wrong password"
            });
        }

        return res.status(200).json({
            Message: "Login Successful",
            userId: userdata._id.toString(),
            userEmail: userdata.userEmail,
            userName: userdata.userName
        });

    } catch (err) {

        return res.status(500).json({
            Message: err.message
        });

    }
};


// ===============================
// CHECK WHETHER USER EXISTS
// ===============================
const handleCheckUserController = async (req, res) => {
    try {

        const { userEmail } = req.body;

        if (!userEmail) {
            return res.status(400).json({
                Message: "Email is required"
            });
        }

        const userdata = await user.findOne({
            userEmail: userEmail
        });

        if (!userdata) {
            return res.status(404).json({
                Message: "No account found with this email"
            });
        }

        return res.status(200).json({
            Message: "User exists",
            userId: userdata._id.toString(),
            userEmail: userdata.userEmail,
            userName: userdata.userName
        });

    } catch (err) {

        return res.status(500).json({
            Message: err.message
        });

    }
};


module.exports = {
    handleAddUserController,
    handleVerifyUserController,
    handleCheckUserController
};