import type { Extrinsic } from '../../../../schemas/extrinsics.schema';
import React, { FC } from 'react';
import { styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorIcon from '@mui/icons-material/Error';

import Link from '../../../../components/Link';
import { Hash } from '../../../../components/ChainId';
import TimeAgo from '../../../../components/TimeAgo';
import SkeletonRows from '../../../../components/SkeletonRows';

const ExtrinsicRow: FC<Extrinsic> = (extrinsic) => (
  <TableRow>
    <TableCell>
      <Link to={`/extrinsics/${extrinsic.blockNumber}-${extrinsic.index}`}>{extrinsic.index}</Link>
    </TableCell>
    <TableCell>
      <Hash
        value={extrinsic.hash}
        link={`/extrinsics/${extrinsic.blockNumber}-${extrinsic.index}`}
        showTooltip
      />
    </TableCell>
    <TableCell>
      <TimeAgo date={extrinsic.timestamp} />
    </TableCell>
    <TableCell>
      {extrinsic.success
        ? <CheckCircleOutlineIcon color='success' />
        : <ErrorIcon color='error' />
      }
    </TableCell>
    <TableCell>
      {extrinsic.section} ({extrinsic.method})
    </TableCell>
  </TableRow>
);

const TableHeaderCell = styled(TableCell)({
  textTransform: 'uppercase'
}); 

const ExtrinsicsTable: FC<{ extrinsics?: Extrinsic[] }> = ({ extrinsics }) => (
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>
            Extrinsic ID
          </TableHeaderCell>
          <TableHeaderCell>
            Hash
          </TableHeaderCell>
          <TableHeaderCell>
            Time
          </TableHeaderCell>
          <TableHeaderCell>
            Result
          </TableHeaderCell>
          <TableHeaderCell>
            Action
          </TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {extrinsics === undefined && <SkeletonRows rows={5} cells={4} />} 
        {extrinsics?.length === 0 && <TableRow><TableCell colSpan={4}>No data to show</TableCell></TableRow>}
        {extrinsics?.map((e) => <ExtrinsicRow {...e} key={e.hash} />)}
      </TableBody>
    </Table>
  </TableContainer>
);


export default ExtrinsicsTable;
