import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Card } from '@mui/material';

const columns = [
    { field: 'name', headerName: 'Name', minWidth: 120 },
    { field: 'vat', headerName: 'VAT', minWidth: 120 },
    { field: 'invoiceSchema', headerName: 'Invoice Schema', width: 120 },
    { field: 'invoicelayout', headerName: 'Invoice Layout', width: 120 },
    { field: 'posRelations', headerName: 'POS Relations', width: 120 },
    { field: 'type', headerName: 'Type', width: 120 },
    { field: 'date', headerName: 'Date', width: 120 },
    { field: 'addedBy', headerName: 'Added By', width: 120 },
];

const rows = [
    {
        id: 1,
        name: 'Default Sales',
        vat: 'Default Sales',
        invoiceSchema: 'Default Sales',
        invoicelayout: 'Default Sales',
        posRelations: 'Default Sales',
        type: 'Default Sales',
        date: 'Default Sales',
        addedBy: 'Default Sales',
    },
];

export default function PatternSettings() {
    return (
        <Card sx={{ height: 330, width: '100%', borderRadius: 2, marginTop: 5 }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
                sx={{ borderRadius: 2, boxShadow: 2, background: '#fff', border: 'none' }}
            />
        </Card>
    );
}
