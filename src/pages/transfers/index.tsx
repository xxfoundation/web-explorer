import { useSubscription } from '@apollo/client';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
// import DownloadDataButton from '../../components/buttons/DownloadDataButton';
import BarChart from '../../components/charts/BarChart/BarChart';
import IntervalControls, {
  intervalToTimestamp
} from '../../components/charts/BarChart/IntervalControls';
import { TimeInterval } from '../../components/charts/BarChart/types';
import PaperStyled from '../../components/Paper/PaperWrap.styled';
import { LISTEN_FOR_TRANSFERS_TIMESTAMPS } from '../../schemas/transfers.schema';
import { theme } from '../../themes/default';
import TransferTable from './TransfersTable';

const TransfersPage = () => {
  const [interval, setInterval] = useState<TimeInterval>('1h');
  const variables = useMemo(() => {
    return {
      orderBy: [{ timestamp: 'asc' }],
      where: { timestamp: { _gte: intervalToTimestamp(interval) } }
    };
  }, [interval]);
  const { data, loading } = useSubscription<{ transfer: { timestamp: number }[] }>(
    LISTEN_FOR_TRANSFERS_TIMESTAMPS,
    { variables }
  );
  const timestamps = useMemo(
    () => (data?.transfer || []).map(({ timestamp }) => timestamp),
    [data?.transfer]
  );
  const [totalOfTransfers, setTotalOfTransfers] = useState<number>();
  return (
    <Container sx={{ my: 5 }}>
      <Breadcrumb />
      <Stack
        justifyContent={'space-between'}
        alignItems={'center'}
        direction={'row'}
        sx={{ mb: 5 }}
      >
        <Typography variant='h1'>Transfers</Typography>
        {/* <DownloadDataButton onClick={() => {}}>Download data</DownloadDataButton> */}
      </Stack>
      <Box sx={{ mb: 5 }}>
        <PaperStyled>
          <Box style={{ overflowX: 'auto', overflowY: 'hidden', scrollBehavior: 'smooth' }}>
            <IntervalControls interval={interval} setInterval={setInterval} loading={loading} />
            {loading || !timestamps.length ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '250px'
                }}
              >
                {loading ? (
                  <CircularProgress />
                ) : (
                  <Typography>no transfers in this range</Typography>
                )}
              </Box>
            ) : (
              <BarChart series={{ timestamps, label: 'transfers' }} interval={interval} />
            )}
          </Box>
        </PaperStyled>
      </Box>
      <PaperStyled>
        {totalOfTransfers && (
          <Stack
            direction='row'
            alignItems='center'
            spacing={2}
            marginBottom='18px'
            fontSize={'16px'}
            fontWeight={700}
            color={theme.palette.grey[600]}
          >
            <Button color='inherit' disabled>
              Filter all
            </Button>
            <Typography>|</Typography>
            <Tooltip title='the total of transfer' placement='top' arrow>
              <Typography>{totalOfTransfers}</Typography>
            </Tooltip>
          </Stack>
        )}
        <span hidden>filters placeholder</span>
        <TransferTable setTotalOfTransfers={setTotalOfTransfers} />
      </PaperStyled>
    </Container>
  );
};

export default TransfersPage;
