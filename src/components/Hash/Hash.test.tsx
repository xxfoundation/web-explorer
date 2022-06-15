import React from 'react';
import { shallow } from 'enzyme';
import { ResponsiveHash } from './Hash';

const testHash = '007fd2b9f761c8f298cd6a43af71399b';
const nonBreakingSpace = '\u00a0';

describe('Without denomination, without precision amounts', () => {
  it('Should display the hash with a 4 offset correctly', () => {
    const wrapper = shallow(
      <ResponsiveHash value={testHash} truncated offset={4} />
    )

    const text = wrapper.text().replaceAll(nonBreakingSpace, ' ');

    expect(text).toEqual('007f...399b');
  });

  it('Should display the hash with a 2 offset correctly', () => {
    const wrapper = shallow(
      <ResponsiveHash value={testHash} truncated  offset={2} />
    )

    const text = wrapper.text().replaceAll(nonBreakingSpace, ' ');

    expect(text).toEqual('00...9b');
  });

  it('Should display the hash correctly', () => {
    const wrapper = shallow(
      <ResponsiveHash value={testHash}  />
    )

    const text = wrapper.text().replaceAll(nonBreakingSpace, ' ');

    expect(text).toEqual(testHash);
  });
});