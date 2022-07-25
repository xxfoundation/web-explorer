import { mount } from 'enzyme';
import MockDate from 'mockdate';
import React from 'react';
import Bar from '../Bar';
import BarChart from '../BarChart';
import BarDivider from '../BarDivider';
import LegendTicks from '../LegendTicks';
import { hourCounts, tenMinCounts } from './timestamps';
import { convertTimestamps } from '../utils';

beforeEach(() => {
  MockDate.set('2020-01-04 00:00:00');
});

afterEach(() => {
  MockDate.reset();
});

describe('When displaying 10 min counts', () => {
  it('should show two bars and one divider', () => {
    const data = convertTimestamps(tenMinCounts, '1h');
    const wrapper = mount(<BarChart series={{ data }} interval={'1h'} />);
    expect(wrapper.find(Bar).getElements().length).toEqual(2);
    expect(wrapper.find(LegendTicks).getElements().length).toEqual(1);
    expect(wrapper.find(BarDivider).getElements().length).toEqual(1);
  });

  it('Should only have one bar after selecting 6h option', () => {
    const data = convertTimestamps(tenMinCounts, '6h');
    const wrapper = mount(<BarChart series={{ data }} interval={'6h'} />);
    wrapper.update();
    expect(wrapper.find(Bar).getElements().length).toEqual(1);
  });
});

describe('When displaying 1 hour counts', () => {
  it('should show 16 bars and one divider', () => {
    const data = convertTimestamps(hourCounts, '1h');
    const wrapper = mount(<BarChart series={{ data }} interval={'1h'} />);
    expect(wrapper.find(Bar).getElements().length).toEqual(16);
    expect(wrapper.find(LegendTicks).getElements().length).toEqual(1);
    expect(wrapper.find(BarDivider).getElements().length).toEqual(1);
  });

  it('Should only have one bar after 1d', () => {
    const data = convertTimestamps(hourCounts, '1d');
    const wrapper = mount(<BarChart series={{ data }} interval={'1d'} />);
    wrapper.update();
    expect(wrapper.find(Bar).getElements().length).toEqual(1);
  });
});
