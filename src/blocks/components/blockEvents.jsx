import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { TableCell, TableRow } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import SimpleTable from "./simpleTable";

const header = [
    "event id",
    "hash",
    "action",
    "view all",
];

const rowParser = (rowData) => {
    return <TableRow>
        <TableCell>{rowData.eventId}</TableCell>
        <TableCell>-</TableCell>
        <TableCell><Link>{rowData.action}</Link></TableCell>
        <TableCell><Link href={`/extrinsics/${rowData.eventId}`}><ArrowForwardIosIcon /></Link></TableCell>
    </TableRow>;
};

const BlockEvents = ({number, hash}) => {
    console.log(number, hash);
    // TODO subscribe to events and fill data
    const data = [
        {
            "eventId": "312313",
            "action": "balance (Withraw)"
        }
    ];
    return <SimpleTable header={header} rows={data} rowParser={rowParser} id={`events-${number}-${hash}-table`}/>;
};

export default BlockEvents;
