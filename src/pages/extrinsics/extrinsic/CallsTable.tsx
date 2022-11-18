import React, { FC, useMemo } from 'react';
import { BaseLineCellsWrapper, BaselineTable, HeaderCellsWrapper } from '../../../components/Tables';
import ModuleCalls from './summary/ModuleCalls';
import BlockStatusIcon from '../../../components/block/BlockStatusIcon';
import { NestedCall } from '../../../schemas/extrinsics.schema';

type Props = {
    data: Array<NestedCall> | null;
};

const CallRow = (data: NestedCall) => {
    // TODO: This is ugly, needs to be fixed on backend
    const docs: string[] = JSON.parse(data.doc.replace(/\//g,''));
    // TODO: Add args and error message
    // TODO: Indent module/calls based on depth
    return BaseLineCellsWrapper([
        <ModuleCalls module={data.module} call={data.call} doc={docs} />,
        <BlockStatusIcon status={data.success ? 'successful' : 'failed'} />,
    ]);
};

const CallsTable: FC<Props> = ({ data }) => {
    const headers = HeaderCellsWrapper(['Module/Call', 'Result']);
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