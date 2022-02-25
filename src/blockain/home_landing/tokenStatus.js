import { Grid, Typography, Card } from '@mui/material'
import LatestBlock from '../components/latestBlock'
import Transferences from '../components/transfers'
import TransactionsChart from "../components/transactions"
import NewAccounts from '../components/newAccounts'
import StakingRatio from '../components/stakingRatio'
import AverageAnnualReturn from '../components/averageAnnualReturn'
import TotalIssuance from '../components/totalIssuance'
import StackingSupply from '../components/stackingSupply'

const TokenStatus = () => {
    return <>
        <Typography variant='subtitle2'>token status</Typography>
        <Grid container spacing={2}>
            {[
                <TotalIssuance />,
                <StackingSupply />,
                <LatestBlock />,
                <Transferences />,
                <TransactionsChart />,
                <NewAccounts />,
                <StakingRatio />,
                <AverageAnnualReturn />].map((item, i) => {
                    return <Grid item xs={12} md={6} key={i}>
                        <Card>
                            {item}
                        </Card>
                    </Grid>
                })}
        </Grid>
    </>
}

export default TokenStatus
