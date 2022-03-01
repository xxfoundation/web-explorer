import { PieChartWithLegend } from '../../charts/piechart'


const StakingSupply = () => {
    const value = 9999120003
    const data = [
        {
            name: 'staked',
            y: .58,
            color: '#00A2D6',
            stakeable: { team: { value: 22145, percentage: .022 }, foundation: { value: 30156, percentage: .03 } },
            unstakeable: { team: { value: 22145, percentage: .232 }, foundation: { value: 30156, percentage: .201 } }
        },
        {
            name: 'liquid', y: .34,
            color: '#13EEF9',
            stakeable: { team: { value: 82145, percentage: .082 }, foundation: { value: 80156, percentage: .83 } },
            unstakeable: { team: { value: 82145, percentage: .282 }, foundation: { value: 80156, percentage: .801 } }
        },
        {
            name: 'unbonding', y: .08,
            color: '#6F74FF',
            stakeable: { team: { value: 92145, percentage: .092 }, foundation: { value: 90156, percentage: .93 } },
            unstakeable: { team: { value: 92145, percentage: .932 }, foundation: { value: 90156, percentage: .901 } }
        }
    ]
    return <PieChartWithLegend data={data} name='staking supply' value={value} />
}

export default StakingSupply
