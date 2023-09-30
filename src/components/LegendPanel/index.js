import React, {useEffect, useMemo, useState} from "react";
import {
    Card,
    Stack,
    Typography,
    Unstable_Grid2 as Grid
} from "@mui/material";
import {useDatabase} from "../../Providers/Database";
import {semicolor} from "../../containers/LayoutContainer/theme";
import {scaleLinear, scaleOrdinal, extent} from "d3";
import {colorArr, TOP} from "../Earth";


const countriesScale = scaleLinear().range([0.1,1]);

export default function FilterPanel() {
    const {getFuncCollection,getList} = useDatabase();
    const countries = getList('countries');
    const countriesScale = useMemo(()=>{
        return scaleLinear().range([0.1,1]).domain(extent(countries, d => {
            return d?.count
        }))
    },[countries]);
    const colorsCategory = useMemo(()=>{
        return function(otherColor="#ececec"){
            const scale = scaleOrdinal(colorArr);
            let master = (val)=>{
                if ((!val)||(val==='')||(val.trim===''))
                    return 'black'
                const domain = scale.domain();
                if (domain.find(d=>d===val)|| (domain.length<TOP))
                    return scale(val);
                else
                    return otherColor
            };
            master.domain = scale.domain;
            master.range = scale.range;
            return master;
        }();
    },[]);

    return <Grid >
            <Stack
                m={1}
                style={{
                    maxHeight:'30vh',
                    overflowY:'auto'
                }}
            >
                <Card sx={{pointerEvents:'all', overflowY:'auto', backgroundColor: (theme) => semicolor(theme.palette.background.paper)}}>
                    <Stack sx={{m:1,p:0}}>
                        <Typography>Top Stations by Country</Typography>
                        {
                            countries.map(d=><Typography key={d['title']} variant={'subtitle2'} onClick={()=> {
                                getFuncCollection('selectCountry')(d)
                            }}>
                                <div style={{width:50*(countriesScale(d.count)??1),height:10, backgroundColor:colorsCategory(d['title']), display:'inline-block', marginRight:5}}></div>{d['title']}
                            </Typography>)
                        }
                    </Stack>
                </Card>
            </Stack>
        </Grid>
}