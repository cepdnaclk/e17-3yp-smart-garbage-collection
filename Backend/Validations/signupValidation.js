const yup = require('yup');

const signupSchema = yup.object().shape({
    adminfname: yup.string().required(),
    adminlname: yup.string(),
    adminusername: yup.string().max(20).required(),
    adminpassword: yup.string().min(5).required(),
});

module.exports = signupSchema;