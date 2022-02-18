import { IconButton, Link, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material';
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
            "duration": "30"
        }
    })
}

const statusToIconMap = {
    // TODO replace with required fonts
    "pending": {
        "label": "pending",
        "icon": <AccessTimeIcon />
    }
}

const BlockStatusToIcon = (status, duration) => {
    // const [statedStatus] = useState(status)
    const { label, icon } = statusToIconMap[status]
    return (
        <Stack style={{ "alignContent": "end" }}>
            <IconButton aria-label={label}>
                {icon}
            </IconButton>
            <span style={{ "textAlign": "center" }}>{duration}</span>
        </Stack>
    )
}

const ItemHandler = ({ index, data }) => {
    // const [currentData] = useState(data[index])
    const currentData = data[index]
    return (
        <ListItem key={currentData.id} component="div">
            <ListItemText primary={currentData.id} secondary={`${currentData.instrinsic} | ${currentData.events}`} />
            <ListItemAvatar>{BlockStatusToIcon(currentData.status, currentData.duration)}</ListItemAvatar>
        </ListItem>)
}

const blockchain = () => {
    return ListWithHeaders({
        items: blocks.items, header: (
            <Fragment>
                <Typography gutterBottom>latest blocks</Typography>
                <Link href="#" >see all</Link>
            </Fragment>
        ), itemHandler: ItemHandler
    })
}

export default blockchain
