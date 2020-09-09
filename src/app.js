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
            <div>
                <Router>
                    <Switch>
                        <Route path="/Login" component={Login}/>
                    </Switch>
                </Router>
                <Layout />
            </div>
            
        </>
    );
}

export default App