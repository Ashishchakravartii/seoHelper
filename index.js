require("dotenv").config({path:"./env"})
const connectDb = require("./db/index.js")
const { app } = require( "./app.js");


connectDb()
  .then(() => {
    app.listen( 8000, () => {
      console.log(`App connected and running at 8000`);
    });
  })
  .catch((err) => {
    console.log("App can not be connected", err);
  });














  
// (async()=>{
//     try {
//         mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
//         app.on("error",(error)=>{
//             console.log("Can't connect to APP", error);
//             throw error;
//         })
//         app.listen(process.env.PORT,()=>{
//             console.log(`App is listening on port ${process.env.PORT}`);

//         })

//     } catch (error) {
//         console.log("ERRR:",error);
//         throw error

//     }
// })()
