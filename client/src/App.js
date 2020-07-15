import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import routes from './routes'
import { Provider } from 'react-redux'
import store from './store'

localStorage.setItem(
  'access_token',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk0NzIxNDU1fQ.2RxFl-OD3CplDCKJQgOCSNyaySc8GlBREBztGT3O_Ss')
localStorage.setItem(
  'UserId',
  '1')

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
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
