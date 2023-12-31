import { useConfig } from 'base-shell/lib/providers/Config'
import { CssBaseline } from '@mui/material'
import PWAPrompt from 'react-ios-pwa-prompt'
import React from 'react'
import { useTheme } from 'material-ui-shell/lib/providers/Theme'
import UpdateContainer from 'material-ui-shell/lib/containers/UpdateContainer/UpdateContainer'
import QuestionDialogsProvider from 'material-ui-shell/lib/providers/Dialogs/Question/Provider'
import getThemeSource from './theme'
import { SnackbarProvider } from 'notistack'
import { ThemeProvider } from '@mui/material/styles'
import { useIntl } from 'react-intl'
import FilterProvider from 'material-ui-shell/lib/providers/Filter/Provider'
import VirtualListsProvider from 'material-ui-shell/lib/providers/VirtualLists/Provider'
import MenuProvider from 'material-ui-shell/lib/providers/Menu/Provider'
import { IntlProvider } from 'react-intl'
import OnlineProvider from 'base-shell/lib/providers/Online/Provider'
import AppThemeProvider from 'material-ui-shell/lib/providers/Theme/Provider'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import AboutDialog from "../../pages/About";
import {useDispatch, useSelector} from "react-redux";


const LayoutContent = ({ children }) => {
    const intl = useIntl()
    const { appConfig } = useConfig();
    const { themeID, isDarkMode, isRTL } = useTheme()
    const { theme: themeConfig, pwa, notistack } = appConfig || {}
    const { useiOSPWAPrompt, iOSPWAPromptProps } = pwa || {}
    const { themes = [] } = themeConfig || {}
    const fontSize = useSelector((state) => state.customization.fontSize);
    const theme = getThemeSource(themeID, themes, isDarkMode, isRTL,fontSize)

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <SnackbarProvider maxSnack={3} {...notistack}>
                {/*<UpdateContainer>*/}
                {/*    <OnlineProvider>*/}
                {/*        <IntlProvider*/}
                {/*            locale={locale}*/}
                {/*            key={locale}*/}
                {/*            messages={messages}*/}
                {/*            onError={onError}*/}
                {/*        >*/}
                    <QuestionDialogsProvider>
                        <FilterProvider>
                            <VirtualListsProvider>{children}</VirtualListsProvider>
                            <AboutDialog/>
                        </FilterProvider>
                    </QuestionDialogsProvider>
                {/*        </IntlProvider>*/}
                {/*    </OnlineProvider>*/}
                {/*</UpdateContainer>*/}
            </SnackbarProvider>
            {useiOSPWAPrompt && (
                <PWAPrompt
                    //debug={true}
                    promptOnVisit={1}
                    timesToShow={3}
                    copyTitle={intl.formatMessage({
                        id: 'ios_prompt_title',
                        defaultMessage: 'Add to Home Screen',
                    })}
                    copyClosePrompt={intl.formatMessage({
                        id: 'ios_prompt_close',
                        defaultMessage: 'Close',
                    })}
                    copyBody={intl.formatMessage({
                        id: 'ios_prompt_body',
                        defaultMessage:
                            'This website has app functionality. Add it to your home screen to use it in fullscreen and while offline.',
                    })}
                    copyShareButtonLabel={intl.formatMessage({
                        id: 'ios_prompt_share_button',
                        defaultMessage: "1) Press the 'Share' button",
                    })}
                    copyAddHomeButtonLabel={intl.formatMessage({
                        id: 'ios_prompt_add_to_home_button',
                        defaultMessage: "2) Press 'Add to Home Screen'",
                    })}
                    permanentlyHideOnDismiss={false}
                    {...iOSPWAPromptProps}
                />
            )}
        </ThemeProvider>
    )
}

export default function ({ children }) {
    const { appConfig } = useConfig()

    return (
        <React.Fragment>
            <MenuProvider appConfig={appConfig}>
                <AppThemeProvider appConfig={appConfig}>
                    <div
                        style={{
                            display: 'flex',
                        }}
                    >
                        <LayoutContent>{children}</LayoutContent>
                    </div>
                </AppThemeProvider>
            </MenuProvider>
        </React.Fragment>
    )
}