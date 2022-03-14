import { gql, useSubscription } from "@apollo/client";
import { Typography } from "@mui/material";
import React from "react";
import LineChart from "../../charts/linecharts";

const ON_NEW_ACCOUNTS = gql` 
subscription OnNewAccounts {
    newAccounts
}
`;

const NewAccounts = () => {
    const { data, loading, error } = useSubscription(ON_NEW_ACCOUNTS);
    if (loading) return <Typography>loading new accounts chart</Typography>;
    if (error) {
        console.error(error);
        return <Typography>error loading new accounts</Typography>;
    }
    const sortedAccounts = data.newAccounts.sort((a, b) => a[0] - b[0]);
    return <>
        <LineChart
            provider={"high"}
            title='NEW ACCOUNTS high'
            data={{
                name: "ERA",
                marker: { symbol: "circle" },
                data: loading ? [] : sortedAccounts
            }}/>
    </>;
};

export default NewAccounts;
