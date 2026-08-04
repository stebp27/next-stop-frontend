import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../../contexts/AppContext";
import "./Navigation.css";

function Navigation({ handleLogout }) {
  const location = useLocation();
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);

  let navLink = "";
  let authLink = "";

  if (isLoggedIn) {
    authLink = (
      <button onClick={handleLogout} className="nav__link nav__button">
        Close session
      </button>
    );
  } else if (location.pathname === "/signup") {
    authLink = (
      <Link to="/signin" className="nav__link">
        Login
      </Link>
    );
  } else {
    authLink = (
      <Link to="/signup" className="nav__link">
        Register
      </Link>
    );
  }

  if (location.pathname === "/") {
    navLink = (
      <Link to="/destinations" className="nav__link">
        Discover
      </Link>
    );
  } else {
    navLink = (
      <Link to="/" className="nav__link">
        Home
      </Link>
    );
  }

  return (
    <div className="nav">
      <div className="nav__link">{navLink}</div>
      <div className="nav__link">{authLink}</div>
    </div>
  );
}

export default Navigation;
