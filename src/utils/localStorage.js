const PREFIX = "nextstop_";

function buildKey(key) {
  return `${PREFIX}${key}`;
}

export function setItem(key, value) {
  const entry = {
    value,
    cachedAt: Date.now(),
  };
  localStorage.setItem(buildKey(key), JSON.stringify(entry));
}

export function getItem(key, maxAge = null) {
  const stored = localStorage.getItem(buildKey(key));
  if (!stored) return null;

  const { value, cachedAt } = JSON.parse(stored);

  if (maxAge !== null) {
    const isExpired = Date.now() - cachedAt > maxAge;
    if (isExpired) {
      localStorage.removeItem(buildKey(key));
      return null;
    }
  }

  return value;
}

export function removeItem(key) {
  localStorage.removeItem(buildKey(key));
}
