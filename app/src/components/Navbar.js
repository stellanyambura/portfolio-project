import React from 'react';
import { NavLink } from 'react-router-dom';



const Nav=()=>{
  return(
    <>
  <nav className="navbar bg-dark" style={{height: "150%", fontSize: "1.5rem", color:'white'}}>
      <NavLink to="/" style={{backgroundColor:'blue'}}>Home</NavLink>
     
      {/* <NavLink to="/randommemes" style={{backgroundColor:'transparent' ,hover:'red'}}>All memes</NavLink> */}
      <NavLink to="/login" style={{paddingRight: "15px",}}>Login</NavLink>
     
      

    
</nav>
</>
  )
}
export default Nav