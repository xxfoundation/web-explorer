import GitHubIcon from '@mui/icons-material/GitHub';
import KeyIcon from '@mui/icons-material/Key';
import { Avatar, Divider, IconButton, Stack, SvgIcon, Typography } from '@mui/material';
import React, { FC } from 'react';
import discordIcon from '../../assets/images/icons/Discord.svg';
import telegramIcon from '../../assets/images/icons/Telegram.svg';
import twitterIcon from '../../assets/images/icons/Twitter.svg';
import CopyButton from '../../components/buttons/CopyButton';
import { PaperStyled } from '../../components/Paper/PaperWrap.styled';

const AccountId: FC<{ id: string }> = (props) => {
  return (
    <PaperStyled sx={{ marginTop: 5 }}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Stack direction={'row'} alignItems={'center'} spacing={4}>
          <Avatar />
          <Typography>{props.id}</Typography>
          <Divider variant='middle' orientation='vertical' flexItem />
          <CopyButton value={props.id} />
          <KeyIcon color='primary' sx={{ transform: 'rotate(270deg)' }} />
        </Stack>
        <Stack direction={'row'} alignItems={'center'}>
          <IconButton color={'primary'}>
            <SvgIcon component={GitHubIcon}></SvgIcon>
          </IconButton>
          <IconButton color={'primary'}>
            <img src={twitterIcon} />
          </IconButton>
          <IconButton color='primary'>
            <img src={telegramIcon} />
          </IconButton>
          <IconButton color='primary'>
            <img src={discordIcon} />
          </IconButton>
        </Stack>
      </Stack>
    </PaperStyled>
  );
};

export default AccountId;
