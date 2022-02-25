const { createServer } = require("http")
const express = require("express")
const { execute, subscribe } = require("graphql")
const { ApolloServer, gql } = require("apollo-server-express")
const { PubSub } = require("graphql-subscriptions")
const { SubscriptionServer } = require("subscriptions-transport-ws")
const { makeExecutableSchema } = require("@graphql-tools/schema")

const TRIGGERS = {
    onChaininfoUpdate: 'ON_CHAININFO_UPDATE',
    transactionsOccurence: 'TRANSACTION_EVENT'
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
}
`


let chainInfo = {
    finalizedBlocks: 123123131,
    activeEra: 18515151231,
    transfers: 1515515231,
    holders: 568987123,
    totalIssuance: 190155155616616,
    nominators: '53/53',
    validators: 1415567,
    inflationRate: 7.86
}

const timeoutWrapper = (operation, ms) => {
    operation()

    function timeoutInner() {
        operation()
        setTimeout(timeoutInner, ms)
    }
    timeoutInner()
}

const main = async () => {
    const PORT = 4000
    const pubsub = new PubSub()
    const app = express()
    const httpServer = createServer(app)

    const resolvers = {
        Query: { chainInfo: () => chainInfo },
        Subscription: {
            chaininfoChanges: {
                subscribe: () => pubsub.asyncIterator([TRIGGERS.onChaininfoUpdate])
            },
            transactions: {
                subscribe: () => pubsub.asyncIterator([TRIGGERS.transactionsOccurence])
            }
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

    httpServer.listen(PORT, () => {
        console.log(
            `🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`
        )
    })

    const randomNumber = (size = 10000000) => Math.random() * size

    timeoutWrapper(() => {
        chainInfo = {
            finalizedBlocks: randomNumber(),
            activeEra: randomNumber(),
            transfers: randomNumber(),
            holders: randomNumber(),
            totalIssuance: randomNumber(),
            nominators: randomNumber().toString(),
            validators: randomNumber(),
            inflationRate: randomNumber(),
        }
        pubsub.publish(TRIGGERS.onChaininfoUpdate, { chaininfoChanges: chainInfo })
    }, 5000)

    timeoutWrapper(() => {
        pubsub.publish(TRIGGERS.transactionsOccurence, {
            transactions: [...Array(12).keys()].map(() => [randomNumber(100), randomNumber(1000)])
        })
    }, 7000)
}

main()
