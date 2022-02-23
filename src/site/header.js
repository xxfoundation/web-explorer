import React from "react";

import { Container, Typography, Box } from '@mui/material';

const Header = () => (
    <Container
        sx={{
            background: "linear-gradient(68.04deg, #4668BF 14.57%, #2581D6 41.33%, #019CB1 72.19%, #01ACAC 96.47%, #959595 112.54%)"
        }}
    >
        <Box sx={{ py: 3 }}>
            <Typography variant="h1">header</Typography>
        </Box>
    </Container>
    
);
export default Header;