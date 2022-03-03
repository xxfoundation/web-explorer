const { createServer } = require('http')
const express = require('express')
const { execute, subscribe } = require('graphql')
const { ApolloServer, gql } = require('apollo-server-express')
const { PubSub } = require('graphql-subscriptions')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { makeExecutableSchema } = require('@graphql-tools/schema')

const { operator, changesListener } = require('./db')

const { DataTypes } = require('sequelize')

const TRIGGERS = {
    onChaininfoUpdate: 'ON_CHAININFO_UPDATE',
    transactionsOccurence: 'TRANSACTION_EVENT',
    onNewAccounts: 'ON_NEW_ACCOUNTS',
    onStakingRatioChange: 'ON_STAKING_RATIO_CHANGE',
    onAverageAnnualReturnUpdate: 'ON_AVERAGE_ANNUAL_RETURN_UPDATE'
}

// Schema definition
const typeDefs = gql`
type ChainInfo {
    finalizedBlocks: Float!,
    activeEra: Float!,
    transfers: Float!,
    holders: Float!,
    totalIssuance: Float!,
    nominators: String!,
    validators: Float!,
    inflationRate: Float!
}

type Query {
    chainInfo: ChainInfo!
}

type Subscription {
    chaininfoChanges: ChainInfo!
    transactions: [[Float]]!
    newAccounts: [[Float]]!
    stakingRatio: [[Float]]!
    averageAnnualReturn: [[Float]]!
}
`

const PORT = 4000
const pubsub = new PubSub()
const app = express()
const httpServer = createServer(app)

const databaseEventCallback = (event) => {
    const { affectedRows: [{ after }], schema, table } = event
    if (schema === 'test' && table === 'testtables') {
        pubsub.publish(TRIGGERS.onChaininfoUpdate, { chaininfoChanges: JSON.parse(after.data) })
    }
}

const main = async () => {
    const sequelizersInstance = await operator()
    const TestTable = sequelizersInstance.define('TestTable', {
        date: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW, primaryKey: true, allowNull: false },
        data: { type: DataTypes.JSON, allowNull: false }
    })
    await TestTable.sync()
    await TestTable.upsert({
        data: {
            finalizedBlocks: 123123131,
            activeEra: 18515151231,
            transfers: 1515515231,
            holders: 568987123,
            totalIssuance: 190155155616616,
            nominators: '53/53',
            validators: 1415567,
            inflationRate: 7.86
        }
    })

    const resolvers = {
        Query: {
            chainInfo: async () => {
                try {
                    const { data } = await TestTable.findOne()
                    return data
                } catch (err) {
                    console.error('something whent wrong with the query')
                    console.error(err)
                }
            }
        },
        // TODO add simple mutation to populate database with data
        Subscription: {
            chaininfoChanges: {
                subscribe: () => pubsub.asyncIterator([TRIGGERS.onChaininfoUpdate])
            },
            transactions: {
                subscribe: () => pubsub.asyncIterator([TRIGGERS.transactionsOccurence])
            },
            newAccounts: {
                subscribe: () => pubsub.asyncIterator([TRIGGERS.onNewAccounts])
            },
            stakingRatio: {
                subscribe: () => pubsub.asyncIterator([TRIGGERS.onStakingRatioChange])
            },
            averageAnnualReturn: {
                subscribe: () => pubsub.asyncIterator([TRIGGERS.onAverageAnnualReturnUpdate])
            },
        }
    }

    const schema = makeExecutableSchema({ typeDefs, resolvers })

    const server = new ApolloServer({ schema })
    await server.start()
    server.applyMiddleware({ app })

    SubscriptionServer.create(
        { schema, execute, subscribe },
        { server: httpServer, path: server.graphqlPath }
    )
    httpServer.listen(PORT, () => console.log(
        `🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`
    ))
    changesListener(databaseEventCallback)
        .then(() => console.log('Listening for database events...'))
        .catch(console.error)
}

main()
