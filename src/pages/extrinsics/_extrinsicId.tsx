import { useQuery } from '@apollo/client';
import { Box, Container, Skeleton, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import PaperWrapStyled from '../../components/Paper/PaperWrap.styled';
import { TableSkeleton } from '../../components/Tables/TableSkeleton';
import { GetExtrinsicByPK, GET_EXTRINSIC_BY_PK } from '../../schemas/extrinsics.schema';
import NotFound from '../NotFound';
import ExtrinsicEventsTabs from './extrinsic/ExtrinsicEventsTabs';
import Summary from './extrinsic/summary';
import { SummaryLoader } from '../../components/Summary';

const Extrinsic = () => {
  const { extrinsicId } = useParams<{ extrinsicId: string }>();
  const extrinsicIdParts = extrinsicId.split('-');
  const blockNumber = Number(extrinsicIdParts[0]);
  const extrinsicIndex = Number(extrinsicIdParts[1]);

  const { data, loading } = useQuery<GetExtrinsicByPK>(GET_EXTRINSIC_BY_PK, {
    variables: { blockNumber, extrinsicIndex }
  });

  if (!loading && !data?.extrinsic && !data?.extrinsic?.timestamp) {
    return <NotFound />;
  }

  return (
    <Container sx={{ my: 5 }}>
      <Breadcrumb />
      <Box sx={{ mb: 5 }}>
        <Typography variant='h1'>Extrinsic #{extrinsicId}</Typography>
      </Box>
      {data?.extrinsic.timestamp ? (
        <Summary extrinsic={data.extrinsic} extrinsicId={{ blockNumber, extrinsicIndex }} />
      ) : (
        <SummaryLoader number={9} />
      )}
      <Box sx={{ mt: 2 }}>
        {loading ? (
          <PaperWrapStyled>
            <Skeleton width={'90%'} />
            <TableSkeleton rows={2} cells={1} />
          </PaperWrapStyled>
        ) : (
          data?.extrinsic.hash && (
            <ExtrinsicEventsTabs blockNumber={blockNumber} />
          )
        )}
      </Box>
    </Container>
  );
};

export default Extrinsic;
