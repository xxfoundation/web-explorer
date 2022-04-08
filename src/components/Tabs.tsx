import { Box, Divider, Stack, Tab, Tabs, Typography } from '@mui/material';
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
    <Stack direction='row' divider={<Divider orientation='vertical' flexItem />}>
      <Typography>{message}</Typography>
      <Typography>{count}</Typography>
    </Stack>
  );
};

export { TabPanel, TabText };

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
        <Tabs
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
        </Tabs>
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
