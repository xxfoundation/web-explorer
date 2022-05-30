import { useEffect, useState } from 'react';

export type WithNew<T> = T & { new: boolean };

const useNewnessTracker = <T>(items: T[] | undefined, idKey: keyof T): WithNew<T>[] | undefined => {
  const [tracked, setTracked] = useState<WithNew<T>[] | undefined>(
    items?.map((i) => ({ ...i, new: false }))
  );

  useEffect(() => {
    setTracked(
      (oldItems) => {
        const oldIds = oldItems?.map((v) => v[idKey]) as T[keyof T][] ?? [];
        const currentIds = items?.map((i) => i[idKey]) ?? [];
        const itemsToAdd = items?.filter((i) => !oldIds.includes(i[idKey]))
          .map((i) => ({...i, new: true })) ?? [];

        const idsOfItemsToRemove = oldIds.filter((id) => !currentIds.includes(id))

        return itemsToAdd.concat(
          oldItems?.map((i) => ({ ...i, new: false })).filter(
            (i) => !idsOfItemsToRemove.includes(i[idKey])
          ) ?? []
        );
      }
    );
  }, [idKey, items]);

  return tracked;
}

export default useNewnessTracker;
