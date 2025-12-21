import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Navbar({ user, onLogout }) {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search for:", searchInput); 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">
        Music Maestro
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link" to="/teachers">
              Teachers
            </NavLink>
          </li>

          {user && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/myprofile">
                My Profile
              </NavLink>
            </li>
          )}
        </ul>

        <form className="d-flex me-3" onSubmit={handleSearch}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search teachers..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button className="btn btn-outline-light" type="submit">
            Search
          </button>
        </form>

        <ul className="navbar-nav">
          {!user ? (
            <li className="nav-item">
              <NavLink className="nav-link" to="/auth">
                Login / Register
              </NavLink>
            </li>
          ) : (
            <li className="nav-item">
              <button className="btn btn-outline-light" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
