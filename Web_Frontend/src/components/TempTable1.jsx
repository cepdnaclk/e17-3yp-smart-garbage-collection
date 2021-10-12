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
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Bar } from 'react-chartjs-2';
import SelectBin from './SelectBin';
import Button from '@material-ui/core/Button';


const columns = [
    { id: 'unit_id', label: 'Unit ID', minWidth: 100 },
    { id: 'bin', label: 'Bin', minWidth: 100 },
    { id: 'fill_level', label: 'Fill Level (%)', minWidth: 100, align: 'right' },
    { id: 'color', label: '', minWidth: 50, align: 'right' },
    { id: 'compaction', label: 'Compaction', minWidth: 100, align: 'right' },
    { id: 'assign', label: 'Assign', minWidth: 100, align: 'center' },
    { id: 'location', label: 'Location', minWidth: 100, align: 'right' },
    { id: 'battery', label: 'Battery', minWidth: 100, align: 'right' },

];

// function createData(unit_id, bin, fill_level, compaction, assign, location, battery) {
//     return { unit_id, bin, fill_level, compaction, assign, location, battery };
// }

// const rows = [
//     createData('1', 'Food', "10%", 'None', null, 'Locaction 1', 'HIGH'),
//     createData('1', 'Paper', "91%", 3, 'Collector1', 'Location 1', 'HIGH'),
//     createData('1', 'Polythene', "60%", 2, 'Collector1', 'Location 1', 'MEDIUM'),
//     createData('1', 'Other', "20%", 'None', null, 'Location 1', 'HIGH'),
//     createData('2', 'Food', "10%", 'None', null, 'Loc2', 'LOW'),
//     createData('2', 'Paper', "91%", 3, 'Collector2', 'Loc1', 'MEDIUM'),
//     createData('2', 'Polythene', "60%", 1, 'Collector2', 'Loc1', 'HIGH'),
//     createData('2', 'Other', "20%", 'None', null, 'Loc2', 'HIGH'),
//     createData('3', 'Food', "10%", 'None', null, 'Loc3', 'HIGH'),
//     createData('3', 'Paper', "91%", 3, 'Collector1', 'Loc3', 'HIGH'),
//     createData('3', 'Polythene', "60%", 3, 'Collector1', 'Loc3', 'MEDIUM'),
//     createData('3', 'Other', "20%", 'None', null, 'Loc3', 'HIGH'),
// ];

// const rows = [];

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
    },
    main: {
        display: 'flex',
        alignItems: 'center',

    },
    myroot: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
        backgroundColor: 'white'

    },
    graphroot: {
        flexGrow: 1,
    },
    paper: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(10),
        textAlign: 'left',
        backgroundColor: 'white',
    },
}));

