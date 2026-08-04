import CountryPopup from "../Popup/components/CountryPopup/CountryPopup";
import "./Card.css";
import { useContext } from "react";
import AppContext from "../../contexts/AppContext";

function Card(props) {
  const { onOpenPopup, country } = props;
  const { savedCountries } = useContext(AppContext);

  const countryPopup = {
    children: <CountryPopup country={country} />,
  };

  const status = savedCountries.find(
    (c) => c.countryCode === country.alpha3Code,
  )?.status;

  return (
    <div
      className="card"
      onClick={() => {
        onOpenPopup(countryPopup);
      }}
    >
      {status && (
        <span className={`card__badge card__badge--${status}`}>
          {status === "visited" ? "✓ Visited" : "★ Wanted"}
        </span>
      )}
      <img className="card__image" src={country.flags.svg} alt="Country Flag" />

      <div className="card__description">
        <h2 className="card__title">{country.name}</h2>
      </div>
    </div>
  );
}

export default Card;
