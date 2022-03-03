import { 
    IconButton, 
    Link, 
    ListItem, 
    ListItemAvatar, 
    ListItemText, 
    Typography,
    Box,
    Grid,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Fragment } from 'react';
import ListWithHeaders from './listWithHeaders';

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
            <Box>{duration}</Box>
        </Box>
    )
}

const ItemHandler = ({ index, data }) => {
    // const [currentData] = useState(data[index])
    const currentData = data[index]
    return (
        <ListItem key={currentData.id} component="div" disableGutters={true}>
            <ListItemText primary={currentData.id} secondary={`${currentData.instrinsic} | ${currentData.events}`} />
            <ListItemAvatar>{BlockStatusToIcon(currentData.status, currentData.duration)}</ListItemAvatar>
        </ListItem>)
}

const blockchain = () => {
    return ListWithHeaders({
        items: blocks.items, height: 720, header: (
            <Fragment>
                <Typography variant="h3">latest blocks</Typography>
                <Link href="#" variant="body3" underline="hover">SEE ALL</Link>
            </Fragment>
        ), itemHandler: ItemHandler
    })
}

export default blockchain
