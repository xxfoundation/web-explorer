import { Box, Divider, Link, Paper, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { FC } from 'react';

const PaperWrap = styled(Paper)(({ theme }) => ({
  boxShadow: theme.boxShadow,
  border: theme.borders?.light,
  borderRadius: (theme.shape.borderRadius as number) * 3
}));

type Props = {
  hasDivider?: boolean;
  header?: string | React.ReactNode;
  height?: number;
  linkAddress?: string;
  linkName?: string;
};

const InputSet: FC<Props> = ({ children, hasDivider, header, height, linkAddress, linkName }) => (
  <PaperWrap sx={{}}>
    {(header || linkName) && (
      <>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          spacing={2}
          sx={{
            mb: hasDivider ? 8 : 0,
            pt: 6,
            px: { xs: 3, md: 6 }
          }}
        >
          {header && <Typography variant='h3'>{header}</Typography>}
          {linkName && (
            <Link href={linkAddress} variant='body2' underline='hover'>
              {linkName}
            </Link>
          )}
        </Stack>
        {hasDivider && <Divider sx={{ mx: { xs: 3, md: 6 } }} />}
      </>
    )}

    <Box
      sx={{
        my: 4,
        px: { xs: 3, md: 6 },
        overflow: 'auto',
        height: { height }
      }}
    >
      {children}
    </Box>
  </PaperWrap>
);

export default InputSet;
