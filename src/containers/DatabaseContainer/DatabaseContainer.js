import React, { useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment as DateAdapter } from "@mui/x-date-pickers/AdapterMoment";
import DataProvider from "../../Providers/Database"

export default function ({ children }) {
    // const { appConfig } = useConfig();

    // if (getApps().length === 0) {
    //     initializeApp(
    //         process.env.NODE_ENV !== "production" ? dev.initConfig : prod.initConfig
    //     );
    // }

    return (
        <DataProvider>
            <LocalizationProvider dateAdapter={DateAdapter}>
                {children}
            </LocalizationProvider>
        </DataProvider>
    )
}