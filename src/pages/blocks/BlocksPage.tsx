import { ApolloError, useQuery } from '@apollo/client';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import {
  Container,
  Skeleton,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography
} from '@mui/material';
import React, { FC, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import CopyButton from '../../components/buttons/CopyButton';
import DownloadDataButton from '../../components/buttons/DownloadDataButton';
import { Hash } from '../../components/ChainId';
import Link from '../../components/Link';
import { PaperWrap } from '../../components/Paper/PaperWrap';
import { TableContainer } from '../../components/Tables/TableContainer';
import TablePagination from '../../components/Tables/TablePagination';
import TimeAgoComponent from '../../components/TimeAgo';
import { LIST_BLOCK } from '../../schemas/blocks.schema';

type Block = {
  hash: string;
  number: number;
  numberFinalized: number;
  currentEra: number;
  timestamp: number;
  numTransfers: number;
  author: string;
  authorName: string;
};

type Response = { blocks: Block[]; agg: { aggregate: { count: number } } };

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500
  }
});

const HashColumnWithTooltip: FC<{ blockHash: string }> = ({ blockHash, children }) => {
  return (
    <CustomWidthTooltip
      title={
        <Stack direction={'row'} spacing={1} alignItems={'center'}>
          <Typography variant='body5'>{blockHash}</Typography>
          <CopyButton value={blockHash} />
        </Stack>
      }
      placement='left'
      arrow
    >
      <span>{children}</span>
    </CustomWidthTooltip>
  );
};

const RenderProducer: FC<{
  number: number;
  blockProducer: { id: string; name?: string };
}> = ({ blockProducer: { id, name }, number }) => {
  const idString = id.toString();
  const content = name
    ? name
    : idString.length > 16
    ? idString.slice(0, 7) + '....' + idString.slice(-5)
    : idString;
  return <Link to={`/blocks/${number}/producer/${id || name}`}>{content}</Link>;
};

const rowParser = (block: Block) => {
  return (
    <TableRow key={block.number}>
      <TableCell>
        <Link to={`/blocks/${block.number}`}>{block.number}</Link>
      </TableCell>
      <TableCell>
        <WatchLaterOutlinedIcon color={'warning'} />
      </TableCell>
      <TableCell>{block.currentEra}</TableCell>
      <TableCell>
        <TimeAgoComponent date={'2022-02-16 01:56:42 (+UTC)'} />
      </TableCell>
      <TableCell>
        <Link to='#'>{block.numTransfers}</Link>
      </TableCell>
      <TableCell>
        <RenderProducer
          number={block.number}
          blockProducer={{ id: block.author, name: block.authorName }}
        />
      </TableCell>
      <TableCell>
        <HashColumnWithTooltip blockHash={block.hash}>
          <Hash value={block.hash} link={`/blocks/${block.number}`} truncated />
        </HashColumnWithTooltip>
      </TableCell>
    </TableRow>
  );
};

const SkeletonLoader: FC<{ lines: number }> = ({ lines }) => {
  const rangeOfItems: number[] = [...Array(lines).keys()];
  const columnsSkeletons: number[] = [...Array(7).keys()];
  return (
    <>
      {rangeOfItems.map((i) => {
        return (
          <TableRow key={i}>
            {columnsSkeletons.map((innerI) => {
              return (
                <TableCell key={innerI}>
                  <Skeleton />
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </>
  );
};

const TableStrucuture: FC = ({ children }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>block</TableCell>
            <TableCell>status</TableCell>
            <TableCell>era</TableCell>
            <TableCell>time</TableCell>
            <TableCell>extrinsics</TableCell>
            <TableCell>block producer</TableCell>
            <TableCell>block hash</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
};

const ROWS_PER_PAGE = 4;

const BlocksTable: FC<{
  data?: Response;
  error?: ApolloError;
  loading: boolean;
  rowsPerPage: number;
}> = ({ data, error, loading, rowsPerPage }) => {
  if (error) return <h1>something when wrong</h1>;
  if (loading) {
    return (
      <TableStrucuture>
        <SkeletonLoader lines={rowsPerPage} />
      </TableStrucuture>
    );
  }

  return <TableStrucuture>{(data?.blocks || []).map(rowParser)}</TableStrucuture>;
};

const BlocksRenderer = () => {
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE);
  const [page, setPage] = useState(0);
  // const [blockNumber, setBlockNumber] = useState<number>(); // LATEST NUMBER don't work
  const variables = {
    limit: rowsPerPage,
    offset: page * rowsPerPage,
    // where: {
    //   block_number: {
    //     _lte: blockNumber
    //   }
    // }
  };
  const { data, error, loading } = useQuery<Response>(LIST_BLOCK, { variables });
  return (
    <Container sx={{ my: 5 }}>
      <Breadcrumb />
      <Stack
        justifyContent={'space-between'}
        alignItems={'center'}
        direction={'row'}
        sx={{ mb: 5 }}
      >
        <Typography variant='h1'>Blocks</Typography>
        <DownloadDataButton onClick={() => {}} disabled>
          Download data
        </DownloadDataButton>
      </Stack>
      <PaperWrap>
        <BlocksTable data={data} error={error} loading={loading} rowsPerPage={rowsPerPage} />
        {loading ? (
          <Skeleton />
        ) : (
          <TablePagination
            rowsPerPage={rowsPerPage}
            page={page}
            count={data?.agg.aggregate.count || 0}
            onPageChange={(_: unknown, number: number) => {
              // setBlockNumber(data?.blocks.at(0)?.number);
              setPage(number);
            }}
            rowsPerPageOptions={[ROWS_PER_PAGE, 20, 30, 40, 50]}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value));
              setPage(0);
            }}
          />
        )}
      </PaperWrap>
    </Container>
  );
};

export default BlocksRenderer;
