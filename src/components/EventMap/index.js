import Map from "../Map";
import AutoSizer from "lp-react-virtualized-auto-sizer-react-18";
import {useState, useEffect} from "react";
import {groups} from "d3";

export default function ({currentDetail,locs, events}) {
    const [eventlocs, setEventlocs] = useState([]);
    useEffect(()=>{
        try{
            const _locsMap = {};
            locs.forEach(d=>_locsMap[d['city_id']]=d);
            const _locs = groups(events,d=>d['city_id']).map(([c,cou])=>({
                title:_locsMap[c]?.title,
                city_id:c,
                count: cou.length,
                lat: _locsMap[c]?.lat,
                long: _locsMap[c]?.long,
            }))
            setEventlocs(_locs)
        }catch(e){

        }
    },[locs,events])
    return <AutoSizer style={{ height: '100%', width: '100%' }} >
        {({ height, width }) => {
            return <Map height={height} width={width}
                        locs={eventlocs} highlight={currentDetail}/>
        }}
    </AutoSizer>
}