import { styled, Tabs, Tab } from '@mui/material';
import React, { FC, useCallback } from 'react';

export type ValidatorFilter = 'waiting' | 'current';
export type ValidatorFilterLabels = Record<ValidatorFilter, string | React.ReactNode>;

const filters: ValidatorFilter[] = ['current', 'waiting'];

type Props = {
  labels: ValidatorFilterLabels;
  onSelect: (interval: ValidatorFilter) => void;
  selected: ValidatorFilter;
};

const StyledTabs = styled(Tabs)(({ theme }) => ({
  marginLeft: -16,
  marginRight: -16,
  p: {
    fontSize: '13px',
    fontWeight: '700'
  },
  '& .MuiTab-textColorPrimary': {
    color: theme.palette.grey[400]
  },
  '& .MuiTab-textColorPrimary.Mui-selected': {
    color: theme.palette.primary.main
  },
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
}));

const ValidatorTableControls: FC<Props> = ({ labels, onSelect, selected }) => {
  const select = useCallback((fitler: ValidatorFilter) => () => onSelect(fitler), [onSelect]);

  return (
    <StyledTabs
      value={selected}
      TabIndicatorProps={{ children: <span className='MuiTabs-indicatorSpan' /> }}
    >
      {filters.map((option) => (
        <Tab
          label={labels[option]}
          value={option}
          key={option}
          color={selected === option ? 'primary' : 'inherit'}
          onClick={select(option)}
        />
      ))}
    </StyledTabs>
  );
};

export default ValidatorTableControls;
