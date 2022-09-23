import React from 'react';
import { mount } from 'enzyme';
import Address from './XXNetworkAddress';
import { BrowserRouter } from 'react-router-dom';

const testHash = '007fd2b9f761c8f298cd6a43af71399b';
const nonBreakingSpace = '\u00a0';

describe('Without denomination, without precision amounts', () => {
  it('Should the address', () => {
    const wrapper = mount(
      <BrowserRouter>
        <Address roles={{
          council: false,
          nominator: true,
          special: '',
          techcommit: false,
          validator: false,
        }} value={testHash} />
      </BrowserRouter>
    )

    const text = wrapper.text().replaceAll(nonBreakingSpace, ' ');

    expect(text).toEqual(testHash);
  });

  it('Should override with name when present', () => {
    const name = 'Hello';
    const wrapper = mount(
      <BrowserRouter>
        <Address roles={{
          council: false,
          nominator: true,
          special: '',
          techcommit: false,
          validator: false,
        }} name={name} value={testHash} />
      </BrowserRouter>
    )

    const text = wrapper.text().replaceAll(nonBreakingSpace, ' ');

    expect(text).toEqual(name);
  });
});