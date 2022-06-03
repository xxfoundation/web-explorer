import { Divider, Grid, Typography } from '@mui/material';
import React, { FC, Fragment } from 'react';
import CopyButton from '../../components/buttons/CopyButton';
import { Address } from '../../components/ChainId';
import FormatBalance from '../../components/FormatBalance';
import { SummaryPaperWrapper, SummaryRow } from '../../components/Paper/SummaryPaper';
import { Account } from '../../schemas/accounts.schema';
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
              {value}
            </Grid>
          </Fragment>
        );
      })}
    </Grid>
  );
};

const Summary: FC<{ account: Account; ranking: CommonFieldsRankingFragment }> = ({ account }) => {
  return (
    <SummaryPaperWrapper>
      <SummaryRow label='stash' action={<CopyButton value={sampleHash} />}>
        <Address value={account.id} />
      </SummaryRow>
      <SummaryRow
        label='controller'
        action={
          account.controllerAddress ? <CopyButton value={account.controllerAddress} /> : undefined
        }
      >
        <Address name='test' value={account.controllerAddress} />
      </SummaryRow>
      <SummaryRow label='reward' action={<CopyButton disabled value={'???'} />}>
        <Address value={'???'} />
      </SummaryRow>
      <SummaryRow label='cmix id' action={<CopyButton disabled value={'???'} />}>
        <Typography>???</Typography>
      </SummaryRow>
      <SummaryRow label='location'>
        <Typography>???</Typography>
      </SummaryRow>
      <SummaryRow label='own stake'>
        <Typography>
          <FormatBalance value={'00'} />
        </Typography>
      </SummaryRow>
      <SummaryRow label='total stake'>
        <Typography>
          <FormatBalance value={''} />
        </Typography>
      </SummaryRow>
      <SummaryRow label='nominators'>
        <Typography>???</Typography>
      </SummaryRow>
      <SummaryRow label='commission'>
        <Typography>???</Typography>
      </SummaryRow>
      <SummaryRow label='session key'>
        <SessionKeyValue
          entries={{
            babe: (
              <Typography>
                0xf2b63387ce5b649f9388fd1be38ee4357b48dc0146e78b91f8f6469a78dc9f58
              </Typography>
            ),
            grandpa: (
              <Typography>
                0x5b379072ec1f3f70b4650979a47b24f9b080c03450f7e9587d92cb599fcf4d6b
              </Typography>
            ),
            im_online: (
              <Typography>
                0x5b379072ec1f3f70b4650979a47b24f9b080c03450f7e9587d92cb599fcf4d6b
              </Typography>
            ),
            authority_discovery: (
              <Typography>
                0x5b379072ec1f3f70b4650979a47b24f9b080c03450f7e9587d92cb599fcf4d6b
              </Typography>
            )
          }}
        />
      </SummaryRow>
      <SummaryRow label=''></SummaryRow>
    </SummaryPaperWrapper>
  );
};

export default Summary;
