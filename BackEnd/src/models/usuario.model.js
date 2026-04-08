import mongoose from "mongoose";
const {Schema,model} = mongoose;

const userSchema = new Schema({
    nombre:{
        type: String,
        required: true
    },
    correo:{
        type: String,
        required: true
    },
    nivel:{
        type: Number,
        required: true
    },
    password:{
        type: String,
        required: true
    },
},{
    timestamps:true
}
)
export const UserModel=model('usuario',userSchema)