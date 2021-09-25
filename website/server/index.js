const express = require('express');
const app = express();
const db = require("./connection")
const bodyParser = require('body-parser'); // ********
const SignupRoute = require("./Routes/Signup");
const SigninRoute = require("./Routes/Signin");
const cors = require('cors');


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/Signup", SignupRoute);
app.use("/Signin", SigninRoute);

app.listen(3002, function () {
    console.log('server running');
});