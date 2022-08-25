import { authSlice } from "../../../store/auth/authSlice"
import { initialState } from "../../fixtures/authFixtures"

describe('Tests on authSlice', () => {

    test('should return the initial state and have the name of "auth"', () => {

        expect(authSlice.name).toBe('auth')

        const state = authSlice.reducer(initialState, {})
        expect(state).toEqual(initialState)

    })
})