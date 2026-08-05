import { getItem, setItem } from "./localStorage";
import {
  COUNTRIES_CACHE_KEY,
  CACHE_EXPIRE_AFTER,
  CAPITALS_CACHE_KEY,
} from "./constants";

export function getCountries() {
  const cached = getItem(COUNTRIES_CACHE_KEY, CACHE_EXPIRE_AFTER);
  if (cached) {
    console.log(cached.length);
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
  const allCapitals = getItem(CAPITALS_CACHE_KEY, CACHE_EXPIRE_AFTER) || {};

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
