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
  const valueSizes = props.action ? { xs: 9, sm: 9, md: 8 } : { xs: 12, sm: 12, md: 9 };
  return (
    <RowStyled container alignItems={'stretch'}>
      <LabelStyled container item xs={12} sm={12} md={3} alignItems={'center'}>
        {props.label}
      </LabelStyled>
      <ValueStyled container item {...valueSizes} alignItems={'center'}>
        {props.children}
      </ValueStyled>
      {props.action && (
        <ActionStyled container item xs={3} sm={3} md={1} alignItems={'center'}>
          <Divider orientation='vertical' sx={{ mr: '10px', height: 19 }} />
          {props.action}
        </ActionStyled>
      )}
    </RowStyled>
  );
};

export const SummaryPaperWrapper: React.FC = ({ children }) => {
  return (
    <PaperStyled>
      <Grid spacing={1} container>
        {children}
      </Grid>
    </PaperStyled>
  );
};

export default SummaryPaperWrapper;
