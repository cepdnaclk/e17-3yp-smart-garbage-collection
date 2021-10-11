import * as yup from 'yup';

export const addUnitSchema = yup.object().shape({
    location: yup.string().required("Required"),
});

export const removeUnitSchema = yup.object().shape({
    unitId: yup.number().required("Required").positive("Invalid Id").integer("Invalid Id"),
});