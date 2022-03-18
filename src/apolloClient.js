import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
const graphqlHost = process.env.REACT_APP_BACKEND_HOST || "localhost:8080";

function apolloClient({ httpUri = `${graphqlHost}/v1/graphql`, wsUrl = `${graphqlHost}/v1/graphql`, secureConn = false } = {}) {
    const securitySuffix = secureConn ? "s" : "";
    const httpLink = new HttpLink({
        uri: `http${securitySuffix}://${httpUri}`
    });
    const wsLink = new GraphQLWsLink(createClient({
        url: `ws${securitySuffix}://${wsUrl}`,
    }));

    const splitLink = split(
        ({ query }) => {
            const { kind, operation } = getMainDefinition(query);
            return (
                kind === "OperationDefinition" &&
                operation === "subscription"
            );
        },
        wsLink,
        httpLink,
    );
    return new ApolloClient({
        link: splitLink,
        cache: new InMemoryCache()
    });
}
export { apolloClient };
