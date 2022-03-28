import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import {
    BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import BlockChain from "./blockchain";
import BlockProducer from "./blockProducer";
import BlocksPage from "./blocks";
import SiteFooter from "./site/footer";
import SiteHeader from "./site/header";
import { theme } from "./themes/default";

function App() {
    return (
        <Router>
            <ThemeProvider theme={theme}>
                <SiteHeader />
                <Switch>
                    <Route exact path="/">
                        <BlockChain />
                    </Route>
                    <Route path="/blocks">
                        <BlocksPage />{/* I can do this only here for now */}
                    </Route>
                    <Route path="/producer/:nameOrId"><BlockProducer /></Route>
                    <Route path="/extrinsics"><h1>extrinsics</h1></Route>
                    <Route path="/transfers"><h1>transfers</h1></Route>
                    <Route path="/events"><h1>events</h1></Route>
                    <Route path="/governance"><h1>governance</h1></Route>
                    <Route path="/accounts"><h1>accounts</h1></Route>
                    <Route path="/staking"><h1>staking</h1></Route>
                </Switch>
                <SiteFooter />
            </ThemeProvider>
        </Router>
    );
}

export default App;
