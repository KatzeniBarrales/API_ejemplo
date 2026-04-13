import React, { useState } from 'react'
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const { registerUser } = useUser();
    
    // El nivel se inicializa automáticamente en "1"
    const [dataUser, setDataUser] = useState({
        correo: "", 
        password: "", 
        name: "", 
        nivel: "1" 
    });

    const handleChange = (e) => {
        setDataUser({ ...dataUser, [e.target.name]: e.target.value });
    }

    const register = (e) => {
        e.preventDefault();
        registerUser(dataUser, navigate);
    }

    return (
        <div className="container-fluid" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="card shadow-sm" style={{ width: '450px', border: 'none', borderRadius: '8px', backgroundColor: '#fff' }}>
                <div className="p-4">
                    
                    {/* ICONO Y TÍTULO ESTILO MINIMALISTA */}
                    <div className="text-center mb-4">
                        <i className="fas fa-user-plus mb-3" style={{ fontSize: '70px', color: '#333' }}></i>
                        <h4 className="text-uppercase" style={{ color: '#555', letterSpacing: '3px', fontWeight: '300' }}>
                            Registro de Usuario
                        </h4>
                    </div>

                    <form onSubmit={register}>
                        {/* NOMBRE */}
                        <div className="mb-4">
                            <label className="form-label" style={{ color: '#999', fontSize: '14px' }}>Nombre:</label>
                            <input 
                                type="text" 
                                name="name" 
                                className="form-control" 
                                style={{ backgroundColor: '#f2f2f2', border: 'none', height: '45px' }}
                                autoFocus
                                onChange={handleChange} 
                                required 
                            />
                        </div>

                        {/* CORREO */}
                        <div className="mb-4">
                            <label className="form-label" style={{ color: '#999', fontSize: '14px' }}>Correo:</label>
                            <input 
                                type="email" 
                                name="correo" 
                                className="form-control" 
                                style={{ backgroundColor: '#f2f2f2', border: 'none', height: '45px' }}
                                onChange={handleChange} 
                                required 
                            />
                        </div>

                        {/* CONTRASEÑA */}
                        <div className="mb-5">
                            <label className="form-label" style={{ color: '#999', fontSize: '14px' }}>Contraseña:</label>
                            <input 
                                type="password" 
                                name="password" 
                                className="form-control" 
                                style={{ backgroundColor: '#f2f2f2', border: 'none', height: '45px' }}
                                onChange={handleChange} 
                                required 
                            />
                        </div>

                        {/* BOTÓN NEGRO SÓLIDO */}
                        <button 
                            type="submit" 
                            className="btn btn-dark w-100 py-3 text-uppercase" 
                            style={{ backgroundColor: '#1a1a1a', border: 'none', letterSpacing: '2px', fontWeight: 'bold' }}
                        >
                            Registrar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register