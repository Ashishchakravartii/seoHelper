const mongoose = require( "mongoose");

const connectDb= async()=>{
    try {
       const connectionInstance = await mongoose.connect(
         `mongodb://127.0.0.1:27017/ikounselorImage`
       );
       console.log(`Database successfully connected at ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log("Error connecting DB",error);
        process.exit(1);
        
    }

}

module.exports = connectDb;