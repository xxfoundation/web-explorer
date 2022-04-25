import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React, { useState } from 'react';
import { Hash } from '../../components/ChainId';
import Link from '../../components/Link';
import { BaselineCell, BaseLineCellsWrapper, BaselineTable } from '../../components/Tables';
import { TableCellLeftDivider } from '../../components/Tables/TableCell';
import TablePagination from '../../components/Tables/TablePagination';

type Extrinsic = {
  id: string;
  block: number;
  hash: string;
  time: string;
  action: string;
};

const extrinsicToRow = (extrinsic: Extrinsic): BaselineCell[] => {
  const extrinsicIdLink = `/extrinsics/${extrinsic.id}`;
  return BaseLineCellsWrapper([
    <Link to={extrinsicIdLink}>{extrinsic.id}</Link>,
    <Link to={`/blocks/${extrinsic.block}`}>{extrinsic.block}</Link>,
    <Hash value={extrinsic.hash} link={`/extrinsics/${extrinsic.hash}`} truncated />,
    extrinsic.time,
    <AccessTimeIcon color='warning' />,
    <Link to='#'>{extrinsic.action}</Link>,
    <TableCellLeftDivider>
      <Link to={extrinsicIdLink}>
        <ArrowForwardIosIcon />
      </Link>
    </TableCellLeftDivider>
  ]);
};

const sampleData = () => {
  const items = [];
  for (let step = 0; step < 21; step++) {
    items.push({
      id: '357706-' + step,
      block: 357968,
      hash: '0xa2876369e34f570fb55d11c29c60e45d10a889dc23d1210e5e716013066382b7',
      time: '32 min',
      action: 'balances (transfer)'
    });
  }
  return items;
};

const HistoryTable = () => {
  const extrinsicsHistoryData = sampleData();
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [page, setPage] = useState(0);

  return (
    <BaselineTable
      tableProps={{ sx: { 'th:last-child, td:last-child': { maxWidth: '6px' } } }}
      headers={BaseLineCellsWrapper([
        'extrinsics id',
        'block',
        'extrinsics hash',
        'time',
        'result',
        'action',
        ''
      ])}
      rows={(rowsPerPage > 0
        ? extrinsicsHistoryData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : extrinsicsHistoryData
      ).map(extrinsicToRow)}
      footer={
        <TablePagination
          page={page}
          count={extrinsicsHistoryData.length}
          rowsPerPage={rowsPerPage}
          onPageChange={(_: unknown, number: number) => {
            setPage(number);
          }}
          rowsPerPageOptions={[20, 30, 40, 50]}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value));
            setPage(0);
          }}
        />
      }
    />
  );
};

export default HistoryTable;
