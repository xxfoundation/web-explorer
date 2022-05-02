import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Alert, Divider, FormControl, Grid, IconButton, Snackbar, SxProps } from '@mui/material';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useToggle } from '../../hooks';
import { SEARCH_BLOCKS } from '../../schemas/blocks.schema';
import { SEARCH_EVENTS } from '../../schemas/events.schema';
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
};

export const SearchBlock: FC<SearchGroupType> = () => {
  const history = useHistory();
  return (
    <GenericSearchInput
      placeholder='Search by Block'
      messageLoader={(value: string) => `Querying Block ID ${value}`}
      document={SEARCH_BLOCKS}
      variables={(v: string) => ({ variables: { blockNumber: Number(v) } })}
      validator={validators.blocks}
      successSearchCallback={(data: { block: { number: number; hash: string } }) => {
        history.push(`/blocks/${data.block.number}`);
      }}
    />
  );
};

export const SearchEvent: FC<SearchGroupType> = () => {
  const history = useHistory();
  return (
    <GenericSearchInput
      messageLoader={(value: string) => `Querying Event ID ${value}`}
      placeholder='Search by Event'
      document={SEARCH_EVENTS}
      variables={(v: string) => {
        const [blockNumber, eventId] = v.split('-');
        return { variables: { blockNumber: Number(blockNumber), eventId: Number(eventId) } };
      }}
      validator={validators.events}
      successSearchCallback={(data: {event: { blockNumber: number; index: number }}) => {
        history.push(`/events/${data.event.blockNumber}-${data.event.index}`);
      }}
    />
  );
};

const searchInputGroupFactory = (option: SearchTypes, validator: SearchGroupType['validator']) => {
  if (option === 'blocks') {
    return <SearchBlock validator={validator} />;
  }
  if (option === 'events') {
    return <SearchEvent validator={validator} />;
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
  const handleChange = useCallback(({ target: { value } }) => setOption(value), [setOption]);

  const [alertMessage, setAlertMessage] = useState<string>('');
  const [opened, { toggleOff, toggleOn }] = useToggle();
  const handleClose = useCallback(() => {
    toggleOff();
    setAlertMessage('');
  }, [toggleOff]);

  const input = useMemo(() => {
    const validator = (value: string, optionValidator: (v: string) => boolean) => {
      if (optionValidator(String(value))) {
        toggleOff();
        setAlertMessage('');
        return true;
      }
      const msg = value ? `${option} is not valid` : 'the search is empty';
      setAlertMessage(msg);
      toggleOn();
      return false;
    };
    return searchInputGroupFactory(option, validator);
  }, [option, toggleOff, toggleOn]);

  return (
    <Bar component='form'>
      <AlertEl opened={opened} content={alertMessage} handleClose={handleClose} />
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
              <SelectItem value={'blocks'}>Block </SelectItem>
              <SelectItem value={'events'}>Event</SelectItem>
              <SelectItem value={'extrinsics'}>Extrinsic</SelectItem>
              <SelectItem value={'account'}>Account</SelectItem>
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
