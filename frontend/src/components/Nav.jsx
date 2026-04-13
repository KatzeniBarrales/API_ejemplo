import React from 'react'
import { NavLink } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export const Nav = () => {
  const { user, exit } = useUser();

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-primary shadow-sm'>
      <div className="container">
        
        {/* IZQUIERDA: ENLACE DE INICIO */}
        <div className="col-md-3 d-flex align-items-center">
          <NavLink to='/' className='navbar-brand' style={{ fontSize: '16px', letterSpacing: '1px' }}>
            Inicio
          </NavLink>
        </div>

        {/* CENTRO: TÍTULO FIJO (No es enlace) */}
        <div className="col-md-6 text-center d-none d-lg-block">
          <span className="navbar-brand m-0 text-uppercase" style={{ 
            fontSize: '18px', 
            letterSpacing: '3px', 
            fontWeight: '600',
            color: '#fff'
          }}>
            <i className='fas fa-motorcycle me-2'></i> 
            Refaccionaria de Motos
          </span>
        </div>

        {/* DERECHA: SECCIONES Y LOGIN */}
        <div className="col-md-3">
          <button className='navbar-toggler ms-auto' type="button"
            data-bs-toggle="collapse" data-bs-target="#navbarNav"
          > 
            <span className='navbar-toggler-icon'></span>
          </button>

          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav ms-auto align-items-center'>
              
              {user.login ? (
                <>
                  <li className='nav-item'>
                    <NavLink className='nav-link' to='/employees'>
                      <i className='fas fa-user-circle me-1'></i> {user.name}
                    </NavLink>
                  </li>
                  <li className='nav-item ms-lg-3'>
                    <button 
                      className='btn btn-light btn-sm text-primary text-uppercase' 
                      onClick={() => exit()}
                      style={{ fontSize: '11px', fontWeight: 'bold', borderRadius: '4px', padding: '5px 15px' }}
                    >
                      <i className='fas fa-sign-out-alt me-1'></i> Salir
                    </button>
                  </li>
                </>
              ) : (
                <li className='nav-item'>
                  <NavLink className='nav-link' to='/register'>
                    <i className='fas fa-user-plus me-1'></i> Registrarme
                  </NavLink>
                </li>
              )}
              
            </ul>
          </div>
        </div>
      </div> 
    </nav>
  )
}