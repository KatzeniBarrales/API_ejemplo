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
    <div className='container mt-4'>
    <div className='row'>
      <div className='col-md-6 mx-auto'>
        <div className='card'>
          <div className='container text-center'>
            <i className='fas fa-user fa-5x'></i>
          </div>
          <div className='card-header text-center mt-3'>
            <h4>Inicio de sesión del jefeeeeeeeeeeeee!!!</h4>
          </div>{/* card-header text-center mt-3 */}
          <div className='card-body'>
            <form onSubmit={login}>
              <div className='mb-3'>
                <label className='form-label'>Correo:</label>
                <input type="email" name="correo" className='form-control' 
                onChange={(e)=>handleChange(e)} autoFocus required/>
              </div>
              <div className='mb-3'>
                <label className='form-label'>Contraseña:</label>
                <input type="password" name="password" className='form-control' 
                onChange={(e)=>handleChange(e)} required/>
              </div>{/* mb-3 */}
              <button type="submit" className='form-control btn btn-primary'>
              Login
            </button>
            </form>
          </div>{/* card-body */}
        </div>{/* card */}
      </div>{/* col-md-6 mx-auto */}
    </div>{/* row */}
  </div>//container mt-4
  )
}

