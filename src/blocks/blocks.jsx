import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { LoadingButton } from "@mui/lab";
import { Container, Link, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const data = [
    {
        number: 111,
        status: "lalal",
        era: "2022-01-01",
        time: "2022-01-01",
        extrinsics: 13,
        blockProducer: "name",
        blockHash: "120983104"
    }
];

const BlocksTable = () => {
    return <Box>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>block</TableCell>
                        <TableCell>status</TableCell>
                        <TableCell>era</TableCell>
                        <TableCell>time</TableCell>
                        <TableCell>extrinsics</TableCell>
                        <TableCell>block producer</TableCell>
                        <TableCell>block hash</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item) => {
                        return <TableRow key={item.number }>
                            <TableCell><Link href="#">{item.number}</Link></TableCell>
                            <TableCell>{item.status}</TableCell>
                            <TableCell>{item.era}</TableCell>
                            <TableCell>{item.time}</TableCell>
                            <TableCell><Link href="#">{item.extrinsics}</Link></TableCell>
                            <TableCell><Link href="#">{item.blockProducer}</Link></TableCell>
                            <TableCell><Link href="#">{item.blockHash}</Link></TableCell>
                        </TableRow>;
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        {/* <TablePagination
            component="div"
            rowsPerPage={18}
            rowsPerPageOptions={[]}
            page={0}
            count={1}
            onPageChange={console.log}
        /> */}
    </Box>;
};


const BlocksPage = () => {
    return <>
        <Container sx={{ my: 5, }}>
            <Stack justifyContent={"space-between"} direction={"row"}>
                <div>
                    <Typography variant="subtitle2">blochchain</Typography>
                    <Typography variant="h1">Blocks</Typography>
                </div>
                <div> 
                    <LoadingButton
                        loading={false}
                        startIcon={<FileDownloadIcon />}
                    >
                        Download data
                    </LoadingButton>
                </div>
            </Stack>

            <BlocksTable />
        </Container>
    </>;
};

export default BlocksPage;