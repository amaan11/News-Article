import React from "react";
import { Router, Switch, Route } from "react-router-dom";
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

function App() {
  let { store, persistor } = configStore;

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/article" component={Dashboard} />
            <Route exact path="/article/:title" component={Detail} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
