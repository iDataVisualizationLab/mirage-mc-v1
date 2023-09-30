import {Checkbox, IconButton, ListItemIcon, Menu, MenuItem} from "@mui/material";
import {Check, SpaceDashboard as SpaceDashboardIcon} from "@mui/icons-material";
import {useState} from "react";
import {useLocale} from "base-shell/lib/providers/Locale";

export default function ({intl,layoutItems,onChange}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return <><IconButton
        title={intl.formatMessage({ id: 'Layout' })}
        onClick={handleClick}
    >
        <SpaceDashboardIcon/>
    </IconButton>
    <Menu
        id="layout-menu"
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
            Object.keys(layoutItems).map(k=><MenuItem
                key={k}
                onClick={()=>onChange(k,layoutItems[k],!layoutItems[k].val)}
            >
                <ListItemIcon>
                    <Checkbox checked={layoutItems[k].val} />
                </ListItemIcon>{intl.formatMessage({ id: layoutItems[k].key })}
            </MenuItem>)
        }
    </Menu>
        </>
}