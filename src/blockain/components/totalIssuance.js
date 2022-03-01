import { PieChartWithLegend } from '../../charts/piechart'


const TotalIssuance = () => {
    // TODO make sure the order is circulation, vesting, ...
    const data = [
        {
            name: 'circulation', y: 6,
            color: '#13EEF9',
            stakeable: { team: { value: 82145, percentage: 0.82 }, foundation: { value: 80156, percentage: 83 } },
            unstakeable: { team: { value: 82145, percentage: 2.82 }, foundation: { value: 80156, percentage: 80.1 } }
        },
        {
            name: 'vesting',
            y: 49,
            color: '#00A2D6',
            stakeable: { team: { value: 22145, percentage: 22 }, foundation: { value: 30156, percentage: 3 } },
            unstakeable: { team: { value: 22145, percentage: 23.2 }, foundation: { value: 30156, percentage: 20.1 } }
        },
        {
            name: 'rewards', y: 39,
            color: '#6F74FF',
            stakeable: { team: { value: 92145, percentage: 0.92 }, foundation: { value: 90156, percentage: 93 } },
            unstakeable: { team: { value: 92145, percentage: 93.2 }, foundation: { value: 90156, percentage: 90.1 } }
        },
        {
            name: 'others', y: 6,
            color: '#7BE03D',
            stakeable: { team: { value: 72145, percentage: .722 }, foundation: { value: 70156, percentage: .73 } },
            unstakeable: { team: { value: 72145, percentage: .732 }, foundation: { value: 70156, percentage: .701 } }
        }
    ]

    const stakingSupply = 10

    const crustData = {
        name: 'staking supply',
        y: stakingSupply,
        color: '#FFC908',
        stakeable: { team: { value: 62145, percentage: .622 }, foundation: { value: 60156, percentage: .63 } },
        unstakeable: { team: { value: 62145, percentage: .632 }, foundation: { value: 60156, percentage: .601 } },
        positioning: { startAngle: 0, endAngle: stakingSupply * 360 / 100 }
    }
    const value = 9999120003 // TODO will be obtained by a aggregation of the values
    return <PieChartWithLegend data={data} crustData={crustData} name='total issuance' value={value} />
}

export default TotalIssuance
