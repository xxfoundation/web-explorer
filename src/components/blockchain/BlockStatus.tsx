import ClockIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { Box } from '@mui/material';
import { default as React, FC } from 'react';

const statusToIconMap: Record<string, React.ReactElement> = {
  pending: (
    <Box aria-label={'Pending'}>
      <ClockIcon color='warning' />
    </Box>
  ),
  completed: (
    <Box aria-label={'Completed'}>
      <CheckCircleOutlinedIcon color='success' />
    </Box>
  )
};

const BlockStatus: FC<{ number: number; numberFinalized: number }> = ({
  number,
  numberFinalized
}) => {
  return number > numberFinalized ? statusToIconMap.pending : statusToIconMap.completed;
};

export default BlockStatus;
