import React, { FC } from 'react';
import genSkeletons from '../genSkeletons';
import { SummaryPaperWrapper, SummaryRow } from './SummaryPaper';

const SummaryLoader: FC<{ number: number }> = ({ number }) => {
  return (
    <SummaryPaperWrapper>
      {genSkeletons(number).map((Row) => {
        return <SummaryRow label={<Row width={'90%'} />}>{<Row width={'90%'} />}</SummaryRow>;
      })}
    </SummaryPaperWrapper>
  );
};

export default SummaryLoader;
