import { getItem, setItem } from "./localStorage";
import { getLoggedInUserId } from "./auth";

export const getSavedCountries = () => {
  const userId = getLoggedInUserId();
  if (!userId) return [];

  const user = getItem(`user_data_${userId}`);
  return user?.savedCountries ?? [];
};

export const toggleCountryStatus = (alpha3Code, status) => {
  const userId = getLoggedInUserId();
  if (!userId) return null;

  const key = `user_data_${userId}`;
  const user = getItem(key);
  if (!user) return null;

  const current = user.savedCountries.find((c) => c.countryCode === alpha3Code);
  const alreadySameStatus = current?.status === status;

  const withoutThisCountry = user.savedCountries.filter(
    (c) => c.countryCode !== alpha3Code,
  );

  const updatedList = alreadySameStatus
    ? withoutThisCountry
    : [...withoutThisCountry, { countryCode: alpha3Code, status }];

  setItem(key, { ...user, savedCountries: updatedList });

  return updatedList;
};
