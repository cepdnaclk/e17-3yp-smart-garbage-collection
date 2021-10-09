import * as yup from 'yup';

export const signupSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string(),
    username: yup.string().required('Username is required').max(20, 'Must be 20 characters or less'),
    password: yup.string().required('Password is required').min(5, 'Must be 5 characters or more'),
});
