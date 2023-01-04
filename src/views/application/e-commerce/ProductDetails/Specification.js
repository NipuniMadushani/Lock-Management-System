// material-ui
import { Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';

function createData(key, value) {
    return { key, value };
}

const rows = [
    createData('Operating system supported by software', 'Windows XP SP3  Windows 10'),
    createData('Windows Server', '2003 SP2 '),
    createData('Plastic Wrapper', 'Yes'),
    createData('Safety Wrapper', 'No')
];

const rowsGeneral = [
    createData('Brand Name', 'LOCK HOOD'),
    createData('Model Number', 'WG002'),
    createData('Door Controlled', '2 Doors'),
    createData('Card capacity', '2,0000'),
    createData('Communication', 'TCP/IP 10M/100M adaptive'),
    createData('GPRS', 'Support(Option)'),
    createData(
        'Description',
        'Control 4 doors, get in and out door by swiping card, or get in by swiping card and get out door by button.'
    ),
    createData('Door opening time extending setting', '1-600 seconds(adjustable)'),
    createData('Reversible', 'No'),
    createData('Power Supply', '12VDC 4-7A')
];

// ==============================|| PRODUCT DETAILS - SPECIFICATION ||============================== //

const Specification = () => (
    <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
            <Typography variant="h4" sx={{ pb: 1.5 }}>
                General
            </Typography>
            <TableContainer>
                <Table sx={{ maxWidth: 380 }} size="small" aria-label="simple table">
                    <TableBody>
                        {rowsGeneral.map((row) => (
                            <TableRow key={row.key} sx={{ '& td, & th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    <Typography variant="caption" sx={{ fontWeight: 500 }}>
                                        {row.key}
                                    </Typography>
                                </TableCell>
                                <TableCell>{row.value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>

        <Grid item xs={12} lg={6}>
            <Typography variant="h4" sx={{ pb: 1.5 }}>
                Free Software
            </Typography>
            <TableContainer>
                <Table sx={{ maxWidth: 280 }} size="small" aria-label="simple table">
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.key} sx={{ '& td, & th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    <Typography variant="caption" sx={{ fontWeight: 500 }}>
                                        {row.key}
                                    </Typography>
                                </TableCell>
                                <TableCell>{row.value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    </Grid>
);

export default Specification;
