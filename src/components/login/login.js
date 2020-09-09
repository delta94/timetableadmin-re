import React from "react"
import "./login.css"
import logo from "../../images/Logo.png"
// import {Link,BrowserRouter as Router,Switch,Route} from "react-router-dom"
// import Layout from "../../pages/layout"

const Login = () => {

    
    return (
        <div className="login">
             <div className="login-container">
                <img src={logo} alt="logo" className="logo"/>

                <div className="header-text">
                    <h2>Welcome Back</h2>
                    <p className="grey">Hey Admin, Glad to have you back there</p>
                </div>

                <div className="input-container">
                    <div className="input-group">
                        <p className="grey">Admin Number</p>
                        <input placeholder="13CK015497"/>
                    </div>
                    <div className="input-group">
                        <p className="grey">Password</p>
                        <input placeholder="Password"/>
                    </div>
                </div>

                {/* <Link to="/Dash">Sign In</Link><br/> */}

                <em>Forgot your password? <span>Click here</span></em>

                {/* <Router>
                    <Switch>
                        <Route path="/Dash" component={Layout}/>
                    </Switch>
                </Router> */}
            </div>
        </div>   
    );
}

export default Login