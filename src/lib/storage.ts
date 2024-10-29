import { useState, useEffect } from "react";

export function getStorageValue<T>(key: string, defaultValue: T): T {
  // getting stored value
  // const saved = localStorage.getItem(key);
  // const initial = JSON.parse(saved!);

  // return initial || defaultValue;

  const saved = localStorage.getItem(key);
  if (saved === null) {
    return defaultValue;
  }
  try {
    const initial = JSON.parse(saved!);
    return initial;
  } catch (error) {
    console.log("something went wrong", error);
    return defaultValue;
  }
}

export function setStorageValue<T>(key: string, val: T) {
  const value = JSON.stringify(val);
  localStorage.setItem(key, value);
}

export const useLocalStorage = <T>(key: string, defaultValue: T): [T, any] => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
