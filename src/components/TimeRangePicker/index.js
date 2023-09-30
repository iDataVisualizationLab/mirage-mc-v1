import * as React from 'react';
import {DateTimePicker} from "@mui/x-date-pickers";
import {useState} from "react";
import {TextField} from "@mui/material";
import {DemoContainer,DemoItem} from "@mui/x-date-pickers/internals/demo";

export default function TimeRangePicker({fromVal=null,toVal=null,onChange=()=>{}}) {
    // const [fromVal,setFromVal] = useState(null);
    // const [toVal,setToVal] = useState(null);
    return (<DemoContainer components={['DateTimePicker']}>
        <DemoItem >
            <DateTimePicker
                slotProps={{
                    actionBar: {
                        actions: ['clear'],
                    },
                    textField:{
                        size: "small"
                    }
                }}
                size="small"
                label="From"
                value={fromVal}
                onChange={(newValue) => onChange('from',newValue)}
            />
        </DemoItem>
        <DemoItem>
            <DateTimePicker
                slotProps={{
                    actionBar: {
                        actions: ['clear'],
                    },
                    textField:{
                    size: "small"
                }
                }}
                minDateTime={fromVal}
                label="To"
                size="small"
                value={toVal}
                onChange={(newValue) => onChange('to',newValue)}
            />
        </DemoItem>
    </DemoContainer>);
}