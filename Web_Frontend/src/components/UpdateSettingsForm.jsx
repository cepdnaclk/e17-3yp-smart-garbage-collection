import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Axios from 'axios';
import { systemSchema } from '../Validations/SystemUpdateValidation';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    button: {
        backgroundColor: '#008891',
        margin: theme.spacing(2),
    },
    error: {
        margin: theme.spacing(2)
    },
    textField: {
        marginBottom: theme.spacing(2)
    }
}));

export default function UpdateSettingsForm() {
    const classes = useStyles();

    // connect yup and react-hook-form
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(systemSchema),
    });

    // if validations are passed
    const submitForm = (data) => {
        console.log(data);
        if (data['lowBound'] > data['highBound']) {
            alert("Low bound must be smaller than high bound")
            window.location.reload(true);
        }
        else if (data['lowBound'] === data['highBound']) {
            alert("Low bound and High bound cannot be same")
            window.location.reload(true);
        }

        else {
            Axios.put("http://localhost:3001/System/update/lowBound", {
                low_bound: data['lowBound'],
            }).then((response) => {
                if (response.data.error) {
                    alert(response.data.error);
                    window.location.reload(true);
                }
                else {
                    alert(response.data.message);
                    window.location.reload(true);
                }
            });

            Axios.put("http://localhost:3001/System/update/highBound", {
                high_bound: data['highBound'],
            }).then((response) => {
                if (response.data.error) {
                    alert(response.data.error);
                    window.location.reload(true);
                }
                else {
                    alert(response.data.message);
                    window.location.reload(true);
                }
            });
        }

    }
    return <div className={classes.margin}>
        <form onSubmit={handleSubmit(submitForm)}>

            {/* <TextField label="Change Low Bound" name="lowBound" {...register('lowBound')} className={classes.textField} />
            <div className={(classes.error)}><div className='error'>{errors.lowBound?.message}</div></div>
            <TextField label="Change High Bound" name="highBound" {...register('highBound')} className={classes.textField} />
            <div className={(classes.error)}><div className='error'>{errors.highBound?.message}</div></div>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                size="medium"
                className={classes.button}
                startIcon={<SaveIcon />}

            >
                Save Changes
            </Button> */}
            <FormControl>

                <FormControl>
                    <InputLabel htmlFor="my-input">Change Low Bound</InputLabel>
                    <Input id="low-bound" aria-describedby="my-helper-text" name="lowBound" {...register('lowBound')} />

                </FormControl>
                <div className={(classes.error)}><div className='error'>{errors.lowBound?.message}</div></div>
                <FormControl>
                    <InputLabel htmlFor="my-input">Change High Bound</InputLabel>
                    <Input id="high-bound" aria-describedby="my-helper-text" name="highBound" {...register('highBound')} />

                </FormControl>
                <div className={(classes.error)}><div className='error'>{errors.highBound?.message}</div></div>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="medium"
                    className={classes.button}
                    startIcon={<SaveIcon />}

                >
                    Save Changes
                </Button>

            </FormControl>
        </form>
    </div>
}

