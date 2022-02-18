import { Fragment } from "react";
import ChainInfo from "../components/chainInfo";
import TokenStatus from "./tokenStatus";

const homelanding = () => {
    return (<Fragment>
        <ChainInfo />
        <TokenStatus />
    </Fragment>);
};

export default homelanding;
