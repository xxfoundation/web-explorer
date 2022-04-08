import { Container, Box } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import BlockDetailedEventsTabs from '../../components/block/BlockDetailedEventsTabs';
import BlockSummary from '../../components/block/BlockSummary';
import Breadcrumb from '../../components/Breadcrumbs';

const data = {
  time: '2022-01-28 03:39:24 (+utc)',
  status: 'finalized',
  era: 48,
  hash: '0x8fad1abb3c2d50e6c075c9c2764800ac41ea67bf40a874f9f04de990b7b74680',
  parentHash: '0x6b836d45a934c4a008e316159450f0b01470056aae34798ed16ef7d412912dff',
  stateRoot: '0xb63e96a5fabbb2644c13348dd0723c83963270557dfc04d341b76c4c55aa3895',
  extrinsicsRoot: '0x43f58a2e0d8c392ab8261a1b89a69fa4eeb2d1ce4332bae9fc734706eda49266',
  blockProducer: { hash: '6VSduRsfo5nnZW4aafVvE8wdSq8tpuSTLWxqT1STqRcqy2kg', name: 'ooooo' },
  blockTime: 123131,
  specVersion: 102
};

const Block = () => {
  const { number } = useParams<{ number: string }>();
  return (
    <Container sx={{ my: 5 }}>
      <Breadcrumb />
      <BlockSummary number={number} data={data} />
      <Box sx={{ mt: 2 }}>
        <BlockDetailedEventsTabs events={[1, 2, 3]} extrinsics={[1, 2]} />
      </Box>
    </Container>
    
  );
};

export default Block;
