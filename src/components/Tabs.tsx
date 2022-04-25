import { Box, Divider, Skeleton, Stack, styled, Tab, Tabs, Typography } from '@mui/material';
import React, { FC } from 'react';
import { theme } from '../themes/default';
import { PaperWrap } from './Paper/PaperWrap';

type TabType = {
  label: JSX.Element;
  content: JSX.Element;
};

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs {...props} TabIndicatorProps={{ children: <span className='MuiTabs-indicatorSpan' /> }} />
))({
  p: {
    fontSize: '13px',
    fontWeight: '700'
  },
  '& .MuiTab-textColorPrimary': {
    color: theme.palette.grey[400]
  },
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  '& .MuiTabs-indicatorSpan': {
    width: '78%',
    height: 1,
    backgroundColor: theme.palette.primary.main
  }
});

const TabsWithPanels: React.FC<{ panels: TabType[]; tabsLabel: string; loading?: boolean }> = ({
  loading = false,
  panels,
  tabsLabel
}) => {
  const [value, setValue] = React.useState(0);
  if (loading)
    return (
      <PaperWrap>
        <Box sx={{ mb: '24px', minHeight: '48px', py: '12px' }}>
          <Skeleton />
        </Box>
        <Box>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </Box>
      </PaperWrap>
    );
  return (
    <PaperWrap>
      <StyledTabs
        sx={{ mb: 3 }}
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue);
        }}
        aria-label={tabsLabel}
      >
        {panels.map(({ label }, index) => {
          return (
            <Tab
              key={index}
              label={label}
              value={index}
              id={`simple-tab-${index}`}
              aria-controls={`tabpanel-events-${index}`}
            />
          );
        })}
      </StyledTabs>

      {panels.map(({ content }, index) => {
        return (
          <div
            key={index}
            role='tabpanel'
            id={`tabpanel-${value}`}
            aria-labelledby={`tab-${value}`}
          >
            {value === index && <Box sx={{ pt: 3 }}>{content}</Box>}
          </div>
        );
      })}
    </PaperWrap>
  );
};

const TabText: FC<{ count?: string | number | JSX.Element; message: string | JSX.Element }> = ({
  count,
  message
}) => {
  if (count === undefined) return <Typography>undefined</Typography>;
  return (
    <Stack direction='row' spacing={1} divider={<Divider orientation='vertical' flexItem />}>
      <Typography>{message}</Typography>
      <Typography>{count}</Typography>
    </Stack>
  );
};

export { TabText };

export default TabsWithPanels;
