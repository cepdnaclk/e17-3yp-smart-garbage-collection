const express = require('express');
const app = express();
const db = require("./connection")
const SignupRoute = require("./Routes/Signup");
const cors = require('cors');


app.use(express.json());
app.use(cors());

app.use("/Signup", SignupRoute);

app.listen(3002, function () {
    console.log('server running');
});