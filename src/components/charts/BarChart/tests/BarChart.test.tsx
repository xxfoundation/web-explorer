import React from 'react';
import MockDate from 'mockdate'
import { mount } from 'enzyme';
import BarChart from '../BarChart';
import Bar from '../Bar';
import BarDivider from '../BarDividerBox';
import Controls from '../Controls';
import Legend from '../Legend';
import { hourCounts, tenMinCounts } from './timestamps';
import { act } from 'react-dom/test-utils';
import { Button } from '@mui/material';

beforeEach(() => {
  MockDate.set('2020-01-04 00:00:00');
});

afterEach(() => {
  MockDate.reset()
})

describe('When displaying 10 min counts', () => {
  const wrapper = mount(
    <BarChart series={{ timestamps: tenMinCounts }} />
  );

  it('should show two bars and one divider', () => {
    expect(wrapper.find(Bar).getElements().length).toEqual(2);
    expect(wrapper.find(Controls).getElements().length).toEqual(1);
    expect(wrapper.find(Legend).getElements().length).toEqual(1);
    expect(wrapper.find(BarDivider).getElements().length).toEqual(1);
  });


  it('Should only have one bar after selecting 6h option', () => {
    act(() => {
      // assumes 6h is option #2
      wrapper.find(Controls).find(Button).at(1).find('button').simulate('click');
    });
    wrapper.update();
    expect(wrapper.find(Bar).getElements().length).toEqual(1);
  });
});

describe('When displaying 1 hour counts', () => {
  const wrapper = mount(
    <BarChart series={{ timestamps: hourCounts }} />
  );

  it('should show 16 bars and one divider', () => {
    expect(wrapper.find(Bar).getElements().length).toEqual(16);
    expect(wrapper.find(Controls).getElements().length).toEqual(1);
    expect(wrapper.find(Legend).getElements().length).toEqual(1);
    expect(wrapper.find(BarDivider).getElements().length).toEqual(1);
  });

  it('Should only have one bar after 1d', () => {
    act(() => {
      // assumes 1d is option #3
      wrapper.find(Controls).find(Button).at(2).find('button').simulate('click');
    });
    wrapper.update();
    expect(wrapper.find(Bar).getElements().length).toEqual(1);
  });
});

