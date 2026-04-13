import React, { useState } from 'react'
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const { registerUser } = useUser();
    
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
        <div style={{ backgroundColor: '#bbc0c7', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '50px', paddingBottom: '50px' }}>
            <div className="card shadow-sm" style={{ width: '450px', border: 'none', borderRadius: '8px', backgroundColor: '#fff' }}>
                <div className="p-4">
                    
                    <div className="text-center mb-4">
                        <i className="fas fa-user-plus mb-3" style={{ fontSize: '70px', color: '#333' }}></i>
                        <h4 className="text-uppercase" style={{ color: '#555', letterSpacing: '3px', fontWeight: '300' }}>
                            Registro de Jefe
                        </h4>
                    </div>

                    <form onSubmit={register}>
                        {/* NOMBRE */}
                        <div className="mb-4">
                            <label className="form-label" style={{ color: '#000000', fontSize: '14px' }}>Nombre:</label>
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
                            <label className="form-label" style={{ color: '#000000', fontSize: '14px' }}>Correo:</label>
                            <input 
                                type="email" 
                                name="correo" 
                                className="form-control" 
                                style={{ backgroundColor: '#f2f2f2', border: 'none', height: '45px' }}
                                onChange={handleChange} 
                                required 
                            />
                        </div>

                        {/* NIVEL (MOSTRAR SIN EDITAR) */}
                        <div className="mb-4">
                            <label className="form-label" style={{ color: '#000000', fontSize: '14px' }}>Nivel:</label>
                            <input 
                                type="text" 
                                name="nivel" 
                                className="form-control" 
                                value="1 "
                                readOnly
                                style={{ backgroundColor: '#e9ecef', border: 'none', height: '45px', color: '#6c757d', cursor: 'not-allowed' }}
                            />
                        </div>

                        {/* CONTRASEÑA */}
                        <div className="mb-5">
                            <label className="form-label" style={{ color: '#000000', fontSize: '14px' }}>Contraseña:</label>
                            <input 
                                type="password" 
                                name="password" 
                                className="form-control" 
                                style={{ backgroundColor: '#f2f2f2', border: 'none', height: '45px' }}
                                onChange={handleChange} 
                                required 
                            />
                        </div>

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