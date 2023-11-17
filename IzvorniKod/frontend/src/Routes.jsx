import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from './assets/Sign-in template/SignIn';
import Dashboard from './assets/Dashboard';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/singin" component={SignIn} />
        <Route path="/dashboard" component={Dashboard} />
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  );
};

export default Routes;
