const yup = require('yup');

const signinSchema = yup.object().shape({
    adminusername: yup.string().required(),
    adminpassword: yup.string().required(),
});

module.exports = signinSchema;