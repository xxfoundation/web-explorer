import { Divider, Hidden, Grid, Container, Typography } from '@mui/material';
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
import { ValidatorStats } from '../../schemas/staking.schema';
import Ellipsis from '../../components/Ellipsis';
import Error from '../../components/Error';

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

const Summary: FC<{ info?: ValidatorStats }> = ({ info }) => {
  const location = useMemo(() => {
    const parsedLocation: { city: string; country: string; geoBin: string } = JSON.parse(
      info?.location || ''
    );
    return `${parsedLocation.city}, ${parsedLocation.country}`;
  }, [info?.location]);
  const sessionEntries = useMemo(() => JSON.parse(info?.sessionKeys || ''), [info?.sessionKeys]);

  if (!info) {
    return (
      <Container sx={{ my: 5 }}>
        <Typography variant='h1' maxWidth={'400px'} sx={{ mb: 5 }}>
          <Error type='data-unavailable' />;
        </Typography>
      </Container>
    );
  }

  const addressProps: Partial<HashProps> = {
    sx: { fontSize: 14, fontWeight: 400 },
    offset: { xs: 6, sm: 12 },
    truncated: 'mdDown'
  };

  return (
    <SummaryContainer>
      {/* <SummaryEntry>
        <SummaryHeader>Stash</SummaryHeader>
        <SummaryValue>
          <WithCopy value={info.stashAddress}>
            <Address {...addressProps} name={name} value={info.stashAddress} />
          </WithCopy>
        </SummaryValue>
      </SummaryEntry> */}
      {/* <SummaryEntry>
        <SummaryHeader>Controller</SummaryHeader>
        <SummaryValue>
          <WithCopy value={info.controllerAddress}>
            <Address {...addressProps} value={info.controllerAddress} />
          </WithCopy>
        </SummaryValue>
      </SummaryEntry> */}
      <SummaryEntry>
        <SummaryHeader>Reward</SummaryHeader>
        <SummaryValue>
          <WithCopy value={info.rewardsAddress}>
            <Address {...addressProps} value={info.rewardsAddress} />
          </WithCopy>
        </SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>Cmix ID</SummaryHeader>
        <SummaryValue>
          <WithCopy value={info.cmixId || ''}>
            <CmixAddress {...addressProps} value={info.cmixId || ''} />
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
          <FormatBalance value={info.selfStake.toString()} />
        </SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>Other Stake</SummaryHeader>
        <SummaryValue>
          <FormatBalance value={info.otherStake.toString()} />
        </SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>Total Stake</SummaryHeader>
        <SummaryValue>
          <FormatBalance value={info.totalStake.toString()} />
        </SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>Nominators</SummaryHeader>
        <SummaryValue>{info.nominators.length}</SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>Commission</SummaryHeader>
        <SummaryValue>{info.commission}</SummaryValue>
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
