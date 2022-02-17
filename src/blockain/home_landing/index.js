import { Typography } from '@mui/material';
import Card from '@mui/material/Card';

const chainDataItem = ({ title, value, link }) => {
    return (
        <Card className="card" key={title}>
            <Typography>{title}</Typography>
            <Typography variant='subtitle2'>{value}</Typography>
        </Card>
    );
};

const data = {
    "items": [
        { "title": "finalized blocks", "value": "8657975", "link": null },
        { "title": "active era", "value": "568", "link": null },
        { "title": "transfers", "value": "524609", "link": null },
        { "title": "holders", "value": "866441", "link": null },
        { "title": "total issuance", "value": "1006B", "link": null },
        { "title": "nominators", "value": "53/53", "link": null },
        { "title": "validators", "value": "874609", "link": null },
        { "title": "infration rate", "value": "7.86", "link": null },
    ]
};

const blockchain = () => {
    return (
        <div>
            <Typography variant='subtitle1'>Chain data</Typography>

            {(data.items.map(chainDataItem))}
        </div>
    )
};

export default blockchain;
