import { Box, Button, Stack, styled } from '@mui/material';
import React, { FC, useCallback, useMemo } from 'react';
import { callbackCopyMessage } from '../../../../components/buttons/CopyButton';
import { SummaryRow } from '../../../../components/Paper/SummaryPaper';
import { useToggle } from '../../../../hooks';
import useCopyClipboard from '../../../../hooks/useCopyToClibboard';

type Props = { args: string; def: string };

const RoundedButton = styled(Button)(({}) => {
  return {
    borderRadius: '30px',
    fontSize: '12px',
    fontWeight: 500,
    letterSpacing: 1,
    color: 'white'
  };
});

const useParserOfArgs = (args: string, def: string) => {
  return useMemo(() => {
    const definition = Object.keys(JSON.parse(def));

    const parsedArgs: [] = JSON.parse(args);
    return definition.reduce<Record<string, string | Record<string, string>>>(
      (p, c, index) => ({ ...p, [c]: parsedArgs[index] }),
      {}
    );
  }, [args, def]);
};

const ParametersFragment: FC<Props> = ({ args, def }) => {
  const parameters = useParserOfArgs(args, def);
  const staticCopy = useCopyClipboard()[1];
  const [isActive, { toggle }] = useToggle();
  const onclickCopy = useCallback(
    () => staticCopy(JSON.stringify(parameters), callbackCopyMessage),
    [parameters, staticCopy]
  );
  return (
    <SummaryRow label='parameters'>
      <Stack>
        <Box>
          <RoundedButton variant='contained' onClick={() => toggle()}>
            {isActive ? 'Hide' : 'Show'}
          </RoundedButton>
          {isActive && (
            <RoundedButton sx={{ marginLeft: '24px' }} variant='contained' onClick={onclickCopy}>
              copy
            </RoundedButton>
          )}
        </Box>
        {isActive && (
          <Box
            component={'code'}
            sx={{
              padding: '10px',
              marginTop: '24px',
              maxHeight: '100px',
              overflowY: 'auto',
              background: 'rgb(0 0 0 / 4%)'
            }}
          >
            {JSON.stringify(parameters)}
          </Box>
        )}
      </Stack>
    </SummaryRow>
  );
};

export default ParametersFragment;
