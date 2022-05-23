import { Divider, Grid } from '@mui/material';
import React, { FC, ReactNode } from 'react';
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

export const SummaryRow: FC<{ label: ReactNode; action?: ReactNode }> = (props) => {
  const valueSizes = props.action ? { xs: 8, sm: 8, md: 7 } : { xs: 12, sm: 12, md: 9 };
  return (
    <RowStyled container alignItems={'stretch'}>
      <LabelStyled container item xs={12} sm={12} md={3} alignItems={'center'}>
        {props.label}
      </LabelStyled>
      <ValueStyled container item {...valueSizes} alignItems={'center'}>
        {props.children}
      </ValueStyled>
      {props.action && (
        <ActionStyled container item xs={4} sm={4} md={2} alignItems={'center'}>
          <Divider orientation='vertical' sx={{ ml: 1, mr: 3, height: 19 }} />
          {props.action}
        </ActionStyled>
      )}
    </RowStyled>
  );
};

export const SummaryPaperWrapper: React.FC = ({ children }) => {
  return (
    <PaperStyled>
      <Grid container>{children}</Grid>
    </PaperStyled>
  );
};

const SummaryPaper: React.FC<{
  data: SummaryPaperData[];
}> = ({ data }) => {
  return (
    <PaperStyled>
      <Grid container>
        {data.map((item, index) => (
          <SummaryRow label={item.label} action={item.action} key={index}>
            {item.value}
          </SummaryRow>
        ))}
      </Grid>
    </PaperStyled>
  );
};

export default SummaryPaper;
