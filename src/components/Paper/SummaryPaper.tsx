import { Divider, Grid } from '@mui/material';
import React from 'react';
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

const SummaryPaper: React.FC<{ data: SummaryPaperData[] }> = ({ data }) => {
  return (
    <PaperStyled>
      <Grid container>
        {data.map(({ action, label, value }, index) => {
          const valueSizes = action ? { xs: 8, sm: 8, md: 7 } : { xs: 12, sm: 12, md: 9 };
          return (
            <React.Fragment key={index}>
              <RowStyled container alignItems={'stretch'}>
                <LabelStyled container item xs={12} sm={12} md={3} alignItems={'center'}>
                  {label}
                </LabelStyled>
                <ValueStyled container item {...valueSizes} alignItems={'center'}>
                  {value}
                </ValueStyled>
                {action && (
                  <ActionStyled container item xs={4} sm={4} md={2} alignItems={'center'}>
                    <Divider orientation='vertical' sx={{ ml:1,  mr: 3, height: 19 }} />
                    {action}
                  </ActionStyled>
                )}
              </RowStyled>
            </React.Fragment>
          );
        })}
      </Grid>
    </PaperStyled>
  );
};

export default SummaryPaper;
