import moment from "moment/moment";
import {Checkbox} from "@mui/material";
import EventOutIcon from '@mui/icons-material/ShoppingCartCheckout';
import EventIcon from '@mui/icons-material/ShoppingCart';
export const fields = [
    {
        id: 'inBasket',
        header: 'Selected',
        accessorKey: 'inBasket',
        // size: 50,
        Cell: ({ renderedCellValue, row }) => (
            <Checkbox
                disabled
                icon={<EventOutIcon />}
                checkedIcon={<EventIcon color={'secondary'}/>}
                checked={row.original.inBasket}
            />
        ),
    },
    {
        accessorKey: 'city',
        header: 'City',
    },
    {
        accessorKey: 'country',
        header: 'Country',
    },
    {
        accessorKey: 'station',
        header: 'Station',
    },
    {
        accessorKey: 'station_genre',
        header: 'Station Genre',
    },
    {
        accessorKey: 'stream_artist',
        header: 'Artist',
        dynamic:true,
    },
    {
        accessorKey: 'stream_song',
        header: 'Song',
        dynamic:true,
    }
    // ,
    // {
    //     accessorKey: 'time_station',
    //     header: 'Time',
    //     type:'time',
    //     filterDisable:true,
    //     accessorFn:(d)=>d.time_station?moment(d.time_station).format('LLL'):''
    // }
];
export const fieldsWithoutSelected = fields.filter((d,i)=>i);
export const filterSearch = fields.filter(f=>!f.filterDisable);