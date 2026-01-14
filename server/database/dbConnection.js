import mongoose  from "mongoose";

export const connection=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"MAHAKAL"
    }).then(()=>{
        console.log("Connected to data base ")
    }).catch((err) =>{
        console.log(`something went wrong ${err}`)
    })

}