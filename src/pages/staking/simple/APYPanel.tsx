import { Close, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Alert, AlertTitle, Button, Dialog,  Link, Stack, styled, Typography } from '@mui/material';
import { BN } from '@polkadot/util';
import React, { FC, useMemo } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import ValidatorList from './ValidatorList';
import FormatBalance from '../../../components/FormatBalance';
import { useToggle } from '../../../hooks';
import { Account } from '../../../schemas/accounts.schema';

const validatorsList: Account[] = [
  { id: '1', identity: { display: 'Bobby Brown' } },
  { id: '2', identity: { display: 'Balto' } },
  { id: '6YoMteJpAfHeLqgk2T6Vnd3o3LsiduWKV7MheKaTnEhurzuD' },
  { id: '3', identity: { display: 'Matty B' } },
  { id: '4', identity: { display: 'Bengo' } },
  { id: '6YoMteJpAfHeLqgk2T6Vnd3o3LsiduWKV7MheKaTnEhurzuD' },
] as Account[];

const AmountDisplay = styled(Typography)(({ theme }) => ({
  lineHeight: 1.25,
  paddingBottom: theme.spacing(0.75),
  paddingRight: theme.spacing(1),
  paddingLeft: theme.spacing(1),
  textAlign: 'right',
  borderBottom: 'solid darkgrey 1px',
  fontWeight: 400,
  fontSize: '1.25rem'
}));

const { href: walletUrl } = new URL('/#/staking/actions', process.env.REACT_APP_WALLET_URL ?? '');

type Props = {
  amount: BN;
  selectedValidators: string[];
}

const APYPanel: FC<Props> = ({ amount }) => {
  const [dialogOpened, dialog] = useToggle();
  const [expandValidators, validators] = useToggle();
  const endIcon = useMemo(() => (expandValidators ? <KeyboardArrowUp /> : <KeyboardArrowDown />), [expandValidators]);
  
  const apy = 4;
  const xxPerEra = amount.muln(apy / 100).divn(365);

  return (
    <>
      <Dialog open={dialogOpened} onClose={dialog.toggleOff}>
        <Button variant='text' sx={{ position: 'absolute', top: 0, right: 0 }} onClick={dialog.toggleOff}>
          <Close />
        </Button>
        <Stack spacing={3} sx={{ p: { md: 5, sm: 3, xs: 2 } }}>
          <Typography variant='h3'>
            Validator Selection
          </Typography>
          <Typography variant='body3'>
            Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur
            sint occaecat cupidatat non proident, sunt in culpa
            qui officia deserunt mollit anim id est laborum.
          </Typography>
        </Stack>
      </Dialog>
      <Stack spacing={4}>
        <Typography variant='h2'>
          APY
        </Typography>
        <Typography variant='body3'>
          To maximize your returns you should restake on a regular basis
          to <Link onClick={dialog.toggleOn} href='#'>reselect your
          validators</Link>. The following APY is not guaranteed
          and changes on a per era basis.
        </Typography>
        <Stack spacing={3} direction='row'>
          <Typography sx={{ lineHeight: 1.25, fontSize: '1.5rem' }} variant='h3'>~APY:</Typography>
          <Stack spacing={2} sx={{ pt: 0.25 }}>
            <AmountDisplay variant='body3'>
              {apy}%
            </AmountDisplay>
            <AmountDisplay variant='body3'>
              <FormatBalance value={xxPerEra}></FormatBalance>/ERA
            </AmountDisplay>
          </Stack>
        </Stack>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Typography variant='body3'>
            We've automatically selected validators to nominate for you.
          </Typography>
            <Button
              onClick={validators.toggle}
              endIcon={endIcon}>
              Show validators selected
            </Button>
        </Stack>
        {expandValidators && (
          <ValidatorList accounts={validatorsList}  />
        )}
        <Alert severity='info'>
          <AlertTitle sx={{ fontSize: '1rem', mb: 1 }}>
            Want More Control?
          </AlertTitle>
          <Typography variant='body3'>
            You can always go to our <Link target='__blank' href={walletUrl}>wallet</Link> to select validators yourself.
          </Typography>
        </Alert>
      </Stack>
    </>
  )
}

export default APYPanel;
