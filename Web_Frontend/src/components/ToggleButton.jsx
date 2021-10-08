// toggle button in overview between table view and graphival view
// functionality is not implemented

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
        backgroundColor: 'white'

    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function ToggleButton() {
    const classes = useStyles();
    const [view, setView] = React.useState('');

    const handleChange = (event) => {
        setView(event.target.value);
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Select View</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={view}
                    onChange={handleChange}
                >
                    <MenuItem value={"Table View"} ><a href="/Overview">Table View</a></MenuItem>
                    <MenuItem value={"Graph View"} ><a href="/TempOverview">Graph View</a></MenuItem>

                </Select>
            </FormControl></div>);
}