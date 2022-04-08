import { Grid } from '@mui/material';
import { PaperStyled, RowStyled, LabelStyled, ValueStyled } from './SummaryPaper.styled';
import React from 'react'; 

export type SummaryPaperData = { label: string; value: number | string | JSX.Element };

const SummaryPaper: React.FC<{ data: SummaryPaperData[] }> = ({ data }) => {
  return (
    <PaperStyled>
      <Grid container>
        {data.map(({ label, value }) => {
          return (
            <React.Fragment key={label}>
              <RowStyled container>
                <LabelStyled item xs={12} sm={12} md={3}>
                  {label}
                </LabelStyled>
                <ValueStyled item xs={12} sm={12} md={9}>
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
