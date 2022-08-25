import { authSlice, checkingCredentials, login, logout } from "../../../store/auth/authSlice"
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures"

describe('Tests on authSlice', () => {

    test('should return the initial state and have the name of "auth"', () => {

        expect(authSlice.name).toBe('auth')

        const state = authSlice.reducer(initialState, {})
        expect(state).toEqual(initialState)

    })

    test('should authenticate', () => {

        const state = authSlice.reducer(initialState, login(demoUser))
        expect(state).toEqual({
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            photoUrl: demoUser.photoURL,
            displayName: demoUser.displayName,
            errorMessage: null,
        })

    })

    test('should logout without arguments', () => {

        const state = authSlice.reducer(authenticatedState, logout(null))
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: null
        })
    })

    test('should logout and show an error message', () => {

        const errorMessage = 'some error'

        const state = authSlice.reducer(authenticatedState, logout(errorMessage))
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage
        })
    })

    test('should change the status to "checking"', () => {

        const state = authSlice.reducer(authenticatedState, checkingCredentials())
        expect(state.status).toBe('checking')

    })
})