import { Divider, Grid, Skeleton } from '@mui/material';
import React, { FC } from 'react';
import {
  ActionStyled,
  LabelStyled,
  PaperStyled,
  RowStyled,
  ValueStyled
} from './SummaryPaper.styled';

export type SummaryPaperData = {
  label: string | JSX.Element;
  value: number | string | JSX.Element;
  action?: JSX.Element;
};

const SummaryRow: FC<{ item: SummaryPaperData }> = ({ item: { action, label, value } }) => {
  const valueSizes = action ? { xs: 8, sm: 8, md: 7 } : { xs: 12, sm: 12, md: 9 };
  return (
    <RowStyled container alignItems={'stretch'}>
      <LabelStyled container item xs={12} sm={12} md={3} alignItems={'center'}>
        {label}
      </LabelStyled>
      <ValueStyled container item {...valueSizes} alignItems={'center'}>
        {value}
      </ValueStyled>
      {action && (
        <ActionStyled container item xs={4} sm={4} md={2} alignItems={'center'}>
          <Divider orientation='vertical' sx={{ ml: 1, mr: 3, height: 19 }} />
          {action}
        </ActionStyled>
      )}
    </RowStyled>
  );
};

const summarySkeleton = () => {
  return { label: <Skeleton width={'90%'} />, value: <Skeleton width={'90%'} /> };
};

const SummaryPaper: React.FC<{
  data: SummaryPaperData[];
  loading?: boolean;
  skeletonLines?: number;
}> = ({ data, loading, skeletonLines = 4 }) => {
  return (
    <PaperStyled>
      <Grid container>
        {loading
          ? [...Array(skeletonLines).keys()].map((index) => (
              <SummaryRow item={summarySkeleton()} key={index} />
            ))
          : data.map((item, index) => <SummaryRow item={item} key={index} />)}
      </Grid>
    </PaperStyled>
  );
};

export default SummaryPaper;
