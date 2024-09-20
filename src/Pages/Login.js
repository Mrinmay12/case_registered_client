import React, { useEffect, useState } from "react";
import "./Login.css";

import apiUrl from "../ApiAxios";
import OtpInput from "../Components/OtpInput";
import Dropdown from "../Components/Dropdown/Dropdown";
export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handlepassword = (e) => {
    setPassword(e);
  };
  const handleemail = (e) => {
    setEmail(e);
  };

  const [loader, setLoder] = useState(false);
  const [err, setErr] = useState(false);
  const [err2, setErr2] = useState(false);
  const [err3, setErr3] = useState(false);
  const [username, setusername] = useState("");
  const [Operationname, setOperationname] = useState("");
  const [dropData, setdropData] = useState("Data Entry Operation");
  const json = JSON.stringify({
    email,
    password,
    username:dropData==='Magistrate'?username:Operationname
  });
  const [user_id, setUserId] = useState("");
 
  const handleSubmit = async (e) => {
 
    if(dropData==='Magistrate'){
      if(!username){
        setErr2(true)
        return
      }
    }
    if(dropData==='Data Entry Operation'){
      if(!Operationname){
        setErr3(true)
        return
      }
    }
  
    try {
      setLoder(true);
      setErr(false);
      let response = await apiUrl.post("login", json);
      if (response) {
        setLoder(false);
        setUserId(response.data.user_id);
      if(dropData==='Magistrate'){
        localStorage.setItem("username", username);
      }else{
        localStorage.setItem("Operationname", Operationname);
      }
      }
    } catch (err) {
      setErr(true);
      setLoder(false);
      setErr2(false)
      setErr3(false)
    }
  
  };


 
  useEffect(()=>{
    if(dropData==='Data Entry Operation'){
      setusername('')
      setErr2(false)
      setErr3(false)
      localStorage.removeItem("username");
      localStorage.removeItem("Operationname");
    }if(dropData==='Magistrate'){
      setErr(false)
      setErr3(false)
      setErr2(false)
      localStorage.removeItem("username");
      localStorage.removeItem("Operationname");
    }
  },[dropData])
  return (
    <div class="login-container">
      {user_id ? (
        <OtpInput setToken={setToken} email={email} />
      ) : (
        <>
          <h1>Login {dropData}</h1>
          <div class="input-group">
            <label for="email">Login as</label>
            <Dropdown operation="data_entry" setdropData={setdropData} />
          </div>
          {dropData === "Magistrate" && (
            <div class="input-group">
              <label for="email">Name of the SDEM</label>
              <Dropdown  setdropData={setusername} />
            </div>
          )}
          {dropData === "Data Entry Operation" && (
            <div class="input-group">
              <label for="email">Name of the D.O</label>
              <Dropdown  setdropData={setOperationname} operation="Operation"/>
            </div>
          )}

          <div class="input-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => handleemail(e.target.value)}
            />
          </div>
          <div class="input-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => handlepassword(e.target.value)}
            />
          </div>
          {err && (
            <span style={{ color: "red" }}>Email or Password not valid</span>
          )}
          {err2 && (
            <span style={{ color: "red" }}>Please select Magistrate</span>
          )}
          {err3 && (
            <span style={{ color: "red" }}>Please select the D.O</span>
          )}
          {loader ? (
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          ) : (
            <button
              type="submit"
              className="loginbutton"
              onClick={handleSubmit}
            >
              Login
            </button>
          )}
        </>
      )}
    </div>
  );
}
