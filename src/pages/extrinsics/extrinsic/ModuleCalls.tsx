import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Breadcrumbs, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import Tag from '../../../components/Tags/Tag';
import CustomTooltip from '../../../components/Tooltip';

const ModuleCalls: FC<{ module: string; call: string; doc: string }> = ({ call, doc, module }) => {
  const title = useMemo(() => {
    // TODO use a markdown parser or implement a backend solution for this
    const docArray: string[] = JSON.parse(doc);
    return docArray.map((docItem, index) => {
      if (docItem) {
        return (
          <Typography variant='body5' component={'p'} key={index}>
            {docItem}
          </Typography>
        );
      } else {
        return <br key={index} />;
      }
    });
  }, [doc]);
  return (
    <>
      <Breadcrumbs separator='/'>
        <Tag filled>
          <Typography fontSize={'12px'} fontWeight={400}>
            {module}
          </Typography>
        </Tag>
        <Tag>
          <Typography fontSize={'12px'} fontWeight={400}>
            {call}
          </Typography>
        </Tag>
      </Breadcrumbs>
      <CustomTooltip title={<Box>{title}</Box>}>
        <InfoOutlinedIcon color='primary' sx={{ marginLeft: '8px' }} fontSize={'small'} />
      </CustomTooltip>
    </>
  );
};

export default ModuleCalls;
