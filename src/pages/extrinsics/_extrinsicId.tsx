import { useQuery } from '@apollo/client';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { Box, Container, Divider, Skeleton, Stack, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import BlockStatusIcon from '../../components/block/BlockStatusIcon';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import CopyButton from '../../components/buttons/CopyButton';
import { Address, Hash } from '../../components/ChainId';
import FormatBalance from '../../components/FormatBalance';
import Link from '../../components/Link';
import LoadingSummary from '../../components/Paper/LoadingSummary';
import PaperWrapStyled from '../../components/Paper/PaperWrap.styled';
import SummaryPaper from '../../components/Paper/SummaryPaper';
import { TableSkeleton } from '../../components/Tables/TableSkeleton';
import TimeAgoComponent from '../../components/TimeAgo';
import { GetExtrinsicByPK, GET_EXTRINSIC_BY_PK } from '../../schemas/extrinsics.schema';
import NotFound from '../NotFound';
import ExtrinsicEventsTabs from './extrinsic/ExtrinsicEventsTabs';
import ModuleCalls from './ModuleCalls';

const elementDivider = (
  <Divider variant='middle' orientation='horizontal' sx={{ width: '100%', p: 0, m: 0 }} />
);

const sampleAddress = '0xa86Aa530f6cCBd854236EE00ace687a29ad1c062';

const extrinsicsDetailData = (data: GetExtrinsicByPK['extrinsic']) => [
  { label: 'time', value: <TimeAgoComponent date={data.timestamp} /> },
  {
    label: 'block',
    value: (
      <Link to={`/blocks/${data.blockNumber}`}>
        <Stack direction='row' spacing={1} alignItems='center'>
          <CheckCircleOutlineOutlinedIcon color='success' />
          <Typography>{data.blockNumber}</Typography>
        </Stack>
      </Link>
    )
  },
  {
    label: 'lifetime',
    value: <Typography>{data.lifetime || 'Immortal'}</Typography> // TODO get this value
  },
  {
    label: 'extrinsic hash',
    value: <Hash value={data.hash} />,
    action: <CopyButton value={data.hash} />
  },
  {
    label: 'module/call',
    value: <ModuleCalls module={data.method} call={data.section} />
  },
  {
    label: 'sender',
    value: (
      <Address
        value={'0xa86Aa530f6cCBd854236EE00ace687a29ad1c062'}
        link={'/accounts/0xa86Aa530f6cCBd854236EE00ace687a29ad1c062'}
      />
    ),
    action: <CopyButton value={sampleAddress} />
  },
  {
    // TODO create a component to extract these informations
    label: 'destination',
    value: <Address value={sampleAddress} link={`/accounts/${sampleAddress}`} />,
    action: <CopyButton value={sampleAddress} />
  },
  {
    label: 'value',
    value: (
      <Typography>
        <FormatBalance value={'249850000000'} />
      </Typography>
    )
  },
  {
    label: 'fee',
    value: (
      <Typography>
        <FormatBalance value={'297000000'} />
      </Typography>
    )
  },
  {
    label: 'nonce',
    value: <Typography>8329</Typography>
  },
  {
    label: 'result',
    value: (
      <Stack direction='row' spacing={1} alignItems='center'>
        <BlockStatusIcon status={data.success ? 'successful' : 'failed'} />
        <Typography>{data.success ? 'Success' : 'Failure'}</Typography>
      </Stack>
    )
  },
  {
    label: elementDivider,
    value: elementDivider
  },
  // {
  //   label: 'parameters',
  //   value: <ParametersActions data={sampleParameters} />
  // },
  {
    label: 'signature',
    value: (
      <Typography>
        0x9b9721540932d6989b92aab8cc11469cc4c3e5a5ca88053c563b4e49d910a8692377ef3046d27667cffb3cc7b963f86d0cbaa043113c2949b970a5bb14658ea401
      </Typography>
    )
  }
];

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
        <SummaryPaper data={extrinsicsDetailData(data.extrinsic)} />
      ) : (
        <LoadingSummary number={9} />
      )}
      <Box sx={{ mt: 2 }}>
        {loading ? (
          <PaperWrapStyled>
            <Skeleton width={'90%'} />
            <TableSkeleton rows={2} cells={1} />
          </PaperWrapStyled>
        ) : (
          data?.extrinsic.blockNumber && (
            <ExtrinsicEventsTabs blockNumber={data.extrinsic.blockNumber} />
          )
        )}
      </Box>
    </Container>
  );
};

export default Extrinsic;
