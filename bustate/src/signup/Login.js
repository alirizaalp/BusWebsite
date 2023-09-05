import React from "react";
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    return(
        <div> 
           SignUp daki kayıtlı bilgilerini, kişi e-posta ve şifresiyle buraya girebilecek.
           <br/>
           <div><button onClick={() => navigate(-1)}>Go back to the homepage.</button></div>
        </div>
      
        
    )
}
export default Login;