import { Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import { AvatarLabel, SummaryPaper, textWithCopy } from '../Summary';

const sampleHash = '6Ze8pqYi4CAuwdm4eTGxKke7LSF6phkzmERUmpG5tTC1yKoh';

const Summary = () => {
    return <SummaryPaper data={[
        {label: 'stash', value: textWithCopy(sampleHash, <AvatarLabel src='???' srcAlt='lala' text={sampleHash}/>)},
        {label: 'controller', value: textWithCopy(sampleHash, <AvatarLabel src='???' srcAlt='lala' text={sampleHash}/>)},
        {label: 'reward', value: textWithCopy(sampleHash, <AvatarLabel src='???' srcAlt='lala' text={sampleHash}/>)},
        {label: 'cmix id', value: textWithCopy('kgGYMH8rxprBOvOvGAZI2chj5xJI71CqIM34DpCII10C', <Typography>kgGYMH8rxprBOvOvGAZI2chj5xJI71CqIM34DpCII10C</Typography>)},
        {label: 'location', value: 'Big Sur, California'},
        {label: 'own stake', value: '1.00 XX'},
        {label: 'total stake', value: '3,038,663.57 XX'},
        {label: 'nominators', value: 3},
        {label: 'commission', value: '10.00%'},
        {label: 'session key', value: <Stack direction={'column'} spacing={1}>
            <Stack direction={'row'} spacing={3}>
                <div>babej</div>
                <Divider orientation='vertical' />
                <div>0xf2b63387ce5b649f9388fd1be38ee4357b48dc0146e78b91f8f6469a78dc9f58</div>
            </Stack>
            <Stack direction={'row'} spacing={3}>
                <div>grandpa</div>
                <Divider orientation='vertical' />
                <div>0x5b379072ec1f3f70b4650979a47b24f9b080c03450f7e9587d92cb599fcf4d6b</div>
            </Stack>
            <Stack direction={'row'} spacing={3}>
                <div>im_online</div>
                <Divider orientation='vertical' />
                <div>0x8e1015503d9573387939580a10a99754d40fcfff424f6846a9f0d943bc178812</div>
            </Stack>
            <Stack direction={'row'} spacing={3}>
                <div>authority_discovery</div>
                <Divider orientation='vertical' />
                <div>0x8e1015503d9573387939580a10a99754d40fcfff424f6846a9f0d943bc178812</div>
            </Stack>
        </Stack>}
    ]} />;
};

export default Summary;
