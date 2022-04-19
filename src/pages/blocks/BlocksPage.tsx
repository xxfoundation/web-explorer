import { useQuery } from '@apollo/client';
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

  // total_events: number;
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
  return (
    <>
      {rangeOfItems.map((i) => {
        return (
          <TableRow key={i}>
            <TableCell>
              <Skeleton />
            </TableCell>
            <TableCell>
              <Skeleton />
            </TableCell>
            <TableCell>
              <Skeleton />
            </TableCell>
            <TableCell>
              <Skeleton />
            </TableCell>
            <TableCell>
              <Skeleton />
            </TableCell>
            <TableCell>
              <Skeleton />
            </TableCell>
            <TableCell>
              <Skeleton />
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
};

const TableStrucuture: FC<{
  blocks: Block[];
  rowsPerPage: number;
  loading: boolean;
}> = ({ blocks, loading, rowsPerPage }) => {
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
        <TableBody>
          {loading ? <SkeletonLoader lines={rowsPerPage} /> : blocks.map(rowParser)}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const BlocksTable: FC = () => {
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [page, setPage] = useState(0);

  const { data, error, fetchMore, loading } = useQuery<Response>(LIST_BLOCK, {
    variables: { limit: rowsPerPage, offset: rowsPerPage * page }
  });

  if (error) return <h1>something when wrong</h1>;

  return (
    <PaperWrap>
      <TableStrucuture blocks={data?.blocks || []} loading={loading} rowsPerPage={rowsPerPage} />
      <TablePagination
        rowsPerPage={rowsPerPage}
        page={0}
        count={data?.agg.aggregate.count || 0}
        onPageChange={(_: unknown, number: number) => {
          console.warn(`new page is ${number}`);
          setPage(number + page);
          fetchMore({ variables: { offset: data?.blocks.length, limit: rowsPerPage } }).then(
            (res) => {
              if (!res.error) return;
              // eslint-disable-next-line no-console
              console.info(res.data);
            }
          );
        }}
        rowsPerPageOptions={[15, 20, 30, 40, 50]}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value));
          setPage(0);
        }}
      />
    </PaperWrap>
  );
};

const BlocksPage = () => {
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
      <BlocksTable />
    </Container>
  );
};

export default BlocksPage;
