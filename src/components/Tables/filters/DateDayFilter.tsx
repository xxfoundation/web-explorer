export type { Range } from '../../DateRange';

import React, {FC} from 'react';
import { Badge } from '@mui/material';

import Dropdown from '../../DropdownFilter';
import SingleDate, { Props as RangeProps} from '../../SingleDate';

const DateDayFilter: FC<RangeProps & { label?: string }> = (props) => {
  return (
    <Dropdown buttonLabel={
      <>
        {props.label ?? 'Time'}
        &nbsp;
        {props.value && <>
          <Badge color='primary' sx={{ pl: 1 }} badgeContent={1} />
          &nbsp;
        </>
        }
      </>}>
      <SingleDate {...props} />
    </Dropdown>
  );
}

export default DateDayFilter;
