import { createTheme } from '@mui/material/styles'
import {color as d3color} from "d3";

const getThemeSource = (id, ts, isDarkMode, isRTL, fontSize) => {
    if (ts) {
        for (let i = 0; i < ts.length; i++) {
            if (ts[i]['id'] === id) {
                const _source = ts[i]['source']
                const source = _source != null ?(_source instanceof Function ?_source(isDarkMode ? 'dark' : 'light',fontSize):_source):_source;
                const palette = source != null ? source.palette : {}
                return createTheme({
                    ...source,
                    palette: { ...palette, mode: isDarkMode ? 'dark' : 'light' },
                    direction: isRTL ? 'rtl' : 'ltr',
                })
            }
        }
    }

    return createTheme({
        palette: { mode: isDarkMode ? 'dark' : 'light' },
        direction: isRTL ? 'rtl' : 'ltr',
    })
}

export default getThemeSource;

export function semicolor(_color){
    const color = d3color(_color);
    color.opacity = 0.5
    return color.toString();
}