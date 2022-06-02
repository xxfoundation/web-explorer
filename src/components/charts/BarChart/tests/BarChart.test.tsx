import { mount } from 'enzyme';
import MockDate from 'mockdate';
import React from 'react';
import Bar from '../Bar';
import BarChart from '../BarChart';
import BarDivider from '../BarDivider';
import LegendTicks from '../LegendTicks';
import { hourCounts, tenMinCounts } from './timestamps';

beforeEach(() => {
  MockDate.set('2020-01-04 00:00:00');
});

afterEach(() => {
  MockDate.reset();
});

describe('When displaying 10 min counts', () => {
  it('should show two bars and one divider', () => {
    const wrapper = mount(<BarChart series={{ timestamps: tenMinCounts }} interval={'1h'} />);
    expect(wrapper.find(Bar).getElements().length).toEqual(2);
    expect(wrapper.find(LegendTicks).getElements().length).toEqual(1);
    expect(wrapper.find(BarDivider).getElements().length).toEqual(1);
  });

  it('Should only have one bar after selecting 6h option', () => {
    const wrapper = mount(<BarChart series={{ timestamps: tenMinCounts }} interval={'6h'} />);
    wrapper.update();
    expect(wrapper.find(Bar).getElements().length).toEqual(1);
  });
});

describe('When displaying 1 hour counts', () => {
  it('should show 16 bars and one divider', () => {
    const wrapper = mount(<BarChart series={{ timestamps: hourCounts }} interval={'1h'} />);
    expect(wrapper.find(Bar).getElements().length).toEqual(16);
    expect(wrapper.find(LegendTicks).getElements().length).toEqual(1);
    expect(wrapper.find(BarDivider).getElements().length).toEqual(1);
  });

  it('Should only have one bar after 1d', () => {
    const wrapper = mount(<BarChart series={{ timestamps: hourCounts }} interval={'1d'} />);
    wrapper.update();
    expect(wrapper.find(Bar).getElements().length).toEqual(1);
  });
});
