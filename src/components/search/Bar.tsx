import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Alert, Divider, FormControl, Grid, IconButton, Snackbar, SxProps } from '@mui/material';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useToggle } from '../../hooks';
import { FindAccountByAddressType, FIND_ACCOUNT_BY_ADDRESS } from '../../schemas/accounts.schema';
import { GET_BLOCK_BY_PK } from '../../schemas/blocks.schema';
import { FindExtrinsicByHashType, FIND_EXTRINSIC_BY_HASH } from '../../schemas/extrinsics.schema';
import { theme } from '../../themes/tags';
import { Bar, SelectItem, SelectOption } from './Bar.styles';
import { GenericSearchInput } from './SearchInputGroup';
import { SearchTypes } from './types';
import validators from './validations';

const dividerSxProps: SxProps = {
  position: 'absolute',
  top: 0,
  right: 0,
  height: 22,
  borderColor: 'primary.light',
  display: { xs: 'none', sm: 'flex' }
};

type SearchGroupType = {
  validator: (value: string, optionValidator: (v: string) => boolean) => boolean;
  toggleAlert: (value: string) => void;
};

const SearchBlocks: FC<SearchGroupType> = ({ toggleAlert, validator }) => {
  const history = useHistory();
  return (
    <GenericSearchInput
      placeholder='Search by Block Number (insert an integer)'
      messageLoader={(value: string) => `Querying Block Number ${value}`}
      document={GET_BLOCK_BY_PK}
      variables={(v: string) => ({ blockNumber: Number(v) })}
      validator={(v) => validator(v, validators.blocks)}
      errorSearchCallback={(v: string, err: unknown) => {
        toggleAlert(`problem searching block with ${v}`);
        console.error(err);
      }}
      successSearchCallback={(v: string, data: { block?: { number: number; hash: string } }) => {
        if (data.block?.number) {
          history.push(`/blocks/${data.block.number}`);
        } else {
          toggleAlert(`no block found with number ${v}`);
        }
      }}
    />
  );
};

const SearchExtrinsics: FC<SearchGroupType> = ({ toggleAlert, validator }) => {
  const history = useHistory();
  return (
    <GenericSearchInput
      messageLoader={(value: string) => `Querying Extrinsic ${value}`}
      placeholder='Search by Extrinsic Hash (insert an hexadecimal string)'
      document={FIND_EXTRINSIC_BY_HASH}
      variables={(v: string) => ({
        where: {
          extrinsic_hash: {
            _eq: v
          }
        }
      })}
      validator={(v) => validator(v, validators.extrinsic)}
      successSearchCallback={(v: string, data: FindExtrinsicByHashType) => {
        if (data.extrinsic?.at(0)?.index) {
          history.push(`/extrinsics/${data.extrinsic[0].index}`);
        } else {
          toggleAlert(`no extrinsic found for hash ${v}`);
        }
      }}
      errorSearchCallback={(v: string, err: unknown) => {
        toggleAlert(`problem searching extrinsic with key ${v}`);
        console.error(err);
      }}
    />
  );
};

const SearchAccount: FC<SearchGroupType> = ({ toggleAlert, validator }) => {
  const history = useHistory();
  return (
    <GenericSearchInput
      messageLoader={(value: string) => `Querying address with: ${value}`}
      placeholder='Search by Account Address (insert a ss58 string)'
      document={FIND_ACCOUNT_BY_ADDRESS}
      variables={(v: string) => ({
        where: {
          address: {
            _eq: v
          }
        }
      })}
      validator={(v) => validator(v, validators.accounts)}
      successSearchCallback={(v: string, data: FindAccountByAddressType) => {
        if (data.accounts?.at(0)?.address) {
          history.push(`/acccounts/${data.accounts[0].address}`);
        } else {
          console.warn(JSON.stringify(data.accounts));
          toggleAlert(`no account found for the address ${v}`);
        }
      }}
      errorSearchCallback={(v: string, err: unknown) => {
        toggleAlert(`problem searching account with address ${v}`);
        console.error(err);
      }}
    />
  );
};

const searchInputGroupFactory = (option: SearchTypes, searchOptions: SearchGroupType) => {
  if (option === 'blocks') {
    return <SearchBlocks {...searchOptions} />;
  }
  if (option === 'extrinsic') {
    return <SearchExtrinsics {...searchOptions} />;
  }
  if (option === 'accounts') {
    return <SearchAccount {...searchOptions} />;
  }
  return <></>;
};

const AlertEl: FC<{ opened: boolean; content: string; handleClose: () => void }> = ({
  content,
  handleClose,
  opened
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={opened}
      onClose={handleClose}
      key='search notification'
    >
      <Alert
        icon={<ErrorOutlineIcon sx={{ color: theme.palette.primary.contrastText }} />}
        severity='error'
        sx={{ background: theme.palette.error.main, color: theme.palette.primary.contrastText }}
        action={
          <IconButton size='small' aria-label='close' color='inherit' onClick={handleClose}>
            <CloseIcon fontSize='small' />
          </IconButton>
        }
      >
        {content}
      </Alert>
    </Snackbar>
  );
};

const SearchBar = () => {
  const [option, setOption] = useState<SearchTypes>('blocks');
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [openedAlert, { set: toggleAlert }] = useToggle();

  const handleChange = useCallback(({ target: { value } }) => setOption(value), [setOption]);

  const handleClose = useCallback(() => {
    toggleAlert(false);
    setAlertMessage('');
  }, [toggleAlert]);

  // TODO replace this if a library for notifications
  const validator = useCallback(
    (value: string, optionValidator: (v: string) => boolean) => {
      if (optionValidator(String(value))) {
        toggleAlert(false);
        setAlertMessage('');
        return true;
      }
      const msg = value ? `${option} is not valid` : 'the search is empty';
      setAlertMessage(msg);
      toggleAlert(true);
      return false;
    },
    [option, toggleAlert]
  );

  const callAlert = useCallback(
    (message?: string) => {
      if (message) {
        setAlertMessage(message);
        toggleAlert(true);
      }
    },
    [toggleAlert]
  );

  const input = useMemo(() => {
    return searchInputGroupFactory(option, { validator, toggleAlert: callAlert });
  }, [callAlert, option, validator]);

  return (
    <Bar component={'form'}>
      <AlertEl opened={openedAlert} content={alertMessage} handleClose={handleClose} />
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
