import { Fragment } from 'react';
import { Container, Typography } from '@mui/material';
import HomeLanding from './home_landing';

const blockchain = () => {
    return (
        <Container>
            <Fragment>
                <Typography variant="h3">search widget</Typography>
                <HomeLanding />
            </Fragment>
        </Container>
    )
};

export default blockchain;
