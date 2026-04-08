import { EmpleadoModel } from "../models/empleado.model.js";
import message from '../utils/messages.js';
const {messageGeneral} = message;

const empleadoCtrl={};

empleadoCtrl.createEmpleado= async(req,res)=>{
    try{
        const data= req.body;
        const encontrado = await EmpleadoModel.findOne({correo:data.correo});
        if(encontrado){
            return messageGeneral(res,400,false,"","El correo ya existe!!!");
        }
        const resp = await EmpleadoModel.create({...data,jefe:req.userid});
        messageGeneral(res,201,true,resp,"Empleado creado!!!");
    }catch (error){
        messageGeneral(res,500,false,"",error.message);
    }
}

empleadoCtrl.listAllEmpleados=async(req,res)=>{
  try {
    const resp= await EmpleadoModel.find();
    messageGeneral(res,200,true,resp,"Listado de empleados");
  } catch (error) {
    messageGeneral(res,500,false,"",error.message);
  }
}

empleadoCtrl.listById = async(req,res)=>{
    try{
        const {id} = req.params;
        const resp = await EmpleadoModel.findById(id);
        if(!resp){
            return messageGeneral(res,404,false,"","Empleado no encontrado!!!");
        }
        messageGeneral(res,200,true,resp,"");
    }catch (error){
        messageGeneral(res,500,false,"",error.message);
    }
}

empleadoCtrl.listEmployeeBoss = async(req,res) =>{
  try {
    const resp = await EmpleadoModel.find({ jefe:req.userid}).populate({
      path:"jefe",
      select:"-password"
    })
    messageGeneral(res,200,true,resp,"");
  } catch (error) {
    messageGeneral(res,500,false,"",error.message);
  }
};

empleadoCtrl.deleteEmpleado = async(req,res)=>{
  try{
    const {id} = req.params;
    const resp = await EmpleadoModel.findById(id);
    if(!resp){
      return messageGeneral(res,404,false,"","Empleado no encontrado!!!");
    }
    await resp.deleteOne();
    messageGeneral(res,200,true,"","Empleado eliminado!!!");
  }catch(error){
    messageGeneral(res,500,false,"",error.message);
  }
}

empleadoCtrl.updateEmpleado = async(req,res)=>{
  try{
    const {id} = req.params;
    const resp = await EmpleadoModel.findById(id);
    if(!resp){
      return messageGeneral(res,404,false,"","Empleado no encontrado!!!");
    }
    await resp.updateOne(req.body);
    messageGeneral(res,200,true,"","Empleado actualizado!!!");
  }catch(error){
    messageGeneral(res,500,false,"",error.message);
  }
}

empleadoCtrl.searchEmployee = async(req,res) =>{
  try {
    //buscar por nombres
    const {nombres} = req.params;
    const resp = await EmpleadoModel.find({
      nombres:{$regex: ".*" + nombres + ".*"},
      jefe: req.userid,
    });
    messageGeneral(res,200,true,resp,"");
  } catch (error) {
    messageGeneral(res,500,false,"",error.message);
  }
};

export default empleadoCtrl;