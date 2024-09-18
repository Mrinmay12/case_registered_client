import React, {useState,useEffect} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import apiUrl from "./ApiAxios";
export default function AppRoutes() {
  const[token,setToken]=useState(localStorage.getItem('token'))

  useEffect(() => {
    const User_Token = async () => {
      try {
            let res=  await apiUrl.get('verifytoken',{
              headers: {
                'Authorization':token,
              }})
         if(res){
         
         }
      } catch (err) {
      
        localStorage.removeItem('user_id');
        localStorage.removeItem("token")
        
      
        
      }
    }
   
    User_Token()
    
  }, [token])
  setTimeout(()=>{
    setToken(localStorage.getItem('token'))
  },1000)
  return (
    <div className={token?'':"maintemp"}>
         <Routes>
         {token  ? (
         <Route path="/" element={<Home />} />
         ):(
          <Route path="/" element={<Login setToken={setToken}/>} />
         )}
       
         </Routes>
    </div>
  )
}
