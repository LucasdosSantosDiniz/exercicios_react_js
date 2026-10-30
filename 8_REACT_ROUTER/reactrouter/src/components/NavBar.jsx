import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav>
      {/* OPÇÃO COM A TAG <Link/>
      <Link to="/"> Home </Link>
      <Link to="/about"> Sobre </Link>*/}
      {/** OPÇÃO COM A TAG <NavLink/> */}
      <NavLink to="/"> Home </NavLink>
      <NavLink to="/about"> Sobre </NavLink>
    </nav>
  );
};

export default NavBar;
