import React, { useState, useEffect } from 'react';
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

    // const [binHeight, setBinHeight] = useState('');
    // const [redRange, setRedRange] = useState('');
    // const [yellowRange, setYellowRange] = useState('');
    // const [greenRange, setGreenRange] = useState('');

    const [currentBinHeight, setCurrentBinHeight] = useState(100);
    const [currentLowBound, setCurrentLowBound] = useState(50);
    const [currentHighBound, setCurrentHighBound] = useState(80);

    useEffect(() => {
        Axios.get("http://localhost:3001/System/getBinHeight")
            .then(res => {
                //console.log(res);
                setCurrentBinHeight(res.data[0].bin_height)
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    useEffect(() => {
        Axios.get("http://localhost:3001/System/getLowBound")
            .then(res => {
                //console.log(res);
                setCurrentLowBound(res.data[0].low_bound)
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    useEffect(() => {
        Axios.get("http://localhost:3001/System/getHighBound")
            .then(res => {
                //console.log(res);
                setCurrentHighBound(res.data[0].high_bound)
            })
            .catch(err => {
                console.log(err)
            })
    }, []);


    // const updateBinHeight = () => {
    //     Axios.put("http://localhost:3001/System/update/binHeight", {
    //         binHeight: binHeight,
    //     }).then(res => {
    //         console.log(res);
    //     })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }

    // const updateRedRange = () => {
    //     Axios.put("http://localhost:3001/System/update/redRange", {
    //         red_range: redRange
    //     }).then(res => {
    //         console.log(res);
    //     })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }

    // const updateYellowRange = () => {
    //     Axios.put("http://localhost:3001/System/update/yellowRange", {
    //         yellow_range: yellowRange
    //     }).then(res => {
    //         console.log(res);
    //     })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }

    // const updateGreenRange = () => {
    //     Axios.put("http://localhost:3001/System/update/greenRange", {
    //         green_range: greenRange
    //     }).then(res => {
    //         console.log(res);
    //     })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }

    // const update = () => {
    //     updateBinHeight();
    //     updateRedRange();
    //     updateYellowRange();
    //     updateGreenRange();
    // }

    return (
        <div className={classes.margin}>
            <FormControl>
                <FormControl>
                    <InputLabel htmlFor="my-input">Bin Height: {currentBinHeight} cm </InputLabel>
                    <Input id="bin-height" aria-describedby="my-helper-text" disabled={true}
                    // take user input
                    // onChange={(e) => {
                    //     setBinHeight(e.target.value);
                    // }}
                    />

                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="my-input">Red Range: {currentHighBound}-100</InputLabel>
                    <Input id="red-range" aria-describedby="my-helper-text" disabled={true}
                    // take user input
                    // onChange={(e) => {
                    //     setRedRange(e.target.value);
                    // }} 

                    />

                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="my-input">Yellow Range: {currentLowBound}-{currentHighBound}</InputLabel>
                    <Input id="yellow-range" aria-describedby="my-helper-text" disabled={true}
                    // take user input
                    // onChange={(e) => {
                    //     setYellowRange(e.target.value);
                    // }}
                    />

                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="my-input">Green Range: 0-{currentLowBound}</InputLabel>
                    <Input id="green-range" aria-describedby="my-helper-text" disabled={true}
                    // take user input 
                    // onChange={(e) => {
                    //     setGreenRange(e.target.value);
                    // }} 

                    />

                </FormControl>

                {/* <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    onClick={update}
                >
                    Save
                </Button> */}

            </FormControl>
        </div>

    );
}