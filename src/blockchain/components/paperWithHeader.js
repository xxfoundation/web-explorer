import React from "react";

import { 
    Paper,
    Box,
    Typography,
    Link,
    Stack,
    Divider,
} from '@mui/material';

import { styled } from '@mui/material/styles';
const PaperWrap = styled(Paper)(({ theme }) => ({
    boxShadow: theme.shadows.box,
    border: "1px solid #EAEAEA",
}));

const InputSet = ({ header, linkName, linkAddress, height, children }) => (
    <PaperWrap sx={{ py: 6, px: { xs: 3, md: 6 }, }}>
        {(header || linkName) && (
            <Stack 
                direction="row" 
                justifyContent="space-between" 
                alignItems="center" 
                spacing={2}
                sx={{ mb: 8, }}
            >
                {header && <Typography variant="h3">{header}</Typography>}
                {linkName && <Link href={linkAddress} variant="body3" underline="hover">{linkName}</Link>}
            </Stack>
        )}
        <Divider />
        <Box sx={{ 
            mt: 3, 
            overflow: "auto",
            height: {height},
        }}>
            {children}
        </Box>
    </PaperWrap>
);

export default InputSet;
