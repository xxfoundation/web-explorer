import {BaselineCell, BaselineTable} from '../../components/Tables';
import React, {useMemo} from 'react';
import usePaginatedQuery from '../../hooks/usePaginatedQuery';
import {
  GET_CURRENT_VALIDATORS,
  GET_WAITING_LIST,
  ValidatorAccount,
  ValidatorAccountsQuery
} from '../../schemas/staking.schema';
import useDebounce from '../../hooks/useDebounce';
import useInput from '../../hooks/useInput';
import Address from '../../components/Hash/XXNetworkAddress';
import FormatBalance from '../../components/FormatBalance';
import CmixAddress from '../../components/Hash/CmixAddress';
import {Input} from '@mui/material';


const rowsParser = ({
                      account,
                      addressId,
                      cmixId,
                      commission,
                      location,
                      nominators,
                      ownStake,
                      totalStake }: ValidatorAccount): BaselineCell[] => {
  const identityDisplay = account.identity?.display;
  const validatorLink = `/accounts/${addressId}`;
  let parsed = '';

  try {
    const { city, country } = location ? JSON.parse(location) : ({} as Record<string, string>);
    parsed = location ? `${city ? `${city}, ` : ' '}${country ?? ''}` : 'N/A';
  } catch (err) {
    console.error('Error parsing location for ', name);
  }
  return [
    { value: <Address roles={{ validator: true }} value={addressId} name={identityDisplay} url={validatorLink} truncated sx={{ textAlign: 'end' }}/> },
    { value: parsed },
    { value: <FormatBalance value={ownStake} /> },
    { value: <FormatBalance value={totalStake} /> },
    { value: `${commission.toFixed(2)} %` },
    { value: <CmixAddress truncated value={cmixId} /> },
    { value: nominators.length }
  ];
};

interface IValidatorsTableProps {
  latestEra: number | undefined,
  isWaiting: boolean,
}

const NewValidatorsTable: React.FC<IValidatorsTableProps> = ({isWaiting = false, latestEra}) => {
  const [search, setSearch] = useInput('');
  const debouncedSearch = useDebounce(search, 500);


  /* --------------------------------- Headers -------------------------------- */
  const headers = [
    { value: 'Validator' },
    { value: 'Location' },
    { value: 'Own Stake' },
    { value: 'Total Stake' },
    { value: 'Commission' },
    { value: 'Cmix ID' },
    { value: 'Nominators' }
  ]

  const searchClause  = useMemo(() => ({
    _and: {
      _or: [
        {
          account: {
            identity: {
              display: { _ilike: `%${debouncedSearch}%`},
            }
          }
        },
        {
          cmix_id: { _ilike: `%${debouncedSearch}%`}
        },
        {
          stash_address: { _ilike: `%${debouncedSearch}%`}
        }
      ]
    },
  }), [debouncedSearch]);

  const variables = useMemo(
    () => ({
      where: {
        era: { _eq: latestEra },
        ...searchClause,
      }
    }),
    [latestEra, searchClause]
  );

  const { data, error, loading, pagination } = usePaginatedQuery<ValidatorAccountsQuery>(isWaiting ? GET_WAITING_LIST : GET_CURRENT_VALIDATORS, isWaiting ? {variables: {
      search: `%${debouncedSearch}%`
    }} : {
    variables,
    skip: !latestEra
  });

  const rows = useMemo(() => (data?.validators || []).map(rowsParser), [data]);

  return (
          <>
            <div style={{
              display: 'flex',
              justifyContent: 'end',
              marginTop: '-61px'
            }}>
              <Input
                value={search}
                onChange={setSearch}
                placeholder='Search by Address / Identity / Cmix ID'
                style={{
                  display: 'flex',
                  width: '300px',
                  marginBottom: '50px',
                }}
              />
            </div>
            <BaselineTable
              error={!!error}
              loading={loading}
              headers={headers}
              rows={rows}
              rowsPerPage={pagination.rowsPerPage}
              footer={pagination.controls}
            />
          </>
  )
}
export default NewValidatorsTable;