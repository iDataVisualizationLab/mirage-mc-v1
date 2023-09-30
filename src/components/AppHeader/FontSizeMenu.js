import {FormatSize} from "@mui/icons-material";
import {Box, IconButton, Menu} from "@mui/material";
import {useState} from "react";
import {useLocale} from "base-shell/lib/providers/Locale";
import FontsizeControl from "../FontsizeControl";
import {useDispatch} from "react-redux";
import {DECREASE_FONT_SIZE, INCREASE_FONT_SIZE} from "../../reducer/actions/setting";


export default function ({intl}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const { setLocale, locale = 'en' } = useLocale();
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const changeFontSize = (isIncrease)=>{
        if (isIncrease)
            dispatch({ type: INCREASE_FONT_SIZE});
        else
            dispatch({ type: DECREASE_FONT_SIZE})
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return <>
        <IconButton title={intl.formatMessage({id: 'Font size'})}
                    onClick={handleClick}>
            <FormatSize/>
        </IconButton>
        <Menu
            id="font-size-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            <Box sx={{paddingLeft:2,paddingRight:2}}>
                <FontsizeControl title={intl.formatMessage({id: 'Font size'})} onChange={changeFontSize}/>
            </Box>
        </Menu>
    </>
}