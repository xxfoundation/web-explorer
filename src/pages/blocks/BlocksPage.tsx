import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Container,
  Link,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import React from 'react';

type Block = {
  number: number;
  status: string;
  era: string,
  time: string,
  extrinsics: number,
  blockProducer: { name: string, id: number },
  blockHash: string
}

const data = [
  {
    number: 111,
    status: 'lalal',
    era: '2022-01-01',
    time: '2022-01-01',
    extrinsics: 13,
    blockProducer: { name: 'Joselito', id: 123 },
    blockHash: '120983104'
  }
];

const header = ['block', 'status', 'era', 'time', 'extrinsics', 'block producer', 'block hash'];

const rowParser = (item: Block) => {
  return (
    <TableRow key={item.number}>
      <TableCell>
        <Link href={`/block/${item.number}`}>{item.number}</Link>
      </TableCell>
      <TableCell>{item.status}</TableCell>
      <TableCell>{item.era}</TableCell>
      <TableCell>{item.time}</TableCell>
      <TableCell>
        <Link href='#'>{item.extrinsics}</Link>
      </TableCell>
      <TableCell>
        <Link href={`/producer/${item.blockProducer.id || item.blockProducer.name}`}>
          {item.blockProducer.name || item.blockProducer.id}
        </Link>
      </TableCell>
      <TableCell>
        <Link href={`/block/${item.number}`}>{item.blockHash}</Link>
      </TableCell>
    </TableRow>
  );
};

const BlocksTable = () => {
  return (
    <Box>
      <TableContainer component={Paper}>
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
    </Box>
  );
};

const BlocksPage = () => {
  return (
    <>
      <Container sx={{ my: 5 }}>
        <Stack justifyContent={'space-between'} direction={'row'}>
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
