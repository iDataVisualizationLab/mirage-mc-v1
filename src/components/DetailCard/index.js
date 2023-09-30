import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent, Chip,
    Collapse,
    Divider, Grid,
    IconButton,
    Link, Paper, Stack,
    Typography
} from "@mui/material";
import moment from "moment/moment";
import MapIcon from '@mui/icons-material/Map';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSpring, animated, easings  } from '@react-spring/web'
import {styled} from "@mui/material/styles";
import {useState, useRef, useEffect} from "react";
import "./index.css"
import AutoSizer from "lp-react-virtualized-auto-sizer-react-18";
import PaperCustom from "../PaperCustom";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <ExpandMoreIcon {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

function DetailCard ({data,onSelect}){
    const timeStation = moment(data.time_station).format('LLL');
    const stream_name = data.stream_name??'N/A';
    return <Stack spacing={1}>
        <PaperCustom>
            <Typography component="div" variant="h2" onClick={()=>onSelect({station:[data.station]},data)}>
                {data.station} <Typography component={"span"} variant={"subtitle1"}>{data.broadcast_frequency??'0.0'} FM</Typography>
            </Typography>
            <Typography component="div" variant="subtitle1" color="text.secondary">
                {data.station_description}
            </Typography>
            <table style={{width:'100%'}}>
                <colgroup><col style={{width:130}}/><col/></colgroup>
                <tr><td>Station URL</td><td><Link href={data.station_url} target={'_blank'} color={'secondary'}>{data.station_url}</Link></td></tr>
                <tr><td>Location</td><td><Link target={'_blank'} color={'secondary'} href={`https://maps.google.com/?q=${data.lat},${data.long}`}><MapIcon/>{data.city}, {data.country}</Link></td></tr>
                <tr><td>Radio Garden URL</td><td><Link href={data.url} target={'_blank'} color={'secondary'}>{data.url}</Link></td></tr>
            </table>
        </PaperCustom>

        <PaperCustom>
            <table style={{width:'100%'}}>
                <colgroup><col style={{width:130}}/><col/></colgroup>
                <tr><td>Stream name</td><td>{stream_name}</td></tr>
                <tr><td>Stream URL</td><td><Link href={data.stream_url} target={'_blank'} color={'secondary'}>{data.stream_url}</Link></td></tr>
                <tr><td>Description</td><td>{data.stream_description}</td></tr>
                <tr><td>Genre</td><td>{data.stream_genre && <Stack direction={'row'} spacing={1} flexWrap sx={{width:'100%', flexWrap:'wrap'}}>
                    <Chip label={data.stream_genre} size={'small'}/></Stack>}</td></tr>
            </table>
        </PaperCustom>
        <PaperCustom elevation={3}>
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography color="text.secondary" gutterBottom> {timeStation}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h4" component="div"
                            onClick={data.stream_song ? () => onSelect({stream_song: [data.stream_song]}) : null}>
                    {data.stream_song}
                </Typography>
                {data.year_released && <Typography color="text.secondary" gutterBottom> {data.year_released}</Typography>}
                {data.stream_song_genre && <Chip label={data.stream_song_genre} size={'small'}/>}
            </Grid>
            <Grid item >
                <Box sx={{flex: '1 0 auto', display: 'flex'}}>
                    <Avatar aria-label="recipe"
                            src={data.stream_artist_image_url}
                            sx={{mr: 1}}>{data.stream_artist[0]}</Avatar>
                    <div>
                        <Typography variant="h5" color={'text.primary'}>{data.stream_artist}</Typography>
                        <Typography variant="subtitle2">from {data.stream_artist_country ?? "N/A"}</Typography>
                    </div>
                </Box>
                {data.stream_artist_genre && (data.stream_artist_genre.map(t => <Chip key={t} label={t} size={'small'}/>))}
            </Grid>
            <Grid item xs={12}>
                {data.stream_instrument_list && (
                    <Stack direction={'row'} spacing={1} flexWrap sx={{width: '100%', flexWrap: 'wrap'}}>
                        <Typography>Instruments: </Typography>
                        {data.stream_instrument_list.split(';').map(t => <Chip
                            key={t} label={t} size={'small'}/>)}
                    </Stack>)}
            </Grid>
            {data.stream_lyrics && <Grid item xs={12}>
                <Grid container>
                    <Divider sx={{mt: 2, mb: 2, flexGrow: 1}}/>
                    <Typography variant={"h5"} component={'div'} sx={{margin: 'auto'}}>
                        Lyrics {data.stream_lyrics_language ? `(${data.stream_lyrics_language})` : ""}
                    </Typography>
                    <Divider sx={{mt: 2, mb: 2, flexGrow: 1}}/>
                </Grid>
                {data.stream_lyrics}
            </Grid>}
        </Grid>
        </PaperCustom>
    </Stack>
}
export default DetailCard

function CollapsibleComp ({header,banner,defaultValue,...props}) {
    const [open,setopen] = useState(defaultValue);
    const runningText = useSpring({
        reset: open,
        cancel: open,
        config:{ duration: 20000},
        loop:!open,
        from: { transform: "translateX(100%)" },
        to: { transform: "translateX(-100%)" },
    });
    return <Card elevation={10} sx={{mt:1}}>
        <CardActions disableSpacing>
            <Typography variant={"h5"}>{header}</Typography>
            {(banner&&!open)&&<div style={{width:'100%', overflow:'hidden', marginLeft: 10, marginRight: 10, whiteSpace: 'nowrap'}}>
                <Typography variant={"subtitle2"}>
                    <animated.div style={runningText} className={'textbanner'}>{banner}</animated.div>
                    {/*<div className={'textbanner'}>{banner} | {banner}</div>*/}
                </Typography></div>}
            <ExpandMore expand={open} onClick={()=>setopen(!open)}/>
        </CardActions>
        <Collapse in={open} unmountOnExit={true} {...props}/>
    </Card>
}
