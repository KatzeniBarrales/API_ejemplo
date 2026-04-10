import { UserModel } from "../models/usuario.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import message from "../utils/messages.js";

const { messageGeneral } = message;

const userCtrl = {};

userCtrl.register = async (req, res) => {
  try {
    const data = req.body;

    const resp = await UserModel.findOne({ correo: data.correo });
    if (resp) {
      return messageGeneral(res, 400, false, "", "El correo ya existe!!!");
    }

    data.password = await bcrypt.hash(data.password, 10);
    const newUser = await UserModel.create(data);
    const token = jwt.sign({ _id: newUser._id }, "secreta");

    // CORRECCIÓN AQUÍ: Mapeamos los campos para que el Frontend los entienda
    const dataResponse = {
      token,
      nombre: newUser.name, // Aseguramos que se llame 'nombre'
      nivel: newUser.nivel.toString(), // Aseguramos que sea String
      _id: newUser._id
    };

    messageGeneral(res, 201, true, dataResponse, "El usuario se creó correctamente!!!");
  } catch (error) {
    messageGeneral(res, 500, false, "", error.message);
  }
}

userCtrl.login = async (req, res) => {
  try {
    const data = req.body;
    const resp = await UserModel.findOne({ correo: data.correo });
    
    if (!resp) {
      return messageGeneral(res, 400, false, "", "El correo no existe");
    }

    const match = await bcrypt.compare(data.password, resp.password);
    if (match) {
      const token = jwt.sign({ _id: resp._id }, "secreta");

      // CORRECCIÓN AQUÍ: Mapeamos la respuesta
      const dataResponse = {
        token,
        nombre: resp.name, // Frontend espera 'nombre'
        nivel: resp.nivel.toString(), // Frontend espera 'nivel' como String
        _id: resp._id
      };

      return messageGeneral(res, 201, true, dataResponse, "Bienvenido!!!");
    }

    messageGeneral(res, 400, false, "", "La contraseña es incorrecta!!!");
  } catch (error) {
    messageGeneral(res, 500, false, "", error.message);
  }
}

userCtrl.listAllUsers = async (req, res) => {
  try {
    const resp = await UserModel.find().select("-password");
    messageGeneral(res, 200, true, resp, "Lista de usuarios");
  } catch (error) {
    messageGeneral(res, 500, false, "", error.message);
  }
}

export default userCtrl;