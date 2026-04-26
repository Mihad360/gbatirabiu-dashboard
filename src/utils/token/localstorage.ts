export const getFromLocalStorage = (key: string): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(key);
};

export const setToLocalStorage = (key: string, value: string): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, value);
};

export const removeFromLocalStorage = (key: string): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
};
