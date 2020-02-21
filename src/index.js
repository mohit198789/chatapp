import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Route,BrowserRouter as Router} from 'react-router-dom';
import LoginComponent from './login/login';
import SignupComponent from './signup/signup';
import DashboardComponent from './dashboard/dashboard';

//Firebase initialization
const firebase=require("firebase");
require("firebase/firestore");
firebase.initializeApp({
    apiKey: "AIzaSyA493lyK64EvfZO7zbPe3ZXrtJPd_msBMA",
    authDomain: "chatapp-51598.firebaseapp.com",
    databaseURL: "https://chatapp-51598.firebaseio.com",
    projectId: "chatapp-51598",
    storageBucket: "chatapp-51598.appspot.com",
    messagingSenderId: "574971948787",
    appId: "1:574971948787:web:18c5308afa8585778f5186",
    measurementId: "G-MPGYDW7HR7"
});

const routing=(
<Router>
    <div id="routing-conatiner">
        <Route path='/login' component={LoginComponent}></Route>
        <Route path='/signup' component={SignupComponent}></Route>
        <Route path='/dashboard' component={DashboardComponent}></Route>
    </div>
</Router>
);
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
