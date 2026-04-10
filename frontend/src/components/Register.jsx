import React from 'react'
import {useUser} from '../context/UserContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const {registerUser} = useUser();
    const [dataUser, setDataUser] = useState({correo:"", password:"", name:"", nivel:""});
    const handleChange=(e)=>{
      setDataUser({...dataUser,[e.target.name]:e.target.value});
    }
    const register=(e)=>{
      e.preventDefault();
      registerUser(dataUser,navigate);
    }
  return (
    <div>
<div className='container mt-4'>
      <div className='row'>
        <div className='col-md-6 mx-auto'>
          <div className='card'>
            <div className='container text-center'>
              <i className='fas fa-user-plus fa-5x'></i>
            </div>
            <div className='card-header text-center mt-3'>
              <h4>REGISTRO DE USUARIOS</h4> 
            </div>{/* card-header text-center mt-3 */}
            <div className='card-body'>
              <form onSubmit={register}>
              <div className='mb-3'>
                  <label className='form-label'>Nombre:</label>
                  <input type="text" name="name" className='form-control' autoFocus
                  onChange={(e)=>handleChange(e)} required/>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Correo:</label>
                  <input type="email" name="correo" className='form-control'
                  onChange={(e)=>handleChange(e)} required/>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Nivel:</label>
                  <select name="nivel" className='form-control' 
                  onChange={handleChange} required>
                    <option value="">Selecciona un nivel</option>
                    <option value="1">Nivel 1 [Administrador]</option>
                    <option value="2">Nivel 2 [Empleado]</option>
                  </select>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Contraseña:</label>
                  <input type="password" name="password" className='form-control'
                  onChange={(e)=>handleChange(e)} required/>
                </div>{/* mb-3 */}
                <button type="submit" className='form-control btn btn-primary'>
                Registrar
              </button>
              </form>
            </div>{/* card-body */}
          </div>{/* card */}
        </div>{/* col-md-6 mx-auto */}
      </div>{/* row */}
    </div>{/*container mt-4*/}</div>
  )
}

export default Register