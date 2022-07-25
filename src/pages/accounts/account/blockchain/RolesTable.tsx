import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorIcon from '@mui/icons-material/ErrorOutline';
import { Box, Tooltip } from '@mui/material';
import React, { FC } from 'react';
import { BaselineTable } from '../../../../components/Tables';

type RoleType = {
  role: string;
  current: boolean;
  past: boolean;
};

const headers = [{ value: 'Role' }, { value: 'Current' }, { value: 'Past' }];

const sampleData = [
  { role: 'Validator', current: false, past: false },
  { role: 'Nominator', current: true, past: false },
  { role: 'Council', current: false, past: true },
  { role: 'Technical Committee', current: false, past: false },
  { role: 'Registrar', current: false, past: false },
  { role: 'Treasury', current: false, past: false }
];

const StatusIcon: FC<{ value: boolean }> = ({ value }) => {
  return value ? (
    <Box aria-label={'Successful'}>
      <Tooltip title='Successful' arrow>
        <CheckCircleOutlinedIcon color='success' />
      </Tooltip>
    </Box>
  ) : (
    <Box aria-label={'Failed'}>
      <Tooltip title='Failed' arrow>
        <ErrorIcon color='error' />
      </Tooltip>
    </Box>
  );
};

const dataToRow = ({ current, past, role }: RoleType) => {
  return [
    { value: role },
    { value: <StatusIcon value={current} /> },
    { value: <StatusIcon value={past} /> }
  ];
};

const RolesTable: FC = ({}) => {
  return <BaselineTable headers={headers} rows={sampleData.map(dataToRow)} />;
};

export default RolesTable;
