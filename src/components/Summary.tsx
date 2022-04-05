import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  Avatar,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import React from 'react';

const textWithCopy = (
  value: string,
  staticCopy: (toCopy: string) => void,
  content: JSX.Element
): JSX.Element => {
  return (
    <Stack direction={'row'} spacing={1} alignItems={'center'}>
      {content}
      <Divider orientation='vertical' flexItem />
      <Tooltip title={'copy'} placement='top'>
        <IconButton
          arial-label='copy'
          onClick={() => {
            staticCopy(value);
          }}
        >
          <ContentCopyIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
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

export { textWithCopy, AvatarLabel, SummaryPaper };
