import React, { useMemo, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'

import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks'

const formData = {
    name: '',
    email: '',
    password: ''
}

const formValidations = {
    name: [(value = '') => value.length >= 1, 'name is mandatory'],
    email: [(value = '') => value.includes('@'), 'email should have an @ symbol'],
    password: [(value = '') => value.length >= 5, 'email should have at least 6 characters'],
}

export const RegisterPage = () => {

    const dispatch = useDispatch()
    const [formSubmitted, setFormSubmitted] = useState(false)
    const { status, errorMessage } = useSelector(state => state.auth)
    const isCheckingAuthentication = useMemo((status => status === 'checking'), [status])

    const {
        name,
        isValidname,
        email,
        isValidemail,
        password,
        isValidpassword,
        onInputChange,
        isFormValid,
        formState } = useForm(formData, formValidations)

    const onSubmitForm = (event) => {
        event.preventDefault();

        setFormSubmitted(true)

        if (!isFormValid) return

        dispatch(startCreatingUserWithEmailPassword(formState))
    }

    return (

        <AuthLayout title="Create account">

            <form onSubmit={onSubmitForm}>
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Full Name"
                            type="text"
                            placeholder="Complete Name"
                            fullWidth
                            value={name}
                            onChange={onInputChange}
                            name="name"
                            required
                            error={!!isValidname && formSubmitted}
                            helperText={isValidname}
                            InputProps={{ inputProps: { minLength: 1 } }}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Email"
                            type="email"
                            placeholder="mail@mail.com"
                            fullWidth
                            value={email}
                            onChange={onInputChange}
                            name="email"
                            required
                            error={!!isValidemail && formSubmitted}
                            helperText={isValidemail}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Password"
                            type="password"
                            placeholder="password"
                            fullWidth
                            value={password}
                            onChange={onInputChange}
                            name="password"
                            required
                            error={!!isValidpassword && formSubmitted}
                            helperText={isValidpassword}
                            InputProps={{ inputProps: { minLength: 5 } }}
                        />
                    </Grid>

                    <Grid container
                        spacing={2}
                        sx={{ mb: 2, mt: 1 }}
                    >
                        <Grid
                            item xs={12}
                            display={!!errorMessage ? '' : 'none'}
                        >
                            <Alert severity="error">{errorMessage}</Alert>
                        </Grid>

                        <Grid item xs={12}  >
                            <Button
                                variant="contained"
                                fullWidth
                                type="submit"
                                disable={isCheckingAuthentication}
                            >
                                Create account
                            </Button>
                        </Grid>

                    </Grid>

                    <Grid container
                        direction="row"
                        justifyContent="end"
                    >
                        <Typography sx={{ mr: 1 }} >Already have an account?</Typography>
                        <Link component={RouterLink} color="inherit" to="/auth/login" >
                            Click here
                        </Link>
                    </Grid>
                </Grid>
            </form>

        </AuthLayout>

    )
}
