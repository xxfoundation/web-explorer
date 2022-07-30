/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Container, Grid, Typography } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

// @ts-ignore TS6133
import markdownDoc from './glossary.md';
// @ts-ignore TS6133
import style from './style.css';

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
        <Grid item xs={12} md={12} lineHeight={1.5}>
          <ReactMarkdown className={style.markdown} remarkPlugins={[gfm]}>
            {content}
          </ReactMarkdown>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LandingPage;
