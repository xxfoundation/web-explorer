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
