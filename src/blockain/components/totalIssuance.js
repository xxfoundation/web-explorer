import { PieChartWithLegend } from '../../charts/piechart'


const TotalIssuance = () => {
    const value = 9999120003
    const data = [
        {
            name: 'vesting',
            y: .49,
            color: '#00A2D6',
            stakeable: { team: { value: 22145, percentage: .022 }, foundation: { value: 30156, percentage: .03 } },
            unstakeable: { team: { value: 22145, percentage: .232 }, foundation: { value: 30156, percentage: .201 } }
        },
        {
            name: 'circulation', y: .06,
            color: '#13EEF9',
            stakeable: { team: { value: 82145, percentage: .082 }, foundation: { value: 80156, percentage: .83 } },
            unstakeable: { team: { value: 82145, percentage: .282 }, foundation: { value: 80156, percentage: .801 } }
        },
        {
            name: 'rewards', y: .39,
            color: '#6F74FF',
            stakeable: { team: { value: 92145, percentage: .092 }, foundation: { value: 90156, percentage: .93 } },
            unstakeable: { team: { value: 92145, percentage: .932 }, foundation: { value: 90156, percentage: .901 } }
        },
        {
            name: 'others', y: .06,
            color: '#7BE03D',
            stakeable: { team: { value: 72145, percentage: .722 }, foundation: { value: 70156, percentage: .73 } },
            unstakeable: { team: { value: 72145, percentage: .732 }, foundation: { value: 70156, percentage: .701 } }
        },
        {
            name: 'staking supply', y: .1,
            color: '#FFC908',
            radius: '60%',
            innerRadius: '40%',
            stakeable: { team: { value: 62145, percentage: .622 }, foundation: { value: 60156, percentage: .63 } },
            unstakeable: { team: { value: 62145, percentage: .632 }, foundation: { value: 60156, percentage: .601 } },
            hiddenInChart: true
        }
    ]
    return <PieChartWithLegend data={data} name='total issuance' value={value} />
}

export default TotalIssuance
