import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./components/Login";
import { Nav } from "./components/Nav";
import  Employees  from "./components/Employees";
import  Register  from "./components/Register";
import axios from "axios";
import { useUser } from "./context/UserContext";
axios.defaults.baseURL='http://localhost:4000/api'


function App() {
  const {user}=useUser();
  axios.defaults.headers.common["Authorization"]=`Bearer ${user.token}`;
  return (
    <BrowserRouter>
    <Nav/>
      <Routes>
        <Route path='/'element={<Login/>}/>
        <Route path='/employees'element={<Employees/>}/>
        <Route path='/register'element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
