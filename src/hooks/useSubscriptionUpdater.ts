import { useEffect, useState } from 'react';

type Props<T> = {
  newData?: T[];
  key: keyof T;
};

export const useSubscriptionUpdater = <T extends object>(props: Props<T>) => {
  const [state, setState] = useState<{ data: T[] }>({ data: [] });
  useEffect(() => {
    const oldHashes = state.data.map((item) => item[props.key]);
    setState((prevState) => ({
      ...prevState,
      data: (props.newData || []).map((item) => ({
        ...item,
        newEntry: oldHashes.length && !oldHashes.includes(item[props.key])
      }))
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.newData]);
  return state.data;
};
