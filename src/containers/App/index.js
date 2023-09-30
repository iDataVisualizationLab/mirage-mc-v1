import React, { Suspense, lazy } from 'react'
import { HashRouter as BrowserRouter, Route, Routes } from 'react-router-dom'
import ConfigProvider from 'base-shell/lib/providers/Config/Provider'
import Database from '../DatabaseContainer/DatabaseContainer'
const Layout = lazy(() => import('base-shell/lib/containers/Layout/Layout'))
const App = ({ config: appConfig }) => {
    const config = { ...appConfig }
    const { pages, components, containers } = config
    const { LandingPage = false } = pages || {}
    const { Loading = () => <div /> } = components || {}
    const { AppContainer = React.Fragment } = containers || {}

    return (
        <Suspense fallback={<Loading />}>
            <ConfigProvider appConfig={config}>
            <Database>
                <AppContainer>
                    <BrowserRouter>
                        <Routes>
                            {/*{LandingPage && (*/}
                            {/*    <Route path="/" exact element={<LandingPage />} />*/}
                            {/*)}*/}
                            <Route path="/popout" exact element={<div style={{height: '100vh',width:'100wh', position:'relative', pointerEvents:'all', overflow:'auto'}}/>} />
                            <Route
                                path="*"
                                element={
                                    <Suspense fallback={<Loading />}>
                                        <Layout appConfig={config} />
                                    </Suspense>
                                }
                            />
                        </Routes>
                    </BrowserRouter>
                </AppContainer>
            </Database>
            </ConfigProvider>
        </Suspense>
    )
}

export default App