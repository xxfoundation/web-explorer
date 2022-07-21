import React, { FC } from 'react';
import { styled } from '@mui/material';

import { BAR_PADDING, BAR_WIDTH } from './config';


const Bar = styled('div')(({ theme }) => ({
  zIndex: 1,
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  paddingLeft: BAR_PADDING,
  paddingRight: BAR_PADDING,
  '&.inversed': {
    justifyContent: 'flex-start',
  },
  '&.active .bar-progress': {
    backgroundImage: 'none',
    backgroundColor: theme.palette.primary.dark,
  },

  '&.inversed.active .bar-progress': {
    backgroundImage: 'none',
    backgroundColor: theme.palette.grey[400],
  },
  flexGrow: 1,
  flex: `0 0 ${BAR_WIDTH}`
}));

type ProgressProps = {
  percent: number,
  index: number,
  of: number,
  inverse?: boolean 
}

const Progress = styled('div')<ProgressProps>(({ index, of, percent }) => ({
  '&.inversed': {
    borderRadius: '5px 5px 15px 15px',
    backgroundImage: 'none',
    backgroundColor: '#C4C4C4',
  },
  height: `${percent}%`,
  borderRadius: '15px 15px 5px 5px',
  backgroundImage: 'linear-gradient(45deg, #75afff, #8beef1)',
  backgroundSize: '1000%',
  backgroundPosition: `${((index / of) * 100)}%`,
  boxShadow: '0 5px 0 0 white'
}));

export type Props = {
  active?: boolean;
  percent?: number;
  index?: number;
  inverse?: boolean;
  of?: number;
}

const BarComponent: FC<Props & JSX.IntrinsicElements['div']> = ({ active, index = 1, inverse, of = 1, percent = 0, ...rest }) => {

  return (
    <Bar {...rest} className={`bar ${active ? 'active' : ''} ${inverse ? 'inversed' : ''}`}>
      <Progress
        className={`${inverse ? 'inversed' : ''}  bar-progress`}
        index={index}
        of={of}
        percent={percent} />
    </Bar>
  );
}

export default React.memo(BarComponent, (prev, next) => 
  prev.active === next.active
  && prev.percent === next.percent
  && prev.index === next.index
  && prev.inverse === next.inverse
  && prev.of === next.of
);
