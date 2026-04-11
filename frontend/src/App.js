import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./components/Login";
import { Nav } from "./components/Nav";
import  Employees  from "./components/Employees";
import  Register  from "./components/Register";
import Services from "./components/Services";
import axios from "axios";
import { useUser } from "./context/UserContext";
import { VentaProvider } from "./context/VentaContext"; // Se agrega el provider
import { useEffect } from "react";

axios.defaults.baseURL='http://localhost:4000/api'

function App() {
  const {user}=useUser();
 
  const Public = ({children}) => {
      if (!user.login) return children;
      // Corregí la lógica de redirección para que coincida con tus niveles
      if (user.nivel === "1") return <Navigate to='/employees'/>
      if (user.nivel === "2") return <Navigate to='/services'/>
  };

  const Private=({children})=>{
    return user.token ? children : <Navigate to='/'/>
  }

  useEffect(()=>{
    if(user?.token){
      axios.defaults.headers.common["Authorization"]=`Bearer ${user.token}`;
    }
  }, [user?.token]);

  return (
    <VentaProvider> {/* Envolvemos para que Ventas tenga acceso al CRUD */}
      <BrowserRouter>
      <Nav/>
        <Routes>
          <Route path='/' element={<Public><Login/></Public>}/>
          <Route path='/employees' element={<Private><Employees/></Private>}/>
          <Route path='/register' element={<Public><Register/></Public>}/>
          <Route path='/services' element={<Private><Services/></Private>}/>
        </Routes>
      </BrowserRouter>
    </VentaProvider>
  );
}

export default App;