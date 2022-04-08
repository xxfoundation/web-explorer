import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { LoadingButton } from '@mui/lab';
import {
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs';
import Link from '../../components/Link';
import { Hash } from '../../components/ChainId';
import { PaperWrap } from '../../components/Paper/PaperWrap'
import { TableContainer } from '../../components/Tables/TableContainer'

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
    era: '2022-01-01',
    time: '2022-01-01',
    extrinsics: 13,
    blockProducer: { name: 'Joselito', id: 123 },
    blockHash: '0xb63e96a5fabbb2644c13348dd0723c83963270557dfc04d341b76c4c55aa3895'
  }
];

const header = ['block', 'status', 'era', 'time', 'extrinsics', 'block producer', 'block hash'];

const rowParser = (item: Block) => {
  return (
    <TableRow key={item.number}>
      <TableCell>
        <Link to={`/blocks/${item.number}`}>{item.number}</Link>
      </TableCell>
      <TableCell>{item.status}</TableCell>
      <TableCell>{item.era}</TableCell>
      <TableCell>{item.time}</TableCell>
      <TableCell>
        <Link to='#'>{item.extrinsics}</Link>
      </TableCell>
      <TableCell>
        <Link
          to={`/blocks/${item.number}/producer/${item.blockProducer.id || item.blockProducer.name}`}
        >
          {item.blockProducer.name || item.blockProducer.id}
        </Link>
      </TableCell>
      <TableCell>
        <Link to={`/blocks/${item.number}`}>
          <Hash
            value={item.blockHash}
            truncated
          />
        </Link>
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
    </PaperWrap>
  );
};

const BlocksPage = () => {
  return (
    <>
      <Container sx={{ my: 5 }}>
        <Breadcrumb />
        <Stack justifyContent={'space-between'} direction={'row'} sx={{ mb: 5 }}>
          <Typography variant='h1'>Blocks</Typography>
          <LoadingButton loading={false} startIcon={<FileDownloadIcon />}>
            Download data
          </LoadingButton>
        </Stack>

        <BlocksTable />
      </Container>
    </>
  );
};

export default BlocksPage;
