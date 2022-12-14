import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux/es/exports"

import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseAuth } from '../firebase/config';

import { login, logout } from '../store/auth';
import { startLoadingNotes } from "../store/journal/thunks";

export const useCheckAuth = () => {
    const { status } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {

        onAuthStateChanged(FirebaseAuth, async (user) => {
            if (!user) return dispatch(logout());

            const { uid, email, displayName, phoneNumber } = user
            dispatch(login({ uid, email, displayName, phoneNumber }))
            dispatch(startLoadingNotes())

        })

    }, [])

    return status

}