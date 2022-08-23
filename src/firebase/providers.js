import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {

        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result)
        const { displayName, email, photoURL, uid } = result.user

        return {
            ok: true,

            //user info
            displayName,
            email,
            photoURL,
            uid
        }

    } catch (error) {
        console.log(error)

        const errorCode = error.code
        const errorMessage = error.message

        return {
            ok: false,
            errorCode,
            errorMessage
        }
    }
}

export const registerUserWithEmailPassword = async ({ email, password, name }) => {

    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
        const { uid, photoURL } = resp.user

        await updateProfile(FirebaseAuth.currentUser, { displayName: name })

        return {
            ok: true,
            uid, photoURL, email, name
        }

    } catch (error) {

        console.log(error)

        return {
            ok: false,
            errorMessage: error.message
        }
    }

}

export const loginWithEmailPassword = async (email, password) => {
    try {

        const res = await signInWithEmailAndPassword(FirebaseAuth, email, password)

        const { displayName, email: resEmail, photoURL, uid } = res.user

        return {
            ok: true,

            //user info
            displayName,
            email: resEmail,
            photoURL,
            uid
        }

    } catch (error) {
        console.log(error)

        const errorCode = error.code
        const errorMessage = error.message

        return {
            ok: false,
            errorCode,
            errorMessage
        }
    }
}