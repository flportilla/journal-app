import React from 'react'

import { Button, Grid, TextField, Typography } from '@mui/material'

import { SaveOutlined } from '@mui/icons-material'
import { ImageGallery } from '../components'

export const NoteView = () => {
    return (
        <Grid container direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={39} fontWeight="light">22 de agosto 2022</Typography>
            </Grid>
            <Grid item>
                <Button color='primary' sx={{ p: 2 }}>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Save
                </Button>
            </Grid>
            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Enter title"
                    label="Title"
                    sx={{ border: 'none', mb: 1 }}
                />
            </Grid>
            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="How was your day"
                    minRows={5}
                />
            </Grid>

            <ImageGallery />
        </Grid>
    )
}
