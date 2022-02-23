import ReactECharts from 'echarts-for-react'

const defineXLabels = (data) => {
    // TODO do this in a simpler way
    let [maxX, minX, maxY, minY] = [null, null, null, null]
    for (const d of data) {
        if ((maxX == null || maxY == null) || d[1] > maxY) {
            maxX = d[0]
            maxY = d[1]
        }
        if ((minX == null || minY == null) || d[1] < minY) {
            minX = d[0]
            minY = d[1]
        }
    }
    return { max: maxX.toString(), min: minX.toString() }
}

const defineYLabels = (data) => {
    return Math.max(...data.map((item) => item[1])) / 2
}

const LineChart = ({ title, data }) => {
    const yLabelsIntervals = defineYLabels(data)
    const xLabels = defineXLabels(data)
    return <ReactECharts option={{
        title: {
            text: title
        },
        legend: {},
        grid: {},
        xAxis: {
            type: 'category',
            axisTick: {
                show: false
            },
            axisLabel: {
                formatter: (value) => {
                    return value === xLabels.min || value === xLabels.max ? `|\n\n${value}` : null
                }
            },
            name: '\n\n\n\n\n\nERA', // TODO do this in a better way
            nameLocation: 'start',
            nameTextStyle: {
                fontWeight: 'bolder',
                align: 'center',
                // verticalAlign: 'bottom',
            }
        },
        yAxis: {
            boundaryGap: ['40%', '30%'],
            type: 'value',
            axisLabel: {
                formatter: (value) => {
                    return value
                }
            },
            axisLine: {
                show: false,
                onZero: false
            },
            splitLine: {
                show: false
            },
            interval: yLabelsIntervals
        },
        series: [{
            type: 'line',
            symbol: 'circle',
            symbolSize: 10,
            labelLine: {
                show: false
            },
            itemStyle: {
                color: '#00C4FF'
            },
            data
        }]
    }} />
}

export default LineChart
