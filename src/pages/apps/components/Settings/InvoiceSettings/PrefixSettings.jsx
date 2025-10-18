import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Card } from '@mui/material';

const columns = [
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 130 },
    { field: 'prefix', headerName: 'Prefix', flex: 1, minWidth: 120 },
    { field: 'startFrom', headerName: 'Start from', type: 'number', width: 100 },
    { field: 'invoiceCount', headerName: 'Invoice Count', type: 'number', width: 130 },
    { field: 'digits', headerName: 'Number of digits', type: 'number', width: 150 },
];

const rows = [
    { id: 1, name: 'Default Sales', prefix: 'S2025-', startFrom: 1, invoiceCount: 449, digits: 4 },
    { id: 2, name: 'Projects Sales', prefix: 'P2025-', startFrom: 1, invoiceCount: 24, digits: 4 },
    { id: 3, name: 'Outside Sales', prefix: 'O2025-', startFrom: 1, invoiceCount: 1, digits: 4 },
    { id: 4, name: 'Export Sales', prefix: 'E2025-', startFrom: 1, invoiceCount: 2, digits: 4 },
    { id: 5, name: 'External Purchases', prefix: 'E2025-', startFrom: 1, invoiceCount: 26, digits: 4 },
    { id: 6, name: 'Local Purchases', prefix: 'PO2025-', startFrom: 1, invoiceCount: 402, digits: 5 },
    { id: 7, name: 'Return Default Sales', prefix: 'RS2025-', startFrom: 1, invoiceCount: 3, digits: 4 },
    { id: 8, name: 'Return Projects Sales', prefix: 'RP2025-', startFrom: 1, invoiceCount: 1, digits: 4 },
    { id: 9, name: 'Return Outside Sales', prefix: 'RO2025-', startFrom: 1, invoiceCount: 0, digits: 4 },
];

export default function PrefixSettings() {
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
