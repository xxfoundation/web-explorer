import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { TableCell, TableRow } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import SimpleTable from "../../components/simpleTable";
import { theme } from "../../themes/default";

const header = [
    "extrinsic id",
    "hash",
    "time",
    "result",
    "action",
    "view all"
];

const rowParser = (rowData) => {
    return <TableRow>
        <TableCell><Link>{rowData.extrinsicId}</Link></TableCell>
        <TableCell>{rowData.hash}</TableCell>
        <TableCell>{rowData.time}</TableCell>
        <TableCell><CheckCircleOutlineIcon color={theme.palette.success.main} /></TableCell>
        <TableCell><Link>{rowData.action}</Link></TableCell>
        <TableCell><Link href={`/extrinsics/${rowData.eventId}`}><ArrowForwardIosIcon /></Link></TableCell>
    </TableRow>;
};

const BlockExtrinsics = ({number, hash}) => {
    console.log(number, hash);
    // TODO subscribe to events and fill data
    const data = [
        {
            "extrinsicId": "312313-3",
            "action": "parachainsystem (set_validation_data)",
            "time": "15h 49min",
            "hash": "0xb5913131231231231"
        }
    ];
    return <SimpleTable header={header} rows={data} rowParser={rowParser} id={`extrinsics-${number}-${hash}-table`}/>;
};

export default BlockExtrinsics;
