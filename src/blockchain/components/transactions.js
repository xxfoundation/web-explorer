import { gql, useSubscription } from "@apollo/client";
import { Typography } from "@mui/material";
import React from "react";
import LineChart from "../../charts/linecharts";

const ON_TRANSACTION_EVENT = gql`
subscription OnTrasactionEvent {
  transactions
}
`;

const sortTransactions = ({ transactions }) => {
    return transactions.sort((a, b) => {
        return a[0] - b[0];
    });
};

const TransactionsChart = () => {
    const { data, loading, error } = useSubscription(ON_TRANSACTION_EVENT);
    if (loading) return <Typography>loading charts</Typography>;
    if (error) {
        return <Typography>error loading the charts</Typography>;
    }
    const sortedTransactions = sortTransactions(data);
    return <>
        <LineChart
            title='transactions high'
            data={{
                name: "ERA",
                marker: { symbol: "circle" },
                data: loading ? [] : sortedTransactions
            }} />
    </>;
};

export default TransactionsChart;
