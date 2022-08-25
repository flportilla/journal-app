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
    email: 'demo@test.com',
    password: '123456',
    name: 'demo user',
    uid: 'abc123',
    photoURL: 'http://demo.jpg'
}

