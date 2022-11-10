import React, {FC, useMemo} from 'react';
import {useQuery} from '@apollo/client';
import {
  Account,
  GET_MODULES_COUNTS,
  GetModulesCounts
} from '../../../../schemas/accounts.schema';
import {Skeleton} from '@mui/material';
import {TableSkeleton} from '../../../../components/Tables/TableSkeleton';
import TabsWithPanels, {TabText} from '../../../../components/Tabs';
import {BaselineCell, BaselineTable, HeaderCellsWrapper} from '../../../../components/Tables';
import Link from '../../../../components/Link';
import TimeAgoComponent from '../../../../components/TimeAgo';
import {Event} from '../../../../schemas/events.schema';
import CodeDisplay from '../../../../components/CodeDisplay';

type Props = {
  account: Account;
};

const GovernanceCard: FC<Props> = ({ account }) => {
  const { data: modules, loading } = useQuery<GetModulesCounts>(GET_MODULES_COUNTS, {
    variables: { accountId: account.id }
  });

  const rowsParser = ({ blockNumber, call, data, index, timestamp }: Event): BaselineCell[] => {
    return [
      { value: index },
      { value: <Link to={`/blocks/${blockNumber}`}>{blockNumber}</Link> },
      { value: <TimeAgoComponent date={timestamp} /> },
      { value: `${call}` },
      { value: <CodeDisplay style={{ width: 300, height: 200 }}>{data}</CodeDisplay> }];
  };
  
  const getTabs = (data: Event[] = []) => {
    const formattedData: any = {};
    for (let i = 0; i < data.length; i++) {
      const obj = data[i];
      if(formattedData[obj.module]) {
        formattedData[obj.module].push(obj)
      }
      else {
        formattedData[obj.module] = [obj]
      }
    }
    const headers = HeaderCellsWrapper(['EVENT ID', 'Block Number', 'Time', 'Call', 'Data']);

    return Object.entries(formattedData).map(tab => {
      const label = tab[0];
      // @ts-ignore
      const row: Event[] = tab[1]
      // @ts-ignore
      const count = tab[1].length
      return {
        label: (
          <TabText
            message={label}
            count={count}
          />
        ),
        content: (
          <BaselineTable
            loading={false}
            headers={headers}
            rows={row.map(d => rowsParser(d))}
          />
        )
      }
    })
  }
  
  const panels = useMemo(() => {
    return loading
      ? [
        {
          label: <Skeleton width={'90%'} />,
          content: <TableSkeleton rows={2} cells={1} />
        },
        {
          label: <Skeleton width={'90%'} />,
          content: <TableSkeleton rows={2} cells={1} />
        }
      ]
      : getTabs(modules?.event)
  }, [account.id, loading, modules]);

  const isEmpty = modules && modules.event.length < 1

  return isEmpty ? <div>No records available</div> : (
    <TabsWithPanels panels={panels} tabsLabel='account governance card' />
  );
}

export default GovernanceCard;