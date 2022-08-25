import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from '../../../firebase/providers'
import { checkingCredentials, login, logout } from '../../../store/auth/authSlice'
import { checkingAuthentication, startCreatingUserWithEmailPassword, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from '../../../store/auth/thunks'
import { clearNotesLogout } from '../../../store/journal/journalSlice'
import { demoUser } from '../../fixtures/authFixtures'


jest.mock('../../../firebase/providers')

describe('tests on authThunks', () => {

    const dispatch = jest.fn()

    beforeEach(() => jest.clearAllMocks())

    test('should evoke the checkingCredentials', async () => {

        await checkingAuthentication()(dispatch)
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())

    })

    test('startGoogleSignIn should call checkingCredentials and login ', async () => {

        const loginData = { ok: true, ...demoUser }
        await signInWithGoogle.mockResolvedValue(loginData)

        //thunk
        await startGoogleSignIn()(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(login(loginData))
    })

    test('startGoogleSignIn should call checkingCredentials and logout with error message ', async () => {

        const loginData = { ok: false, errorMessage: 'Test error' }
        await signInWithGoogle.mockResolvedValue(loginData)

        await startGoogleSignIn()(dispatch)
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage))

    })

    test('startLoginWithEmailPassword should call checkingCredentials and login', async () => {

        const loginData = { ok: true, ...demoUser }
        const formData = { email: demoUser.email, password: '123456' }

        await loginWithEmailPassword.mockResolvedValue(loginData)

        await startLoginWithEmailPassword(formData)(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(login(loginData))
    })

    test('startLoginWithEmailPassword should call checkingCredentials and logout witouth error message', async () => {

        const loginData = { ok: false }
        const formData = { email: demoUser.email, password: '123456' }

        await loginWithEmailPassword.mockResolvedValue(loginData)

        await startLoginWithEmailPassword(formData)(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(logout())
    })

    test('startLoginWithEmailPassword should call checkingCredentials and logout with error message', async () => {

        const loginData = { ok: false, errorMessage: 'Test error' }
        const formData = { email: demoUser.email, password: '123456' }

        await loginWithEmailPassword.mockResolvedValue(loginData)

        await startLoginWithEmailPassword(formData)(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage))
    })

    test('startCreatingUserWithEmailPassword should call checkingCredentials and login', async () => {

        const loginData = { ok: true, ...demoUser }
        const formData = { email: demoUser.email, password: '123456', name: demoUser.name }

        await registerUserWithEmailPassword.mockResolvedValue(loginData)
        await startCreatingUserWithEmailPassword(formData)(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        // expect(dispatch).toHaveBeenCalledWith(login(loginData))

    })

    test('startLogout should call logoutFirebase, clearNotes and logoun', async () => {
        await startLogout()(dispatch)

        expect(logoutFirebase).toHaveBeenCalled()
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout())
        expect(dispatch).toHaveBeenCalledWith(logout())

    })


})