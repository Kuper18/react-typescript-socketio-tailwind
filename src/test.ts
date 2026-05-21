import { useEffect, useState } from 'react';

const useDebounce = <T>(value: T, timer = 1000): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handleTimeout = setTimeout(() => setDebouncedValue(value), timer);

    return () => clearTimeout(handleTimeout);
  }, [value, timer]);

  return debouncedValue;
};

export default useDebounce;
