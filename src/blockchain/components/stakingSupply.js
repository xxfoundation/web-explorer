import { PieChartWithLegend } from '../../charts/piechart'
import PaperWithHeader from './paperWithHeader';


const StakingSupply = () => {
    const value = 9999120003
    const data = [
        {
            name: 'staked',
            y: 58,
            color: '#00A2D6',
            stakeable: { team: { value: 22145, percentage: 2.2 }, foundation: { value: 30156, percentage: 3 } },
            unstakeable: { team: { value: 22145, percentage: 23.2 }, foundation: { value: 30156, percentage: 20.1 } }
        },
        {
            name: 'liquid', y: 34,
            color: '#13EEF9',
            stakeable: { team: { value: 82145, percentage: 0.82 }, foundation: { value: 80156, percentage: 83 } },
            unstakeable: { team: { value: 82145, percentage: 2.82 }, foundation: { value: 80156, percentage: 80.1 } }
        },
        {
            name: 'unbonding', y: 8,
            color: '#6F74FF',
            stakeable: { team: { value: 92145, percentage: .92 }, foundation: { value: 90156, percentage: 93 } },
            unstakeable: { team: { value: 92145, percentage: 93.2 }, foundation: { value: 90156, percentage: 90.1 } }
        }
    ]
    return <>
        <PaperWithHeader>
            <PieChartWithLegend data={data} name='staking supply' value={value} />
        </PaperWithHeader>
        </>
}

export default StakingSupply
