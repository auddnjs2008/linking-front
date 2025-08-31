import { useState, useEffect } from "react";

export const useDebounce = <T>(value: T, debounce: number): T => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, debounce);

    return () => {
      clearTimeout(timer);
    };
  }, [value, debounce]);

  return debounceValue;
};
