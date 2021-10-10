import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Axios from 'axios';
import { addUnitSchema, removeUnitSchema } from '../Validations/addRemoveUnitValidation';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

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

    const [unitIdAdd, setUnitIdAdd] = useState('');
    // const [unitIdDel, setUnitIdDel] = useState('');
    // const [location, setLocation] = useState('');

    useEffect(() => {
        Axios.get("http://localhost:3001/Units/maxId")
            .then(res => {
                console.log(res);
                setUnitIdAdd(res.data[0].nextId + 1)
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    // const addUnit = () => {
    //     let url = "http://localhost:3001/Units/add?unitID=" + unitIdAdd;
    //     Axios.post(url, {
    //         unitLocation: location
    //     }).then((response) => {
    //         if (response.data.error) alert(response.data.error);
    //     });
    // }

    // const delUnit = () => {
    //     Axios.delete(`http://localhost:3001/Units/delete/${unitIdDel}`, {
    //     }).then((response) => {
    //         if (response.data.error) alert(response.data.error);
    //     });
    // }

    // connect yup and react-hook-form
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(addUnitSchema),
    });

    // const { register, handleSubmit, formState: { errors } } = useForm({
    //     resolver: yupResolver(removeUnitSchema),
    // });

    const submitAddForm = (data) => {
        let url = "http://localhost:3001/Units/add?unitID=" + unitIdAdd;
        Axios.post(url, {
            unitLocation: data['location']
        }).then((response) => {
            if (response.data.error) alert(response.data.error);
        });

    }

    const submitRemoveForm = (data) => {
        let unitIdDel = data['unitId'];
        Axios.delete(`http://localhost:3001/Units/delete/${unitIdDel}`, {
        }).then((response) => {
            if (response.data.error) alert(response.data.error);
        });
    }


    return (
        <div className={classes.margin}>
            <FormControl>
                <form onSubmit={handleSubmit(submitAddForm)}>
                    <FormControl>
                        <InputLabel htmlFor="my-input">Unit ID: {unitIdAdd}</InputLabel>
                        <Input id="bin-id-add" aria-describedby="my-helper-text" disabled="True" />

                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="my-input">Enter Location</InputLabel>
                        <Input id="bin-id-loc" aria-describedby="my-helper-text" name="location"
                            // take user input
                            // onChange={(e) => {
                            //     setLocation(e.target.value);
                            // }}
                            {...register('location')}
                        />
                        <div className='error'>{errors.location?.message}</div>

                    </FormControl><br></br>
                    <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                        // onClick={addUnit}
                        type="submit"
                    >
                        Add Unit
                    </Button>


                </form>
                <form onSubmit={handleSubmit(submitRemoveForm)}>
                    <FormControl>
                        <InputLabel htmlFor="my-input">Enter Unit ID</InputLabel>
                        <Input id="bin-id-del" aria-describedby="my-helper-text" name="unitId"
                            // take user input
                            // onChange={(e) => {
                            //     setUnitIdDel(e.target.value);
                            // }}
                            {...register('unitId')}
                        />
                        <div className='error'>{errors.unitId?.message}</div>

                    </FormControl><br></br>

                    <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        className={classes.button}
                        startIcon={<DeleteIcon />}
                        // onClick={() => delUnit()}
                        // onClick={delUnit}
                        type="submit"
                    >
                        Remove
                    </Button>

                </form>



            </FormControl>
        </div>

    );
}