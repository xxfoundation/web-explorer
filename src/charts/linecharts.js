import { Typography } from '@mui/material'
import ReactECharts from 'echarts-for-react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const defineEraRanges = ({ data }) => {
    const xItems = data.map(([x, _]) => x)
    const maxX = Math.max(...xItems)
    const minX = Math.min(...xItems)
    const pixelIntervalX = Math.floor(xItems.reduce((partsum, i) => partsum + i, 0) / xItems.length)
    return { minAxisX: minX * .3, maxAxisX: maxX * 1.02, pixelIntervalX }
}

const highOptions = (title, data, tooltipFormatter) => {
    const { minAxisX, maxAxisX } = defineEraRanges(data)
    return {
        title: {
            text: title,
            align: 'left',
            style: {
                fontWeight: 'bold'
            }
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
            formatter: tooltipFormatter
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
            // TODO tickPixelInterval: pixelIntervalX, create a parameter to control this better
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
        plotOptions: {
            series: {
                marker: {
                    enabled: true,
                    radius: 6
                }
            }
        },
        series: [data]
    }
}

const echartOptions = (title, data, tooltipFormatter) => {
    return {
        title: { text: title },
        legend: { show: false },
        animation: false,
        grid: {},
        tooltip: {
            show: true,
            backgroundColor: '#4F4F4F',
            borderWidth: 0,
            textStyle: { color: '#fff' },
            formatter: tooltipFormatter
        },
        xAxis: {
            axisTick: {
                show: true,
                length: 10
            },
            axisLine: {
                show: true,
                onZero: false,
            },
            splitLine: { show: false },
            name: 'ERA',
            nameLocation: 'start',
            nameTextStyle: {
                fontWeight: 'bolder',
                align: 'left',
                verticalAlign: 'bottom'
            },
            boundaryGap: ['3%', '3%'],
            offset: 10
        },
        yAxis: {
            axisLine: {
                show: false,
                onZero: true
            },
            splitLine: { show: false },
            axisTick: { show: false },
            offset: -30
        },
        series: [{
            type: 'line',
            symbol: 'circle',
            name: 'ERA',
            symbolSize: 10,
            labelLine: { show: false },
            itemStyle: {
                color: '#00C4FF'
            },
            data
        }]
    }
}

const LineChart = ({ provider, title, data, tooltipFormatter }) => {
    switch (provider) {
        case 'e':
            return <ReactECharts option={echartOptions(title, data, tooltipFormatter)} />
        case 'high':
            return <HighchartsReact highcharts={Highcharts} options={highOptions(title, data, tooltipFormatter)} />
        default:
            return <Typography>{`${provider} is not a valid provider`}</Typography>
    }
}

export default LineChart
