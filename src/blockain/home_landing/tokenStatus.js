import { Grid, Typography } from '@mui/material'
import { Fragment } from 'react'
import LatestBlock from '../components/latestBlock'
import Transferences from '../components/transfers'

const TokenStatus = () => {
    return <Fragment>
        <Typography variant='subtitle2'>token status</Typography>
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}><LatestBlock /></Grid>
            <Grid item xs={12} md={6}><Transferences /></Grid>
        </Grid>
    </Fragment>
}

export default TokenStatus
