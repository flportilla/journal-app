import React, { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import { SaveOutlined, UploadOutlined, DeleteOutline } from '@mui/icons-material'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

import { ImageGallery } from '../components'
import { useForm } from '../../hooks/useForm'
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal'

export const NoteView = () => {

    const dispatch = useDispatch()
    const { active: note, savedMessage, isSaving } = useSelector(state => state.journal)

    const { body, title, date, onInputChange, formState } = useForm(note)

    const dateString = useMemo(() => {
        const newDate = new Date(date)
        return newDate.toUTCString()
    }, [date])

    const fileInputRef = useRef()


    const onSaveNote = () => {
        dispatch(setActiveNote(formState))
        dispatch(startSaveNote())
    }

    const onFileInputChange = ({ target }) => {
        if (target.files === 0) return

        dispatch(startUploadingFiles(target.files))
    }

    const onDelete = () => {
        dispatch(startDeletingNote())
    }

    useEffect(() => {
        if (savedMessage.length > 0) {
            Swal.fire('Entry updated', savedMessage, 'success')
        }
    }, [savedMessage])

    return (
        <Grid
            container
            direction="row"
            justifyContent="space-between"
            sx={{ mb: 1 }}
            className="animate__animated animate__fadeIn animate__faster"
        >
            <Grid item>
                <Typography fontSize={39} fontWeight="light">{dateString}</Typography>
            </Grid>

            <input
                type="file"
                multiple
                onChange={onFileInputChange}
                style={{ display: 'none' }}
                ref={fileInputRef}
            />

            <IconButton
                color="primary"
                disabled={isSaving}
                onClick={() => fileInputRef.current.click()}
                sx={{ justifySelf: 'end' }}
            >
                <UploadOutlined />
            </IconButton>
            <Grid item>
                <Button
                    disabled={isSaving}
                    onClick={onSaveNote}
                    color='primary'
                    sx={{ p: 2 }}>
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
                    name='title'
                    value={title}
                    onChange={onInputChange}
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
                    name='body'
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>
            <Grid container
                justifyContent="end">

                <Button
                    onClick={onDelete}
                    sx={{ mt: 2 }}
                    color="error"
                >
                    <DeleteOutline />
                </Button>

            </Grid>

            <ImageGallery images={note.imageUrls} />
        </Grid>
    )
}
