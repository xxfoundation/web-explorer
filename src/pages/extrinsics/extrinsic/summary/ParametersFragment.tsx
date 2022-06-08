import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box, Button, Stack, styled, Typography } from '@mui/material';
import React, { FC, ReactNode, useCallback, useMemo } from 'react';
import { SummaryEntry, SummaryHeader, SummaryValue } from '../../../../components/Summary';
import { useToggle } from '../../../../hooks';
import useCopyClipboard from '../../../../hooks/useCopyToClibboard';
import { GetExtrinsicByPK } from '../../../../schemas/extrinsics.schema';
import { theme } from '../../../../themes/default';

const RoundedButton = styled(Button)(({}) => {
  return {
    borderRadius: '30px',
    fontSize: '12px',
    fontWeight: 500,
    letterSpacing: 1,
    color: 'white'
  };
});

const callbackCopyMessage = (value: ReactNode) => {
  return (
    <Stack
      spacing={1}
      sx={{
        maxWidth: '25vw',
        maxHeight: '60px',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}
    >
      <Stack direction={'row'} alignItems={'center'} spacing={2}>
        <CheckCircleOutlineIcon sx={{ color: theme.palette.success.light }} />
        <Typography fontSize={10} fontWeight={600}>
          Copied to Clipboard
        </Typography>
      </Stack>
      <Typography fontSize={10} component={'code'}>
        {value}
      </Typography>
    </Stack>
  );
};

const ParamTile: FC<{ label: string; value: unknown, type?: string }> = ({ label, value }) => {
  return (
    <Stack
      sx={{
        padding: '10px',
        marginTop: '24px',
        borderColor: theme.palette.grey['200'],
        borderRadius: '10px',
        borderStyle: 'solid',
        borderWidth: '1px'
      }}
    >
      <Typography variant='h5'>{label}</Typography> 
      <Box
        component={'pre'}
        sx={{
          padding: '10px',
          marginTop: '10px',
          maxHeight: '100px',
          overflowY: 'auto',
          background: 'rgb(0 0 0 / 4%)'
        }}
      >
        {JSON.stringify(value, null, 2)}
      </Box>
    </Stack>
  );
};

type Params = Pick<GetExtrinsicByPK['extrinsic'], 'args' | 'argsDef'>;

const ParametersFragment: FC<Params> = ({ args, argsDef }) => {
  const staticCopy = useCopyClipboard()[1];
  const [isActive, { toggle }] = useToggle();
  const onclickCopy = useCallback(
    () => staticCopy(JSON.stringify(args), callbackCopyMessage),
    [args, staticCopy]
  );
  const paramTiles = useMemo(
    () =>
      Object.entries(argsDef).map(([label, type], index) => (
        <ParamTile key={index} label={label} type={type} value={args[index]} />
      )),
    [args, argsDef]
  );
  return (
    <SummaryEntry>
      <SummaryHeader>
        Parameters
      </SummaryHeader>
      <SummaryValue>
        <Stack>
          <Box>
            <RoundedButton variant='contained' onClick={toggle}>
              {isActive ? 'Hide' : 'Show'}
            </RoundedButton>
            {isActive && (
              <RoundedButton sx={{ marginLeft: '24px' }} variant='contained' onClick={onclickCopy}>
                copy
              </RoundedButton>
            )}
          </Box>
          {isActive && paramTiles}
        </Stack>
      </SummaryValue>
    </SummaryEntry>
  );
};

export default ParametersFragment;
