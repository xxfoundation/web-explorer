import React from 'react';
import { shallow } from 'enzyme';
import FormatBalance from './FormatBalance';
import { formatBalance } from './formatter';

const nonBreakingSpace = '\u00a0';

describe('Without denomination, without precision amounts', () => {
  it('Should display 100 correctly', () => {
    const wrapper = shallow(
      <FormatBalance value={'100'} denomination={0} precision={0} />
    )
    const text = wrapper.text().replaceAll(nonBreakingSpace, ' ');

    expect(text).toEqual('100 XX');
  });

  it('Should display 10,000 correctly', () => {
    const wrapper = shallow(
      <FormatBalance value={'10000'} denomination={0} precision={0} />
    )
    const text = wrapper.text().replaceAll(nonBreakingSpace, ' ');
    expect(text).toEqual('10,000 XX');
  });

  it('Should display millions with an M', () => {
    const wrapper = shallow(
      <FormatBalance value={'26000000'} denomination={0} precision={0} />
    )
    const text = wrapper.text().replaceAll(nonBreakingSpace, ' ');
    expect(text).toEqual('26 MXX');
  })
});

describe('Zero denomination, has precision amounts', () => {
  it('Should display 100 correctly', () => {
    const wrapper = shallow(
      <FormatBalance value={'100'} denomination={0} precision={2} />
    )
    const text = wrapper.text().replaceAll(nonBreakingSpace, ' ');

    expect(text).toEqual('100.00 XX');
  });

  it('Should display 10,000 correctly', () => {
    const wrapper = shallow(
      <FormatBalance value={'10000'} denomination={0} precision={9} />
    )
    const text = wrapper.text().replaceAll(nonBreakingSpace, ' ');
    expect(text).toEqual('10,000.000000000 XX');
  });

  it('Should display millions with an M', () => {
    const wrapper = shallow(
      <FormatBalance value={'26000000'} denomination={0} precision={2} />
    )
    const text = wrapper.text().replaceAll(nonBreakingSpace, ' ');
    expect(text).toEqual('26.00 MXX');
  });

  it('Should display billions with a B', () => {
    const wrapper = shallow(
      <FormatBalance value={'26236000000'} denomination={0} precision={2} />
    )
    const text = wrapper.text().replaceAll(nonBreakingSpace, ' ');
    expect(text).toEqual('26.23 BXX');
  })
});

describe('With denomination', () => {
  it('Should display 100000', () => {
    const wrapper = shallow(
      <FormatBalance value={'100000'} denomination={3} precision={2} />
    )
    const text = wrapper.text().replaceAll(nonBreakingSpace, ' ');
    expect(text).toEqual('100.00 XX');
  });


  it('Should display 100000', () => {
    const wrapper = shallow(
      <FormatBalance value={'100'} denomination={3} precision={2} />
    )
    const text = wrapper.text().replaceAll(nonBreakingSpace, ' ');
    expect(text).toEqual('0.10 XX');
  });
})

describe('Should truncate, not round', () => {
  it('Should display 100000', () => {
    const wrapper = shallow(
      <FormatBalance value={'123456'} denomination={4} precision={2} />
    )
    const text = wrapper.text().replaceAll(nonBreakingSpace, ' ');
    expect(text).toEqual('12.34 XX');
  });
});
