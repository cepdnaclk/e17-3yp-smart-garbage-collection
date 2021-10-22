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
const MobSignupRoute = require("./Routes/MobSignup");
const MobSigninRoute = require("./Routes/MobSignin");
const BinRequestRoute = require("./Routes/MobRequest");
const AuthRoute = require("./Routes/Auth");
const HardwareRoute = require("./Routes/Hardware");
const CollectorProfile = require("./Routes/collectorProfile");

const auth = require('./middlewares/auth');
const errors = require('./middlewares/errors');
const unless = require('express-unless');

const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// let x = 18;
// let y = 10;
// let z = Math.floor(x / y);
// console.log(z);

/*auth.authenticateToken.unless = unless;
app.use(
    auth.authenticateToken.unless({
        path: [
            { url: "/api/Signup", methods: [POST] },
            { url: "/api/authenticate", methods: [POST] },

        ],
    })
);*/

app.use(express.json());
//app.use(cors());

//app.use(function (req, res, next))
app.use(cors({
    // origin: ["http://localhost:55556"],
    //origin: ["http://localhost:8000"],
    origin: ["http://localhost:8000"],
    methods: ["GET", "POST", "PUT", "DELETE"], // change
    credentials: true
}));

// app.use(session({ // NOT COMPLETED ////////////////////////////
//     key: "userId",
//     secret: "subscribe", // should change
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         expires: 60 * 60 * 2, // two hours expire
//     }
// }));

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
app.use("/Auth", AuthRoute);
app.use("/Hardware", HardwareRoute);
app.use("/api", MobSignupRoute);
app.use("/api", MobSigninRoute);
app.use("/api", BinRequestRoute);

app.use(errors.errorHandler);
app.use("/api", CollectorProfile);

app.listen(8000, function() {
    console.log('server running');
});