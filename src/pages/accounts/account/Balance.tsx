import styled from '@emotion/styled';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {
  Box,
  Divider,
  Stack,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography
} from '@mui/material';
import React, { FC } from 'react';
import FormatBalance from '../../../components/FormatBalance';
import PaperStyled from '../../../components/Paper/PaperWrap.styled';
import { Account } from '../../../schemas/accounts.schema';
import { theme } from '../../../themes/default';
import { InfoCardRow, TypographyBody, TypographyHeader } from './utils';

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 330,
    padding: 0
  }
});

const TooltipBody = styled(Box)(({}) => ({
  padding: '30px 40px 20px 40px'
}));

const TooltipFooter = styled(Box)(({}) => ({
  backgroundColor: theme.palette.grey[500],
  padding: '20px 40px',
  borderBottomLeftRadius: 'inherit',
  borderBottomRightRadius: 'inherit'
}));

const TooltipStack: FC = ({ children }) => {
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
      marginBottom={'6px'}
    >
      {children}
    </Stack>
  );
};

const TooltipLineHeader: FC = ({ children }) => (
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
          The stash can be locked by Bond, Democracy, Election, Vesting at the same time.{' '}
        </Typography>
      </TooltipFooter>
    </>
  );
};

const Balance: FC<{
  account: Account;
}> = ({ account }) => {
  return (
    <PaperStyled>
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
          <FormatBalance value={account.totalBalance.toString()} />
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
          <FormatBalance value={account.lockedBalance.toString()} />
        </TypographyBody>
      </InfoCardRow>
      <InfoCardRow>
        <TypographyHeader width='110px'>reserved</TypographyHeader>
        <Typography fontWeight='100'>|</Typography>
        <TypographyBody>
          <FormatBalance value={account.reservedBalance.toString()} />
        </TypographyBody>
      </InfoCardRow>
    </PaperStyled>
  );
};

export default Balance;
