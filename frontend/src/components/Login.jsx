import React from 'react'
import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate();
    const {loginUser} = useUser();
    const [dataUser, setDataUser] = useState({
        correo:"",
        password:""
    });
    const handleChange=(e)=>{
        setDataUser({...dataUser,[e.target.name]:e.target.value});
    }
    const login=(e)=>{
        e.preventDefault();
        loginUser(dataUser,navigate);
    }
    
  return (
    /* Solo añadimos el estilo de fondo gris y min-height al div principal */
    <div style={{ backgroundColor: '#bbc0c7', minHeight: '100vh', paddingTop: '50px' }}>
      <div className='container mt-4'>
        <div className='row'>
          <div className='col-md-6 mx-auto'>
            <div className='card'>
              <div className='container text-center'>
                <i className='fas fa-user fa-5x'></i>
              </div>
              <div className='card-header text-center mt-3'>
                <h4>Inicio de sesión</h4>
              </div>
              <div className='card-body'>
                <form onSubmit={login}>
                  <div className='mb-3'>
                    <label className='form-label'>Correo:</label>
                    <input type="email" name="correo" className='form-control' 
                    onChange={(e)=>handleChange(e)} placeholder= "Ingrese su correo" autoFocus required/>
                  </div>
                  <div className='mb-3'>
                    <label className='form-label'>Contraseña:</label>
                    <input type="password" name="password" className='form-control' 
                    onChange={(e)=>handleChange(e)} placeholder= "Ingrese su contraseña" required/>
                  </div>
                  <button type="submit" className='form-control btn btn-primary'>
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}