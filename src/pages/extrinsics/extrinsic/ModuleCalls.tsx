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
import { HtmlRenderer, Parser } from 'commonmark';
import parse from 'html-react-parser';
import React, { FC, useMemo } from 'react';
import Tag from '../../../components/Tags/Tag';
import { theme } from '../../../themes/default';

const reader = new Parser();
const writer = new HtmlRenderer();

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
    h2: { fontSize: '10px' },
    hr: {
      borderBottom: theme.borders?.light,
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none'
    },
    a: { color: theme.palette.primary.main }
  }
});

const ModuleCalls: FC<{ module: string; call: string; doc: string[] }> = ({
  call,
  doc,
  module
}) => {
  const title = useMemo(() => {
    const parsed = reader.parse(doc.join('\r\n'));
    const result = writer.render(parsed);
    return (
      <Box>
        <Typography
          fontSize='12px'
          fontWeight={700}
          letterSpacing='1px'
          textTransform='uppercase'
        >{`${module} / ${call}`}</Typography>
        {parse(result)}
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
      <CustomTooltip title={title}>
        <InfoOutlinedIcon color='primary' sx={{ marginLeft: '8px' }} fontSize={'small'} />
      </CustomTooltip>
    </>
  );
};

export default ModuleCalls;
