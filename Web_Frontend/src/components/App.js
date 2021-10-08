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
import TempOverview from '../pages/TempOverview'; // temporary one -remove this

function App() {
    return (<Router>
        <Switch>
            <Route exact path="/"><Home /></Route>
            <Route exact path="/Signin"><Signin /></Route>
            <Route exact path="/Signup"><Signup /></Route>
            <Route exact path="/Dashboard"><Dashboard /></Route>
            <Route exact path="/Overview"><Overview /></Route>
            <Route exact path="/Customize"><Customize /></Route>
            <Route exact path="/MapView"><MapView /></Route>
            <Route exact path="/SentRequests"><SentRequests /></Route>
            {/* temporary */}
            <Route exact path="/TempOverview"><TempOverview /></Route>

        </Switch>
    </Router>);

}

export default App;