function setColor(id, value) {

    //var val = parseInt(value);
    var val = value;
    // if (id === 'fill_level') {
    //     if (val < 50) return '#54E346'; //green
    //     else if (val < 80) return 'yellow';
    //     else if (val >= 80) return '#F92727'; //red
    // }

    if (id === 'color') {
        if (val === 'g') return '#54E346'; //green
        else if (val === 'y') return 'yellow';
        else if (val === 'r') return '#F92727'; //red
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

    // for toggle view button
    const [view, setView] = React.useState('');

    const handleChange = (event) => {
        setView(event.target.value);
    };

    // fetch data from the api
    const rows = [];
    const [bins, setBins] = useState([]);
    const [units, setUnits] = useState([]);
    const [searchId, setSearchId] = useState('');
    const [searchedBins, setSearchedBins] = useState([]);
    //const [collector, setCollector] = useState('');
    //const [binId, setBinId] = useState('');

    // get bins data
    useEffect(() => {
        Axios.get("http://localhost:3001/Bins/get")
            .then(res => {
                //console.log(res);
                setBins(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    // get units data
    useEffect(() => {
        Axios.get("http://localhost:3001/Units/getAll")
            .then(res => {

                setUnits(res.data);
                //console.log(units);
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    // get bins by unit Id
    useEffect(() => {
        Axios.get(`http://localhost:3001/Bins/getByUnitId?unitID=${searchId}`)
            .then(res => {
                console.log(res);
                setSearchedBins(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [searchId]);


    // for the Bar chart
    const [chartData, setChartData] = useState({});

    const chart = () => {
        setChartData({
            labels: ['Food', 'Paper', 'Polythene', 'Other'],
            dataSets: [
                {
                    label: 'Fill levels of bins',
                    data: [80, 60, 45, 10],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderWidth: 4
                }
            ]
        })
    }

    useEffect(() => {
        chart()
    }, [])

    // // get collector name by bin id if in sent or accepted statuses
    // const getAssignedCollector = ((id) => {

    //     Axios.get("http://localhost:3002/Collectors/getByBinId?binId=" + id)
    //         .then(res => {
    //             //console.log(res);
    //             let collName = res.data[0].fname + ' ' + res.data[0].lname;
    //             setCollector(collName);
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         });

    // });



    // push data to rows array
    units.map((unit) => {

        // single unit
        let unit_id = unit.id;
        let location = unit.location;
        let binArr = [];
        let fill_levelArr = [];
        let compactionArr = [];
        let assignArr = [];
        let batteryArr = [];
        let colorArr = []

        bins.map((bin) => {

            if (bin.unit_id === unit_id) {
                binArr.push(bin.category);
                fill_levelArr.push(bin.fill_level);
                compactionArr.push(bin.compaction_cycles);
                batteryArr.push(bin.battery);
                assignArr.push('collector');
                colorArr.push(bin.color);
            }
        });

        for (let i = 0; i < 4; i++) {
            let bin = binArr[i];
            let fill_level = fill_levelArr[i];
            let compaction = compactionArr[i];
            let battery = batteryArr[i];
            let assign = assignArr[i];
            let color = colorArr[i];
            let rowData = { unit_id, bin, fill_level, color, compaction, assign, location, battery };
            //console.log(rowData);
            rows.push(rowData);
        }

    });

    return (
        <div>
            <Grid container spacing={1} className={classes.main}>
                <Grid item xs={6}>
                    <Paper component="form" className={classes.myroot}>
                        <IconButton className={classes.iconButton} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                        <InputBase
                            className={classes.input}
                            placeholder="Search by unit Id"
                            inputProps={{ 'aria-label': 'search by unit id' }}
                            // take user input
                            onChange={(e) => {
                                setSearchId(e.target.value);
                            }}
                        />

                    </Paper>
                </Grid>
                <Grid item xs={6} >
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Select View</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={view}
                            onChange={handleChange}
                        >
                            <MenuItem value={"Table View"} >Table View</MenuItem>
                            <MenuItem value={"Graph View"} >Graph View</MenuItem>

                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            {/* render the table view or graph view */}

            {view == 'Graph View' ? <div><div className={classes.graphroot}>
                <Grid container spacing={3}>

                    <Grid item xs={6}>
                        <h2>Graph</h2>
                        <Paper className={classes.paper}>

                            <Bar data={chartData} options={{
                                responsive: true
                            }} />
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <h2>Unit Details</h2>
                        <Paper className={classes.paper}>
                            <p>Location: Miriswatta</p>
                            <SelectBin />
                            <SelectCollector />

                            <Button
                                variant="contained"
                                color="primary"
                                size="medium"
                                className={classes.button}
                                startIcon={<SendRoundedIcon />}
                            >
                                Assign
                            </Button>
                        </Paper>
                    </Grid>

                </Grid>
            </div></div> : <div><Paper className={classes.root}>
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
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter((row => {
                                if (searchId === '') {
                                    return row;
                                } else if (searchId == row.unit_id) {
                                    return row;
                                }
                            })).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align} style={{ backgroundColor: setColor(column.id, value) }}>
                                                    {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                                                    {/* {column.id === 'fill_level' ? <b>{value}</b> : value} */}
                                                    {value}
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
            </Paper></div>
            }


        </div >
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