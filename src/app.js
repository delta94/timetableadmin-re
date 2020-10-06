/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect} from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
  import "./global/global.css"
import Layout from "./pages/layout"
import logo from "./images/Logo.png"
import "./components/login/login.css"


const App = () => {

    const [auth, setAuth] = useState(true)

    const PrivateRoute = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
          auth === true
            ? <Component {...props} />
            : <Redirect to='/' />
        )} />
      )


    const Login = (props) => {

        
        const checkInput = () => {
         //Get all the inputs...
        const inputs = document.querySelectorAll('input');

        // Loop through them...
        for(let input of inputs) {

            input.addEventListener('invalid', (event) => {
                input.classList.add('error');    
            }, false);
    
            input.addEventListener('blur', (event) => {
                input.checkValidity();

                if(input.validity.valid){
                    input.classList.remove('error')
                    input.classList.add('good')
                }else{
                    input.classList.add('error')
                    input.classList.remove('good')
                }
            })

            console.log("active")

        }}

        useEffect(() => {
            checkInput()
            console.log("fired")
        }, [document.querySelector(".id"), document.querySelector(".pword")])

        const handleLogin = (event) => {

            event.preventDefault()
            
            props.history.push("/app/dashboard")
        }

        return (
            <div className="login">
             <div className="login-container">
                <img src={logo} alt="logo" className="logo"/>

                <div className="header-text">
                    <h2>Welcome Back</h2>
                    <p className="grey">Hey Admin, Glad to have you back there</p>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="input-container">
                        <div className="input-group">
                            <p className="grey">Admin Number</p>
                            <input placeholder="13CK015497" className="id" required/>
                        </div>
                        <div className="input-group mb">
                            <p className="grey">Password</p>
                            <input placeholder="Password" className="pword" type="password" required/>
                        </div>
                    </div>

                    <button type="submit">Sign in</button>
                </form>
            </div>
        </div>   
        );
    }
    
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