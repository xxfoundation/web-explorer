import React, { FC } from 'react';
import useRows from '../../hooks/useRows';
import SummaryPaper from '../Paper/SummaryPaper';

const BlockSummary: FC = () => {
  return (
    <SummaryPaper
      data={useRows(9).map((Row) => {
        return { label: <Row width={'90%'} />, value: <Row width={'90%'} /> };
      })}
    />
  );
};

export default BlockSummary;
