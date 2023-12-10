import "../styles/navbar.css";
import { Link, useResolvedPath, useNavigate } from "react-router-dom";

export default function Navbar() {
  let path = useResolvedPath();
  const navigate = useNavigate();

  async function logout() {
    localStorage.clear();

    const response = await fetch("http://localhost:8000/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await response.json();
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <Link to="/" className="site-title">
        SB
      </Link>
      <div className="nav-links-div">
        <ul className="nav-links">
          <li>
            <Link
              to="/customerData"
              className={
                path.pathname === "/customerData" ? "active-nav-item" : "nav-item"
              }
            >
              Customer data
            </Link>
          </li>
          <span className="nav-separator">|</span>
          <li>
            <Link
              to="/contracts"
              className={
                path.pathname === "/contracts" ? "active-nav-item" : "nav-item"
              }
            >
              Contracts
            </Link>
          </li>
          <span className="nav-separator">|</span>
          <li>
            <Link
              to="/smartmeter"
              className={
                path.pathname === "/smartmeter" ? "active-nav-item" : "nav-item"
              }
            >
              Smartmeter
            </Link>
          </li>
        </ul>
        <div className="logout-button-div">
            <button className={"logout-button"} onClick={() => logout()}>
              Logout
            </button>
        </div>
      </div>
    </nav>
  );
}
