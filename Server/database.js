const mongoose=require('mongoose')

const databaseConnection=()=>{
    mongoose.connect('mongodb://anushkadilipsonawane7777_db_user:1aM8GNTGMBGqqtPP@ac-fd98lgw-shard-00-00.ft4tbt8.mongodb.net:27017,ac-fd98lgw-shard-00-01.ft4tbt8.mongodb.net:27017,ac-fd98lgw-shard-00-02.ft4tbt8.mongodb.net:27017/?ssl=true&replicaSet=atlas-n5qgcv-shard-0&authSource=admin&appName=RetroCluster')
    .then(()=>{
        console.log("database connected");
        
    })
    .catch((err)=>{
        console.log(err);
        
    })
}

module.exports=databaseConnection