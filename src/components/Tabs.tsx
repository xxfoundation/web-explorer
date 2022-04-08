import { Box, Divider, Stack, styled, Tab, Tabs, Typography } from '@mui/material';
import React, { FC } from 'react';
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
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  '& .MuiTabs-indicatorSpan': {
    width: '76%',
    backgroundColor: '#00A2D6'
  }
});

const TabsWithPanels: React.FC<{ panels: TabType[]; tabsLabel: string }> = ({
  panels,
  tabsLabel
}) => {
  const [value, setValue] = React.useState(0);
  return (
    <PaperWrap>
      <Box>
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
      </Box>

      {panels.map(({ content }, index) => {
        return (
          <div
            key={index}
            role='tabpanel'
            id={`tabpanel-${value}`}
            aria-labelledby={`tab-${value}`}
          >
            {value === index && <Box sx={{ py: 3 }}>{content}</Box>}
          </div>
        );
      })}
    </PaperWrap>
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

export { TabText };

export default TabsWithPanels;
