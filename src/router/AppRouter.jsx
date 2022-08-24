import React, { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';

import { Navigate, Route, Routes } from "react-router-dom";
import { FirebaseAuth } from '../firebase/config';

import { login, logout } from '../store/auth';
import { AuthRoutes } from '../auth/routes/AuthRoutes';

import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { CheckingAuth } from '../ui/components';

export const AppRouter = ({ children }) => {

    const { status } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {

        onAuthStateChanged(FirebaseAuth, async (user) => {
            if (!user) return dispatch(logout());

            const { uid, email, displayName, phoneNumber } = user

            dispatch(login({ uid, email, displayName, phoneNumber }))

        })

    }, [])

    if (status === 'checking') return <CheckingAuth />

    return (


        <Routes>

            {
                (status === 'authenticated')
                    ? <Route path="/*" element={<JournalRoutes />} />
                    : <Route path="/auth/*" element={<AuthRoutes />} />
            }

            <Route path='/*' element={<Navigate to="/auth/login" />} />

            {/* login and registry */}
            {/* <Route path="/auth/*" element={<AuthRoutes />} /> */}

            {/* JournalApp */}
            {/* <Route />
            <Route path="/*" element={<JournalRoutes />} /> */}

        </Routes>
    )
}
