import { renderHook } from '@testing-library/react-hooks';

import useNewnessTracker from './useNewnessTracker';

type Item = { id: string, value: number };
const items = [{ id: 'one', value: 1 }, { id: 'two', value: 2 }, { id: 'three', value: 3 }];
const newItems = [{ id: 'four', value: 4 }, { id: 'five', value: 5 }];
const lastItems = [{ id: 'six', value: 6 }, { id: 'seven', value: 7 }];

test(`${useNewnessTracker.name} hook`, async () => {
  const hook = renderHook((i: Item[] = items) => useNewnessTracker(i, 'id'));

  hook.rerender(items.slice(1, 3).concat(newItems));

  expect(hook.result.current).toEqual([
    { id: 'four', new: true, value: 4 },
    { id: 'five', new: true, value: 5 },
    { id: 'two', new: false, value: 2 },
    { id: 'three', new: false, value: 3 }
  ]);

  const renderedItems = hook.result.current.slice(0, 2) as Item[];

  hook.rerender(renderedItems.concat(lastItems));

  expect(hook.result.current).toEqual([
    { id: 'six', new: true, value: 6 },
    { id: 'seven', new: true, value: 7 },
    { id: 'four', new: false, value: 4 },
    { id: 'five', new: false, value: 5 },
  ]);
});