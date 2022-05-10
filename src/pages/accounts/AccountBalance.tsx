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
import BN from 'bn.js';
import React, { FC, ReactNode } from 'react';
import FormatBalance from '../../components/FormatBalance';
import { PaperStyled } from '../../components/Paper/PaperWrap.styled';
import { theme } from '../../themes/default';
import { CardRow, TypographyBody, TypographyHeader } from './InfoCardsTypography';

type BalanceType = {
  bonded: string | BN;
  unbonding: string | BN;
  democracy: string | BN;
  election: string | BN;
  vesting: string | BN;
};

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

const BalanceTooltipContent: FC<{ data: BalanceType; footer?: ReactNode }> = ({ data }) => {
  return (
    <>
      <TooltipBody>
        <TooltipStack>
          <TooltipLineHeader>bonded</TooltipLineHeader>
          <TooltipLineBody>
            <FormatBalance value={data.bonded} />
          </TooltipLineBody>
        </TooltipStack>
        <TooltipStack>
          <TooltipLineHeader>unbonding</TooltipLineHeader>
          <TooltipLineBody>
            <FormatBalance value={data.unbonding} />
          </TooltipLineBody>
        </TooltipStack>
        <TooltipStack>
          <TooltipLineHeader>democracy</TooltipLineHeader>
          <TooltipLineBody>
            <FormatBalance value={data.democracy} />
          </TooltipLineBody>
        </TooltipStack>
        <TooltipStack>
          <TooltipLineHeader>election</TooltipLineHeader>
          <TooltipLineBody>
            <FormatBalance value={data.unbonding} />
          </TooltipLineBody>
        </TooltipStack>
        <TooltipStack>
          <TooltipLineHeader>vesting</TooltipLineHeader>
          <TooltipLineBody>
            <FormatBalance value={data.vesting} />
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

const sumBalance = (balance: BalanceType) => {
  const resultSum =
    Number(balance.bonded) +
    Number(balance.democracy) +
    Number(balance.election) +
    Number(balance.unbonding) +
    Number(balance.vesting);
  return <FormatBalance value={resultSum.toString()} />;
};

const AccountBalance: FC<{
  balance: BalanceType;
  reserved: BalanceType;
  locked: BalanceType;
}> = ({ balance, locked, reserved }) => {
  return (
    <PaperStyled>
      <CardRow>
        <CustomTooltip title={<BalanceTooltipContent data={balance} />} placement='bottom-start'>
          <Box width='110px'>
            <CardHeaderButton>
              <TypographyHeader>balance</TypographyHeader>
            </CardHeaderButton>
          </Box>
        </CustomTooltip>
        <TypographyBody>{sumBalance(balance)}</TypographyBody>
      </CardRow>
      <CardRow>
        <CustomTooltip title={<BalanceTooltipContent data={balance} />} placement='bottom-start'>
          <Box width='110px'>
            <CardHeaderButton>
              <TypographyHeader>reserved</TypographyHeader>
            </CardHeaderButton>
          </Box>
        </CustomTooltip>
        <TypographyBody>{sumBalance(reserved)}</TypographyBody>
      </CardRow>
      <CardRow>
        <CustomTooltip title={<BalanceTooltipContent data={balance} />} placement='right-start'>
          <Box width='110px'>
            <CardHeaderButton>
              <TypographyHeader>locked</TypographyHeader>
            </CardHeaderButton>
          </Box>
        </CustomTooltip>
        <TypographyBody>{sumBalance(locked)}</TypographyBody>
      </CardRow>
    </PaperStyled>
  );
};

export default AccountBalance;
