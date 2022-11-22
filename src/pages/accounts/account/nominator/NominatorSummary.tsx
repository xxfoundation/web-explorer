import { Stack } from '@mui/material';
import React, { FC } from 'react';
import FormatBalance from '../../../../components/FormatBalance';
import {
  SummaryContainer,
  SummaryHeader,
  SummaryEntry,
  SummaryValue,
  WithCopy,
} from '../../../../components/Summary';
import { NominatorInfo } from '../../../../schemas/nominator.schema';
import Address from '../../../../components/Hash/XXNetworkAddress';
import { InfoMessage } from '../utils';

const AccountList: FC<{ accounts: string[] }> = ({ accounts }) => (
  <Stack spacing={2} sx={{ overflow: 'auto', width: '100%' }}>
    {accounts?.map((acct) => (
      <Address value={acct} key={acct} />
    ))}
  </Stack>
);

const NominatorSummary: FC<{ info?: NominatorInfo }> = ({ info }) => {
  if (!info) {
    return (
      <InfoMessage message={'Not an Active Nominator'} />
    )
  }

  return (
    <SummaryContainer>
      <SummaryEntry>
        <SummaryHeader>Reward Address</SummaryHeader>
        <SummaryValue>
          <WithCopy value={info.rewardsAddress}>
            <Address
              truncated='mdDown'
              value={info.rewardsAddress}
              url={`/accounts/${info.rewardsAddress}`}
            />
          </WithCopy>
        </SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>Stake</SummaryHeader>
        <SummaryValue>
          <FormatBalance value={info.stake} />
        </SummaryValue>
      </SummaryEntry>
      {info.targets && <SummaryEntry>
        <SummaryHeader>Targets ({info.targets.length})</SummaryHeader>
        <SummaryValue>
          <AccountList accounts={info.targets} />
        </SummaryValue>
      </SummaryEntry>}
    </SummaryContainer>
  );
};

export default NominatorSummary;
