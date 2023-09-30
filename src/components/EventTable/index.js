import React, { useEffect, useMemo, useRef, useState } from 'react';
import {MaterialReactTable,MRT_ToolbarAlertBanner} from 'material-react-table';
import Scrollbar from "material-ui-shell/lib/components/Scrollbar";
import {fields} from "./fields";
import {Box, Button, IconButton, Toolbar, Tooltip} from "@mui/material";
import AddEventIcon from '@mui/icons-material/AddShoppingCart';
import RemoveEventIcon from '@mui/icons-material/RemoveShoppingCart';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SaveIcon from '@mui/icons-material/Save';
import { ExportToCsv } from 'export-to-csv';
import {useDatabase} from "../../Providers/Database";
import DownloadOption from "./DownloadOption";



const EventTable = ({id='tableevent',columns,data,totalData,selectedData,disableAdding,
                        isLoadingData,onSelectRow,highlightId,onSendToList,onRemoveFromList}) => {
    const [rowSelection, setRowSelection] = useState({});

    //optionally access the underlying virtualizer instance
    const rowVirtualizerInstanceRef = useRef(null);

    // const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sorting, setSorting] = useState([]);
    const {getDownloadData} = useDatabase();

    useEffect(() => {
        //scroll to the top of the table when the sorting changes
        try {
            rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
        } catch (error) {
            console.error(error);
        }
    }, [sorting]);

    useEffect(()=>{
        setRowSelection({})
    },[data])
    const handleExportRows = (rows) => {
        setIsLoading(true)
        getDownloadData(rows).then((datadownload)=>{
            const csvOptions = {
                fieldSeparator: ',',
                quoteStrings: '"',
                decimalSeparator: '.',
                showLabels: true,
                filename: `mirage-mc-${new Date().toDateString()}`,
                useBom: true,
                useKeysAsHeaders: true,
                // headers: fields.map((c) => c.accessorKey),
            };
            const csvExporter = new ExportToCsv(csvOptions);
            csvExporter.generateCsv(datadownload);
            setIsLoading(false)
        }).catch(e=>{
            setIsLoading(false)
        })
    };
    const handleExportRowsFromTable = (rows) => {
        setIsLoading(true)
        getDownloadData(rows.map((row) => row.original)).then((datadownload)=>{
            const csvOptions = {
                fieldSeparator: ',',
                quoteStrings: '"',
                decimalSeparator: '.',
                showLabels: true,
                filename: `mirage-mc-${new Date().toDateString()}`,
                useBom: true,
                useKeysAsHeaders: true,
                // headers: fields.map((c) => c.accessorKey),
            };
            const csvExporter = new ExportToCsv(csvOptions);
            csvExporter.generateCsv(datadownload);
            setIsLoading(false)
        }).catch(e=>{
            setIsLoading(false)
        })
    };
    const handleExportData = () => {
        setIsLoading(true)
        // csvExporter.generateCsv(data);
        const datadownload = getDownloadData();
        const csvOptions = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true,
            filename: 'mirage-mc-all',
            useBom: true,
            useKeysAsHeaders: true,
            // headers: fields.map((c) => c.accessorKey),
        };
        const csvExporter = new ExportToCsv(csvOptions);
        csvExporter.generateCsv(datadownload);
        setIsLoading(false)
    };
    // console.log(data)
    return (
        <MaterialReactTable
            key={id}
            id={id}
            columns={columns}
            data={data} //10,000 rows
            // enableBottomToolbar={!!Object.keys(rowSelection).length}
            enableGlobalFilterModes
            enableDensityToggle={false}
            enablePagination={false}
            enableRowSelection
            // enableRowNumbers
            enableRowVirtualization
            muiTablePaperProps={{sx:{display:'flex', flexDirection:"column", height:'100%'}}}
            // muiTableContainerProps={{ sx: { height:'100%', flexGrow:2 } }}
            initialState={{ density: 'compact' }}
            onSortingChange={setSorting}
            onRowSelectionChange={setRowSelection}
            state={{ isLoading:isLoadingData||isLoading, sorting, rowSelection }}
            rowVirtualizerInstanceRef={rowVirtualizerInstanceRef} //optional
            rowVirtualizerProps={{ overscan: 2 }} //optionally customize the virtualizer
            muiTableBodyRowProps={({ row }) => ({
                onClick: ()=>{onSelectRow(row.original)},
                // sx: { cursor: 'pointer',opacity:highlightId?(highlightId.stream_detail_id=== row.original.stream_detail_id?1:0.7):1},
                sx: { cursor: 'pointer',opacity:highlightId?(highlightId._id=== row.original._id?1:0.7):1},
            })}
            enableColumnResizing
            enableFullScreenToggle={false}
            defaultColumn={{
                minSize: 20, //allow columns to get smaller than default
                maxSize: 9001, //allow columns to get larger than default
                size: 100, //make columns wider by default
            }}
            positionToolbarAlertBanner={"bottom"}
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <Box
                        sx={{display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'no-wrap'}}
                    >
                        <DownloadOption
                            // onDownloadSearchList={()=>handleExportRows(table.getPrePaginationRowModel().rows)}
                            onDownloadSearchList={()=>handleExportRows(totalData)}
                            onDownloadSelectedList={()=>handleExportRows(selectedData)}
                        />
                    </Box>
                )
            }}
            renderBottomToolbar={({table})=> {
                const handleSelected = onSendToList?() => {
                    onSendToList(table.getSelectedRowModel().flatRows.map(d=>d.original))
                }:()=>{};
                const handleRemoveSelected = onRemoveFromList?() => {
                    onRemoveFromList(table.getSelectedRowModel().flatRows.map(d=>d.original))
                }:()=>{};
                return (<Toolbar
                    sx={{
                        display: Object.keys(rowSelection).length ? 'flex' : 'none',
                    }}
                >
                    <Box sx={{flexGrow: 2}}>
                        <MRT_ToolbarAlertBanner
                            stackAlertBanner
                            table={table}
                        />
                    </Box>
                    {(onSendToList&&(!disableAdding)) && <Tooltip title={"Add to Selected list"}><IconButton
                        // color="info"
                        // disabled={!table.getIsSomeRowsSelected()}
                        onClick={handleSelected}
                        variant="contained"
                    >
                        <AddEventIcon/>
                    </IconButton>
                    </Tooltip>}
                    {(onRemoveFromList) && <Tooltip title={"Remove from Selected list"}><IconButton
                        // color="info"
                        // disabled={!table.getIsSomeRowsSelected()}
                        onClick={handleRemoveSelected}
                        variant="contained"
                    >
                        <RemoveEventIcon/>
                    </IconButton>
                    </Tooltip>}
                </Toolbar>)
            }}
        />
    );
};

//virtualizerInstanceRef was renamed to rowVirtualizerInstanceRef in v1.5.0
//virtualizerProps was renamed to rowVirtualizerProps in v1.5.0

export default EventTable;