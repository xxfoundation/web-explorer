import { gql, useQuery } from "@apollo/client"
import { Container, Grid, Typography } from "@mui/material"
import Card from "@mui/material/Card"
import { useEffect } from "react"


const blocksMapper = {
    "finalizedBlocks": "finalized blocks",
    "activeEra": "active era",
    "transfers": "transfers",
    "holders": "holders",
    "totalIssuance": "total issuance",
    "validators": "validators",
    "nominators": "nominators",
    "inflationRate": "infration rate",
}

const ON_CHAININFO_CHANGES = gql`
subscription OnChaininfoChanges {
    chaininfoChanges {
        finalizedBlocks
        activeEra
        transfers
        holders
        totalIssuance
        validators
        nominators
        inflationRate
    }
}
`

const GET_CHAININFO = gql`
query GetChaininfo {
    chainInfo {
        finalizedBlocks
        activeEra
        transfers
        holders
        totalIssuance
        validators
        nominators
        inflationRate
    }
}`

const ChainInfoCard = (title, value) => {
    return (
        <Grid item xs={6} sm={3} md={3} key={title}>
            <Card className="card" >
                <Typography>{title}</Typography>
                <Typography variant="subtitle2">{value}</Typography>
            </Card>
        </Grid>
    );
}

const ChainInfo = ({ data, subscriptionUpdate }) => {
    useEffect(() => {
        subscriptionUpdate()
    })

    return (
        <Container maxWidth="lg" className="blockchain-component-chainInfo">
            <Typography variant="subtitle1">Chain data</Typography>
            <Grid container spacing={{ xs: 2, md: 4 }}>
                {(Object.entries(blocksMapper).map(([key, title]) => {
                    const cardValue = data ? data.chainInfo[key] || '??' : '...'
                    return ChainInfoCard(title, cardValue);
                }))}
            </Grid>
        </Container>
    )
}

const ChainInfoRenderer = () => {
    const { subscribeToMore, ...result } = useQuery(GET_CHAININFO)
    return <ChainInfo {...result} subscriptionUpdate={() => {
        subscribeToMore({
            document: ON_CHAININFO_CHANGES,
            updateQuery: (prev, { subscriptionData: { data } }) => {
                if (!data) return prev
                return { chainInfo: data.chaininfoChanges }
            }
        })
    }} />
}

export default ChainInfoRenderer
