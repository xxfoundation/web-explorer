import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import FunctionsIcon from '@mui/icons-material/Functions';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import PaperStyled from '../../components/Paper/PaperWrap.styled';
import { theme } from '../../themes/default';
import ExtrinsicsBarChart from './ExtrinsicsBarChart';
import ExtrinsicsTable from './ExtrinsicsTable';

const HistoryPage = () => {
  const { t } = useTranslation();
  const [totalOfExtrinsics, setTotalOfExtrinsics] = useState<number>();
  const [withTimestampEvents, setWithTimestampEvents] = useState<boolean>(false);

  return (
    <Container sx={{ my: 5 }}>
      <Breadcrumb />
      <Stack
        justifyContent={'space-between'}
        alignItems={'center'}
        direction={'row'}
        sx={{ mb: 5 }}
      >
        <Typography variant='h1'>{t('Extrinsics')}</Typography>
      </Stack>
      <Box sx={{ mb: 5 }}>
        <PaperStyled>
          <ExtrinsicsBarChart />
        </PaperStyled>
      </Box>
      <PaperStyled>
        {totalOfExtrinsics !== undefined && (
          <Stack
            direction='row'
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            spacing={2}
            marginBottom='18px'
            fontSize={'16px'}
            fontWeight={700}
            color={theme.palette.grey[600]}
          >
            <div style={{ margin: '0 0 1em 0', display: 'inline-flex' }}>
              <FunctionsIcon />
              <Tooltip
                title={t('Total Number of Extrinsics')}
                placement='top'
                arrow>
                <Typography>= {totalOfExtrinsics}</Typography>
              </Tooltip>
            </div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={withTimestampEvents}
                  onChange={() => {
                    setWithTimestampEvents(!withTimestampEvents);
                  }}
                />
              }
              label={'set(timestamp)'}
            />
          </Stack>
        )}
        <span hidden>{t('filters placeholder')}</span>
        <ExtrinsicsTable
          setTotalOfExtrinsics={setTotalOfExtrinsics}
          withTimestampEvents={withTimestampEvents}
        />
      </PaperStyled>
    </Container>
  );
};

export default HistoryPage;
