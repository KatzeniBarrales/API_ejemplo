import { UserModel } from '../models/usuario.model.js';
import jsonwebtoken from 'jsonwebtoken';
import message from "../utils/messages.js";
const {messageGeneral} = message;

export const verificarToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return messageGeneral(
      res,
      401,
      false,
      null,
      "No se encontró headers de authorization",
    );
  }
  
  const token = req.headers.authorization.split(" ")[1];
  //se verifica si el token es nulo
  if (!token){
    return messageGeneral(
      res,
      401,
      false,
      null,
      "You are not authorized to access this resource 2"
    );
  }
  
  jsonwebtoken.verify(token,"secreta",async(error,payload)=> {
    //si error es true, si hay error
    if (error) {
      return messageGeneral(
        res,
        401,
        false,
        null,
        "Error en el token",
      );
    }
   
    const { _id } = payload;
    const resp = await UserModel.findById(_id);
    if (!resp){
      return messageGeneral(
        res,
        401,
        false,
        null,
        "Error en el Id"
      );
    }
    req.userid = _id;
    next();
  });
};
