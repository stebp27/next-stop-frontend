import { useState, useEffect } from "react";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Destinations from "../Destinations/Destinations";
import Footer from "../Footer/Footer";
import Login from "../Login/Login";
import Register from "../Register/Register";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import AppContext from "../../contexts/AppContext";
import "./App.css";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { getCountries } from "../../utils/api";
import Popup from "../Popup/Popup";
import { register, authorize, verifyToken, logout } from "../../utils/auth";
import {
  getSavedCountries,
  toggleCountryStatus,
} from "../../utils/savedCountries";
import NotFound from "../NotFound/NotFound";

function App() {
  const [countries, setCountries] = useState([]);
  const [popup, setPopup] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [savedCountries, setSavedCountries] = useState([]);
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [countriesError, setCountriesError] = useState(null);

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  const handleOpenInfoTooltip = (status) => {
    handleOpenPopup({
      children: <InfoTooltip status={status} />,
    });
  };

  const navigate = useNavigate();

  useEffect(() => {
    verifyToken()
      .then((session) => {
        setToken(session.token);
        setIsLoggedIn(true);
      })
      .catch(() => {
        setIsLoggedIn(false);
      });
  }, []);

  const handleRegistration = ({ email, password }) => {
    register(email, password)
      .then(() => {
        handleOpenInfoTooltip({
          isOpen: true,
          isSuccess: true,
          message: "Nice! You are now registered.",
        });
        navigate("/signin");
      })
      .catch((e) => {
        console.log(e.message);
        handleOpenInfoTooltip({
          isOpen: true,
          isSuccess: false,
          message: "Ups, something went wrong. Please try again.",
        });
        console.error;
      });
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    authorize(email, password)
      .then((res) => {
        console.log(res);
        if (res.token) {
          setToken(res.token);
          setIsLoggedIn(true);

          verifyToken(res.token)
            .then(({ data }) => {
              setIsLoggedIn(true);
              handleOpenInfoTooltip({
                isOpen: true,
                isSuccess: true,
                message: "Welcome!",
              });
              navigate("/");
            })
            .catch((e) => {
              console.error;
            });
        }
      })
      .catch((e) => {
        handleOpenInfoTooltip({
          isOpen: true,
          isSuccess: false,
          message: "Ups, something went wrong. Please try again.",
        });
        console.error;
      });
  };

  const handleLogout = () => {
    logout();
    setToken(null);
    setIsLoggedIn(false);
    navigate("/signin");
  };

  useEffect(() => {
    setCountriesLoading(true);
    setCountriesError(null);

    getCountries()
      .then((data) => {
        setCountries(data);
      })
      .catch(() => {
        setCountriesError(
          "Sorry, something went wrong with the request. There might be a connection issue or the server may be down. Please try again later.",
        );
      })
      .finally(() => {
        setCountriesLoading(false);
      });
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      setSavedCountries(getSavedCountries());
    }
  }, [isLoggedIn]);

  const handleToggleCountryStatus = (alpha3Code, status) => {
    const updated = toggleCountryStatus(alpha3Code, status);
    if (updated) setSavedCountries(updated);
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        savedCountries,
        handleToggleCountryStatus,
      }}
    >
      <div className="page__content">
        <Header handleLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                countriesLoading={countriesLoading}
                countries={countries}
                onOpenPopup={handleOpenPopup}
              />
            }
          ></Route>

          <Route
            path="/destinations"
            element={
              <ProtectedRoute>
                <Destinations
                  countries={countries}
                  countriesLoading={countriesLoading}
                  onOpenPopup={handleOpenPopup}
                />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/signup"
            element={
              <ProtectedRoute anonymous>
                <Register handleRegistration={handleRegistration} />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/signin"
            element={
              <ProtectedRoute anonymous>
                <Login handleLogin={handleLogin} />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />

        {popup && <Popup onClose={handleClosePopup}>{popup.children}</Popup>}
      </div>
    </AppContext.Provider>
  );
}

export default App;
