import { Grid, Typography } from '@mui/material'
import { Fragment } from 'react'
import LineChart from '../../charts/linecharts'
import LatestBlock from '../components/latestBlock'
import Transferences from '../components/transfers'

const TokenStatus = () => {
    const testLinechart = [[2, 150 * 100], [48, 110 * 100], [96, 89 * 100], [142, 100 * 100], [168, 50 * 100], [188, 100 * 100], [252, 120 * 100], [298, 140 * 100]]
    return <Fragment>
        <Typography variant='subtitle2'>token status</Typography>
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <LineChart title='transactions' data={testLinechart} />
            </Grid>
            <Grid item xs={12} md={6}><LatestBlock /></Grid>
            <Grid item xs={12} md={6}><Transferences /></Grid>
        </Grid>
    </Fragment>
}

export default TokenStatus
