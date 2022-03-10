import { Grid, Link, ListItem, ListItemAvatar, ListItemText, Tooltip, Typography } from '@mui/material'
import ListWithHeaders from './listWithHeaders'

const transferences = {
    items: [...Array(6).keys()].map((i) => {
        return {
            'instrinsicindex': '314658-5',  // TODO mask?
            'id': i,
            'from': 'Oxacc15dc74899999', // TODO use just mask instead of manipulating the value
            'to': 'Oxacc15dc748888',
            'duration': 30
        }
    })
}

const addMaskToTransactionTargets = (hash) => {
    if (hash.length > 15) {
        return <Tooltip title={hash} placement='top' arrow>
            <Link href={'#'}>
                {hash.split('').slice(0, 12).join('') + '...'}
            </Link>
        </Tooltip>
    }

    return <Link href={'#'} >{hash}</Link>
}

const listItemSecondaryText = (data) => {
    return (
        <Grid component={'span'} container maxWidth={200}>
            <Grid item component={'span'} xs={4}>
                from
            </Grid>
            <Grid item component={'span'}>
                {addMaskToTransactionTargets(data.from)}
            </Grid>
            <Grid item component={'span'} xs={4}>
                to
            </Grid>
            <Grid item component={'span'}>
                {addMaskToTransactionTargets(data.to)}
            </Grid>
        </Grid>
    )
}


const ItemHandler = ({ index, data }) => {
    // const [currentData] = useState(data[index])
    const currentData = data[index]
    return (
        <ListItem key={currentData.id} component='div'>
            <ListItemText
                primary={`INSTRINSIC INDEX NO. ${currentData.id}`}
                secondary={listItemSecondaryText(currentData)}
            />
            <ListItemAvatar>{currentData.duration} sec</ListItemAvatar>
        </ListItem>)
}

const transfersList = () => {
    return ListWithHeaders({
        items: transferences.items, header: (
            <>
                <Typography gutterBottom>transfers</Typography>
                <Link href='#' >see all</Link>
            </>
        ), itemHandler: ItemHandler
    })
}

export default transfersList
