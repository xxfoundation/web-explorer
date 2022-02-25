import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const defineEraRanges = ({ data }) => {
    const xItems = data.map(([x, _]) => x)
    const maxX = Math.max(...xItems)
    const minX = Math.min(...xItems)
    const pixelIntervalX = Math.floor(xItems.reduce((partsum, i) => partsum + i, 0) / xItems.length)
    return { minAxisX: minX * .3, maxAxisX: maxX * 1.02, pixelIntervalX }
}

const options = (title, data) => {
    const { minAxisX, maxAxisX, pixelIntervalX } = defineEraRanges(data)
    return {
        title: {
            text: title,
            align: 'left'
        },
        colors: ['#00C4FF'],
        tooltip: {
            backgroundColor: '#4F4F4F',
            borderWidth: 0,
            borderRadius: 10,
            enabled: true,
            useHTML: true,
            padding: 10,
            style: {
                color: '#fff'
            },
            formatter: function () {
                return `<b>${this.series.name} ${this.x}</b><br />${this.y}`
            }
        },
        credits: { enabled: false },
        legend: { enabled: false },
        xAxis: {
            title: {
                text: 'ERA',
                align: 'low',
                textAlign: 'left',
                margin: -14,
                style: { fontWeight: 'bolder' }
            },
            labels: { y: 30 },
            tickWidth: 1,
            tickPixelInterval: pixelIntervalX,
            offset: 20,
            min: minAxisX,
            max: maxAxisX,
            margin: 50
        },
        yAxis: {
            gridLineWidth: 0,
            title: null,
            labels: { align: 'right', x: 30 },
            min: 0
        },
        series: [data]
    }
}

const LineChart = ({ title, data }) => {
    return <HighchartsReact highcharts={Highcharts} options={options(title, data)} />
}

export default LineChart
