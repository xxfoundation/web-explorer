import { Divider, Grid, Typography } from '@mui/material';
import React, { FC, Fragment } from 'react';
import CopyButton from '../../components/buttons/CopyButton';
import { Address } from '../../components/ChainId';
import FormatBalance from '../../components/FormatBalance';
import { SummaryPaperWrapper, SummaryRow } from '../../components/Paper/SummaryPaper';

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

const Summary = () => {
  return (
    <SummaryPaperWrapper>
      <SummaryRow label='stash' action={<CopyButton value={sampleHash} />}>
        <Address value={sampleHash} />
      </SummaryRow>
      <SummaryRow label='controller' action={<CopyButton value={sampleHash} />}>
        <Address name='test' value={sampleHash} />
      </SummaryRow>
      <SummaryRow label='reward' action={<CopyButton value={sampleHash} />}>
        <Address value={sampleHash} />
      </SummaryRow>
      <SummaryRow
        label='cmix id'
        action={<CopyButton value={'kgGYMH8rxprBOvOvGAZI2chj5xJI71CqIM34DpCII10C'} />}
      >
        <Typography>kgGYMH8rxprBOvOvGAZI2chj5xJI71CqIM34DpCII10C</Typography>
      </SummaryRow>
      <SummaryRow label='location'>
        <Typography>Big Sur, California</Typography>
      </SummaryRow>
      <SummaryRow label='own stake'>
        <Typography>1.00 XX</Typography>
      </SummaryRow>
      <SummaryRow label='total stake'>
        <Typography>
          <FormatBalance value={'3038663570'} />
        </Typography>
      </SummaryRow>
      <SummaryRow label='nominators'>
        <Typography>3</Typography>
      </SummaryRow>
      <SummaryRow label='commission'>
        <Typography>10.00%</Typography>
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
