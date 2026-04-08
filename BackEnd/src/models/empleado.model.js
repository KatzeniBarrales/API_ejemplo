import mongoose from "mongoose";
const {Schema,model} = mongoose;

const empleadoSchema = new Schema({
    nombres:{ type: String, required: true},
    apellidos:{ type: String, required: true},
    correo:{ type: String, required: true },
    id:{ type: String, required: true },
    tcontrato:{ type: String, required: true },
    jefe:{ type: Schema.ObjectId, ref: "usuario" },
},{
    timestamps:true
}
)
export const EmpleadoModel=model('empleado',empleadoSchema)