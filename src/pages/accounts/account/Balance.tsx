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
import { theme } from '../../../themes/default';
import { BalanceType, LockedBalanceType } from '../types';
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

const BalanceTooltipContent: FC<{ data: BalanceType }> = ({ data }) => {
  return (
    <TooltipBody>
      <TooltipStack>
        <TooltipLineHeader>transferable</TooltipLineHeader>
        <TooltipLineBody>
          <FormatBalance value={data.transferable} />
        </TooltipLineBody>
      </TooltipStack>
    </TooltipBody>
  );
};

const LockedTooltipContent: FC<{ data: LockedBalanceType }> = ({ data }) => {
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

const sumBalance = (balance: LockedBalanceType) => {
  const resultSum =
    Number(balance.bonded) +
    Number(balance.democracy) +
    Number(balance.election) +
    Number(balance.unbonding) +
    Number(balance.vesting);
  return <FormatBalance value={resultSum.toString()} />;
};

const Balance: FC<{
  balance: BalanceType;
  reserved: LockedBalanceType;
  locked: LockedBalanceType;
}> = ({ balance, locked, reserved }) => {
  return (
    <PaperStyled>
      <InfoCardRow>
        <Box width='110px'>
          <CustomTooltip title={<BalanceTooltipContent data={balance} />} placement='bottom-start'>
            <CardHeaderButton size='small'>
              <TypographyHeader>balance</TypographyHeader>
            </CardHeaderButton>
          </CustomTooltip>
        </Box>
        <TypographyBody>
          <FormatBalance value={balance.transferable} />
        </TypographyBody>
      </InfoCardRow>
      <InfoCardRow>
        <Box width='110px'>
          <Button
            size='small'
            sx={{
              ':hover': {
                backgroundColor: 'inherit',
                cursor: 'default',
              }
            }}
            disableRipple
            disableTouchRipple
            disableElevation
          >
            <TypographyHeader>reserved</TypographyHeader>
          </Button>
        </Box>
        <TypographyBody>{sumBalance(reserved)}</TypographyBody>
      </InfoCardRow>
      <InfoCardRow>
        <Box width='110px'>
          <CustomTooltip title={<LockedTooltipContent data={locked} />} placement='right-start'>
            <CardHeaderButton size='small'>
              <TypographyHeader>locked</TypographyHeader>
            </CardHeaderButton>
          </CustomTooltip>
        </Box>
        <TypographyBody>{sumBalance(locked)}</TypographyBody>
      </InfoCardRow>
    </PaperStyled>
  );
};

export default Balance;
