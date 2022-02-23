import './App.css';
import SiteHeader from './site/header';
import BlockChain from './blockchain';
import SiteFooter from './site/footer';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./themes/default";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <SiteHeader />
            <BlockChain />
            <SiteFooter />
        </ThemeProvider>
    );
}

export default App;
