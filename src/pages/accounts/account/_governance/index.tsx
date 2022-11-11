import React, {FC} from 'react';
import {useQuery} from '@apollo/client';
import {
  Account, GET_EVENTS_COUNTS,
  GetEventsCounts,
} from '../../../../schemas/accounts.schema';
import EventsTabs from './EventsTabs';

type Props = {
  account: Account;
};

export interface IModulesProps {
  key: string, 
  count: number
}

const GovernanceCard: FC<Props> = ({ account }) => {
  const {data, loading} = useQuery<GetEventsCounts>(GET_EVENTS_COUNTS, {
    variables: { accountId: account.id }
  })

  const isEmpty = () => {
    let hasRecords = false;
    if (data) {
      Object.entries(data).map(d => {
        if(d[1].aggregate.count > 0) {
          hasRecords = true;
        }
      }) 
    }
    return !hasRecords && !loading;
  }
  
  const filterOutEmptyRecords = (records: GetEventsCounts | undefined) => {
    const formattedData: IModulesProps[] = []
    if(!records) {
      return undefined;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Object.entries(records).filter((r: any) => r[1].aggregate.count > 0).map((r: any) => {
      const key: string = r[0];
      const value = r[1];
      formattedData.push({
        key,
        count: value.aggregate.count
      })
    })
    return formattedData;
  }

  return isEmpty() ? <div>No records available</div> : (
    <EventsTabs loading={loading} accountId={account.id} modules={filterOutEmptyRecords(data)} />
  );
}

export default GovernanceCard;