import { createSlice } from "@reduxjs/toolkit";

const initialState= {value:{}};
const streamFilters = createSlice({
    name: "streamFilters",
    initialState,
    reducers: {
        setFilter: (state,action) =>{
            state.value[action.payload.key] = action.payload.value;

        },
        setFilters: (state,action) => {
            state.value = {...action.payload.value};
        }
    }
});
export const { setFilter, setFilters } = streamFilters.actions;
export const selectFilters = (state) => state.streamFilters.present.value;
export default streamFilters.reducer