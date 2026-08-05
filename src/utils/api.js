import { getItem, setItem } from "./localStorage";

const COUNTRIES_CACHE_KEY = "countries_list";
const EXPIRE_AFTER = 1000 * 60 * 60 * 24 * 7; //One Week
const CAPITALS_CACHE_KEY = "capitals_cache";
const DEBUG_ARTIFICIAL_DELAY = 0; // 2000 to Test prealoder, 0 in Production

export function getCountries() {
  const cached = getItem(COUNTRIES_CACHE_KEY, EXPIRE_AFTER);
  if (cached) {
    return Promise.resolve(cached);
  }

  return fetch("https://countries.dev/countries")
    .then((res) => res.json())
    .then((data) => {
      setItem(COUNTRIES_CACHE_KEY, data);
      return data;
    });
}

export const getCapitalData = (capital) => {
  const allCapitals = getItem(CAPITALS_CACHE_KEY, EXPIRE_AFTER) || {};

  if (allCapitals[capital]) {
    return Promise.resolve(allCapitals[capital]);
  }

  return fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${capital}`)
    .then((res) => res.json())
    .then((data) => {
      const updated = { ...allCapitals, [capital]: data };
      setItem(CAPITALS_CACHE_KEY, updated);
      return data;
    });
};
