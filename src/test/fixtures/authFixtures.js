export const initialState = {
    status: 'checking',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}
export const authenticatedState = {
    status: 'authenticated',
    uid: '123123',
    email: 'demo@test.com',
    displayName: 'demo user',
    photoURL: 'http://demo.jpg',
    errorMessage: null
}
export const notAuthenticated = {
    status: 'authenticated',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}
export const demoUser = {
    uid: 'abc123',
    email: 'demo@test.com',
    displayName: 'demo user',
    photoURL: 'http://demo.jpg'
}

