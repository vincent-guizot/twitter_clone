import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import routes from './routes'
import { Provider } from 'react-redux'
import store from './store'

// localStorage.setItem(
//   'access_token',
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk0Nzk5MDU2fQ.eBRj703buff1jEgkiJURxpWRCursMCa34yx0wdssCug')
// localStorage.setItem(
//   'UserId',
//   '1')

function App() {

  function RouteWithSubRoutes(route) {
    return (
      <Route
        path={route.path}
        render={props => (
          // pass the sub-routes down to keep nesting
          <route.component {...props} routes={route.routes} />
        )}
      />
    );
  }

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
            {!localStorage.getItem("access_token") ?
              < Redirect from="/" to="/login"></Redirect> :
              <Redirect from="/" to="/home" ></Redirect>
            }
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
