import React from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import Login from "./components/login/login"
import Layout from "./pages/layout"

const App = () => {
    
    return(
        <>
            <Router>
                <Switch>
                    <Route path="/" exact={true} component={Login}/>
                    <Route path="/app" component={Layout}/>
                </Switch>
            </Router>     
        </>
    );
}

export default App