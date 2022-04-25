import React, { FC } from 'react';
import { Box,  styled, Typography } from '@mui/material';

const BarContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  paddingLeft: '0.25rem',
  paddingRight: '0.25rem',
  '&:hover .bar-information, &.active .bar-information': {
    visibility: 'visible',
  },
  '&:hover .bar-progress, &.active .bar-progress': {
    backgroundImage: 'none',
    backgroundColor: theme.palette.primary.dark,
  }
}));

const Bar = styled('div')({
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'column',
  justifyContent: 'flex-end',
  width: '1rem',
});

const Progress = styled('div')(({ index, of, percent }: { percent: number, index: number, of: number }) => ({
  height: `${percent}%`,
  borderRadius: '15px 15px 5px 5px',
  backgroundImage: 'linear-gradient(45deg, #75afff, #8beef1)',
  backgroundSize: '1000%',
  backgroundPosition: `${((index / of) * 100)}%`
}));

const BarInformation = styled('div')(({ theme }) => ({
  visibility: 'hidden',
  position: 'absolute',
  top: '100%',
  left: 0,
  marginTop: theme.spacing(1.5),
  marginLeft: theme.spacing(1.25),
  padding: theme.spacing(2),
  paddingBottom: 0,
  borderLeft: 'solid 1px',
  borderColor: theme.palette.grey[300],
  color: theme.palette.grey[400],
}))


export type Props = {
  active?: boolean;
  percent?: number;
  index?: number;
  of?: number;
  infoLabel?: string | React.ReactNode;
}

const BarComponent: FC<Props> = ({ active, children, index = 1, infoLabel, of = 1, percent = 0 }) => {
  return (
    <BarContainer className={`bar ${active ? 'active' : ''}`}>
      <Bar>
        <Progress className='bar-progress' index={index} of={of} percent={percent} />
      </Bar>
      <Box sx={{ mt: 1 }} style={{ textAlign: 'center', height: '1rem' }}>
        {
          index % 2 === 1
            ? (
            <Typography variant='subheader4'>
              {children}
            </Typography>)
            : null
        }
      </Box>
      {infoLabel && (
        <BarInformation
          className='bar-information'
        >
          {infoLabel}
        </BarInformation>
      )}
    </BarContainer>
  );
}


export default BarComponent;
