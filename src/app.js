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
import axios from "axios"


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

        const [loginData, setLoginData] = useState(
            {
                adminNumber: "",
                password: ""
            }
        );

        const loginFormFn = (e) => {

            setLoginData({
                ...loginData,
          
                // Trimming any whitespace
                [e.target.name]: e.target.value.trim()
              });
    
        }

        const checkLog = () => {
            
            let config = {
                method: 'post',
                url: 'https://tbe-node-deploy.herokuapp.com/admin/login',
                headers: { 
                'Content-Type': 'application/json'
                },
                data : loginData
            };
            
            axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                if({...error}.response.status === 404){
                    setAuth(false)
                }else{
                    setAuth(true)
                }
                console.log({...error});
            });
  
        }

        // Form validation
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
        }, [document.querySelector(".id"), document.querySelector(".pword")])

        const handleLogin = (event) => {

            event.preventDefault()
            
            props.history.push("/app/dashboard")

            console.log(loginData)

            checkLog() 
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
                            <input name="adminNumber" onChange={loginFormFn} placeholder="13CK015497" className="id" required/>
                        </div>
                        <div className="input-group mb">
                            <p className="grey">Password</p>
                            <input name="password" onChange={loginFormFn} placeholder="Password" className="pword" type="password" required/>
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