import { Container, Grid, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { useState } from 'react';


const data = {
    "items": [
        { "title": "finalized blocks", "value": "8657975" },
        { "title": "active era", "value": "568" },
        { "title": "transfers", "value": "524609" },
        { "title": "holders", "value": "866441" },
        { "title": "total issuance", "value": "1006B" },
        { "title": "nominators", "value": "53/53" },
        { "title": "validators", "value": "874609" },
        { "title": "infration rate", "value": "7.86" },
    ]
}

const ChainInfoCard = (title, value) => {
    return (
        <Grid item xs={6} sm={3} md={3} key={title}>
            <Card className="card" >
                <Typography>{title}</Typography>
                <Typography variant='subtitle2'>{value}</Typography>
            </Card>
        </Grid>
    );
}

const chainInfo = () => {
    return (
        <Container maxWidth="lg" className="blockchain-component-chainInfo">
            <Typography variant='subtitle1'>Chain data</Typography>
            <Grid container spacing={{ xs: 2, md: 4 }}>
                {(data.items.map(({ title, value }) => {
                    const [statedTitle] = useState(title);
                    const [statedValue] = useState(value);
                    return ChainInfoCard(statedTitle, statedValue);
                }))}
            </Grid>
        </Container>
    )
}

export default chainInfo
