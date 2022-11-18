import { Divider, Hidden, Grid, Container, Typography } from '@mui/material';
import React, { FC, Fragment, useMemo } from 'react';
import Hash, { Props as HashProps } from '../../../../components/Hash';
import CmixAddress from '../../../../components/Hash/CmixAddress';
import FormatBalance from '../../../../components/FormatBalance';
import {
  SummaryContainer,
  SummaryHeader,
  SummaryEntry,
  SummaryValue,
  WithCopy
} from '../../../../components/Summary';
import Ellipsis from '../../../../components/Ellipsis';
import Error from '../../../../components/Error';
import { ValidatorInfo } from '../../../../schemas/validator.schema';

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

const locationString = (geoBin: string, city: string, country: string) => {
  let str = (geoBin && `[${geoBin}] `) || '';
  str = str.concat(city && `${city}`, country && (city ? `, ${country}` : `${country}`));
  return str;
};

const ValidatorSummary: FC<{ active: boolean, info?: ValidatorInfo }> = ({ active, info }) => {
  const location = useMemo(() => {
    if (!info?.location) {
      return ' - ';
    }
    const parsedLocation: { city: string; country: string; geoBin: string } = JSON.parse(
      info?.location
    );
    const isEmpty = Object.entries(parsedLocation).every((x) => x[1] === null || x[1] === '');

    return !isEmpty
      ? locationString(parsedLocation.geoBin, parsedLocation.city, parsedLocation.country)
      : ' - ';
  }, [info?.location]);

  const sessionEntries = useMemo(
    () => info?.sessionKeys && JSON.parse(info?.sessionKeys),
    [info?.sessionKeys]
  );

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
      {info.cmixId && (
        <SummaryEntry>
          <SummaryHeader>Cmix ID</SummaryHeader>
          <SummaryValue>
            <WithCopy value={info.cmixId || ''}>
              <CmixAddress {...addressProps} value={info.cmixId || ''} />
            </WithCopy>
          </SummaryValue>
        </SummaryEntry>
      )}
      <SummaryEntry>
        <SummaryHeader>Location</SummaryHeader>
        <SummaryValue>{location}</SummaryValue>
      </SummaryEntry>
      {active && <SummaryEntry>
        <SummaryHeader>Own Stake</SummaryHeader>
        <SummaryValue>
          <FormatBalance value={info.stake} />
        </SummaryValue>
      </SummaryEntry>}
      {active && info.nominators && <SummaryEntry>
        <SummaryHeader>Nominators</SummaryHeader>
        <SummaryValue>{info.nominators.length}</SummaryValue>
      </SummaryEntry>}
      <SummaryEntry>
        <SummaryHeader>Commission</SummaryHeader>
        <SummaryValue>{info.commission}</SummaryValue>
      </SummaryEntry>
      {sessionEntries && (
        <SummaryEntry>
          <SummaryHeader>Session Key</SummaryHeader>
          <SummaryValue>
            <SessionKeyValues entries={sessionEntries} />
          </SummaryValue>
        </SummaryEntry>
      )}
    </SummaryContainer>
  );
};

export default ValidatorSummary;
