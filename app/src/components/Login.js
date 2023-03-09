import React, { useState } from "react";
// import { useNavigate } from "react-router";
import { NavLink} from "react-router-dom";
import { Redirect } from 'react-router-dom';

import "../App.css";

export default function Login({storeEmail}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    console.log(email,password);
    let newObj = {
      email,
      password,
    };
    console.log(newObj);
    if (email !== '' && password !== '') {
      fetch("https://phase-three-sinatra-project.onrender.com/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newObj),
      }).then((response) => {
        console.log(response);
        if (response.status !== 200) {
          alert("error")
          // setIsLoggedIn(true)
        }
        else if (response.status === 200){
          alert("success")
          setIsLoggedIn(true);
        }
      });
    } else {
      alert("fill in all fields");
        }
  };

if(isLoggedIn){
  return <Redirect to="/projects" />;
}

  return (
    <div className="auth-form-container">
      <form className="login-form">
        <h1>Login</h1>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          required
        />
        <button type="submit" onClick={(e)=>{
          e.preventDefault();
          handleLogin()
          storeEmail(email)
        }}> Login</button>
        <h3 className="link-btn">
          Don't have an account?
          &nbsp;
          <NavLink to="/signup">signup</NavLink>
        </h3>
      </form>
    </div>
  );
}