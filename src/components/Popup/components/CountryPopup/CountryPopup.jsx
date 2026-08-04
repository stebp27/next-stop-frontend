import { useState, useEffect, useContext } from "react";
import { getCapitalData } from "../../../../utils/api";
import "./CountryPopup.css";
import AppContext from "../../../../contexts/AppContext";

const CountryPopup = ({ country }) => {
  const { savedCountries, handleToggleCountryStatus } = useContext(AppContext);

  const {
    name,
    flags,
    nativeName,
    region,
    subregion,
    capital,
    languages,
    currencies,
    maps,
    timezones,
    alpha3Code,
  } = country;

  const status = savedCountries.find(
    (c) => c.countryCode === alpha3Code,
  )?.status;

  const [bgImage, setBgImage] = useState("");

  useEffect(() => {
    if (!capital) return;

    getCapitalData(capital)
      .then((data) => {
        if (data.originalimage) {
          setBgImage(data.originalimage.source);
        }
      })
      .catch(() => setBgImage(""));
  }, [capital]);

  const lang = languages?.[0]?.name || "N/A";
  const curr = currencies?.[0]
    ? `${currencies[0].name} (${currencies[0].symbol})`
    : "N/A";

  return (
    <div className="country-popup">
      {bgImage && (
        <div
          className="country-popup__bg-image"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}

      <div className="country-popup__header">
        <h2 className="country-popup__title">
          {name}{" "}
          <img src={flags?.svg} className="country-popup__flag" alt="Flag" />
        </h2>
        <p className="country-popup__subtitle">
          {nativeName} — {region} · {subregion}
        </p>
      </div>

      <div className="country-popup__grid">
        <div className="country-popup__card">
          <p className="country-popup__label">Capital</p>
          <p className="country-popup__value">{capital}</p>
        </div>
        <div className="country-popup__card">
          <p className="country-popup__label">Language</p>
          <p className="country-popup__value">{lang}</p>
        </div>
        <div className="country-popup__card">
          <p className="country-popup__label">Currency</p>
          <p className="country-popup__value">{curr}</p>
        </div>
        <div className="country-popup__card">
          <p className="country-popup__label">Timezone</p>
          <p className="country-popup__value">{timezones?.[0] || "N/A"}</p>
        </div>
      </div>

      <div className="country-popup__footer">
        <a
          href={maps?.googleMaps || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="country-popup__btn country-popup__btn--sec"
        >
          View Map
        </a>
        <button
          className="country-popup__btn country-popup__btn--visited"
          onClick={() =>
            handleToggleCountryStatus(country.alpha3Code, "visited")
          }
        >
          {status === "visited" ? "✓ Visited" : "Mark as visited"}
        </button>

        <button
          className="country-popup__btn country-popup__btn--go"
          onClick={() =>
            handleToggleCountryStatus(country.alpha3Code, "wanted")
          }
        >
          {status === "wanted" ? "✓ Wanted" : "I want to go"}
        </button>
      </div>
    </div>
  );
};

export default CountryPopup;
