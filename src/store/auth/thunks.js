import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers"
import { checkingCredentials, logout, login } from "./authSlice"

export const checkingAuthentication = (email = '', password = '') => {
    return async (dispatch) => {

        dispatch(checkingCredentials())
    }
}

export const startGoogleSignIn = (email = '', password = '') => {
    return async (dispatch) => {
        dispatch(checkingCredentials())

        const result = await signInWithGoogle()

        if (!result.ok) return dispatch(logout(result.errorMessage))

        dispatch(login(result))
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, name }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials())

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ name, email, password })

        if (!ok) return dispatch(logout({ errorMessage }))

        dispatch(login({ uid, name, email, photoURL }))

    }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async (dispatch) => {

        dispatch(checkingCredentials())
        const result = await loginWithEmailPassword({ email, password })

        if (!result.ok) return dispatch(logout(result.errorMessage))

        dispatch(login(result))
    }
}

export const startLogout = () => {
    return async (dispatch) => {
        await logoutFirebase();

        dispatch(logout())

    }
}