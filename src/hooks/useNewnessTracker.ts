import { useEffect, useState } from 'react';

export type WithNew<T> = T & { new: boolean };

const useNewnessTracker = <T>(items: T[] | undefined, idKey: keyof T): WithNew<T>[] | undefined => {
  const [tracked, setTracked] = useState<WithNew<T>[] | undefined>(
    items?.map((i) => ({ ...i, new: false }))
  );

  useEffect(() => {
    setTracked(
      (oldItems) => {
        return items?.map((item): WithNew<T> => ({
          new: oldItems?.find((old) => old[idKey] === item[idKey]) === undefined,
          ...item,
        }));
      }
    );
  }, [idKey, items]);

  return tracked;
}

export default useNewnessTracker;
