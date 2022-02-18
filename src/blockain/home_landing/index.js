import { Fragment } from "react";
import ChainInfo from "../components/chainInfo";
import LatestBlock from "../components/latestBlock";

const homelanding = () => {
    return (<Fragment>
        <ChainInfo />
        <LatestBlock />
    </Fragment>);
};

export default homelanding;
