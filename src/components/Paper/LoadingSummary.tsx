import React, { FC } from 'react';
import genSkeletons from '../genSkeletons';
import SummaryPaper from './SummaryPaper';

const LoadingSummary: FC<{ number: number }> = ({ number }) => {
  return (
    <SummaryPaper
      data={genSkeletons(number).map((Row) => {
        return { label: <Row width={'90%'} />, value: <Row width={'90%'} /> };
      })}
    />
  );
};

export default LoadingSummary;
