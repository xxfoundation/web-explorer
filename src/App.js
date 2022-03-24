import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import {
    BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import BlockChain from "./blockchain";
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
                        <BlocksPage />
                    </Route>
                </Switch>
                <SiteFooter />
            </ThemeProvider>
        </Router>
    );
}

export default App;
