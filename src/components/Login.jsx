import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthProviders";

const Login = () => {
    const [email, setEmail] = useState("melina@gmail.com");
    const [passWord, setPassword] = useState("test1234");

    const {login, isAuthenticated} = useAuth();
    const navigate = useNavigate();
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(email && passWord){
            login(email, passWord);
            // console.log(email , passWord);
        }
    }

    useEffect(()=>{
        if(isAuthenticated)
            navigate("/", {replace:true});
    },
    [navigate,isAuthenticated])

  return (
<div className="loginContainer">
    <h2>Login</h2>
    <form className="form" onSubmit={handleSubmit}>
        <div className="formControl">
            <label htmlFor="email">Email: </label>
            <input type="text" name="email" id="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
        </div>
        <div className="formControl">
            <label htmlFor="passWord">passWord: </label>
            <input type="text" name="passWord" id="passWord" value={passWord} onChange={(e)=> setPassword(e.target.value)}/>
        </div>
        <div className="buttons">
            <button className="btn btn--primary">Login</button>
        </div>
    </form>
</div>
  )
};

export default Login;
