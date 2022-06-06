import { Divider, Grid, Typography } from '@mui/material';
import React, { FC, Fragment, useMemo } from 'react';
import CopyButton from '../../components/buttons/CopyButton';
import { Address } from '../../components/ChainId';
import FormatBalance from '../../components/FormatBalance';
import { SummaryPaperWrapper, SummaryRow } from '../../components/Paper/SummaryPaper';
import { CommonFieldsRankingFragment } from '../../schemas/ranking.schema';

const sampleHash = '6Ze8pqYi4CAuwdm4eTGxKke7LSF6phkzmERUmpG5tTC1yKoh';

const SessionKeyValue: FC<{ entries: Record<string, string | JSX.Element> }> = ({ entries }) => {
  return (
    <Grid spacing={1} container>
      {Object.entries(entries).map(([name, value]) => {
        return (
          <Fragment key={name}>
            <Grid item xs={2} sm={2} md={2}>
              {name}
            </Grid>
            <Grid item xs={1} sm={1} md={1}>
              <Divider orientation='vertical' />
            </Grid>
            <Grid item xs={9} sm={9} md={9}>
              <Typography>{value}</Typography>
            </Grid>
          </Fragment>
        );
      })}
    </Grid>
  );
};

const Summary: FC<{ ranking: CommonFieldsRankingFragment }> = ({ ranking }) => {
  const location = useMemo(() => {
    const parsedLocation: { city: string; country: string; geoBin: string } = JSON.parse(
      ranking.location
    );
    return `${parsedLocation.city}, ${parsedLocation.country}`;
  }, [ranking.location]);
  const sessionEntries = useMemo(() => JSON.parse(ranking.sessionKeys), [ranking.sessionKeys]);
  return (
    <SummaryPaperWrapper>
      <SummaryRow label='stash' action={<CopyButton value={sampleHash} />}>
        <Address value={ranking.stashAddress} />
      </SummaryRow>
      <SummaryRow label='controller' action={<CopyButton value={ranking.controllerAddress} />}>
        <Address name='test' value={ranking.controllerAddress} />
      </SummaryRow>
      <SummaryRow label='reward' action={<CopyButton disabled value={ranking.rewardsAddress} />}>
        <Address value={ranking.rewardsAddress} />
      </SummaryRow>
      <SummaryRow label='cmix id' action={<CopyButton disabled value={ranking.cmixId} />}>
        <Typography>{ranking.cmixId}</Typography>
      </SummaryRow>
      <SummaryRow label='location'>
        <Typography>{location}</Typography>
      </SummaryRow>
      <SummaryRow label='own stake'>
        <Typography>
          <FormatBalance value={ranking.selfStake.toString()} />
        </Typography>
      </SummaryRow>
      <SummaryRow label='other stake'>
        <Typography>
          <FormatBalance value={ranking.otherStake.toString()} />
        </Typography>
      </SummaryRow>
      <SummaryRow label='total stake'>
        <Typography>
          <FormatBalance value={ranking.totalStake.toString()} />
        </Typography>
      </SummaryRow>
      <SummaryRow label='nominators'>
        <Typography>{ranking.nominators}</Typography>
      </SummaryRow>
      <SummaryRow label='commission'>
        <Typography>{ranking.commission}</Typography>
      </SummaryRow>
      <SummaryRow label='session key'>
        <SessionKeyValue entries={sessionEntries} />
      </SummaryRow>
      <SummaryRow label=''></SummaryRow>
    </SummaryPaperWrapper>
  );
};

export default Summary;
