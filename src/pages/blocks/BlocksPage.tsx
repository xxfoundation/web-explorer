import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import {
  Container,
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
import React, { FC } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import CopyButton from '../../components/buttons/CopyButton';
import DownloadDataButton from '../../components/buttons/DownloadDataButton';
import { Hash } from '../../components/ChainId';
import Link from '../../components/Link';
import { PaperWrap } from '../../components/Paper/PaperWrap';
import TablePagination from '../../components/TablePagination';
import { TableContainer } from '../../components/Tables/TableContainer';
import TimeAgoComponent from '../../components/TimeAgo';

type Block = {
  number: number;
  status: string;
  era: string;
  time: string;
  extrinsics: number;
  blockProducer: { name: string; id: number };
  blockHash: string;
};

const data = [
  {
    number: 111,
    status: 'lalal',
    era: '43',
    time: '2022-01-01',
    extrinsics: 13,
    blockProducer: { name: 'Joselitooooooooooooooooo', id: 123 },
    blockHash: '0xb63e96a5fabbb2644c13348dd0723c83963270557dfc04d341b76c4c55aa3895'
  }
];

const header = ['block', 'status', 'era', 'time', 'extrinsics', 'block producer', 'block hash'];

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500
  }
});

const TooltipWithCopy: FC<{ blockHash: string }> = ({ blockHash, children }) => {
  return (
    <CustomWidthTooltip
      title={
        <Stack direction={'row'} spacing={1} alignItems={'center'}>
          <Typography fontSize={'10px'} fontWeight={400}>
            {blockHash}
          </Typography>
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

const RenderProducer: FC<{ number: number; blockProducer: { id: number; name?: string } }> = ({
  blockProducer: { id, name },
  number
}) => {
  let content = id.toString();
  if (name) {
    content = name.length > 16 ? name.slice(0, 7) + '....' + name.slice(-5) : name;
  }
  return <Link to={`/blocks/${number}/producer/${id || name}`}>{content}</Link>;
};

const rowParser = (item: Block) => {
  return (
    <TableRow key={item.number}>
      <TableCell>
        <Link to={`/blocks/${item.number}`}>{item.number}</Link>
      </TableCell>
      <TableCell>
        <WatchLaterOutlinedIcon color={'warning'} />
      </TableCell>
      <TableCell>{item.era}</TableCell>
      <TableCell>
        <TimeAgoComponent date={'2022-02-16 01:56:42 (+UTC)'} />
      </TableCell>
      <TableCell>
        <Link to='#'>{item.extrinsics}</Link>
      </TableCell>
      <TableCell>
        <RenderProducer number={item.number} blockProducer={item.blockProducer} />
      </TableCell>
      <TableCell>
        <TooltipWithCopy blockHash={item.blockHash}>
          <Hash value={item.blockHash} link={`/blocks/${item.number}`} truncated />
        </TooltipWithCopy>
      </TableCell>
    </TableRow>
  );
};

const BlocksTable = () => {
  return (
    <PaperWrap>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {header.map((h) => {
                return <TableCell key={h}>{h}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>{data.map(rowParser)}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination page={0} count={data.length} />
    </PaperWrap>
  );
};

const BlocksPage = () => {
  return (
    <Container sx={{ my: 5 }}>
      <Breadcrumb />
      <Stack justifyContent={'space-between'} direction={'row'} sx={{ mb: 5 }}>
        <Typography fontWeight={800} fontSize={46}>
          Blocks
        </Typography>
        <DownloadDataButton onClick={() => {}}>Download data</DownloadDataButton>
      </Stack>
      <BlocksTable />
    </Container>
  );
};

export default BlocksPage;
