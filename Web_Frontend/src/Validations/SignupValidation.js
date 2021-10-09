import * as yup from 'yup';

export const signupSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string(),
    username: yup.string().max(20, 'Must be 20 characters or less').required('Username is required'),
    password: yup.string().min(5, 'Must be 5 characters or more').required('Username is required'),
});
