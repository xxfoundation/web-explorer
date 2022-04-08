import { Box, Divider, Stack, styled, Tab, Tabs, Typography } from '@mui/material';
import React, { FC } from 'react';
import { PaperWrap } from './Paper/PaperWrap';

const TabPanel: FC<{ index: string | number; value: string | number }> = ({
  children,
  index: name,
  value
}) => {
  return (
    <div role='tabpanel' id={`tabpanel-${value}`} aria-labelledby={`tab-${value}`}>
      {value === name && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const TabText: FC<{ count: string | number; message: string }> = ({ count, message }) => {
  return (
    <Stack direction='row' spacing={2} divider={<Divider orientation='vertical' flexItem />}>
      <Typography>{message}</Typography>
      <Typography>{count}</Typography>
    </Stack>
  );
};

export { TabPanel, TabText };

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs {...props} TabIndicatorProps={{ children: <span className='MuiTabs-indicatorSpan' /> }} />
))({
  '& .MuiTabs-indicatorSpan': {
    width: '76%',
    backgroundColor: '#00A2D6'
  }
});

type TabType = {
  label: JSX.Element;
  content: JSX.Element;
};

const TabsWithPanels: React.FC<{ panels: TabType[]; tabsLabel: string }> = ({
  panels,
  tabsLabel
}) => {
  const [value, setValue] = React.useState(0);
  return (
    <PaperWrap>
      <Box>
        <StyledTabs
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
      </Box>

      {panels.map(({ content }, index) => {
        return (
          <TabPanel index={index} value={value} key={index}>
            {content}
          </TabPanel>
        );
      })}
    </PaperWrap>
  );
};

export default TabsWithPanels;
