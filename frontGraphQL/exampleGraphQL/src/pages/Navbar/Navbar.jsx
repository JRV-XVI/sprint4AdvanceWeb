import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
    <nav className="navbar">
        <div className="nav-container">
        <NavLink to="/" className="nav-link">Home (Factory)</NavLink>
        <NavLink to="/menus" className="nav-link">Item List (Observer)</NavLink>
        </div>
    </nav>
    );
}

export default Navbar;