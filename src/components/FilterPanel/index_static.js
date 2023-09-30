import React, {useEffect, useMemo, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    setFilter,
    setFilters,
    selectFilters
} from "../../reducer/streamfilters";
import { ActionCreators } from "redux-undo";
import {Autocomplete, createFilterOptions, Stack, TextField} from "@mui/material";
import {filterSearch} from "../EventTable/fields";
import {useDatabase} from "../../Providers/Database";
import ListboxComponent from "../ListboxComponent";

const OPTIONS_LIMIT = 50;
const defaultFilterOptions = createFilterOptions();

const filterOptionsFunc = (options, state) => {
    return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
};

export default function FilterPanel() {
    const filters = useSelector(selectFilters);
    const dispatch = useDispatch();
    const [filterOptions,setFilterOptions] = useState({});
    const {isLoading,getDistinctField} = useDatabase();
    // useEffect(()=>{
    //     if (!Object.keys(filters).length) {
    //         // const newfilters = {};
    //         // filterSearch.forEach(f=>{
    //         //     newfilters[f.accessorKey] = null;
    //         // })
    //         // dispatch(setFilters({value: newfilters}));
    //         ActionCreators.clearHistory();
    //     }
    // },[]);
    useEffect(()=>{
        if (!(isLoading('rawData')||isLoading('countries')))
        {
            const newOptions = {};
            filterSearch.forEach(f=>{
                newOptions[f.accessorKey] = getDistinctField(f.accessorKey);
            });
            setFilterOptions(newOptions);
        }
    },[isLoading('countries')])

    return <Stack spacing={2} padding={2}>
        {filterSearch.map(f=><Autocomplete
            key={f.accessorKey}
            multiple
            size="small"
            limitTags={2}
            filterOptions={filterOptionsFunc}
            ListboxComponent={ListboxComponent}
            options={filterOptions[f.accessorKey]??[]}
            // getOptionLabel={(option) => option.title}
            value={filters[f.accessorKey]??[]}
            defaultValue={null}
            onChange={(event, value) => {
                dispatch(setFilter({key:f.accessorKey,value}));
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={f.header}
                />
            )}
        />)}
    </Stack>
}