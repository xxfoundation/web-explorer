import { Fragment } from 'react';
import { Container, } from '@mui/material';
import HomeLanding from './home_landing';

const blockchain = () => {
    return (
        <Container sx={{ my: 5, }}>
            <Fragment>
                <HomeLanding />
            </Fragment>
        </Container>
    )
};

export default blockchain;
