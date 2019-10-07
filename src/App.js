import React from "react";
import { Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import "antd/dist/antd.css";

// Import Styles...
import "./App.css";

// Import Redux Store & Action...
import configStore from "../src/redux/store";
import history from "./history";

//Component imports
import Login from "./screens/Auth/login";
import Register from "./screens/Auth/Register";
import Dashboard from "./screens/Dashboard";
import Detail from "./screens/Article/Detail";

import AuthenticatedRoute from "./AuthenticatedRoute";

function App() {
  let { store, persistor } = configStore;

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Switch>
            <AuthenticatedRoute exact path="/login" component={Login} />
            <AuthenticatedRoute exact path="/register" component={Register} />
            <AuthenticatedRoute exact path="/article" component={Dashboard} />
            <AuthenticatedRoute
              exact
              path="/article/:title"
              component={Detail}
            />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
