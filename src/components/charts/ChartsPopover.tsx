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
import { default as React, FC } from 'react';
import { theme } from '../../themes/default';
import { CustomPointOptions } from '../blockchain/types';
import SeriesDetailedInfo from './ChartSeriesDetailsInfo';

type ChartClickModalProps = {
  data: CustomPointOptions;
  closeModal: () => void;
};

export const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} arrow />
))(({ theme: th }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    background: th.palette.background.paper,
    boxShadow: th.boxShadow,
    border: th.borders?.light,
    borderRadius: '33px',
    padding: '30px',
    [th.breakpoints.down('sm')]: {
      padding: '30px'
    },
    minWidth: '318px',
    maxWidth: 'none'
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: th.palette.background.paper
  }
}));

const popooverProps: SxProps<Theme> = {
  boxShadow: theme.boxShadow,
  border: theme.borders?.light,
  borderRadius: '33px',
  padding: '30px',
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
        horizontal: 'right'
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      PaperProps={{ sx: popooverProps }}
    >
      <SeriesDetailedInfo name={data.name} custom={data.custom} onClose={closeModal} />
    </Popover>
  );
};

export default SeriesPopover;
