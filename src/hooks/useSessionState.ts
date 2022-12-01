import React, { useCallback } from 'react';

const useSessionState = <T = unknown>(keyName: string, defaultValue: T): [value: T, setValue: (v: T) => void] => {
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    try {
      const value = window.sessionStorage.getItem(keyName);

      if (value) {
        return JSON.parse(value);
      } else {
        window.sessionStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = useCallback((newValue: T) => {
    try {
      window.sessionStorage.setItem(keyName, JSON.stringify(newValue));
      setStoredValue(newValue);
    } catch (err) {
      console.error('Session storage set value error');
    }
  }, [keyName]);

  return [storedValue, setValue];
};

export default useSessionState;