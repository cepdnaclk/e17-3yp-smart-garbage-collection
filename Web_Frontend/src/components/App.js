import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Signin from '../pages/Signin.jsx';
import Signup from '../pages/Signup.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import Overview from '../pages/Overview.jsx';
import Customize from '../pages/Customize.jsx';
import MapView from '../pages/MapView.jsx';
import SentRequests from '../pages/SentRequests.jsx';
import PageNotFound from '../pages/PageNotFound.jsx';
import TempOverview from '../pages/TempOverview'; // temporary one -remove this
import { AuthContext } from '../helpers/AuthContext';
import { useState, useEffect } from 'react';
import Axios from 'axios';
// import ProtectedRoute from './ProtectedRoute.js';
import ProtectedRoute from './ProtectedRoute';

function App() {

    const [authState, setAuthState] = useState(false);

    useEffect(() => {
        Axios.get("http://54.197.72.211:5000/Auth", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then((res) => {
                if (res.data.error) {
                    setAuthState(false);
                }
                else {
                    setAuthState(true);
                }
            })

    }, [])
    return (
        <AuthContext.Provider value={{ authState, setAuthState }}>
            <Router>
                <Switch>
                    <Route exact path="/"><Home /></Route>
                    <Route exact path="/Signin"><Signin /></Route>
                    <Route exact path="/Signup"><Signup /></Route>
                    {/* <Route exact path="/Dashboard"><Dashboard /></Route> */}
                    {/* <Route exact path="/Overview"><Overview /></Route>
                    <Route exact path="/Customize"><Customize /></Route> */}
                    {/* <Route exact path="/MapView"><MapView /></Route> */}
                    {/* <Route exact path="/SentRequests"><SentRequests /></Route> */}
                    {/* temporary */}
                    <Route exact path="/TempOverview"><TempOverview /></Route>

                    {/* Protected Routes - Redirecting was unsuccesful */}

                    <ProtectedRoute path="/MapView" component={MapView} isAuth={authState} />
                    <ProtectedRoute path="/Dashboard" component={Dashboard} isAuth={authState} />
                    <ProtectedRoute path="/Overview" component={Overview} isAuth={authState} />
                    <ProtectedRoute path="/Customize" component={Customize} isAuth={authState} />
                    <ProtectedRoute path="/SentRequests" component={SentRequests} isAuth={authState} />


                    <Route path="*"><PageNotFound /></Route>

                </Switch>
            </Router>
        </AuthContext.Provider>);

}

export default App;