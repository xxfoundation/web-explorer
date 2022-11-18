import ClockIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorIcon from '@mui/icons-material/ErrorOutline';
import { Box, Tooltip } from '@mui/material';
import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export type BlockStatus = 'failed' | 'successful' | 'pending';

const BlockStatusIcon: FC<{ status: BlockStatus }> = ({ status }) => {
  const { t } = useTranslation();

  const statusToIconMap = useMemo<Record<BlockStatus, React.ReactElement>>(
    () => (
      {
        failed: (
          <Box component='span' aria-label={'Failed'}>
            <Tooltip title={t('Failed')} arrow>
              <ErrorIcon color='error' />
            </Tooltip>
          </Box>
        ),
        pending: (
          <Box component='span'  aria-label={'Pending'}>
            <Tooltip title={t('Pending')} arrow>
              <ClockIcon color='warning' />
            </Tooltip>
          </Box>
        ),
        successful: (
          <Box component='span'  aria-label={'Successful'}>
            <Tooltip title={t('Successful')} arrow>
              <CheckCircleOutlinedIcon color='success' />
            </Tooltip>
          </Box>
        )
      }
    ),
    [t]
  );
  
  return statusToIconMap[status] || null;
};

export default BlockStatusIcon;
