import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    button: {
        backgroundColor: '#008891',
        margin: theme.spacing(1),
    },
}));

export default function AddRemoveForm() {
    const classes = useStyles();

    return (
        <div className={classes.margin}>
            <FormControl>
                <FormControl>
                    <InputLabel htmlFor="my-input">Enter Unit ID</InputLabel>
                    <Input id="my-input" aria-describedby="my-helper-text" />

                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="my-input">Enter Location</InputLabel>
                    <Input id="my-input" aria-describedby="my-helper-text" />

                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                >
                    Add
                </Button>
                <FormControl>
                    <InputLabel htmlFor="my-input">Enter Unit ID</InputLabel>
                    <Input id="my-input" aria-describedby="my-helper-text" />

                </FormControl>

                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                >
                    Remove
                </Button>

            </FormControl>
        </div>

    );
}