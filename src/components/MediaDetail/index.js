import {
    Unstable_Grid2 as Grid
} from "@mui/material";
import ListenCard from "../ListenCard";

export default function ({currentDetail,onSelect,sx={}}) {

    return (<>
            <Grid container style={{height:'100%', width:'100%',padding:10,overflow:'auto'}}
                  m={0} flexDirection={"column"} flexWrap={'nowrap'}
                  sx={{bgcolor:theme=>theme.palette.background.paper, color: theme=> theme.palette.primary.contrastText}}>
                {currentDetail ?
                    <ListenCard data={currentDetail} onSelect={onSelect}/> : <>Select from Event
                        List</>}
            </Grid>
        </>
    )
}