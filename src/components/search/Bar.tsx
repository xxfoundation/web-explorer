import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Divider, FormControl, Grid, SxProps } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { FC, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GetAccountByAddressType, GET_ACCOUNT_BY_PK } from '../../schemas/accounts.schema';
import { GET_BLOCK_BY_PK } from '../../schemas/blocks.schema';
import { FindExtrinsicByHashType, FIND_EXTRINSIC_BY_HASH } from '../../schemas/extrinsics.schema';
import { Bar, SelectItem, SelectOption } from './Bar.styles';
import { GenericSearchInput } from './SearchInputGroup';
import { SearchTypes } from './types';
import validators from './validators';

const dividerSxProps: SxProps = {
  position: 'absolute',
  top: 0,
  right: 0,
  height: 22,
  borderColor: 'primary.light',
  display: { xs: 'none', sm: 'flex' }
};

const SearchBlocks: FC = () => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  return (
    <GenericSearchInput
      placeholder='Search by Block Number (insert an integer)'
      messageLoader={(value: string) => `Querying Block Number ${value}`}
      document={GET_BLOCK_BY_PK}
      variables={(v: string) => ({ blockNumber: Number(v) })}
      option='block'
      optionValidator={validators.blocks}
      errorSearchCallback={(v: string, err: unknown) => {
        console.error(err);
        enqueueSnackbar(`problem searching block with ${v}`, { variant: 'error' });
      }}
      successSearchCallback={(v: string, data: { block?: { number: number; hash: string } }) => {
        if (data.block?.number) {
          history.push(`/blocks/${data.block.number}`);
        } else {
          enqueueSnackbar(`no block found with number ${v}`, { variant: 'warning' });
        }
      }}
    />
  );
};

const SearchExtrinsics: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  return (
    <GenericSearchInput
      messageLoader={(value: string) => `Querying Extrinsic ${value}`}
      placeholder='Search by Extrinsic Hash (insert an hexadecimal string)'
      document={FIND_EXTRINSIC_BY_HASH}
      variables={(v: string) => ({
        where: {
          hash: {
            _eq: v
          }
        }
      })}
      option='extrinsic'
      optionValidator={validators.extrinsic}
      successSearchCallback={(v: string, data: FindExtrinsicByHashType) => {
        if (data.extrinsic?.at(0)?.hash) {
          history.push(`/extrinsics/${data.extrinsic[0].blockNumber}-${data.extrinsic[0].index}`);
        } else {
          enqueueSnackbar(`no extrinsic found for hash ${v}`, { variant: 'error' });
        }
      }}
      errorSearchCallback={(v: string, err: unknown) => {
        enqueueSnackbar(`problem searching extrinsic with key ${v}`, { variant: 'warning' });
        console.error(err);
      }}
    />
  );
};

const SearchAccount: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const onSuccess = useCallback(
    (v: string, data: GetAccountByAddressType) => {
      if (data.account?.id) {
        history.push(`/accounts/${data.account.id}`);
      } else {
        enqueueSnackbar(`no account found for the address ${v}`, { variant: 'error' });
      }
    },
    [enqueueSnackbar, history]
  );

  const onError = useCallback(
    (v: string, err: unknown) => {
      enqueueSnackbar(`problem searching account with address ${v}`, { variant: 'warning' });
      console.error(err);
    },
    [enqueueSnackbar]
  );

  return (
    <GenericSearchInput
      messageLoader={(value: string) => `Querying address with: ${value}`}
      placeholder='Search by Account Address (insert an ss58 string)'
      document={GET_ACCOUNT_BY_PK}
      variables={(v: string) => ({ accountId: v })}
      option='account'
      optionValidator={validators.accounts}
      successSearchCallback={onSuccess}
      errorSearchCallback={onError}
    />
  );
};

const useSearchInputGroupFactory = (option: SearchTypes) => {
  if (option === 'blocks') {
    return <SearchBlocks />;
  }
  if (option === 'extrinsic') {
    return <SearchExtrinsics />;
  }
  if (option === 'accounts') {
    return <SearchAccount />;
  }
  return <></>;
};

const SearchBar = () => {
  const [option, setOption] = useState<SearchTypes>('blocks');
  const handleChange = useCallback(({ target: { value } }) => setOption(value), [setOption]);
  const input = useSearchInputGroupFactory(option);

  return (
    <Bar component={'form'}>
      <Grid container alignItems='center'>
        <Grid item xs='auto' sx={{ mr: { xs: 0, sm: 3 } }}>
          <FormControl variant='standard'>
            <SelectOption
              value={option}
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              IconComponent={KeyboardArrowDownIcon}
            >
              <SelectItem value={'blocks'}>Block Number </SelectItem>
              <SelectItem value={'extrinsic'}>Extrinsic Hash</SelectItem>
              <SelectItem value={'accounts'}>Account Address</SelectItem>
            </SelectOption>
          </FormControl>
        </Grid>
        <Grid item xs='auto' sx={{ mr: { xs: 0, sm: 3 }, position: 'relative', height: 22 }}>
          <Divider orientation='vertical' sx={dividerSxProps} />
        </Grid>
        {input}
      </Grid>
    </Bar>
  );
};

export default SearchBar;
