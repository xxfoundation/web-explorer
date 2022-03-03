import { 
    Link, 
    ListItem,
    Typography,
    Box,
    Grid,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Fragment } from 'react';
import ListWithHeaders from './listWithHeaders';
import PaperWithHeader from './paperWithHeader';

const blocks = {
    "items": [...Array(9).keys()].map((i) => {
        return {
            "id": 8657975 + i,
            "instrinsic": 8,
            "events": 11,
            "status": "pending",
            "duration": "30 sec"
        }
    })
}

const statusToIconMap = {
    // TODO replace with required fonts
    "pending": {
        "label": "pending",
        "icon": <AccessTimeIcon color="bad" />
    }
}

const BlockStatusToIcon = (status, duration) => {
    // const [statedStatus] = useState(status)
    const { label, icon } = statusToIconMap[status]
    return (
        <Box sx={{ textAlign: "right" }}>
            <Box aria-label={label}>{icon}</Box>
            <Box>
                <Typography variant="body3">{duration}</Typography>
            </Box>
        </Box>
    )
}

const ItemHandler = ({ index, data }) => {
    // const [currentData] = useState(data[index])
    const currentData = data[index]
    return (
        <ListItem key={currentData.id} component="div" disableGutters={true} sx={{ mb: 2 }}>
            <Grid item xs>
                <Link href="" underline="hover" variant="body2">{currentData.id}</Link>
                <Box>
                    <Link href="" underline="hover" variant="body3">{currentData.instrinsic} instrinsic</Link> <Typography variant="body3">|</Typography> <Link href="" underline="hover" variant="body3">{currentData.events} event</Link>
                </Box>
            </Grid>
            <Grid item xs="auto">{BlockStatusToIcon(currentData.status, currentData.duration)}</Grid>
        </ListItem>)
}

// const blockchain = () => {
//     return ListWithHeaders({
//         items: blocks.items, height: 720, header: (
//             <Fragment>
//                 <Typography variant="h3">LATEST BLOCKS</Typography>
//                 <Link href="#" variant="body3" underline="hover">SEE ALL</Link>
//             </Fragment>
//         ), itemHandler: ItemHandler
//     })
// }

const blockchain = () => {
    return(
        <PaperWithHeader
            header="LATEST BLOCKS"
            linkName={ "SEE ALL" }
            linkAddress={ "##" }
            height={500}
        >
            some content
        </PaperWithHeader>
    )
}

export default blockchain
