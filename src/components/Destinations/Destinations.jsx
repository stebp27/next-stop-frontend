import { useState, useContext, useRef, useEffect } from "react";
import Card from "../Card/Card";
import Preloader from "../Preloader/Preloader";
import AppContext from "../../contexts/AppContext";
import "./Destinations.css";

const PAGE_SIZE = 3;

function Destinations(props) {
  const { onOpenPopup, countries, countriesLoading, countriesError } = props;
  const { savedCountries } = useContext(AppContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const showMoreRef = useRef(null);
  const isFirstRender = useRef(true);

  const getStatus = (alpha3Code) =>
    savedCountries.find((c) => c.countryCode === alpha3Code)?.status;

  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const status = getStatus(country.alpha3Code);
    const matchesStatus =
      statusFilter === "all" ? true : status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const visibleCountries = filteredCountries.slice(0, visibleCount);
  const hasMore = visibleCount < filteredCountries.length;

  useEffect(() => {
    setVisibleCount(PAGE_SIZE); // reset paginazione quando cambia ricerca/filtro
  }, [searchTerm, statusFilter]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    showMoreRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [visibleCount]);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  return (
    <section className="cards">
      <div className="cards__controls">
        <input
          type="text"
          className="cards__search"
          placeholder="Search a country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="cards__filters">
          <button
            className={`cards__filter-btn ${statusFilter === "all" ? "cards__filter-btn--active" : ""}`}
            onClick={() => setStatusFilter("all")}
          >
            All
          </button>
          <button
            className={`cards__filter-btn ${statusFilter === "visited" ? "cards__filter-btn--active" : ""}`}
            onClick={() => setStatusFilter("visited")}
          >
            Visited
          </button>
          <button
            className={`cards__filter-btn ${statusFilter === "wanted" ? "cards__filter-btn--active" : ""}`}
            onClick={() => setStatusFilter("wanted")}
          >
            Wanted
          </button>
        </div>
      </div>

      {countriesLoading && (
        <div className="cards__status">
          <Preloader />
        </div>
      )}

      {!countriesLoading && countriesError && (
        <p className="cards__status cards__status--error">{countriesError}</p>
      )}

      {!countriesLoading &&
        !countriesError &&
        filteredCountries.length === 0 && (
          <p className="cards__status">No results found</p>
        )}

      {!countriesLoading && !countriesError && filteredCountries.length > 0 && (
        <>
          <ul className="cards__list">
            {visibleCountries.map((country) => (
              <Card
                key={country.alpha3Code}
                country={country}
                onOpenPopup={onOpenPopup}
              />
            ))}
          </ul>

          {hasMore && (
            <div className="cards__show-more" ref={showMoreRef}>
              <button className="cards__filter-btn" onClick={handleShowMore}>
                Show more
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default Destinations;
