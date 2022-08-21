import React from 'react'
import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { JournalRoutes } from '../journal/routes/JournalRoutes';

export const AppRouter = ({ children }) => {
    return (
        <Routes>
            {/* login and registry */}
            <Route path="/auth/*" element={<AuthRoutes />} />

            {/* JournalApp */}
            <Route />
            <Route path="/*" element={<JournalRoutes />} />

        </Routes>
    )
}
