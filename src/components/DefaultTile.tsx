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
  height?: string | number;
  linkAddress?: string;
  linkName?: string;
};

const DefaultTile: FC<Props> = ({
  children,
  hasDivider,
  header,
  height,
  linkAddress,
  linkName
}) => (
  <PaperWrap sx={{}}>
    {(header || linkName) && (
      <>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          spacing={2}
          sx={{
            mb: 4,
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
        {hasDivider && <Divider sx={{ mx: { xs: 3, md: 6 }, mb: 2 }} />}
      </>
    )}

    <Box
      sx={{
        mb: 4,
        px: { xs: 3, md: 6 },
        overflow: 'auto',
        height
      }}
    >
      {children}
    </Box>
  </PaperWrap>
);

export default DefaultTile;
