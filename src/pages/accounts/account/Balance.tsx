import styled from '@emotion/styled';
import {
  Box,
  Button,
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
import { Account, Roles } from '../../../schemas/accounts.schema';
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

const CardHeaderButton = styled(Button)(({}) => ({
  ':hover': { backgroundColor: theme.palette.grey[200] }
}));

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
  <Typography fontSize={'10px'} fontWeight={500} letterSpacing={'1px'} width={'70px'}>
    {children}
  </Typography>
);

const TooltipLineBody = styled(Typography)(({}) => ({
  fontSize: '10px',
  fontWeight: 400,
  letterSpacing: '1px'
}));

const TransferableBalanceTooltipContent: FC<{ account: Account }> = ({ account }) => {
  return (
    <TooltipBody>
      <TooltipStack>
        <TooltipLineHeader>unbounding</TooltipLineHeader>
        <TooltipLineBody>
          <FormatBalance value={account.totalBalance.toString()} />
        </TooltipLineBody>
      </TooltipStack>
      <TooltipStack>
        <TooltipLineHeader>election</TooltipLineHeader>
        <TooltipLineBody>???</TooltipLineBody>
      </TooltipStack>
      <TooltipStack>
        <TooltipLineHeader>democracy</TooltipLineHeader>
        <TooltipLineBody>???</TooltipLineBody>
      </TooltipStack>
    </TooltipBody>
  );
};

const LockedTooltipContent: FC<{ account: Account }> = ({}) => {
  return (
    <>
      <TooltipBody>
        <TooltipStack>
          <TooltipLineHeader>vesting</TooltipLineHeader>
          <TooltipLineBody>????</TooltipLineBody>
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
  roles: Roles[];
}> = ({ account }) => {
  return (
    <PaperStyled>
      <InfoCardRow>
        <Box width='110px'>
          <CustomTooltip
            title={<TransferableBalanceTooltipContent account={account} />}
            placement='bottom-start'
          >
            <CardHeaderButton size='small'>
              <TypographyHeader>balance</TypographyHeader>
            </CardHeaderButton>
          </CustomTooltip>
        </Box>
        <TypographyBody>
          <FormatBalance value={account.totalBalance.toString()} />
        </TypographyBody>
      </InfoCardRow>
      <InfoCardRow>
        <Box width='110px'>
          <Button
            size='small'
            sx={{
              ':hover': {
                backgroundColor: 'inherit',
                cursor: 'default'
              }
            }}
            disableRipple
            disableTouchRipple
            disableElevation
          >
            <TypographyHeader>reserved</TypographyHeader>
          </Button>
        </Box>
        <TypographyBody>
          <FormatBalance value={account.reservedBalance.toString()} />
        </TypographyBody>
      </InfoCardRow>
      <InfoCardRow>
        <Box width='110px'>
          <CustomTooltip title={<LockedTooltipContent account={account} />} placement='right-start'>
            <CardHeaderButton size='small'>
              <TypographyHeader>locked</TypographyHeader>
            </CardHeaderButton>
          </CustomTooltip>
        </Box>
        <TypographyBody>
          <FormatBalance value={account.lockedBalance.toString()} />
        </TypographyBody>
      </InfoCardRow>
    </PaperStyled>
  );
};

export default Balance;
