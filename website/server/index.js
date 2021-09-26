const express = require('express');
const app = express();
const db = require("./connection")
const bodyParser = require('body-parser'); // ********
const SignupRoute = require("./Routes/Signup");
const SigninRoute = require("./Routes/Signin");
const BinRoute = require("./Routes/Bins");
const UnitRoute = require("./Routes/Units");
const SystemRoute = require("./Routes/System");
const CollectorsRoute = require("./Routes/Collectors");
const RequestsRoute = require("./Routes/Requests");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');


app.use(express.json());

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"], // change
    credentials: true
}));

app.use(session({ // NOT COMPLETED ////////////////////////////
    key: "userId",
    secret: "subscribe", // should change
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 2, // two hours expire
    }
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/Signup", SignupRoute);
app.use("/Signin", SigninRoute);
app.use("/Bins", BinRoute);
app.use("/Units", UnitRoute);
app.use("/System", SystemRoute);
app.use("/Collectors", CollectorsRoute);
app.use("/Requests", RequestsRoute);

app.listen(3002, function () {
    console.log('server running');
});