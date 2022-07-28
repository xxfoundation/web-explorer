import { Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import PaperStyled from '../../../../components/Paper/PaperWrap.styled';
import TabsWithPanels, { TabText } from '../../../../components/Tabs';
import { GetValidatorStats } from '../../../../schemas/staking.schema';
import ValidatorInfo from '../ValidatorInfo';
import NominatorsTable from './NominatorsTable';
import ValidatorStatsTable from './ValidatorStatsTable';
// import NominatorActivityTable from './NominatorActivityTable';
// import RewardStashTable from './RewardStashTable';
// import StakingActivityTable from './StakingActivityTable';

const StakingCard: FC<{
  accountId: string;
  validator: GetValidatorStats;
}> = ({ accountId, validator }) => {
  const validatorInfo = validator?.stats && validator?.stats[0];
  const nominators = validatorInfo.nominators
    ?.slice()
    .sort((a, b) => parseFloat(b.share) - parseFloat(a.share));

  const validatorStats = validator?.stats;
  const statsCount = validator?.aggregates.aggregate.count;

  const panels = useMemo(() => {
    const cachedPanels = [
      // {
      //   label: <Typography>rewards & slashes</Typography>,
      //   content: <RewardStashTable />
      // },
      // {
      //   label: <Typography>staking activity</Typography>,
      //   content: <StakingActivityTable />
      // }
      {
        label: <Typography>Validator Info</Typography>,
        content: <ValidatorInfo info={validatorInfo} />
      },
      {
        label: <TabText message='nominators' count={nominators?.length} />,
        content: <NominatorsTable nominators={nominators} />
      },
      {
        label: <TabText message='Validator Stats' count={statsCount} />,
        content: <ValidatorStatsTable accountId={accountId} stats={validatorStats} />
      }
    ];
    // if (roles.includes('nominator')) {
    //   cachedPanels.push({
    //     label: <Typography>nominator activity</Typography>,
    //     content: <NominatorActivityTable />
    //   });
    // }
    return cachedPanels;
  }, [accountId, nominators, statsCount, validatorInfo, validatorStats]);

  return (
    <PaperStyled>
      <Typography fontSize={26} fontWeight={500} marginBottom={'10px'}>
        Staking
      </Typography>
      <TabsWithPanels panels={panels} tabsLabel='account staking card' />
    </PaperStyled>
  );
};

export default StakingCard;
