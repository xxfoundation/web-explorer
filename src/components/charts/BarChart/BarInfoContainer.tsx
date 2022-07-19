
import React from 'react';
import { Stack } from '@mui/material';
import { BarSpacer, DividerSpacer, LabelSpacer, LegendSpacer } from './spacers';
import { useBarchartContext } from './BarChartContext';
import VerticalDivider from './VerticalDivider';
import { SingleSeries, DoubleSeries } from './BarInfo';

const BarInfoContainer = () => {
  const context = useBarchartContext();
  const hasNegatives = !!context.infoB;
  const InfoComponent = context.infoB ? DoubleSeries : SingleSeries;

  return (
    <Stack direction='row' sx={{ mb: 2 }}>
      <LabelSpacer />
      <LegendSpacer />
      {context.infoA?.grouped.map(([label, values]) => (
        <React.Fragment key={label}>
          <DividerSpacer />
          {values.map(([t]) => (
              <BarSpacer
                key={t} sx={{ height: '4rem', position: 'relative' }}>
                {context.selected.value?.[0] === t && (
                  <>
                    <VerticalDivider
                      style={{ position: 'absolute', bottom: 0, height: hasNegatives ? '9rem' : '4rem' }}
                    />
                    <div style={{ position: 'absolute', bottom: 0, left: '100%' }}>
                      <InfoComponent />
                    </div>
                  </>
                )}
                
              </BarSpacer>
            )
          )}
        </React.Fragment>
      ))}
    </Stack>
  )
}

export default BarInfoContainer;
