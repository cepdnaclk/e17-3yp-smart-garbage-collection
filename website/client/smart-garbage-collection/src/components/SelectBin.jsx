import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function SelectCollector() {
    const classes = useStyles();
    const [collector, setCollector] = React.useState('');

    const handleChange = (event) => {
        setCollector(event.target.value);
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Select</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={collector}
                    onChange={handleChange}
                >
                    <MenuItem value={1}>Food</MenuItem>
                    <MenuItem value={2}>Paper</MenuItem>
                    <MenuItem value={3}>Polythene</MenuItem>
                    <MenuItem value={4}>Other</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}