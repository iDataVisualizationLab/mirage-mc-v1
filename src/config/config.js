import { lazy } from 'react'
import locales from './locales'
import routes from './routes'
import themes from './themes'
import parseLanguages from 'base-shell/lib/utils/locale'
import Loading from '../components/Loading/Loading'

const config = {
    database:{
        prod: {
            initConfig: {
                apiKey: "AIzaSyCFK3B65zD95QoLbkPwdxuYfpLsE7VlT7c",
                authDomain: "mirage-mc-a4126.firebaseapp.com",
                projectId: "mirage-mc-a4126",
                storageBucket: "mirage-mc-a4126.appspot.com",
                messagingSenderId: "534512658347",
                appId: "1:534512658347:web:ed50ed852f35a3050554ee",
                measurementId: "G-Q0T1WZE312"
            }
        },
        dev: {
            initConfig: {
                apiKey: "AIzaSyCFK3B65zD95QoLbkPwdxuYfpLsE7VlT7c",
                authDomain: "mirage-mc-a4126.firebaseapp.com",
                projectId: "mirage-mc-a4126",
                storageBucket: "mirage-mc-a4126.appspot.com",
                messagingSenderId: "534512658347",
                appId: "1:534512658347:web:ed50ed852f35a3050554ee",
                measurementId: "G-Q0T1WZE312"
            }
        }
    },
    containers: {
        LayoutContainer: lazy(() =>
            // import('material-ui-shell/lib/containers/LayoutContainer/LayoutContainer')
            import('../containers/LayoutContainer/LayoutContainer_replace')
        ),
    },
    components: {
        Loading,
        // Menu: lazy(() => import('material-ui-shell/lib/containers/Menu/Menu')),
    },
    pwa: {
        useiOSPWAPrompt: true,
        iOSPWAPromptProps: {},
    },
    routes,
    locale: {
        locales,
        defaultLocale: parseLanguages(['en', 'de', 'ru'], 'en'),
        onError: (e) => {
            // Here we warn the user about translation error
            //console.warn(e)
            return
        },
    },
    menu: {
        width: 240,
        offlineIndicatorHeight: 12,
        initialAuthMenuOpen: false,
        initialMiniMode: true,
        initialMenuOpen: false,
        initialMobileMenuOpen: false,
        initialMiniSwitchVisibility: true,
        MenuHeader: lazy(() =>
            import('../components/MenuHeader/MenuHeader')
        ),
        MenuContent: lazy(() => import('../components/Menu/MenuContent')),
        useWindowWatcher: false,
    },
    theme: {
        themes,
        defaultThemeID: 'default',
        defaultIsDarkMode: true,
        defaultIsRTL: false, //change this to true for default Right to Left Language support
        defaultFontSize:1,
    },
    pages: {
        // LandingPage: lazy(() => import('../pages/LandingPage/LandingPage')),
        PageNotFound: lazy(() => import('../pages/PageNotFound/PageNotFound')),
    },
    fontFamily: {
        basename: '',
        defaultPath: '',
        fontFamily: `'Roboto', sans-serif`,
        borderRadius: 12
    }
}

export default config