/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect,useContext} from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
  import "./global/global.css"
import Layout from "./pages/layout"
import Login from "./components/login/login"
import {AuthContext} from "./contexts/authContext"

const App = () => {

    const context = useContext(AuthContext);

    const PrivateRoute = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
          context.auth === true || localStorage.getItem("loggedIn") === "true"
            ? <Component {...props} />
            : <Redirect to='/' />
        )} />
      )

   
    return(
        <>
            <Router>
                <Switch>
                    <Route path="/" exact={true} component={Login}/>
                    <PrivateRoute path="/app" component={Layout}/>
                </Switch>
            </Router>     
        </>
    );
}

export default App