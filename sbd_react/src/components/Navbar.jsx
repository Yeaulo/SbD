import "../styles/navbar.css";
import {Link, useResolvedPath} from "react-router-dom";

export default function Navbar(){

    let path = useResolvedPath();
    return( <nav className="navbar">
            <Link to="/" className="site-title">SB</Link>
            <ul className="nav-links">
                <li ><Link to="/customerData"  className={path.pathname==="/customerData"? "active-nav-item": "nav-item"}>Customer data</Link></li>
                <li ><Link to="/contracts"  className={path.pathname==="/contracts"? "active-nav-item": "nav-item"} >Contracts</Link></li>
                <li ><Link to="/smartmeter"  className={path.pathname==="/smartmeter"? "active-nav-item": "nav-item"}>Smartmeter</Link></li>
            </ul>
        </nav>);
}