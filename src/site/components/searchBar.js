import { 
    Grid, 
    Typography,
    FormControl,
    InputLabel,
    Input,
    InputAdornment,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import SearchIcon from '@mui/icons-material/Search';

const Bar = styled('div')(({ theme }) => ({
    background: "rgba(255,255,255,0.24)",
    borderRadius: 48,
    padding: "20px 30px",
    color: "#ffffff",
}));

const searchBar = () => {
    return (
        <Bar>
            <Grid container>
                <Grid item xs>
                    <Typography variant='subtitle1'>all</Typography>
                </Grid>
                <Grid item xs>
                    <FormControl fullWidth variant="standard">
                        <Input
                            id="standard-adornment-amount"
                            startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
                        />
                    </FormControl>
                </Grid>
            </Grid>
        </Bar>
    )
}

export default searchBar
