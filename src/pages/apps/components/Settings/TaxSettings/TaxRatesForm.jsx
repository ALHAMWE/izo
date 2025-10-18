import React from 'react';
import { Typography, Box, Card } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export default function TaxRatesForm() {

    const columns = [
        { field: 'name', headerName: 'Name', minWidth: 120 },
        { field: 'taxRate', headerName: 'Tax Rate %', minWidth: 120 },
    ];

    const rows = [
        {
            id: 1,
            name: 'Default Sales',
            rate: 'Default Sales',
        },
    ];

    const columns2 = [
        { field: 'name', headerName: 'Name', minWidth: 320 },
        { field: 'taxRate', headerName: 'Tax Rate %', minWidth: 320 },
        { field: 'subTax', headerName: 'Sub Taxes', minWidth: 320 },
    ];

    const rows2 = [
        {
            id: 1,
            name: 'Default Sales',
            rate: 'Default Sales',
            subTax: 'Default Sales',
        },
    ];

    return (
        <>
            <Card sx={{ width: '100%', borderRadius: 2, marginTop: 5, marginBottom: 5 }}>
                <Typography variant='h6' sx={{ p: 2 }}>All your tax rates</Typography>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    disableSelectionOnClick
                    sx={{ borderRadius: 2, boxShadow: 2, background: '#fff', border: 'none' }}
                />
            </Card>
            <Card>

                <Typography variant='h6' sx={{ p: 2 }}>Tax groups ( Combination of multiple taxes )</Typography>
                <DataGrid
                    rows={rows2}
                    columns={columns2}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    disableSelectionOnClick
                    sx={{ borderRadius: 2, boxShadow: 2, background: '#fff', border: 'none' }}
                />
            </Card>
        </>
    );
}
