import {Box, Button, Typography} from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from "@mui/material/InputBase";
import Dialog from "../Dialog";
import {useState} from "react";
import FilterPanel from "../FilterPanel";


export default function () {
    const [isOpen,setIsOpen] = useState();
    return <><Button
        size={"small"}
        sx={theme=>({ position: 'relative',
        borderRadius: theme.shape.borderRadius,
            borderColor: alpha(theme.palette.common.white, 0.5),
            borderStyle:'solid',
        backgroundColor: alpha(theme.palette.common.white, 0.15),
            textTransform:'none',
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        width: '100%',
            paddingLeft:theme.spacing(1),
            paddingRight:theme.spacing(1),
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        }})}
        startIcon={<SearchIcon/>}
        variant={"contained"}
        onClick={()=>setIsOpen(true)}
    >
        <Typography variant={"span"}>Search...</Typography>
        {/*<SearchIconWrapper>*/}
        {/*    <SearchIcon />*/}
        {/*</SearchIconWrapper>*/}
        {/*<StyledInputBase*/}
        {/*    placeholder="Search…"*/}
        {/*    inputProps={{ 'aria-label': 'search' }}*/}
        {/*/>*/}
    </Button>
        <Dialog isOpen={isOpen} id={"searchFilter"}
                title={"Search"}
                message={<FilterPanel/>}
                handleClose={()=>setIsOpen(false)}
                fullWidth={true}
                maxWidth={"sm"}
                scroll={"paper"}
        >

        </Dialog>
        </>
}