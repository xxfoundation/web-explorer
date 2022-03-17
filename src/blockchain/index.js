import { Container } from "@mui/material";
import React from "react";
import HomeLanding from "./home_landing";

const blockchain = () => {
    return (
        <Container sx={{ my: 5, }}>
            <React.Fragment>
                <HomeLanding />
            </React.Fragment>
        </Container>
    );
};

export default blockchain;
