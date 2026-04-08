import axios from "axios";
import Swal from "sweetalert2";
import { createContext, useState, useContext, useEffect } from "react";

const UserContext= createContext();
const initialState = {login:false, token:"",name:"",nivel:""};

export const UserProvider=(props) => {
  const [user, setUser] = useState(initialState);
  
  //en initial, estamos guardando los datos del usuario logueado actual
  useEffect(()=>{
    const initial = JSON.parse(localStorage.getItem("user"));
    initial ? initial.login && setUser(initial): setUser(initialState);
  },[]);

  const loginUser=async(dataUser,navigate)=>{
    try {
      const {data} = await axios.post('http://localhost:4000/api/login',dataUser);
      if (data.ok){
        const userLogin={
          login:true,
          token:data.data.token,
          name:data.data.nombre,
          nivel:data.data.nivel
        };
        localStorage.setItem("user",JSON.stringify(userLogin));
        setUser(userLogin);
        navigate('/employees');
        /*
        if (data.data.nivel==="0"){
          console.log("Si ento al nivel 0");
          navigate('/employees');
        }
        if (data.data.nivel==="1"){
          console.log("Si ento al nivel 1");
          navigate('/rentas');
        }
          */
        Swal.fire({
          icon: 'success',
          title: data.message,
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      if(!error.response.data.ok){
        return Swal.fire({
           icon: 'error',
           title: error.response.data.message,
           showConfirmButton: false,
           timer: 1500
         });
       }
       console.log('error en la función login ',error.message);
    }
  }

  const registerUser=async(dataUser,navigate)=>{
    try {
      const {data} = await axios.post('http://localhost:4000/api/register',dataUser);
      if(data.ok){
        const userLogin= {
          login:true,
          token: data.data.token,
          name: data.data.nombre,
          nivel:data.data.nivel
        };
        localStorage.setItem("user",JSON.stringify(userLogin));
        setUser(userLogin);
        navigate('/employees');
        Swal.fire({
          icon: 'success',
          title: data.message,
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      if(!error.response.data.ok){
       return Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500
        });
      }
      console.log('error en la función register ',error.message);
    }
  };

  const exit=()=>{
    setUser(initialState);
    localStorage.removeItem(user);
    localStorage.clear();
  }

  const value={
    loginUser,
    user,
    registerUser,
    exit
   };
   return <UserContext.Provider value={value} {...props}/>
}

export function useUser(){
  const context=useContext(UserContext);
  if(!context){
    throw new Error('useUser error');
  }
  return context;
}


