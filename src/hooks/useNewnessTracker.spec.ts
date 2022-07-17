import { renderHook } from '@testing-library/react-hooks';

import useNewnessTracker from './useNewnessTracker';

type Item = { id: string, value: number };
const items = [{ id: 'one', value: 1 }, { id: 'two', value: 2 }, { id: 'three', value: 3 }];
const secondUpdate = [{ id: 'one', value: 1 }, { id: 'four', value: 4 }, { id: 'five', value: 5 }];
const thirdUpdate = [{ id: 'six', value: 6 }, { id: 'seven', value: 7 }, { id: 'four', value: 4 }, { id: 'five', value: 5 }];

test(`${useNewnessTracker.name} hook`, async () => {
  const hook = renderHook((i: Item[] = items) => useNewnessTracker(i, 'id'));

  hook.rerender(secondUpdate);

  expect(hook.result.current).toEqual([
    { id: 'one', new: false, value: 1 },
    { id: 'four', new: true, value: 4 },
    { id: 'five', new: true, value: 5 }
  ]);

  hook.rerender(thirdUpdate);

  expect(hook.result.current).toEqual([
    { id: 'six', new: true, value: 6 },
    { id: 'seven', new: true, value: 7 },
    { id: 'four', new: false, value: 4 },
    { id: 'five', new: false, value: 5 },
  ]);
});