import React from 'react';
import { NavLink } from 'react-router-dom';



const Nav=()=>{
  return(
    <>
  <nav className="navbar bg-dark" style={{height: "150%", fontSize: "1.5rem", color:'white'}}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/login">Login</NavLink>
      </nav>
      <div className ="home" ></div>
      

<div className="your-component-class"> {/* Your component content */} </div> 
</>
  )



}
export default Nav