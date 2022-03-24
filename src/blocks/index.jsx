import FileDownloadIcon from "@mui/icons-material/FileDownload";
import LoadingButton from "@mui/lab/LoadingButton";
import { Container, Stack, Typography } from "@mui/material";
import React from "react";
import { Item } from "../blockchain/components/chainInfo.styles";
import BlocksTable from "./components/table";

const BlocksPage = () => {
    return <>
        <Container>
            <Stack justifyContent={"space-between"} direction={"row"}>
                <Item>
                    <Typography variant="subtitle2">blochchain</Typography>
                    <Typography variant="h1">Blocks</Typography>
                </Item>
                <Item> 
                    <LoadingButton
                        onClick={console.log("foi")}
                        loading={false}
                        startIcon={<FileDownloadIcon />}
                    >
                        Download data
                    </LoadingButton>
                </Item>
            </Stack>

            <BlocksTable />
        </Container>
    </>;
};

export default BlocksPage;
