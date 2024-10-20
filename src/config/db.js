import mongoose from "mongoose";

let dbConnection;
// Connect to the mongo database
async function dbConnect() {
    if(!dbConnection){
        // Read connection string from the environment variable
        const mongoDbUrl = process.env['MONGODB_URI']
        dbConnection = mongoose.connect(mongoDbUrl);
        dbConnection.then((res)=>{
            console.log('Connected to DB');
        }).catch(err=>{
            console.log('Failed to connect to MongoDB', err);
        })
    }
    return dbConnection;
}
await dbConnect()
export {dbConnection};