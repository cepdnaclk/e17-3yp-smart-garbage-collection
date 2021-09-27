// Overview Table 

import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import SelectCollector from './SelectCollector';
import IconButton from '@material-ui/core/IconButton';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import { Grid } from '@material-ui/core';
import Axios from 'axios';


const columns = [
    { id: 'unit_id', label: 'Unit ID', minWidth: 100 },
    { id: 'bin', label: 'Bin', minWidth: 100 },
    { id: 'fill_level', label: 'Fill Level', minWidth: 100, align: 'right' },
    { id: 'compaction', label: 'Compaction', minWidth: 100, align: 'right' },
    { id: 'assign', label: 'Assign', minWidth: 100, align: 'center' },
    { id: 'location', label: 'Location', minWidth: 100, align: 'right' },
    { id: 'battery', label: 'Battery', minWidth: 100, align: 'right' },

];

function createData(unit_id, bin, fill_level, compaction, assign, location, battery) {
    return { unit_id, bin, fill_level, compaction, assign, location, battery };
}

const rows = [
    createData('1', 'Food', "10%", 'None', null, 'Locaction 1', 'HIGH'),
    createData('1', 'Paper', "91%", 3, 'Collector1', 'Location 1', 'HIGH'),
    createData('1', 'Polythene', "60%", 2, 'Collector1', 'Location 1', 'MEDIUM'),
    createData('1', 'Other', "20%", 'None', null, 'Location 1', 'HIGH'),
    createData('2', 'Food', "10%", 'None', null, 'Loc2', 'LOW'),
    createData('2', 'Paper', "91%", 3, 'Collector2', 'Loc1', 'MEDIUM'),
    createData('2', 'Polythene', "60%", 1, 'Collector2', 'Loc1', 'HIGH'),
    createData('2', 'Other', "20%", 'None', null, 'Loc2', 'HIGH'),
    createData('3', 'Food', "10%", 'None', null, 'Loc3', 'HIGH'),
    createData('3', 'Paper', "91%", 3, 'Collector1', 'Loc3', 'HIGH'),
    createData('3', 'Polythene', "60%", 3, 'Collector1', 'Loc3', 'MEDIUM'),
    createData('3', 'Other', "20%", 'None', null, 'Loc3', 'HIGH'),



];

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#008891',
        color: theme.palette.common.white,
        fontSize: '1.3rem',
        fontFamily: '"Righteous", cursive',
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 350,
        marginTop: theme.spacing(5)
    },
    tableHead: {
        color: '#0F3057',
    }
}));

function setColor(id, value) {

    var val = parseInt(value);
    if (id === 'fill_level') {
        if (val < 50) return '#54E346'; //green
        else if (val < 80) return 'yellow';
        else return '#F92727'; //red
    }
}

function setValue(id, value) {

    if (id === 'fill_level') return <b>{value}</b>;
    else if (id === 'assign') {
        return <div>
            <Grid container >
                <Grid item xs={6}>
                    <SelectCollector />
                </Grid>
                <Grid item xs={6}>
                    <IconButton aria-label="send">
                        <SendRoundedIcon />
                    </IconButton>
                </Grid>


            </Grid></div>
    };
    return value;
}


export default function TempTable1() {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    // fetch data from the api
    const [bins, setBins] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3002/Bins/get")
            .then(res => {
                console.log(res);
                setBins(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])



    return (
        <Paper className={classes.root}>

            {/* <ul>
                {bins.map(bin => (
                    <li key={bin.id}> {bin.category} </li>
                ))}
            </ul> */}

            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead >
                        <TableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align} style={{ backgroundColor: setColor(column.id, value) }}>
                                                {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}

                                                {setValue(column.id, value)}

                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}



// {
//     id: 'size',
//     label: 'Assign',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toLocaleString('en-US'),
// },
// {
//     id: 'density',
//     label: 'Progress',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toFixed(2),
// },