import { Box, Divider, Link, Paper, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const PaperWrap = styled(Paper)(({ theme }) => ({
  boxShadow: theme.shadows.box,
  border: theme.borders.light,
  borderRadius: theme.shape.borderRadiusLarge
}));

const InputSet = ({ children, header, height, linkAddress, linkName }) => (
  <PaperWrap sx={{}}>
    {(header || linkName) && (
      <>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ mb: 8, pt: 6, px: { xs: 3, md: 6 } }}
        >
          {header && <Typography variant="h3">{header}</Typography>}
          {linkName && (
            <Link href={linkAddress} variant="body3" underline="hover">
              {linkName}
            </Link>
          )}
        </Stack>
        <Divider sx={{ mx: { xs: 3, md: 6 } }} />
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
