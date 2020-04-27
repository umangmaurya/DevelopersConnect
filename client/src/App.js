import React, { Fragment } from 'react';
import Navbar from './Components/Layouts/Navbar';
import Landing from './Components/Layouts/Landing';
import './App.css';

const App = () => {
    return (
        <Fragment className="App">
            <Navbar></Navbar>
            <Landing />
        </Fragment>
    );
}

export default App;
