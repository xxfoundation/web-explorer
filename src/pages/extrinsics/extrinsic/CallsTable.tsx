import React, { FC, useMemo } from 'react';
import { BaseLineCellsWrapper, BaselineTable, HeaderCellsWrapper } from '../../../components/Tables';
import ModuleCalls from './summary/ModuleCalls';
import { NestedCall } from '../../../schemas/extrinsics.schema';
import StatusMessage from '../../../components/blockchain/StatusMessage';
import { DataTile } from '../../../components/block/EventsTable';
import { Box } from '@mui/material';

type Props = {
    data: Array<NestedCall> | null;
};

const CallRow = (data: NestedCall) => {
    const docs: string[] = JSON.parse(data.doc.replace(/\//g,''));
    return BaseLineCellsWrapper([
        <Box sx={{ml: 3*data.depth}}><ModuleCalls module={data.module} call={data.call} doc={docs} shorten /></Box>,
        <DataTile headers={Object.keys(JSON.parse(data.args_def))} values={JSON.parse(data.args)} />,
        <StatusMessage status={data.success ? 'successful' : 'failed'} message={data.error_message}/>,
    ]);
};

const CallsTable: FC<Props> = ({ data }) => {
    const headers = HeaderCellsWrapper(['Module/Call', 'Args', 'Result']);
    const rows = useMemo(() => (data || []).map(CallRow), [data]);
    return (
        <>
          <BaselineTable
            loading={data === null}
            headers={headers}
            rows={rows}
          />
        </>
      );
}

export default CallsTable;