import { Avatar, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import CopyButton from './CopyButton';

const textWithCopy = (value: string, content: JSX.Element): JSX.Element => {
  return <Stack direction={'row'} spacing={1} alignItems={'center'}>
      {content}
      <Divider orientation='vertical' flexItem />
      <CopyButton value={value} />
    </Stack>;
};

const AvatarLabel: React.FC<{ src: string; srcAlt: string; text: string }> = ({
  src,
  srcAlt,
  text
}) => {
  return (
    <>
      <Avatar alt={srcAlt} src={src} />
      <Typography>{text}</Typography>
    </>
  );
};

const SummaryPaper: React.FC<{ data: { label: string; value: number | string | JSX.Element }[] }> = ({
  data
}) => {
  return (
    <Paper>
      <Grid container spacing={2} rowSpacing={2}>
        {data.map(({ label, value }) => {
          return (
            <React.Fragment key={label}>
              <Grid item xs={12} sm={12} md={4}>
                {label}
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                {value}
              </Grid>
            </React.Fragment>
          );
        })}
      </Grid>
    </Paper>
  );
};

export { textWithCopy, AvatarLabel, SummaryPaper };
