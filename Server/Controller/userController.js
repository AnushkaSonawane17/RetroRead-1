const user= require("../Model/userModel");
// const handleAddUserController=async(req,res)=>{
//     try{
//         const data=req.body
//         console.log(data);

//          let userdata=await user.insertOne(data);
//          if(userdata.userEmail==userEmail){
//             return res.status(200).json({Message:"Your account already exists, try to login in"})
//          }else{
//         return res.status(200).json({Message:"User added"})
//          }
//     }catch(err){
//        return res.status(500).json({Message:err.message})
//     }
// }

const handleAddUserController = async (req, res) => {
    try {
        const data = req.body;

        const existingUser = await user.findOne({userEmail: data.userEmail});

        if (existingUser) {
            return res.status(409).json({Message: "Your account already exists, try to login"});
        }

        await user.insertOne(data);

        return res.status(200).json({Message: "User added"});

    } catch (err) {
        return res.status(500).json({Message: err.message});
    }
};

const handleVerifyUserController= async(req,res)=>{
    try{
        const {userEmail,userPassword}=req.body
        let userdata= await user.findOne({userEmail})
         if(!userdata){
            return res.status(404).json({Message:"User not found"})
         }else{
            if(userdata.userPassword==userPassword){
                return res.status(200).json({Message:"Login Successful"})
            }else{
                return res.status(401).json({Message:"Wrong password"})
            }
         }
    }catch(err){
        return res.status(500).json({Message:err.message})
        
    }
}
module.exports={handleAddUserController, handleVerifyUserController}