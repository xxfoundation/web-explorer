import { Divider, Hidden, Grid } from '@mui/material';
import React, { FC, Fragment, useMemo } from 'react';
import Address from '../../components/Hash/XXNetworkAddress';
import Hash, { Props as HashProps } from '../../components/Hash';
import CmixAddress from '../../components/Hash/CmixAddress';
import FormatBalance from '../../components/FormatBalance';
import {
  SummaryContainer,
  SummaryHeader,
  SummaryEntry,
  SummaryValue,
  WithCopy
} from '../../components/Summary';
import { CommonFieldsRankingFragment } from '../../schemas/staking.schema';
import Ellipsis from '../../components/Ellipsis';

const SessionKeyValues: FC<{ entries: Record<string, string | string> }> = ({ entries }) => {
  return (
    <Grid spacing={1} container paddingTop='1em'>
      {Object.entries(entries).map(([name, value]) => {
        return (
          <Fragment key={name}>
            <Grid item xs={12} md={2}>
              {name}
            </Grid>
            <Hidden mdDown>
              <Grid item xs={1} md={1}>
                <Divider orientation='vertical' />
              </Grid>
            </Hidden>
            <Grid item xs={9} md={9}>
              <Ellipsis>
                <Hash truncated value={value} offset={10} />
              </Ellipsis>
            </Grid>
          </Fragment>
        );
      })}
    </Grid>
  );
};

const Summary: FC<{ ranking: CommonFieldsRankingFragment; name?: string }> = ({
  name,
  ranking
}) => {
  const location = useMemo(() => {
    const parsedLocation: { city: string; country: string; geoBin: string } = JSON.parse(
      ranking.location
    );
    return `${parsedLocation.city}, ${parsedLocation.country}`;
  }, [ranking.location]);
  const sessionEntries = useMemo(() => JSON.parse(ranking.sessionKeys), [ranking.sessionKeys]);

  const addressProps: Partial<HashProps> = {
    sx: { fontSize: 14, fontWeight: 400 },
    offset: { xs: 6, sm: 12 },
    truncated: 'mdDown'
  };

  return (
    <SummaryContainer>
      <SummaryEntry>
        <SummaryHeader>Stash</SummaryHeader>
        <SummaryValue>
          <WithCopy value={ranking.stashAddress}>
            <Address {...addressProps} name={name} value={ranking.stashAddress} />
          </WithCopy>
        </SummaryValue>
      </SummaryEntry>
      {/* <SummaryEntry>
        <SummaryHeader>Controller</SummaryHeader>
        <SummaryValue>
          <WithCopy value={ranking.controllerAddress}>
            <Address {...addressProps} value={ranking.controllerAddress} />
          </WithCopy>
        </SummaryValue>
      </SummaryEntry> */}
      <SummaryEntry>
        <SummaryHeader>Reward</SummaryHeader>
        <SummaryValue>
          <WithCopy value={ranking.rewardsAddress}>
            <Address {...addressProps} value={ranking.rewardsAddress} />
          </WithCopy>
        </SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>Cmix ID</SummaryHeader>
        <SummaryValue>
          <WithCopy value={ranking.cmixId}>
            <CmixAddress {...addressProps} value={ranking.cmixId} />
          </WithCopy>
        </SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>Location</SummaryHeader>
        <SummaryValue>{location}</SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>Own Stake</SummaryHeader>
        <SummaryValue>
          <FormatBalance value={ranking.selfStake.toString()} />
        </SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>Other Stake</SummaryHeader>
        <SummaryValue>
          <FormatBalance value={ranking.otherStake.toString()} />
        </SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>Total Stake</SummaryHeader>
        <SummaryValue>
          <FormatBalance value={ranking.totalStake.toString()} />
        </SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>Nominators</SummaryHeader>
        <SummaryValue>{ranking.nominations.length}</SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>Commission</SummaryHeader>
        <SummaryValue>{ranking.commission}</SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>Session Key</SummaryHeader>
        <SummaryValue>
          <SessionKeyValues entries={sessionEntries} />
        </SummaryValue>
      </SummaryEntry>
    </SummaryContainer>
  );
};

export default Summary;
