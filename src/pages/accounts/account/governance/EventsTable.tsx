import {BaselineCell, BaselineTable, HeaderCellsWrapper} from '../../../../components/Tables';
import React, {useMemo} from 'react';
import {Event} from '../../../../schemas/events.schema';
import Link from '../../../../components/Link';
import TimeAgoComponent from '../../../../components/TimeAgo';
import {useQuery} from '@apollo/client';
import {GET_EVENTS_LIST, GetEventsList} from '../../../../schemas/accounts.schema';
import {DataTile} from '../../../../components/block/EventsTable';

interface IEventsTable {
  accountId: string,
  entity: string
}

const rowsParser = ({ blockNumber, call, data, index, timestamp }: Event): BaselineCell[] => {
  return [
    { value: index },
    { value: <Link to={`/blocks/${blockNumber}`}>{blockNumber}</Link> },
    { value: <TimeAgoComponent date={timestamp} /> },
    { value: `${call}` },
    { value: <DataTile values={JSON.parse(data)} /> }];
};
const headers = HeaderCellsWrapper(['EVENT ID', 'Block Number', 'Time', 'Call', 'Data']);

const generateWhere = (accountId: string, entity: string) => {
  if (entity === 'councilElections') {
    return {
      account_id: {
        _eq: accountId
      },
      _and: {
        _or: [
          {module: {_eq: 'council'}}, {module: {_eq: 'elections'}}]
      }
    }
  } else {
    return {
      account_id: {
        _eq: accountId
      },
      module: {
        _eq: entity
      }
    }
  }
}

const EventsTable:React.FC<IEventsTable> = ({accountId,  entity}) => {
  const { data, loading } = useQuery<GetEventsList>(GET_EVENTS_LIST, {
    variables: {
      where: generateWhere(accountId, entity)
    }
  });
  
  const rows = useMemo(() => data ? data.event.map(d => rowsParser(d)) : [], [data])
  return (
    <BaselineTable
      loading={loading}
      headers={headers}
      rows={rows}
    />
  )
}

export default EventsTable;