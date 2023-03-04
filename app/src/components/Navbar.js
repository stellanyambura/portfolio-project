import {NavLink} from 'react-router-dom'


const Nav=()=>{
    return(
      <>
    <nav className="navbar bg-dark" style={{height: "150%", fontSize: "1.5rem", color:'white'}}>
        <NavLink to="/project" style={{backgroundColor:'mint'}}>Project</NavLink>
       
        <NavLink to="/signup" style={{backgroundColor:'mint' ,hover:'red'}}>SignUp</NavLink>
        <NavLink to="/login" style={{paddingRight: "15px",}}>LoginPage</NavLink>
        <NavLink to="/skills" style={{paddingRight: "15px",}}>Skills</NavLink>
        <NavLink to="/" style={{paddingRight: "15px",}}>Home</NavLink>
       
       
        

      
</nav>
</>
    )
  }
  export default Nav










































// import React from 'react';
// import { Link } from 'react-router-dom';

// function Nav() {
//   return (
//     <nav>
//       <ul>
//         <li>
//           <Link to='/'>Home</Link>
//         </li>
//         <li>
//           <Link to='/login'>Login</Link>
//         </li>
//         <li>
//           <Link to='/project'>Project</Link>
//         </li>
//         <li> 
//           <Link to="/SignUp">Login</Link>
//           </li>
//         <li>
//           <Link to='/skills'>Skills</Link>
//         </li>
//         <li>
//           <Link to='/users'>Users</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// }

// export default Nav;
