import React from 'react'

import { Box, Toolbar } from '@mui/material'

import { NavBar, SideBar } from '../components';

const drawerWidth = 240;

export const JournalLayout = ({ children }) => {
    return (
        <Box >

            <NavBar drawerWidth={drawerWidth} />

            <SideBar drawerWidth={drawerWidth} />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    marginLeft: `${drawerWidth}px`
                }}
            >
                <Toolbar />
                {children}

            </Box>

        </Box >
    )
}
