import { NavLink } from "react-router-dom";
import "../App.css"

const Nav = () => {
  return (
    <>
      <nav
        className="navbar"
      >
        <span>
        <NavLink to="/">
         <h3>HOME</h3>
        </NavLink>
        <NavLink to="/signup">
        <h3>SIGN UP</h3>
        </NavLink>
        <NavLink to="/login">
        <h3>LOGIN</h3>
        </NavLink>
        </span>
      </nav>
    </>
  );
};
export default Nav;
