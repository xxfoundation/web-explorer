import {
  Popover,
  PopoverProps,
  styled,
  SxProps,
  Theme,
  Tooltip,
  tooltipClasses,
  TooltipProps
} from '@mui/material';
import React, { FC } from 'react';
import { theme } from '../../themes/default';
import ChartSeriesDetailsInfo from './ChartSeriesDetailsInfo';
import type { CustomPointOptions } from './types';

type ChartClickModalProps = {
  data: CustomPointOptions;
  closeModal: () => void;
};

const cardStyling = {
  background: theme.palette.background.paper,
  boxShadow: theme.boxShadow,
  border: theme.borders?.light,
  borderRadius: '33px',
  padding: '30px',
  maxWidth: '360px'
};

export const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} arrow />
))(({ theme: th }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    ...cardStyling,
    [th.breakpoints.down('sm')]: {
      padding: '20px'
    }
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: th.palette.background.paper
  }
}));

const popooverProps: SxProps<Theme> = {
  ...cardStyling,
  [theme.breakpoints.down('sm')]: {
    padding: '20px'
  }
};

export const SeriesPopover: FC<ChartClickModalProps & PopoverProps> = ({
  closeModal,
  data,
  ...props
}) => {
  return (
    <Popover
      {...props}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'center'
      }}
      PaperProps={{ sx: popooverProps }}
    >
      <ChartSeriesDetailsInfo name={data.name} custom={data.custom} onClose={closeModal} />
    </Popover>
  );
};

export default SeriesPopover;
