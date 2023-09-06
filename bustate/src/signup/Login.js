import React from "react";
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    return(
        <div> 
          {/* Basit bir şekilde buraya da kullanıcı verileri cekilecek.*/}
           <label htmlFor="username">Username</label>
          <input
            placeholder="username"
            type="text"
            id="username"
            name="username"/>
            <br></br>
             <label htmlFor="password">Password</label>
          <input
            placeholder="password"
            type="password"
            id="password"
            name="password"/>
           <div><button onClick={() => navigate(-1)}>Go back to the homepage.</button></div>
        </div>
      
        
    )
}
export default Login;