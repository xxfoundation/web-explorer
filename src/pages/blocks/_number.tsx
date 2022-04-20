import { Box, Container, Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { BlockNav } from '../../components/block/Block.styled';
import BlockDetailedEventsTabs from '../../components/block/BlockDetailedEventsTabs';
import BlockSummary from '../../components/block/BlockSummary';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import BackAndForwardArrows from '../../components/buttons/BackAndForwardArrows';
import Link from '../../components/Link';

const BlockSummaryHeader: React.FC<{ number: number }> = ({ number }) => {
  const history = useHistory();
  return (
    <Stack justifyContent={'space-between'} direction={'row'} sx={{ mb: 5 }}>
      <Typography variant='h1'>Block No. {number}</Typography>
      <BlockNav direction={'row'} alignItems={'center'} spacing={2}>
        <Link to='/blocks'>
          <Typography variant='h4'>blocks</Typography>
        </Link>
        <Divider orientation='vertical' variant='middle' flexItem />
        {/* TODO what's really the condition for disabling these buttons */}
        <BackAndForwardArrows
          back={{
            disabled: number <= 0,
            onClick: () => {
              history.push(`/blocks/${number - 1}`);
            }
          }}
          forward={{
            disabled: false,
            onClick: () => {
              history.push(`/blocks/${number + 1}`);
            }
          }}
        />
      </BlockNav>
    </Stack>
  );
};

const Block = () => {
  const { number } = useParams<{ number: string }>();
  return (
    <Container sx={{ my: 5 }}>
      <Breadcrumb />
      <BlockSummaryHeader number={Number(number)} />
      <BlockSummary number={Number(number)} />
      <Box sx={{ mt: 2 }}>
        <BlockDetailedEventsTabs events={[1, 2, 3]} extrinsics={[1, 2]} />
      </Box>
    </Container>
  );
};

export default Block;
