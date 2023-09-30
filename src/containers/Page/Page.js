import React, { useContext } from 'react'
import { useTheme as useAppTheme } from 'material-ui-shell/lib/providers/Theme'
import MenuContext from 'material-ui-shell/lib/providers/Menu/Context'
import { useTheme } from '@mui/material/styles'
import { useConfig } from 'base-shell/lib/providers/Config'
import { useOnline } from 'base-shell/lib/providers/Online'

import { useIntl } from 'react-intl'
import {
    AppBar,
    Toolbar,
    IconButton,
    LinearProgress,
    Typography, Menu, MenuItem, Box,
} from '@mui/material'
import { ChevronLeft, Menu as MenuIcon } from '@mui/icons-material'

export default function ({
                             children,
                             pageTitle,
                             appBarLeftContent = null,
                             onBackClick,
                             isLoading,
                             appBarContent = null,
                             contentStyle,
                             tabs = null,
                         }) {
    const { isRTL } = useAppTheme()
    const isOnline = useOnline()
    const theme = useTheme()
    const { appConfig } = useConfig()
    const { menu } = appConfig || {}
    const { width = 240, appBarLeadingContent = null } = menu || {}

    const intl = useIntl()
    let headerTitle = ''

    if (typeof pageTitle === 'string' || pageTitle instanceof String) {
        headerTitle = pageTitle
    }


    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                overflow: 'hidden',
            }}
        >
            <AppBar
                position={'absolute'}
                sx={{
                    width: undefined,
                    zIndex: theme.zIndex['drawer'],
                    transition: theme.transitions.create(['width', 'margin'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                    maxHeight: 64,
                    marginLeft: isRTL ? 0 : -12,
                    marginRight: isRTL ? 30 : 0,
                    backgroundColor:'transparent',
                    backgroundImage:'none',
                    boxShadow:'none'
                }}
            >
                <Toolbar sx={{
                    backgroundColor: (t) =>
                        t.palette.mode === 'dark'
                            ? t.palette.background.default
                            : t.palette.primary.dark,
                    margin: 0,
                    padding: 0,
                }}>
                    {onBackClick && (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={onBackClick}
                        >
                            <ChevronLeft />
                        </IconButton>
                    )}
                    {appBarLeadingContent}
                    {appBarLeftContent}
                    <Typography variant="h6" color="inherit" noWrap>
                        {headerTitle}
                    </Typography>
                    <div style={{ flex: '1 1 auto' }} />
                    {appBarContent}
                </Toolbar>

            </AppBar>
            <div
                style={{
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    //...theme.mixins.toolbar,
                    minHeight: 64, //height of AppBar
                }}
            />

            {isLoading && <LinearProgress />}
            {!isOnline && (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                        height: 15,
                        backgroundColor: theme.palette.secondary.main,
                    }}
                >
                    <Typography variant="caption" color="textSecondary" noWrap>
                        {intl.formatMessage({
                            id: 'offline',
                            defaultMessage: 'Offline',
                        })}
                    </Typography>
                </div>
            )}
            {tabs}
            <div style={{ flex: 1, overflow: 'auto', ...contentStyle }}>
                {children}
            </div>
        </div>
    )
}