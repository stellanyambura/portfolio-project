import React, { useState } from 'react';

function SignupForm() {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("active post");
    let newObj = {
      first_name,
      last_name,
      email,

      password,
    };
    if (
      newObj.first_name !== null &&
      newObj.last_name !== null &&
      newObj.email !== null &&
      newObj.password !== null
    ) {
      fetch("https://phase-three-sinatra-project.onrender.com/add/user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newObj),
      }).then((response) => {
        console.log(response);
      });
      // setIsLoggedIn(true);
    } else {
      console.log("error");
    }
  };

  // if (isLoggedIn) {
    // redirect to the dashboard once the user is logged in
    // return <Redirect to="/login" />;
  
    // Here, you would submit the form data to the backend using a fetch request or similar method.

  return (
    <form  className ="sign" onSubmit={handleSubmit}>
      <label>
        First Name:
      </label>
      <input type="text" value={first_name} onChange={(e) => setFirstName(e.target.value)} />
      <label>
        Last Name:
        </label>
        <input type="text" value={last_name} onChange={(e) => setLastName(e.target.value)} />
      <label>
        Email:
       </label>
       <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>
        Password:
        </label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <label>
        Confirm Password:
       </label>
       <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      <button type="submit">Sign Up</button>
    </form>
  );
  }

export default SignupForm;
