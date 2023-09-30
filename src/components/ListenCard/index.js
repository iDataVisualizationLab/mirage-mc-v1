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
    Link, Stack,
    Typography
} from "@mui/material";
import moment from "moment/moment";
import MapIcon from '@mui/icons-material/Map';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useSpring, animated, easings} from '@react-spring/web'
import {styled} from "@mui/material/styles";
import {useState, useRef, useEffect} from "react";
import "./index.css"
import AutoSizer from "lp-react-virtualized-auto-sizer-react-18";
import PaperCustom from "../PaperCustom";

const ExpandMore = styled((props) => {
    const {expand, ...other} = props;
    return <ExpandMoreIcon {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

function DetailCard({data, onSelect}) {
    return <Stack spacing={1}>
        <PaperCustom>
            <Grid container spacing={1}>
        <Grid item xs={6}>
            <Typography variant="h4" component="div"
                        onClick={data.stream_song ? () => onSelect({stream_song: [data.stream_song]}) : null}>
                {data.stream_song}
            </Typography>
            {data.year_released && <Typography color="text.secondary" gutterBottom> {data.year_released}</Typography>}
            {data.stream_song_genre && <Chip label={data.stream_song_genre} size={'small'}/>}
        </Grid>
        <Grid item>
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
            </Grid>
        </PaperCustom>
        <PaperCustom>
        {(data.spotify_uri || data.youtube_url) && <Grid item xs={12}>
            <Grid container>
                <Divider sx={{mt: 2, mb: 2, flexGrow: 1}}/>
                <Typography variant={"h5"} component={'div'} sx={{margin: 'auto'}}>Music Platform</Typography>
                <Divider sx={{mt: 2, mb: 2, flexGrow: 1}}/>
            </Grid>
            {data.spotify_uri && <Grid item xs={12}>
                <iframe loading="lazy"
                        src={data.spotify_uri.replace('com/track', 'com/embed/track')}
                        width={'100%'} height="80" frameBorder="0"
                        data-mce-fragment="1"></iframe>
            </Grid>}
            {data.youtube_url && <Grid item xs={12}>
                <iframe width={'100%'} height={'auto'}
                        loading="lazy"
                        src={data.youtube_url.replace("youtube.com/watch?v=", "youtube-nocookie.com/embed/")}
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                />
            </Grid>}
        </Grid>}
        </PaperCustom>
    </Stack>


}

export default DetailCard