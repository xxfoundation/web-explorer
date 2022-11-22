import { useQuery } from '@apollo/client';
import { Divider, Stack, Typography } from '@mui/material';
import React, { FC, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import FormatBalance from '../../../../components/FormatBalance';
import XXNetworkAddress from '../../../../components/Hash/XXNetworkAddress';
import Link from '../../../../components/Link';
import { BaseLineCellsWrapper, BaselineTable, headerCellsWrapper } from '../../../../components/Tables';
import TimeAgoComponent from '../../../../components/TimeAgo';
import usePagination from '../../../../hooks/usePagination';
import {
  GetStakingSlashes,
  GET_STAKING_SLASHES,
  StakingSlash
} from '../../../../schemas/staking.schema';
import DownloadDataButton from '../../../../components/buttons/DownloadDataButton';
import { ExportToCsv } from 'export-to-csv';
import { useTranslation } from 'react-i18next';

const DEFAULT_ROWS_PER_PAGE = 10;

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

type CSVRow = Record<string, string | number>;

const eraTime = 86400000;
const genesisTime = 1637132496000;

const StakingSlashesTable: FC<{
  accountId: string;
  sum?: number;
}> = ({ accountId, sum }) => {
  const { t } = useTranslation();
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
          [t('Payout Date')]: dayjs.utc(el.timestamp).format('ll LTS Z'),
          [t('Block Number')]: el.blockNumber,
          [t('Slash Date')]: dayjs.utc((el.era+1)*eraTime+genesisTime).format('ll LTS Z'),
          [t('Era')]: el.era,
          [t('Validator Address')]: el.validatorAddress,
          [t('Validator ID')]: el.account.identity?.display || '',
          [t('Amount')]: el.amount / 1e9,
        }
      }))
    }
  }, [t, setCount, setCsvData, stakingSlashes.data]);

  const paginated = useMemo(
    () => slashes && paginate(slashes).map(SlashesRow),
    [paginate, slashes]
  );

  const headers = useMemo(
    () => headerCellsWrapper([
      t('Validator'),
      t('Block Number'),
      t('Era'),
      t('Amount'),
      t('Timestamp')
    ]),
    [t]
  );

  return (
    <>
      {sum !== undefined && (
        <Typography
          variant='body3'
          sx={{ mb: '1em', px: '1px', display: 'block', textAlign: 'right' }}
        >
          <b>{t('Total Slashes')}:</b> <FormatBalance value={sum.toString()} />
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
