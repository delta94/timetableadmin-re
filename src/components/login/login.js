/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect, useState, useContext} from "react"
import logo from "../../images/Logo.png"
import axios from "axios"
import "./login.css"
import {AuthContext} from "../../contexts/authContext"


    const Login = (props) => {

            const context = useContext(AuthContext);
        
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
                    context.auth = true
                    localStorage.setItem("loggedIn", true)
                    props.history.push("/app/dashboard")
                })
                .catch((error) => {
                    const idInput = document.querySelector(".id")
                    const pwInput = document.querySelector(".pword")
                    const logerr = document.querySelector(".logErr")
                    if({...error}.response && {...error}.response.data.success === false){
                        context.auth = false
                        idInput.classList.add("error");
                        pwInput.classList.add("error")
                        logerr.classList.add("display")
                    }
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
    
            }}
    
            useEffect(() => {
                checkInput()
            }, [document.querySelector(".id"), document.querySelector(".pword")])
    
            const handleLogin = (event) => {
    
                event.preventDefault()
    
                checkLog()

            }
    
            return (
                <div className="login">
                 <div className="login-container">
                    <img src={logo} alt="logo" className="logo"/>
    
                    <div className="header-text">
                        <h2>Welcome Back</h2>
                        <p className="grey">Hey Admin, Glad to have you back there</p>
                        <p className="logErr">Invalid ID/Password Try again</p>
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

export default Login;