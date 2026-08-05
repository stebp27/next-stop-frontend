import "./Header.css";
import logo from "../../images/logo.svg";
import Navigation from "../Navigation/Navigation";
import AppContext from "../../contexts/AppContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";

function Header({ userLogin, handleLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsLoggedIn } = useContext(AppContext);

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <img src={logo} alt="" className="header__logo-icon" />
          <span className="header__logo-text">nextstop</span>
        </div>
        <div>
          <Navigation handleLogout={handleLogout} />
        </div>
      </div>
    </header>
  );
}

export default Header;
