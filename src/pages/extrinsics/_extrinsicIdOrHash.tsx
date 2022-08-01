import { useQuery } from '@apollo/client';
import { Box, Container, Skeleton, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { isHex } from '@polkadot/util';

import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import PaperWrapStyled from '../../components/Paper/PaperWrap.styled';
import { TableSkeleton } from '../../components/Tables/TableSkeleton';
import { GetExtrinsicWhere, GET_EXTRINSIC_WHERE } from '../../schemas/extrinsics.schema';
import NotFound from '../NotFound';
import ExtrinsicTabs from './extrinsic/ExtrinsicTabs';
import Summary from './extrinsic/summary';
import Loading from '../../components/Loading';
import Error from '../../components/Error';

const ExtrinsicComponent = () => {
  const { extrinsicIdOrHash } = useParams<{ extrinsicIdOrHash: string }>();
  const isHash = isHex(extrinsicIdOrHash);
  const [blockNumber, extrinsicIndex] = !isHash ? extrinsicIdOrHash.split('-') : [];

  const where = useMemo(
    () =>
      isHash
        ? { hash: { _eq: extrinsicIdOrHash } }
        : { block_number: { _eq: blockNumber }, extrinsic_index: { _eq: extrinsicIndex } },
    [blockNumber, extrinsicIdOrHash, extrinsicIndex, isHash]
  );

  const { data, error, loading } = useQuery<GetExtrinsicWhere>(GET_EXTRINSIC_WHERE, {
    variables: { where1: where, where2: where }
  });

  if (!loading && !error && (!data || !data?.extrinsic[0])) {
    return <NotFound />;
  }

  if (error) {
    return (
      <Container sx={{ my: 5 }}>
        <Error />
      </Container>
    );
  }

  if (!data?.extrinsic[0]) {
    return <Loading />;
  }

  const extrinsic = data?.extrinsic[0];

  return (
    <Container sx={{ my: 5 }}>
      <Breadcrumb />
      <Box sx={{ mb: 5 }}>
        <Typography variant='h1'>
          Extrinsic #{extrinsic.blockNumber}-{extrinsic.extrinsicIndex}
        </Typography>
      </Box>
      <Summary extrinsic={extrinsic} />
      <Box sx={{ mt: 2 }}>
        {loading ? (
          <PaperWrapStyled>
            <Skeleton width={'90%'} />
            <TableSkeleton rows={2} cells={1} />
          </PaperWrapStyled>
        ) : (
          extrinsic.hash && (
            <ExtrinsicTabs
              blockNumber={extrinsic.blockNumber}
              index={extrinsic.extrinsicIndex}
              transferCount={data.agg.aggregate.count}
            />
          )
        )}
      </Box>
    </Container>
  );
};

export default ExtrinsicComponent;
