// import ReactECharts from 'echarts-for-react'
import SquareRoundedIcon from '@mui/icons-material/SquareRounded'
import { Grid, List, ListItem, ListItemIcon, ListItemText, Popover, Typography } from '@mui/material'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useState } from 'react'


const defaultOptions = {
    credits: { enabled: false },
    legend: { enabled: false },
    plotOptions: {
        pie: {
            allowPointSelect: false,
            cursor: 'pointer',
            dataLabels: { enabled: false },
            events: {},
            animation: false
        }
    },
    tooltip: { enabled: false },
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    }
}

const states = {
    hover: {
        brightness: -0.2,
        halo: { size: 0 }
    },
    inactive: { enabled: false },
}

const PieChart = ({ data, crustData, name, options, chartElName, onSliceClick }) => {
    const chartOptions = {
        ...options,
        ...defaultOptions,
        series: [
            {
                innerSize: '70%',
                innerRadius: '40%',
                name,
                data,
                states
            }
        ],
        title: null,
    }
    if (crustData) {
        const innerCircleBoundaries = {
            size: '67%',
            innerSize: '63%',
        }
        chartOptions.series = [{
            ...innerCircleBoundaries,
            states,
            data: crustData
        },
        ...chartOptions.series]
    }
    if (onSliceClick) {
        chartOptions.plotOptions.pie.events.click = onSliceClick
    }
    return <HighchartsReact
        id={chartElName}
        highcharts={Highcharts}
        options={chartOptions} />
}



const ChartLegends = ({ data }) => {
    return <List dense={true}>
        {data.map(({ name, y, color }) => {
            return <ListItem key={name}>
                <ListItemIcon>
                    <SquareRoundedIcon sx={{ color }} />
                </ListItemIcon>
                <ListItemText primary={`${y}% ${name}`} />
            </ListItem>
        })}
    </List>
}

const StakeableInfo = ({ name, values }) => {
    return <>
        <Grid item xs={4} className='stakeable-title'>
            <Typography variant='subtitle2'>{name}</Typography>
        </Grid>
        <Grid item xs={4} className='stakeable-title'>
            <Typography variant='subtitle2'>{values.team.value + values.foundation.value}</Typography>
        </Grid>
        <Grid item xs={4} className='stakeable-title'>
            <Typography variant='subtitle2'>{values.team.percentage + values.foundation.percentage}</Typography>
        </Grid>

        <Grid item xs={4}><Typography variant='body2'>team</Typography></Grid>
        <Grid item xs={4}><Typography variant='body2'>{values.team.value}</Typography></Grid>
        <Grid item xs={4}><Typography variant='body2'>{values.team.percentage}</Typography></Grid>

        <Grid item xs={4}><Typography variant='body2'>foundation</Typography></Grid>
        <Grid item xs={4}><Typography variant='body2'>{values.foundation.value}</Typography></Grid>
        <Grid item xs={4}><Typography variant='body2'>{values.foundation.percentage}</Typography></Grid>
    </>
}

const ChartClickModal = ({ id, open, anchorEl, handleClose, data }) => {
    return <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'center',
            horizontal: 'center',
        }}>
        <Typography variant='subtitle1'>{data.name}</Typography>
        <Grid container>
            <StakeableInfo name='stakeable' values={data.stakeable} />
            <StakeableInfo name='unstakeable' values={data.unstakeable} />
        </Grid>
    </Popover>
}

const PieChartWithLegend = ({ name, value, data, crustData }) => {
    const [legends] = useState(crustData ? [...data, ...crustData.filter(({hiddenLegend}) => !hiddenLegend)] : [...data])
    const [anchorEl, setAnchorEl] = useState(false)
    const [slice, setSlice] = useState({})

    const handleClick = (event) => {
        if (event.point.options.noClick) return
        setSlice(event.point.options)
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => setAnchorEl(null)

    const open = Boolean(anchorEl)
    const id = open ? `total-issuance-chart-slice-popover` : undefined

    return <Grid container>
        <Grid item xs={7}>
            <ChartClickModal
                id={id}
                handleClose={handleClose}
                open={open}
                anchorEl={anchorEl}
                data={slice} />
            <PieChart
                data={data}
                crustData={crustData}
                name="total issuance"
                onSliceClick={handleClick}
            />
        </Grid>
        <Grid item xs={5}>
            <Typography variant='subtitle2'>{name}</Typography>
            <Typography variant='subtitle1'>{value}</Typography>
            <ChartLegends data={legends} />
        </Grid>
    </Grid>
}

export default PieChart

export { PieChart, PieChartWithLegend }
