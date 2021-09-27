// Requests Table 

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
import Axios from 'axios';


const columns = [
    { id: 'id', label: 'Request ID', minWidth: 100 },
    { id: 'time', label: 'Time', minWidth: 100 },
    { id: 'collectorName', label: 'Assigned To', minWidth: 100, align: 'left' },
    { id: 'status', label: 'Status', minWidth: 100, align: 'right' },
];



// function createData(request_id, time, collector, status) {

//     return { request_id, time, collector, status };
// }



// const rows = [
//     createData('1', '4.00 p.m', "Collector1", 'Accepted'),
//     createData('2', '5.40 p.m', "Collector2", 'Declined'),
//     createData('3', '3.30 p.m', "Collector3", 'Completed'),
//     createData('4', '2.25 p.m', "Collector1", 'Accepted'),
//     createData('5', '1.00 p.m', "Collector1", 'Accepted'),
//     createData('6', '5.05 p.m', "Collector2", 'Declined'),
//     createData('7', '3.07 p.m', "Collector3", 'Completed'),
//     createData('8', '2.00 p.m', "Collector1", 'Accepted'),
// ];

let rows = [];

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

    if (id === 'status') {
        if (value === 'Completed') return '#DCFFCC'; //green
        else if (value === 'Accepted') return '#B4F2E1'; //blue
        else return '#FFBCBC'; //red
    }
}

// function setValue(id, value) {

//     if (id === 'status') return <b>value</b>;
//     return value;
// }


export default function TempTable2() {

    // fetch data from the api
    const [requests, setRequests] = useState([]);
    const [collectors, setCollector] = useState([]);

    // get collectors
    useEffect(() => {
        Axios.get("http://localhost:3002/Collectors")
            .then(res => {
                console.log(res);
                setCollector(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    // get requests
    useEffect(() => {
        Axios.get("http://localhost:3002/Requests/getAll")
            .then(res => {
                console.log(res);
                setRequests(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, []);



    // push all data to the rows array
    requests.map((request) => {
        let id = request.request_id;
        let time = request.time;
        let collectorId = request.collector_id;
        let status = request.status;
        let collectorName;

        // get collector name
        collectors.map((collector) => {
            if (collector.id === collectorId) {
                collectorName = collector.fname + ' ' + collector.lname;
            }
        });


        let dataRow = { id, time, collectorName, status };
        rows.push(dataRow);
    });

    console.log(rows);

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper className={classes.root}>
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
                                                {column.id === 'status' ? <b>{value}</b> : value}
                                                {/* {setValue(column.id, value)} */}

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

