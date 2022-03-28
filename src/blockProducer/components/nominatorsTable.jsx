import { TableCell, TableRow } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import SimpleTable from "../../components/simpleTable";

const header = ["account","stake","share"];

const rowParser = (rowData) => {
    return <TableRow>
        <TableCell><Link>{rowData.account}</Link></TableCell>
        <TableCell>{rowData.stake}</TableCell>
        <TableCell>{rowData.share}</TableCell>
    </TableRow>;
};


const NominatorsTable = () => {
    const data = [
        {
            "account": "6aTgpWh4Ny1j8uvXbvBb5pY1cokWMthuAUvcMKi9V1WkCsUo",
            "stake": "200.00 XX",
            "share": "0.00%"
        }
    ];
    return <SimpleTable header={header} rows={data} rowParser={rowParser} id={"producer-nominators-table"}/>;
};

export default NominatorsTable;
