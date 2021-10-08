import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    button: {
        backgroundColor: '#008891',
        margin: theme.spacing(1),
    },
}));

export default function SystemSettingsForm() {
    const classes = useStyles();

    const [binHeight, setBinHeight] = useState('');
    const [redRange, setRedRange] = useState('');
    const [yellowRange, setYellowRange] = useState('');
    const [greenRange, setGreenRange] = useState('');

    const updateBinHeight = () => {
        Axios.put("http://localhost:3003/System/update/binHeight", {
            binHeight: binHeight,
        }).then(res => {
            console.log(res);
        })
            .catch(err => {
                console.log(err)
            })
    }

    const updateRedRange = () => {
        Axios.put("http://localhost:3003/System/update/redRange", {
            red_range: redRange
        }).then(res => {
            console.log(res);
        })
            .catch(err => {
                console.log(err)
            })
    }

    const updateYellowRange = () => {
        Axios.put("http://localhost:3003/System/update/yellowRange", {
            yellow_range: yellowRange
        }).then(res => {
            console.log(res);
        })
            .catch(err => {
                console.log(err)
            })
    }

    const updateGreenRange = () => {
        Axios.put("http://localhost:3003/System/update/greenRange", {
            green_range: greenRange
        }).then(res => {
            console.log(res);
        })
            .catch(err => {
                console.log(err)
            })
    }

    const update = () => {
        updateBinHeight();
        updateRedRange();
        updateYellowRange();
        updateGreenRange();
    }

    return (
        <div className={classes.margin}>
            <FormControl>
                <FormControl>
                    <InputLabel htmlFor="my-input">Bin Height (cm)</InputLabel>
                    <Input id="bin-height" aria-describedby="my-helper-text"
                        // take user input
                        onChange={(e) => {
                            setBinHeight(e.target.value);
                        }}
                    />

                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="my-input">Red Range (eg: 80-100)</InputLabel>
                    <Input id="red-range" aria-describedby="my-helper-text"
                        // take user input
                        onChange={(e) => {
                            setRedRange(e.target.value);
                        }} />

                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="my-input">Yellow Range (eg: 50-80)</InputLabel>
                    <Input id="yellow-range" aria-describedby="my-helper-text"
                        // take user input
                        onChange={(e) => {
                            setYellowRange(e.target.value);
                        }}
                    />

                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="my-input">Green Range (eg: 0-50)</InputLabel>
                    <Input id="green-range" aria-describedby="my-helper-text"
                        // take user input
                        onChange={(e) => {
                            setGreenRange(e.target.value);
                        }} />

                </FormControl>

                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    onClick={update}
                >
                    Save
                </Button>

            </FormControl>
        </div>

    );
}