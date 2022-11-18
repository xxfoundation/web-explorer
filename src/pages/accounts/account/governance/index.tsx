import React, {FC} from 'react';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
    
    Object.entries(records).filter((r) => r[1].aggregate.count > 0).map((r) => {
      const key: string = r[0];
      const value = r[1];
      formattedData.push({
        key,
        count: value.aggregate.count
      })
    })
    return formattedData;
  }

  return isEmpty() ? <div>{t('No activity')}</div> : (
    <EventsTabs loading={loading} accountId={account.id} modules={filterOutEmptyRecords(data)} />
  );
}

export default GovernanceCard;