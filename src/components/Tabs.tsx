import { Box, Divider, Stack, styled, Tab, Tabs, Typography } from '@mui/material';
import React, { FC } from 'react';
import { theme } from '../themes/default';

export type TabType = {
  label: JSX.Element;
  content: JSX.Element;
};

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs {...props} variant='scrollable' TabIndicatorProps={{ children: <span className='MuiTabs-indicatorSpan' /> }} />
))({
  marginLeft: -16,
  marginRight: -16,
  p: {
    fontSize: '13px',
    fontWeight: '700'
  },
  '& .MuiTabs-scroller': {
    overflow: 'auto'
  },
  '& .MuiTab-textColorPrimary': {
    color: theme.palette.grey[400]
  },
  '& .MuiTab-textColorPrimary.Mui-selected': {
    color: theme.palette.primary.main
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

const TabsWithPanels: React.FC<{
  panels: TabType[];
  tabsLabel: string;
  tabMarginBottom?: number | string;
}> = ({ panels, tabMarginBottom, tabsLabel }) => {
  const [value, setValue] = React.useState(0);
  return (
    <>
      <StyledTabs
        sx={{ mb: tabMarginBottom || 1 }}
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
            {value === index && <Box sx={{ pt: 1.5 }}>{content}</Box>}
          </div>
        );
      })}
    </>
  );
};

const TabText: FC<{ count?: string | number | JSX.Element; message: string | JSX.Element }> = ({
  count,
  message
}) => {
  const divider = count !== undefined && <Divider orientation='vertical' flexItem />;

  return (
    <Stack direction='row' spacing={1} divider={divider}>
      <Typography>{message}</Typography>
      {count !== undefined && <Typography>{count}</Typography>}
    </Stack>
  );
};

export { TabText };

export default TabsWithPanels;
