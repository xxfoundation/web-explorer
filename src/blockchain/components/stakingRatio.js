import { gql, useSubscription } from '@apollo/client'
import { Typography } from '@mui/material'
import LineChart from '../../charts/linecharts'


const ON_STAKING_RATIO_CHANGE = gql`
subscription OnStakingRatioChange {
    stakingRatio
}
`

const StakingRatio = () => {
    const { data, loading, error } = useSubscription(ON_STAKING_RATIO_CHANGE)
    if (loading) return <Typography>loading staking ratio chart</Typography>
    if (error) {
        return <Typography>error loading staking ratio</Typography>
    }
    const sortedAccounts = data.stakingRatio.sort((a, b) => a[0] - b[0])
    return <>
        <LineChart
            title='staking ratio'
            data={{
                name: 'ERA',
                marker: { symbol: 'circle' },
                data: loading ? [] : sortedAccounts
            }}
            tooltipFormatter={function () { return `<b>${this.series.name} ${this.x}</b><br />${Math.floor(this.y * 100)}%` }}
            labelsFormatter={{ yAxis: function () { return `${this.value * 100}%` } }} 
            maxY={1}/>
    </>
}

export default StakingRatio
