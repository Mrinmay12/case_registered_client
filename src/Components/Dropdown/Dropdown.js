import React, { useEffect, useState } from "react";
import "./Dropdown.css";
const Dropdown = ({ operation,setdropData,sdem_name }) => {
  const [selectuser, setselectuser] = useState("Data Entry Operation");

  const handleChange = (event) => {
    setselectuser(event.target.value);
    setdropData(event.target.value);

  };
  useEffect(()=>{
   
      setselectuser(sdem_name)

  },[sdem_name])
 

  return (
    <div className="dropcontainer">
      <select id="cars" value={selectuser} onChange={handleChange}>
        {operation==='data_entry' ? (
          <>
            <option value="Data Entry Operation">Data Entry Operation</option>
            <option value="Magistrate">Magistrate</option>
            
          </>
        ) :operation==='Operation' ? (
          <>
          <option value="">Select</option>
            <option value="OperationA">OperationA</option>
            <option value="OperationB">OperationB</option>
            <option value="OperationC">OperationC</option>
          </>
        ): (
          <>
            <option value="">Select</option>
            <option value="UserA">UserA</option>
            <option value="UserB">UserB</option>
            <option value="UserC">UserC</option>
            <option value="UserD">UserD</option>
          </>
        )}
      </select>
    </div>
  );
};

export default Dropdown;
