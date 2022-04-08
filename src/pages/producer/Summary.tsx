import { Divider, Grid, Typography } from '@mui/material';
import React, { FC, Fragment } from 'react';
import { withCopy } from '../../components/buttons/CopyButton';
import { Address } from '../../components/ChainId';
import FormatBalance from '../../components/FormatBalance';
import SummaryPaper from '../../components/Paper/SummaryPaper';

const sampleHash = '6Ze8pqYi4CAuwdm4eTGxKke7LSF6phkzmERUmpG5tTC1yKoh';

const sampleAddress = (values: { name?: string; address: string }) =>
  withCopy(values.address, <Address name={values.name} value={values.address} variant='body3' />);

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
  const data = React.useMemo(() => {
    return [
      { label: 'stash', value: sampleAddress({ address: sampleHash }) },
      {
        label: 'controller',
        value: sampleAddress({ address: sampleHash, name: 'test' })
      },
      { label: 'reward', value: sampleAddress({ address: sampleHash }) },
      {
        label: 'cmix id',
        value: withCopy(
          'kgGYMH8rxprBOvOvGAZI2chj5xJI71CqIM34DpCII10C',
          <Typography>kgGYMH8rxprBOvOvGAZI2chj5xJI71CqIM34DpCII10C</Typography>
        )
      },
      { label: 'location', value: 'Big Sur, California' },
      { label: 'own stake', value: '1.00 XX' },
      { label: 'total stake', value: <FormatBalance value={'3038663570'} /> },
      { label: 'nominators', value: 3 },
      { label: 'commission', value: '10.00%' },
      {
        label: 'session key',
        value: (
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
        )
      }
    ];
  }, []);
  return <SummaryPaper data={data} />;
};

export default Summary;
