
import mongoose from 'mongoose';
mongoose.set('strictQuery', false);

const URI ="mongodb://127.0.0.1:27017/prueba";

const connectDB = async()=>{
    try{
        const db = await mongoose.connect(URI)
        console.log("Base de datos conectada: ",db.connection.name);
    }catch(error){
        console.log("Error: ",error.message)
    }
}
export default connectDB;
