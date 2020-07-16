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

function App() {

  function PrivatRoutes(route) {
    const Component = route.component 
    const isLogin = localStorage.getItem('access_token')
    return (
      <Route
        path={route.path}
        render={props => {
          if (route.path !== '/auth' && !isLogin) {
            return <Redirect to="/auth" />
          } else {
            return <Component {...route} />
          }
        }}
      />
    )
  }

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            {routes.map((route, i) => (
              <PrivatRoutes key={i} {...route} />
            ))}
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
