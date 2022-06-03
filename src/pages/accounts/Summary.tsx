import { useSubscription } from '@apollo/client';
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
import React, { FC, useMemo } from 'react';
import PaperStyled from '../../components/Paper/PaperWrap.styled';
import Socials from '../../components/Socials';
import { LISTEN_FOR_ERA_METRICS } from '../../schemas/chaindata.schema';
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
  const { data, loading } = useSubscription<{ metrics: { title: string; value: number }[] }>(
    LISTEN_FOR_ERA_METRICS
  );
  const mappedMetrics = useMemo(() => {
    return (data?.metrics || []).reduce((prev, current) => {
      return {
        ...prev,
        [current.title]: current.value
      };
    }, {} as Record<string, number>);
  }, [data?.metrics]);
  return (
    <Stack direction='row' justifyContent={{ md: 'space-between', sm: 'flex-start' }} spacing={5}>
      <Stack>
        <SubduedHeader>decimals</SubduedHeader>
        <DarkSubtitle>9</DarkSubtitle>
      </Stack>
      <Stack>
        <SubduedHeader>holders</SubduedHeader>
        <DarkSubtitle>
          {loading ? (
            <Skeleton />
          ) : mappedMetrics.holders !== undefined ? (
            mappedMetrics.holders
          ) : (
            'N/D'
          )}
        </DarkSubtitle>
      </Stack>
      <Stack>
        <SubduedHeader>transfers</SubduedHeader>
        <DarkSubtitle>
          {loading ? (
            <Skeleton />
          ) : mappedMetrics.transfers !== undefined ? (
            mappedMetrics.transfers
          ) : (
            'N/D'
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
            twitter: 'https://twitter.com/xx_network',
            github: 'https://github.com/xx-labs',
            telegram: 'https://t.me/xxnetwork',
            discord: 'https://discord.com/invite/Y8pCkbK'
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
