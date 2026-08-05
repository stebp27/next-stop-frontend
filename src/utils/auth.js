import { setItem, getItem, removeItem } from "../utils/localStorage";
import { BASE_URL, CACHE_EXPIRE_AFTER } from "./constants";

export const register = (email, password) => {
  return fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}?email=${email}`)
    .then((res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`),
    )
    .then((users) => {
      const user = users[0];

      if (!user || user.password !== password) {
        return Promise.reject("Invalid credentials");
      }

      const token = `mock-${crypto.randomUUID()}`;

      setItem("session", { token, userId: user.id }); // scade

      if (!getItem(`user_data_${user.id}`)) {
        setItem(`user_data_${user.id}`, { ...user, savedCountries: [] }); // non scade
      }

      return {
        token,
        user: getItem(`user_data_${user.id}`),
      };
    });
};

// verifyToken simulates the behavior of a future JWT-based verifyToken.
// The validity check here only confirms the session exists and hasn't
// exceeded the expiration we set client-side — it is not a real
// cryptographic verification of the token.
export const verifyToken = () => {
  const session = getItem("session", CACHE_EXPIRE_AFTER);
  if (!session) return Promise.reject("No active session");

  const user = getItem(`user_data_${session.userId}`);
  if (!user) return Promise.reject("No user data found");

  return Promise.resolve({ token: session.token, user });
};

export const logout = () => {
  removeItem("session");
};

export const getLoggedInUserId = () => {
  const session = getItem("session", CACHE_EXPIRE_AFTER);
  return session?.userId ?? null;
};
