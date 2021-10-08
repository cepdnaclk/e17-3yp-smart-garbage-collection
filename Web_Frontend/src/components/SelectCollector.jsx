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
                    <MenuItem value={1}>Collector1</MenuItem>
                    <MenuItem value={2}>Collector2</MenuItem>
                    <MenuItem value={3}>Collector3</MenuItem>
                    <MenuItem value={4}>Collector4</MenuItem>
                    <MenuItem value={5}>Collector5</MenuItem>
                    <MenuItem value={6}>Collector6</MenuItem>
                    <MenuItem value={7}>Collector7</MenuItem>
                    <MenuItem value={8}>Collector8</MenuItem>
                    <MenuItem value={9}>Collector9</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}