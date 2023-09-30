/* eslint-disable react/jsx-key */
import React, { lazy } from 'react'
// import UnauthorizedRoute from 'base-shell/lib/components/UnauthorizedRoute'
import PageNotFound from "../pages/PageNotFound/PageNotFound";
const LandingPage = lazy(() => import("../pages/LandingPage"))

const routes = [
  {
    path: '/',
    // exact: true,
    element: (
        <LandingPage/>
    ),
  },
  {
    path: "*",

    element: (
          <PageNotFound />
    ),
  }
]

export default routes
