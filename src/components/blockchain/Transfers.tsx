import { Box, Grid, Link, Tooltip, Typography } from '@mui/material';
import React from 'react';
import TimeAgo from '../TimeAgo';
import PaperWithHeader from './PaperWithHeader';
import FormatBalance from '../FormatBalance';

type Transfer = {
  intrinsicIndex: string;
  id: number;
  from: string;
  to: string;
  amount: string;
  timestamp: number;
}

const transfers: Transfer[] = Array.from(Array(9).keys()).slice(1).map((i) => {
  return {
    intrinsicIndex: '314658-5', // TODO mask?
    id: i,
    from: '0xacc15dc74899999', // TODO use just mask instead of manipulating the value
    to: '0xbcd15dc748888',
    amount: '100000000000',
    timestamp: new Date().getTime() - (i * 1000)
  };
});

const addMaskToTransactionTargets = (hash: string) => {
  const href = `/transfer/${hash}`;
  if (hash.length > 15) {
    return (
      <Tooltip title={hash} placement='top' arrow>
        <Link href={href} underline='hover'>
          {hash.split('').slice(0, 12).join('') + '...'}
        </Link>
      </Tooltip>
    );
  }

  return (
    <Link href={href} underline='hover'>
      {hash}
    </Link>
  );
};

const gridHeader = (data: Transfer, elem: keyof Transfer) => {
  return (
    <>
      <Grid item component={'span'} xs={4}>
        <Typography variant='body3'>{elem.toString().toUpperCase()}</Typography>
      </Grid>
      <Grid item component={'span'}>
        {addMaskToTransactionTargets(data[elem].toString())}
      </Grid>
    </>
  )
}

const listItemSecondaryText = (data: Transfer) => {
  return (
    <Grid component={'span'} container maxWidth={200}>
      {gridHeader(data, 'from')}
      {gridHeader(data, 'to')}
    </Grid>
  );
};

const ItemHandler = (currentData: Transfer) => {
  return (
    <Box key={currentData.id} sx={{ mb: 4 }}>
      <Typography variant='body2' sx={{ mb: 1 }}>
        EXTRINSIC #{' '}
        <Link href={`/intrinsic/${currentData.id}`} underline='hover'>
          {currentData.id}
        </Link>
      </Typography>
      <Grid container>
        <Grid item xs>
          <Typography variant='body3' sx={{ lineHeight: 1.75 }}>
            {listItemSecondaryText(currentData)}
          </Typography>
        </Grid>
        <Grid item xs='auto' textAlign='right'>
          <Grid>
            <Typography variant='body3' sx={{ lineHeight: 1.75 }}>
              <TimeAgo date={currentData.timestamp} />
            </Typography>
          </Grid>
          <Grid>
            <Typography variant='body3'>
              <FormatBalance value={currentData.amount} />
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box >
  );
};

const transfersList = () => {
  return (
    <PaperWithHeader
      header='TRANSFERS'
      hasDivider={true}
      linkName={'SEE ALL'}
      linkAddress={'##'}
      height={500}
    >
      {transfers.map(ItemHandler)}
    </PaperWithHeader>
  );
};

export default transfersList;
