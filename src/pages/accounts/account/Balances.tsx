import type { WithChildren } from '../../../types';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {
  styled,
  Box,
  Divider,
  Stack,
  Typography
} from '@mui/material';
import React, { FC } from 'react';
import FormatBalance from '../../../components/FormatBalance';
import { Account } from '../../../schemas/accounts.schema';
import { theme } from '../../../themes/default';
import { InfoCardRow, TypographyBody, TypographyHeader } from './utils';
import { CustomTooltip } from '../../../components/Tooltip';

const TooltipBody = styled(Box)(({}) => ({
  padding: '0'
}));

const TooltipFooter = styled(Box)(({}) => ({
  backgroundColor: theme.palette.grey[500],
  padding: '1em',
  borderBottomLeftRadius: 'inherit',
  borderBottomRightRadius: 'inherit'
}));

const TooltipStack: FC<WithChildren> = ({ children }) => {
  return (
    <Stack
      direction={'row'}
      divider={
        <Divider
          flexItem
          variant='middle'
          orientation='vertical'
          sx={{ borderColor: theme.palette.grey[400] }}
        />
      }
      spacing={3}
      marginBottom={'0.5em'}
    >
      {children}
    </Stack>
  );
};

const TooltipLineHeader: FC<WithChildren> = ({ children }) => (
  <Typography fontSize={'11px'} fontWeight={500} letterSpacing={'1px'} width={'80px'}>
    {children}
  </Typography>
);

const TooltipLineBody = styled(Typography)(({}) => ({
  fontSize: '11px',
  fontWeight: 400,
  letterSpacing: '1px'
}));

const TransferableBalanceTooltipContent: FC<{ account: Account }> = ({ account }) => {
  return (
    <TooltipBody>
      <TooltipStack>
        <TooltipLineHeader>transferable</TooltipLineHeader>
        <TooltipLineBody>
          <FormatBalance value={account.transferrableBalance.toString()} />
        </TooltipLineBody>
      </TooltipStack>
    </TooltipBody>
  );
};

const LockedTooltipContent: FC<{ account: Account }> = ({ account }) => {
  return (
    <>
      <TooltipBody>
        <TooltipStack>
          <TooltipLineHeader>vesting</TooltipLineHeader>
          <TooltipLineBody>
            <FormatBalance value={account.vestingBalance.toString()} />
          </TooltipLineBody>
        </TooltipStack>
        <TooltipStack>
          <TooltipLineHeader>unbonding</TooltipLineHeader>
          <TooltipLineBody>
            <FormatBalance value={account.unbondingBalance.toString()} />
          </TooltipLineBody>
        </TooltipStack>
        <TooltipStack>
          <TooltipLineHeader>bonded</TooltipLineHeader>
          <TooltipLineBody>
            <FormatBalance value={account.bondedBalance.toString()} />
          </TooltipLineBody>
        </TooltipStack>
        <TooltipStack>
          <TooltipLineHeader>democracy</TooltipLineHeader>
          <TooltipLineBody>
            <FormatBalance value={account.democracyBalance.toString()} />
          </TooltipLineBody>
        </TooltipStack>
        <TooltipStack>
          <TooltipLineHeader>council</TooltipLineHeader>
          <TooltipLineBody>
            <FormatBalance value={account.councilBalance.toString()} />
          </TooltipLineBody>
        </TooltipStack>
      </TooltipBody>
      <TooltipFooter>
        <Typography component={'p'} fontSize='10px' fontWeight={400} letterSpacing='1px'>
          Tokens can be locked by Bond, Vesting, Democracy, Council at the same time.
        </Typography>
      </TooltipFooter>
    </>
  );
};

const Balance: FC<{ account: Account }> = ({ account }) => {
  return (
    <>
      <InfoCardRow>
        <Box width='110px' display='flex' alignItems={'center'} justifyContent='space-between'>
          <TypographyHeader>Total</TypographyHeader>
          <CustomTooltip
            title={<TransferableBalanceTooltipContent account={account} />}
            placement='bottom'
          >
            <InfoOutlinedIcon fontSize='small' color='primary' />
          </CustomTooltip>
        </Box>
        <Typography fontWeight='100'>|</Typography>
        <Typography fontSize={14} fontWeight={400} color={theme.palette.grey[500]}>
          <FormatBalance value={account.totalBalance.toString()} price/>
        </Typography>
      </InfoCardRow>
      <InfoCardRow>
        <Box width='110px' display='flex' alignItems={'center'} justifyContent='space-between'>
          <TypographyHeader>locked</TypographyHeader>
          <CustomTooltip title={<LockedTooltipContent account={account} />} placement='bottom'>
            <InfoOutlinedIcon fontSize='small' color='primary' />
          </CustomTooltip>
        </Box>
        <Typography fontWeight='100'>|</Typography>
        <TypographyBody>
          <FormatBalance value={account.lockedBalance.toString()} price/>
        </TypographyBody>
      </InfoCardRow>
      <InfoCardRow>
        <TypographyHeader width='110px'>reserved</TypographyHeader>
        <Typography fontWeight='100'>|</Typography>
        <TypographyBody>
          <FormatBalance value={account.reservedBalance.toString()} price/>
        </TypographyBody>
      </InfoCardRow>
    </>
  );
};

export default Balance;
