import React, { useState} from "react";
import { useNavigate } from "react-router";

export default function Login(props) {
let redirect = useNavigate()
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState(null);


  const handleSubmit = (e) => {
    e.preventDefault();
    // simulate a successful login
    if(localStorage.getItem(email)){
      const user = JSON.parse(localStorage.getItem(email));
      if (user.password === password){
        redirect('/')
        return;
      }
    }
      setError("Invalid email or password. Please try again.");
  };

  return (
    <div className="auth-form-container">
    <h2>Login</h2>
    <form className="login-form" onSubmit={handleSubmit}>
    <label htmlFor="email"></label>
    <input
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    type="email"
    placeholder="your email address"
    id="email"
    name="email"
    required
    />
    <label htmlFor="password"></label>
    <input
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    type="password"
    placeholder="your password"
    id="password"
    name="password"
    required
    />
    <button> Login</button>
    {error && <p>{error}</p>}
    </form>
    <button
    className="link-btn"
    onClick={() => redirect('/signup')}
    >
    Don't have an account? Signup
    </button>
    </div>
    );
    }