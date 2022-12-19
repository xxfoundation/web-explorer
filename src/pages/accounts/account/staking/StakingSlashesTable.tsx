import { useQuery } from '@apollo/client';
import { Divider, Stack, Typography } from '@mui/material';
import React, { FC, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import FormatBalance from '../../../../components/FormatBalance';
import XXNetworkAddress from '../../../../components/Hash/XXNetworkAddress';
import Link from '../../../../components/Link';
import { BaseLineCellsWrapper, BaselineTable, HeaderCellsWrapper } from '../../../../components/Tables';
import TimeAgoComponent from '../../../../components/TimeAgo';
import usePagination from '../../../../hooks/usePagination';
import {
  GetStakingSlashes,
  GET_STAKING_SLASHES,
  StakingSlash
} from '../../../../schemas/staking.schema';
import DownloadDataButton from '../../../../components/buttons/DownloadDataButton';
import { ExportToCsv } from 'export-to-csv';

const DEFAULT_ROWS_PER_PAGE = 10;
const headers = HeaderCellsWrapper(['Validator', 'Block Number', 'Era', 'Amount', 'Timestamp']);

const SlashesRow = (slash: StakingSlash) => {
  return BaseLineCellsWrapper([
    <XXNetworkAddress
      truncated='mdDown'
      value={slash.validatorAddress}
      name={slash.account.identity?.display}
      roles={{ validator: true }}
    />,
    <Link to={`/blocks/${slash.blockNumber}`}>{slash.blockNumber}</Link>,
    slash.era,
    <FormatBalance value={slash.amount.toString()} />,
    <TimeAgoComponent date={slash.timestamp} />
  ]);
};

interface CSVRow {
  'Payout Date': string;
  'Block Number': number;
  'Slash Date': string;
  'Era': number;
  'Validator Address': string;
  'Validator ID': string;
  'Amount': number;
}

const eraTime = 86400000;
const genesisTime = 1637132496000;

const StakingSlashesTable: FC<{
  accountId: string;
  sum?: number;
}> = ({ accountId, sum }) => {
  const stakingSlashes = useQuery<GetStakingSlashes>(GET_STAKING_SLASHES, {
    variables: { accountId }
  });
  const slashes = stakingSlashes.data?.slashes;
  const pagination = usePagination({ rowsPerPage: DEFAULT_ROWS_PER_PAGE });
  const { paginate, setCount } = pagination;

  const options = {
    filename: 'slashes_' + accountId,
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    showTitle: false,
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
  };
  const [csvData, setCsvData] = useState<CSVRow[]>();
  const csvExporter = new ExportToCsv(options);

  useEffect(() => {
    if (stakingSlashes.data?.aggregates?.aggregate) {
      setCount(stakingSlashes.data?.aggregates?.aggregate.count);
      setCsvData(stakingSlashes.data?.slashes.map((el) => {
        return {
          'Payout Date': dayjs.utc(el.timestamp).format('ll LTS Z'),
          'Block Number': el.blockNumber,
          'Slash Date': dayjs.utc((el.era+1)*eraTime+genesisTime).format('ll LTS Z'),
          'Era': el.era,
          'Validator Address': el.validatorAddress,
          'Validator ID': el.account.identity?.display || '',
          'Amount': el.amount / 1e9,
        }
      }))
    }
  }, [setCount, setCsvData, stakingSlashes.data]);

  const paginated = useMemo(
    () => slashes && paginate(slashes).map(SlashesRow),
    [paginate, slashes]
  );

  return (
    <>
      {sum && (
        <Typography
          variant='body3'
          sx={{ mb: '1em', px: '1px', display: 'block', textAlign: 'right' }}
        >
          <b>Total Slashes:</b> <FormatBalance value={sum.toString()} />
        </Typography>
      )}
      <BaselineTable
        loading={paginated === undefined}
        headers={headers}
        rows={paginated ?? []}
        rowsPerPage={pagination.rowsPerPage}
        footer={csvData?.length ? (
          <>
            <Divider />
            <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
              <DownloadDataButton onClick={() => {
                csvExporter.generateCsv(csvData);
              }}>
                CSV
              </DownloadDataButton>
              {pagination.controls}
            </Stack>
          </>
        ) : <></>}
      />
    </>
  );
};

export default StakingSlashesTable;
