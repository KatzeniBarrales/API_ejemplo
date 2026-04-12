import axios from "axios";
import Swal from "sweetalert2";
import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();
const initialState = { login: false, token: "", name: "", nivel: "" };

export const UserProvider = (props) => {
  const [user, setUser] = useState(initialState);

  // Sincronizar con localStorage al cargar la app
  useEffect(() => {
    const initial = JSON.parse(localStorage.getItem("user"));
    if (initial && initial.login) {
      setUser(initial);
    } else {
      setUser(initialState);
    }
  }, []);

  const loginUser = async (dataUser, navigate) => {
    try {
      const { data } = await axios.post('http://localhost:4000/api/login', dataUser);
      if (data.ok) {
        const userLogin = {
          login: true,
          token: data.data.token,
          name: data.data.nombre,
          nivel: data.data.nivel
        };
        localStorage.setItem("user", JSON.stringify(userLogin));
        setUser(userLogin);

        // Redirección según nivel
        if (data.data.nivel === "1") {
          navigate('/employees');
        } else if (data.data.nivel === "2") {
          navigate('/services');
        }

        Swal.fire({
          icon: 'success',
          title: data.message,
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Error en el login';
      Swal.fire({ icon: 'error', title: msg, timer: 1500 });
      console.log('error en login:', error.message);
    }
  }

  const registerUser = async (dataUser, navigate) => {
    try {
      const { data } = await axios.post('http://localhost:4000/api/register', dataUser);
      if (data.ok) {
        const userLogin = {
          login: true,
          token: data.data.token,
          name: data.data.nombre,
          nivel: data.data.nivel
        };
        localStorage.setItem("user", JSON.stringify(userLogin));
        setUser(userLogin);

        if (data.data.nivel === "1") {
          navigate('/employees');
        } else if (data.data.nivel === "2") {
          navigate('/services');
        }

        Swal.fire({
          icon: 'success',
          title: data.message,
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Error en el registro';
      Swal.fire({ icon: 'error', title: msg, timer: 1500 });
      console.log('error en register:', error.message);
    }
  };

  // FUNCIÓN EXIT CORREGIDA
  const exit = () => {
    setUser(initialState);
    localStorage.removeItem("user"); // Borramos la llave correcta
    localStorage.clear();
    window.location.href = "/"; // Forzamos el regreso al login
  }

  const value = {
    loginUser,
    user,
    registerUser,
    exit
  };

  return <UserContext.Provider value={value} {...props} />
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe estar dentro de un UserProvider');
  }
  return context;
}