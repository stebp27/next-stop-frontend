import { useState } from "react";
import Card from "../Card/Card";
import Preloader from "../Preloader/Preloader";
import "./Main.css";
import BeachDay from "../../images/beach-day.svg";
import { ESTIMATED_MAX_COUNTRIES } from "../../utils/constants";

function Main(props) {
  const { onOpenPopup, countries, countriesLoading, countriesError } = props;

  const [selectedIndex, setSelectedIndex] = useState(() =>
    Math.floor(Math.random() * ESTIMATED_MAX_COUNTRIES),
  );

  const actualIndex =
    countries && countries.length > 0 ? selectedIndex % countries.length : 0;

  const rndCountry =
    countries && countries.length > 0 ? countries[actualIndex] : null;

  const handlePickNewCountry = () => {
    if (!countries || countries.length <= 1) return;

    let nextIndex = Math.floor(Math.random() * countries.length);

    if (nextIndex === actualIndex) {
      nextIndex = (nextIndex + 1) % countries.length;
    }

    setSelectedIndex(nextIndex);
  };

  return (
    <main className="main">
      <div className="main__intro">
        <div className="main__text">
          <h1 className="main__title">
            IT'S TIME TO <span className="main__title_accent">DISCOVER</span>
          </h1>
          <p className="main__paragraph">
            A new destination awaits. The world is too beautiful to remain
            inside these walls—discover your Next Stop and start exploring.
          </p>
        </div>
        <img className="main__image" src={BeachDay} alt="Next Stop" />
      </div>
      <hr />
      <h2 className="main__advice">Have you ever thought about...</h2>

      {countriesLoading && (
        <div className="cards__status">
          <Preloader />
        </div>
      )}

      {!countriesLoading && countriesError && (
        <p className="cards__status cards__status--error">{countriesError}</p>
      )}

      {!countriesLoading && !countriesError && rndCountry && (
        <>
          <div className="main__country">
            <Card country={rndCountry} onOpenPopup={onOpenPopup} />
          </div>
          <div className="main__reload">
            <button
              className="main__reload-button"
              onClick={handlePickNewCountry}
            >
              Let me check another place
            </button>
          </div>
        </>
      )}
    </main>
  );
}

export default Main;
