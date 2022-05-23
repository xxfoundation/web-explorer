import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {
  Box,
  Breadcrumbs,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography
} from '@mui/material';
import React, { FC, useMemo } from 'react';
import MarkdownView from 'react-showdown';
import Tag from '../../../components/Tags/Tag';

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#4F4F4F',
    padding: '1.25rem',
    fontSize: '14px',
    fontWeight: 400,
    letterSpacing: '0.5px',
    p: { fontSize: '10px' },
    ul: { paddingInlineStart: '20px' },
    li: { fontSize: '10px' },
    h2: { fontSize: '10px' }
  }
});

const ModuleCalls: FC<{ module: string; call: string; doc: string }> = ({ call, doc, module }) => {
  const title = useMemo(() => {
    const text = JSON.parse(doc).join('\r\n');
    return (
      <Box>
        <Typography
          fontSize='12px'
          fontWeight={700}
          letterSpacing='1px'
          textTransform='uppercase'
        >{`${module} / ${call}`}</Typography>
        <MarkdownView markdown={text} options={{ emoji: true }} />
      </Box>
    );
  }, [call, doc, module]);
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
      {title}
      <CustomTooltip title={title}>
        <InfoOutlinedIcon color='primary' sx={{ marginLeft: '8px' }} fontSize={'small'} />
      </CustomTooltip>
    </>
  );
};

export default ModuleCalls;
