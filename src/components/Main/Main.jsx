import { useState, useEffect } from "react";
import Card from "../Card/Card";
import Preloader from "../Preloader/Preloader";
import "./Main.css";
import BeachDay from "../../images/beach-day.svg";

function Main(props) {
  const { onOpenPopup, countries, countriesLoading, countriesError } = props;
  const [rndCountry, setRndCountry] = useState(null);

  const pickRandomCountry = () => {
    if (countries.length < 1) return;

    let rnd = Math.floor(Math.random() * countries.length);

    if (countries.length > 1 && countries[rnd] === rndCountry) {
      rnd = (rnd + 1) % countries.length;
    }

    setRndCountry(countries[rnd]);
  };

  useEffect(() => {
    pickRandomCountry();
  }, [countries]);

  return (
    <main className="main">
      <div className="main__intro">
        <div className="main__tex">
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
            <button className="main__reload-button" onClick={pickRandomCountry}>
              Let me check another place
            </button>
          </div>
        </>
      )}
    </main>
  );
}

export default Main;
