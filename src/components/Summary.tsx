import { Avatar, Grid, Paper, Typography } from '@mui/material';
import React from 'react';

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

export type SummaryPaperData = { label: string; value: number | string | JSX.Element };

const SummaryPaper: React.FC<{ data: SummaryPaperData[] }> = ({ data }) => {
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

export { AvatarLabel, SummaryPaper };
