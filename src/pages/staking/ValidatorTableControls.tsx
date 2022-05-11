import { Tabs, Tab, Typography } from '@mui/material';
import React, { FC, useCallback }  from 'react';

export type ValidatorFilter = 'waiting' | 'current';
export type ValidatorFilterLabels = Record<ValidatorFilter, string | React.ReactNode>;

const filters: ValidatorFilter[] = ['current', 'waiting'];

type Props= {
  labels: ValidatorFilterLabels,
  onSelect: (interval: ValidatorFilter) => void;
  selected: ValidatorFilter;
}

const ValidatorTableControls: FC<Props> = ({ labels, onSelect, selected }) => {
  const select = useCallback((fitler: ValidatorFilter) => () => onSelect(fitler), [onSelect]);

  return (
    <Tabs value={selected}>
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
    </Tabs>
  );
}

export default ValidatorTableControls;
