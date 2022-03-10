import { Grid, Box, Typography, Card } from '@mui/material'
import LatestBlock from '../components/latestBlock'
import Transferences from '../components/transfers'
import TransactionsChart from "../components/transactions"
import NewAccounts from '../components/newAccounts'
import StakingRatio from '../components/stakingRatio'
import AverageAnnualReturn from '../components/averageAnnualReturn'
import TotalIssuance from '../components/totalIssuance'
import StakingSupply from '../components/stakingSupply'

const TokenStatus = () => {
    return <Box sx={{ mt: 3 }}>
        <Typography variant="h3" gutterBottom>Token Status</Typography>
        <Grid container spacing={2}>
            {[
                <TotalIssuance />,
                <StakingSupply />,
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
    </Box>
}

export default TokenStatus
