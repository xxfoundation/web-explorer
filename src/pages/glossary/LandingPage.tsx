/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Alert, Box, Container, Grid, Typography } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import validatorCommissionPieChart from './Validator_Commission.png';
import stakingDistributionPieChart from './Staking_Distribution.png';
import stakingDistributionTable from './Staking_Table.png';
import PaperStyled from '../../components/Paper/PaperWrap.styled';

// @ts-ignore TS6133
import markdownDoc from './glossary.md';

const LandingPage: FC = () => {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    fetch(markdownDoc)
      .then((res) => res.text())
      .then((md) => {
        setContent(md);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <Container sx={{ my: 5 }}>
      <Typography variant='h1' sx={{ mb: 5 }}>
        Glossary
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lineHeight={1.5}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </Grid>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              minWidth: 'fit-content',
              maxWidth: '90vw',
              padding: '0'
            }}
          >
            <PaperStyled sx={{ textAlign: 'center', margin: '0.5em', padding: '1em' }}>
              <Typography variant='body2'>
                1. Validator gets their commission out of total rewards on that era
              </Typography>
              <Box
                component='img'
                sx={{
                  maxWidth: '90vw'
                }}
                alt='Validator Commission Pie Chart'
                src={validatorCommissionPieChart}
              />
            </PaperStyled>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              minWidth: 'fit-content',
              maxWidth: '90vw',
              padding: '0'
            }}
          >
            <PaperStyled sx={{ textAlign: 'center', margin: '0.5em', padding: '1em' }}>
              <Typography variant='body2'>
                2. The remaining rewards are distributed by stake among stakers
              </Typography>
              <Box
                component='img'
                sx={{
                  maxWidth: '90vw'
                }}
                alt='Staking Distribution Pie Chart'
                src={stakingDistributionPieChart}
              />
            </PaperStyled>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '2em',
              minWidth: 'fit-content',
              maxWidth: '90vw',
              padding: '0'
            }}
          >
            <PaperStyled sx={{ textAlign: 'center', margin: '0.5em', padding: '1em' }}>
              <Box
                component='img'
                sx={{
                  maxWidth: '90vw'
                }}
                alt='Staking Distribution Table'
                src={stakingDistributionTable}
              />
            </PaperStyled>
          </Grid>
        </Grid>
        <Alert severity='info' sx={{ margin: 'auto', marginTop: '2em' }}>
          If you want to learn more about the xx network blockchain, its tokenomics and use cases,
          check out our{' '}
          <a href='https://xx.network/archive/xxcoin-tokenomics/'>
            high-level overview of the xx coin
          </a>
          .
        </Alert>
      </Grid>
    </Container>
  );
};

export default LandingPage;
