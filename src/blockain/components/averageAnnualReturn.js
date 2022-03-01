import { gql, useSubscription } from '@apollo/client'
import { Typography } from '@mui/material'
import LineChart from '../../charts/linecharts'



const ON_AVERAGE_ANNUAL_RETURN_UPDATE = gql`
subscription OnAverageAnnualReturnUpdate {
    averageAnnualReturn
}
`

const AverageAnnualReturn = () => {
    const { data, loading, error } = useSubscription(ON_AVERAGE_ANNUAL_RETURN_UPDATE)
    if (loading) return <Typography>loading average annual return chart</Typography>
    if (error) {
        console.error(error)
        return <Typography>error loading staking ratio</Typography>
    }
    const sortedAnnualReturn = data.averageAnnualReturn.sort((a, b) => a[0] - b[0])
    return <>
        <LineChart
            provider={'high'}
            title='average annual return'
            data={{
                name: 'ERA',
                marker: { symbol: 'circle' },
                data: loading ? [] : sortedAnnualReturn
            }}
            tooltipFormatter={function () { return `<b>${this.series.name} ${this.x}</b><br />${Math.floor(this.y * 100)}%` }}
            labelsFormatter={{ yAxis: function () { return `${this.value * 100} %` } }}
            maxY={1} />
    </>
}

export default AverageAnnualReturn
