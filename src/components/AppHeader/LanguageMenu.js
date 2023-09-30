import {IconButton, Menu, MenuItem} from "@mui/material";
import {Language as LanguageIcon} from "@mui/icons-material";
import allLocales from "../../config/locales";
import {useState} from "react";
import {useLocale} from "base-shell/lib/providers/Locale";

export default function ({intl}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const { setLocale, locale = 'en' } = useLocale();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return <><IconButton
        title={intl.formatMessage({ id: 'language' })}
        onClick={handleClick}
    >
        <LanguageIcon/> <span style={{fontSize:'small',paddingLeft:5,textTransform:"uppercase"}}>{locale}</span>
    </IconButton>
    <Menu
        id="language-menu"
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
        {
            allLocales.map(l=><MenuItem
                key={l.locale}
                selected={l.locale === locale}
                onClick={()=>setLocale(l.locale)}
            >
                <LanguageIcon style={{paddingRight:5}}/> {intl.formatMessage({ id: l.locale })}
            </MenuItem>)
        }
    </Menu>
        </>
}