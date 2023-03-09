import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Redirect } from 'react-router-dom';

function SignupForm() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = () => {
    console.log("active post");
    let newObj = {
      first_name,
      last_name,
      email,
      password,
    };
    console.log(newObj);
    if (
      first_name !== '' &&
      last_name !== '' &&
      email !== '' &&
      password !== ''&&
      confirmPassword !== ''
    ) {
      if(password !== confirmPassword) {
        alert('Passwords do not match');
      }
      else{
        fetch("https://phase-three-sinatra-project.onrender.com/add/user", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newObj),
        }).then((response) => {
          // console.log(response);
          if(response.ok === true) {
            alert("Success")
            setIsSignUp(true);
          }
          else(
            alert("Error")
          )
        });
      }
      // setIsLoggedIn(true);
    } else {
      alert("Kindly fill in all fields");
    }
  };

  if(isSignUp) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="auth-form-container">
      <form className="sign">
        <h1>Create an account today</h1>
        <label>First Name:</label>
        <input
          type="text"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <label>Last Name:</label>
        <input
          type="text"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button onClick={(e)=>{
          e.preventDefault();
          handleSubmit()
        }} type="submit">Create</button>
        <h3>Already have an account?
          &nbsp;e
            <NavLink to="/login">Login</NavLink>
        </h3>
      </form>
    </div>
  );
}

export default SignupForm;