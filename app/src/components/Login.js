import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // perform login logic here
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Email:</label>
      <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />

      <label>Password:</label>
      <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />

      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
