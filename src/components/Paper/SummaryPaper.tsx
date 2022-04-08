import { Grid } from '@mui/material';
import React from 'react';
import { LabelStyled, PaperStyled, RowStyled, ValueStyled } from './SummaryPaper.styled';

export type SummaryPaperData = {
  label: string | JSX.Element;
  value: number | string | JSX.Element;
};

const SummaryPaper: React.FC<{ data: SummaryPaperData[] }> = ({ data }) => {
  return (
    <PaperStyled>
      <Grid container>
        {data.map(({ label, value }, index) => {
          return (
            <React.Fragment key={index}>
              <RowStyled container alignItems={'stretch'}>
                <LabelStyled container item xs={12} sm={12} md={3} alignItems={'center'}>
                  {label}
                </LabelStyled>
                <ValueStyled container item xs={12} sm={12} md={9} alignItems={'center'}>
                  {value}
                </ValueStyled>
              </RowStyled>
            </React.Fragment>
          );
        })}
      </Grid>
    </PaperStyled>
  );
};

export default SummaryPaper;
