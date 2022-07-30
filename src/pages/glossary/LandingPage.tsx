import { Container, Grid, styled, Typography } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore TS6133
import markdownDoc from './glossary.md';
const LandingPage: FC = () => {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    fetch(markdownDoc)
      .then((res) => res.text())
      .then((md) => {
        setContent(md);
      });
  }, []);

  return (
    <Container sx={{ my: 5 }}>
      <Typography variant='h1' sx={{ mb: 5 }}>
        Glossary
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LandingPage;
