import type { SeriesClickEventObject } from 'highcharts';

import { useQuery } from '@apollo/client';
import { Box } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { DataPoint } from '.';
import { amountByEraTooltip, LineChart } from '.';
import { ListenForEraTransfers, LISTEN_FOR_ERA_TRANSFERS } from '../../../schemas/transfers.schema';
import DefaultTile from '../../DefaultTile';
import Loading from '../../Loading';
import TimeframesDropdown from '../../TimeframesDropdown';

const TransfersLineChart = () => {
  const navigate = useNavigate();
  const { data, loading } = useQuery<ListenForEraTransfers>(LISTEN_FOR_ERA_TRANSFERS);
  const [timeframe, setTimeframe] = useState<number>();
  const chartData: DataPoint[] = useMemo(
    () =>
      (data?.eraTransfers || [])
        .slice()
        .sort((a, b) => a.era - b.era)
        .map((item) => [item.era, item.transfers], [data?.eraTransfers])
        .slice(-(timeframe ?? 0)) as DataPoint[],
    [data?.eraTransfers, timeframe]
  );

  const onClick = useCallback((evt: SeriesClickEventObject) => {
    navigate(`/transfers?era=${evt.point.options.x}`);
  }, [navigate]);

  return (
    <DefaultTile header='Transfers' height='435px'>
      {loading ? (
        <Loading />
      ) : (
        <>  
          <Box sx={{ display: 'flex', justifyContent: 'right', pr: 2 }}>
            <TimeframesDropdown onChange={setTimeframe} value={timeframe} />
          </Box>
          <LineChart onClick={onClick} tooltipFormatter={amountByEraTooltip} data={chartData} />
        </>
      )}
    </DefaultTile>
  );
};

export default TransfersLineChart;
