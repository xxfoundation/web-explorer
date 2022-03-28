import { Typography } from "@mui/material";
import React from "react";
import { AvatarLabel, SummaryPaper, textWithCopy } from "../../components/summary";

const sampleHash = "6Ze8pqYi4CAuwdm4eTGxKke7LSF6phkzmERUmpG5tTC1yKoh";

const Summary = () => {
    return <SummaryPaper data={[
        ["stash", textWithCopy(sampleHash, <AvatarLabel src="???" srcAlt="lala" text={sampleHash}/>)],
        ["controller", textWithCopy(sampleHash, <AvatarLabel src="???" srcAlt="lala" text={sampleHash}/>)],
        ["reward", textWithCopy(sampleHash, <AvatarLabel src="???" srcAlt="lala" text={sampleHash}/>)],
        ["cmix id", textWithCopy("kgGYMH8rxprBOvOvGAZI2chj5xJI71CqIM34DpCII10C", <Typography>kgGYMH8rxprBOvOvGAZI2chj5xJI71CqIM34DpCII10C</Typography>)],
        ["location", "Big Sur, California"],
        ["own stake", "1.00 XX"],
        ["total stake", "3,038,663.57 XX"],
        ["nominators", 3],
        ["commission", "10.00%"],
        ["session key", null]
    ]} />;
};

export default Summary;
