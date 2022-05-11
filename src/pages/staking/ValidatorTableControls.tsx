import { styled, Tabs, Tab, Typography } from '@mui/material';
import React, { FC, useCallback }  from 'react';

export type ValidatorFilter = 'waiting' | 'current';
export type ValidatorFilterLabels = Record<ValidatorFilter, string | React.ReactNode>;

const filters: ValidatorFilter[] = ['current', 'waiting'];

type Props= {
  labels: ValidatorFilterLabels,
  onSelect: (interval: ValidatorFilter) => void;
  selected: ValidatorFilter;
}

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  '& .MuiTabs-indicatorSpan': {
    width: '78%',
    height: 1,
    backgroundColor: theme.palette.primary.main
  }
}))

const ValidatorTableControls: FC<Props> = ({ labels, onSelect, selected }) => {
  const select = useCallback((fitler: ValidatorFilter) => () => onSelect(fitler), [onSelect]);

  return (
    <StyledTabs value={selected} TabIndicatorProps={{ children: <span className='MuiTabs-indicatorSpan' /> }}>
      {filters.map((option) => (
        <Tab
          label={
            <Typography variant={'subheader4'} sx={{ fontSize: 14, letterSpacing: 1.5 }} color={selected === option ? 'primary' : 'inherit'}>
              {labels[option]}
            </Typography>
          }
          value={option}
          key={option}
          color={selected === option ? 'primary' : 'inherit'}
          onClick={select(option)}
        />
      ))}
    </StyledTabs>
  );
}

export default ValidatorTableControls;
