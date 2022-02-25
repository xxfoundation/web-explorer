import { Grid, Typography } from '@mui/material'
import LineChart from '../../charts/linecharts'
import LatestBlock from '../components/latestBlock'
import Transferences from '../components/transfers'
import { gql, useSubscription } from "@apollo/client"

const ON_TRANSACTION_EVENT = gql`
subscription OnTrasactionEvent {
  transactions
}
`

const TransactionsChart = () => {
    const { data, loading } = useSubscription(ON_TRANSACTION_EVENT)
    // const testLinechart = [
    //     [48, 150 * 100], [96, 89 * 100], [142, 100 * 100],
    //     [168, 50 * 100], [188, 100 * 100], [252, 120 * 100], [298, 140 * 100]]
    return <LineChart title='transactions' data={{ name: 'ERA', data: loading ? [] : data.transactions }} />
}

const TokenStatus = () => {
    return <>
        <Typography variant='subtitle2'>token status</Typography>
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                {TransactionsChart()}
            </Grid>
            <Grid item xs={12} md={6}><LatestBlock /></Grid>
            <Grid item xs={12} md={6}><Transferences /></Grid>
        </Grid>
    </>
}

export default TokenStatus
