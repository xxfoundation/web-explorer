import { useQuery } from '@apollo/client';
import {
  Box,
  Divider,
  Grid,
  Hidden,
  Link,
  Skeleton,
  Stack,
  styled,
  Typography
} from '@mui/material';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import PaperStyled from '../../components/Paper/PaperWrap.styled';
import Socials from '../../components/Socials';
import { ListenForAccountMetrics, LISTEN_FOR_ACCOUNT_METRICS } from '../../schemas/chaindata.schema';
import NetworkIcon from './NetworkIcon';

const SubduedHeader = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: 12,
  color: theme.palette.grey[400],
  letterSpacing: 1,
  textTransform: 'uppercase'
}));

const DarkSubtitle = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  font: 'Roboto',
  fontSize: 20,
  color: theme.palette.grey[800]
}));

const SummaryInfo = () => {
  const { t } = useTranslation();
  const { data, loading } = useQuery<ListenForAccountMetrics>(
    LISTEN_FOR_ACCOUNT_METRICS
  );

  return (
    <Stack direction='row' justifyContent={{ md: 'space-between', sm: 'flex-start' }} spacing={5}>
      <Stack>
        <SubduedHeader>{t('decimals')}</SubduedHeader>
        <DarkSubtitle>9</DarkSubtitle>
      </Stack>
      <Stack>
        <SubduedHeader>{t('holders')}</SubduedHeader>
        <DarkSubtitle>
          {loading ? (
            <Skeleton />
          ) : data?.numAccounts !== undefined ? (
            data?.numAccounts.aggregate.count - data?.numFakeAccounts.aggregate.count
          ) : (
            t('N/D')
          )}
        </DarkSubtitle>
      </Stack>
      <Stack>
        <SubduedHeader>{t('transfers')}</SubduedHeader>
        <DarkSubtitle>
          {loading ? (
            <Skeleton />
          ) : data?.numTransfers !== undefined ? (
            data?.numTransfers.aggregate.count
          ) : (
            t('N/D')
          )}
        </DarkSubtitle>
      </Stack>
    </Stack>
  );
};

const ContactInfo = () => {
  return (
    <Grid container>
      <Grid item xs={12} sx={{ mb: 1 }}>
        <Typography>xx network (XX)</Typography>
        <Link target={'_blank'} href='https://xx.network'>
          https://xx.network
        </Link>
      </Grid>
      <Grid item>
        <Socials
          socials={{
            twitter: 'xx_network',
            github: 'xx-labs',
            telegram: 'xxnetwork',
            discord: 'Y8pCkbK'
          }}
        />
      </Grid>
    </Grid>
  );
};

const Summary: FC = () => {
  return (
    <PaperStyled>
      <Grid container spacing={4}>
        <Grid item sm={12} md={6}>
          <Stack direction='row' spacing={5}>
            <Box sx={{ flex: '0 0 6rem' }}>
              <NetworkIcon />
            </Box>
            <ContactInfo />
          </Stack>
        </Grid>
        <Hidden mdDown>
          <Divider
            sx={{
              mt: 3,
              height: '4rem',
              alignSelf: 'center'
            }}
            orientation='vertical'
            flexItem
          />
        </Hidden>
        <Grid
          item
          sm={12}
          md={4}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column'
          }}
        >
          <SummaryInfo />
        </Grid>
      </Grid>
    </PaperStyled>
  );
};

export default Summary;
