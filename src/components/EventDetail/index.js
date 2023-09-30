import {
    Card,
    CardContent,
    Unstable_Grid2 as Grid
} from "@mui/material";
import {semicolor} from "../../containers/LayoutContainer/theme";
import DetailCard from "../DetailCard";

export default function ({currentDetail,onSelect,sx={}}) {

    return (<>
        {/*<Card sx={{...sx,width:'100%', backgroundColor: (theme) => semicolor(theme.palette.background.paper)}}>*/}
        {/*    <CardContent sx={{height: '100%', position: 'relative'}}>*/}

                <Grid container style={{height:'100%', width:'100%',padding:10,overflow:'auto'}}
                      m={0} flexDirection={"column"} flexWrap={'nowrap'}
                      sx={{bgcolor:theme=>theme.palette.background.paper, color: theme=> theme.palette.primary.contrastText}}>
                    {currentDetail ?
                        <DetailCard data={currentDetail} onSelect={onSelect}/> : <>Select from Event
                            List</>}
                </Grid>
            {/*</CardContent>*/}
        {/*</Card>*/}
    </>
    )
}