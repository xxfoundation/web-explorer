import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Breadcrumbs, styled, Typography } from '@mui/material';
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';
import React, { FC } from 'react';
import Tag from '../../components/Tags/Tag';

type Modules = 'balance';
type Calls = 'transfers';

const balancesTransfersDescription = (
  <>
    <Typography variant='h5' component={'p'}>
      BALANCES / TRANSFER
    </Typography>
    <br />
    <Typography variant='body5' component={'p'}>
      Transfer some liquid free balance to another account.
    </Typography>
    <br />
    <Typography variant='body5' component={'p'}>
      ‘Transfer’ will set the ‘Free Balance’ of the sender and receiver. It will decrease the total
      issuance of the system by the ‘TransferFee.’
    </Typography>
    <br />
    <Typography variant='body5' component={'p'}>
      If the sender’s account is below the existential deposit Lorem ipsum dolor sit amet,
      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et{' '}
    </Typography>
    <br />
    <Typography variant='body5' component={'p'}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non libero a sem ullamcorper
      vehicula sed at mi. Nullam id enim mattis, imperdiet dolor id, gravida erat. Lorem ipsum dolor
      sit amet, consectetur adipiscing elit. Praesent consequat sem eget ipsum ornare, in vestibulum
      nisi convallis. Proin id hendrerit est. Maecenas lacinia risus purus, ac tincidunt eros
      maximus et. In nec mattis tellus, id semper orci. Aenean aliquam venenatis ligula, eget dictum
      lectus iaculis sit amet. Quisque varius diam eget lacus eleifend ullamcorper. Sed dignissim id
      quam congue finibus. Cras eu urna feugiat purus consequat ornare. Nam sed mauris sit amet
      libero bibendum tincidunt. Aenean at sem risus. Fusce auctor ipsum non augue condimentum,
      mattis vestibulum enim ultrices. Proin euismod volutpat enim ut sollicitudin. Aenean lectus
      velit, cursus sit amet erat non, pharetra vulputate velit.
    </Typography>
    <br />
    <Typography variant='body5' component={'p'}>
      Nullam ligula magna, malesuada eget quam id, auctor consectetur nulla. Quisque dapibus nisi ut
      odio sodales consequat. Pellentesque hendrerit convallis leo in auctor. Vivamus nec varius
      diam. Curabitur eu sodales sapien. Mauris maximus id massa eget fermentum. Nulla tellus dui,
      scelerisque et nunc ac, porta aliquam tellus. Nunc ullamcorper, neque sed scelerisque
      malesuada, sem sem tempus quam, ac tempor quam nunc aliquet quam. Nulla sed orci tellus. Donec
      sollicitudin urna ornare, feugiat nulla sit amet, malesuada enim. Curabitur eget dolor lorem.
      Aenean sed blandit odio. Aenean eleifend vulputate orci, nec tincidunt est pellentesque eu.
      Pellentesque condimentum egestas ipsum a porttitor. Proin hendrerit nisl ex, quis elementum
      ligula gravida nec.
    </Typography>
  </>
);

const BalanceCallsDescriptions: Record<Modules, Record<Calls, JSX.Element>> = {
  balance: {
    transfers: balancesTransfersDescription
  }
};

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 360,
    padding: 30,
    paddingBottom: '3em',
    h5: {
      paddingBottom: '3em',
      letterSpacing: '1px'
    },
    p: {
      letterSpacing: '1px'
    }
  }
});

const ModuleCalls: FC<{ module: Modules; call: Calls }> = ({ call, module }) => {
  return (
    <>
      <Breadcrumbs separator='/'>
        <Tag filled>
          <Typography fontSize={'12px'} fontWeight={400}>
            {module}
          </Typography>
        </Tag>
        <Tag>
          <Typography fontSize={'12px'} fontWeight={400}>
            {call}
          </Typography>
        </Tag>
      </Breadcrumbs>
      <CustomTooltip title={BalanceCallsDescriptions[module][call]}>
        <InfoOutlinedIcon color='primary' sx={{ marginLeft: '8px' }} fontSize={'small'} />
      </CustomTooltip>
    </>
  );
};

export default ModuleCalls;
