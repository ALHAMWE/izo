import { Grid } from '@mui/material'
import React from 'react'

const CustomGridContainer = ({ children, ...props }) => {
    return (
        <Grid container rowSpacing={0} columnSpacing={5} {...props}>
            {children}
        </Grid>
    )
}

export default CustomGridContainer