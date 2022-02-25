import { gql, useSubscription } from "@apollo/client"
import { Grid, Typography } from '@mui/material'
import LineChart from '../../charts/linecharts'
import LatestBlock from '../components/latestBlock'
import Transferences from '../components/transfers'

const ON_TRANSACTION_EVENT = gql`
subscription OnTrasactionEvent {
  transactions
}
`

const sortTransactions = ({ transactions }) => {
    return transactions.sort((a, b) => {
        return a[0] - b[0]
    })
}

const TransactionsChart = () => {
    const { data, loading, error } = useSubscription(ON_TRANSACTION_EVENT)
    if (loading) return <Typography>loading charts</Typography>
    if (error) {
        console.error(error)
        return <Typography>error loading the charts</Typography>
    }
    const sortedTransactions = sortTransactions(data)
    return <>
        <LineChart
            provider={'high'}
            title='transactions high'
            data={{
                name: 'ERA',
                marker: { symbol: 'circle' },
                data: loading ? [] : sortedTransactions
            }}
            tooltipFormatter={function () { return `<b>${this.series.name} ${this.x}</b><br />${this.y}` }} />
        <LineChart
            provider={'e'}
            title='transactions E'
            data={sortedTransactions}
            tooltipFormatter={function ({ data, seriesName }, ticket, callback) {
                const [x, y] = data
                return `<b>${seriesName} ${x}</b><br /> ${y}`
            }} />
    </>
}

const TokenStatus = () => {
    return <>
        <Typography variant='subtitle2'>token status</Typography>
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <TransactionsChart />
            </Grid>
            <Grid item xs={12} md={6}><LatestBlock /></Grid>
            <Grid item xs={12} md={6}><Transferences /></Grid>
        </Grid>
    </>
}

export default TokenStatus
