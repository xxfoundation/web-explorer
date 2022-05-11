import React, { FC } from 'react';
import { styled } from '@mui/material';
import { BAR_PADDING, BAR_WIDTH } from './config';


const Bar = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  paddingLeft: BAR_PADDING,
  paddingRight: BAR_PADDING,
  '&:hover .bar-information, &.active .bar-information': {
    visibility: 'visible',
  },

  '&:hover .bar-progress, &.active .bar-progress': {
    backgroundImage: 'none',
    backgroundColor: theme.palette.primary.dark,
  },
  flexGrow: 1,
  flex: `0 0 ${BAR_WIDTH}`
}));

const Progress = styled('div')(({ index, of, percent }: { percent: number, index: number, of: number }) => ({
  height: `${percent}%`,
  borderRadius: '15px 15px 5px 5px',
  backgroundImage: 'linear-gradient(45deg, #75afff, #8beef1)',
  backgroundSize: '1000%',
  backgroundPosition: `${((index / of) * 100)}%`
}));

export type Props = {
  active?: boolean;
  percent?: number;
  index?: number;
  of?: number;
}

const BarComponent: FC<Props & JSX.IntrinsicElements['div']> = ({ active, index = 1, of = 1, percent = 0, ...rest }) => {
  return (
    <Bar {...rest} className={`bar ${active ? 'active' : ''}`}>
      <Progress
        className='bar-progress'
        index={index}
        of={of}
        percent={percent} />
    </Bar>
  );
}


export default BarComponent;
