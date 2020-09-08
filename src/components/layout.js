import React, { Component } from "react"
import "./layout.css"
import profileImg from "../images/profile-image.png"
import dashboard from "../images/dashboard-icon-unclicked.png"
import room from "../images/room-icon.png"
import course from "../images/course-icon.png"
import lecturer from "../images/lecturer-icon.png"
import classes from "../images/room-icon.png"
import period from "../images/clock.png"
import acct from "../images/account-icon.png"
import logout from "../images/logout-icon.png"
import bell from "../images/alarm-bell@3x.png"
import logo from "../images/Logo.png"

// Routes
import Course from "./course/course"
import Classes from "./class/class"
import Period from "./period/period"
import Room from "./room/room"
import Dashboard from "./dashboard/dashboard"
import Lecturer from "./lecturer/lecturer"

class Layout extends Component {

  state = {
    active: "Dashboard"
  }

  render(){
    return (
      <>
        <div>
          <aside className="sidenav">
              <ul>
                <li>
                  <a href="/">
                  <img alt="Profile" className="profile-image" src={profileImg}/>
                    Admin</a> 
                </li>
                <li className={this.state.active === "Dashboard" ? "active" : ""} 
                    onClick={(e) => {
                      e.preventDefault(); 
                      this.setState({active: "Dashboard"})
                    }}
                >
                  <a href="/">
                  <img alt="sidenav" src={dashboard}/>Dashboard</a>
                </li>
                <li className={this.state.active === "Rooms" ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault(); 
                      this.setState({active: "Rooms"})
                    }}
                >
                  <a href="/">
                  <img alt="sidenav" src={room}/> 
                  Rooms</a>
                </li>
                <li className={this.state.active === "Courses" ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault(); 
                      this.setState({active: "Courses"})
                    }}
                >
                  <a href="/">
                  <img alt="sidenav" src={course}/>
                  Courses</a> 
                </li>
                <li className={this.state.active === "Lecturers" ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault(); 
                      this.setState({active: "Lecturers"})
                    }}
                >
                  <a href="/">
                  <img alt="sidenav" src={lecturer}/> Lecturer</a>
                </li>
                <li className={this.state.active === "Classes" ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault(); 
                      this.setState({active: "Classes"})
                    }}
                >
                  <a href="/">
                  <img alt="sidenav" src={classes}/>
                  Classes</a> 
                </li>
                <li className={this.state.active === "Periods" ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault(); 
                      this.setState({active: "Periods"})
                    }}
                >
                  <a href="/">
                  <img alt="sidenav" src={period}/>
                  Periods</a>   
                </li>
                <li className={this.state.active === "My Account" ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault(); 
                      this.setState({active: "My Account"})
                    }}
                >
                  <a href="/">
                  <img alt="sidenav" src={acct}/>
                  My Account</a>  
                </li>
                <li className="logout-image">
                  <a href="/">
                  <img alt="sidenav" src={logout}/> 
                  Logout</a>
                </li>
              </ul>
            </aside>
            <div className="main-content">
              <header>
                  <div>
                    <img src={logo} className="logo" alt="logo"/>
                    <p>{this.state.active}</p>
                  </div>
                <img src={bell} alt="bell"/>
              </header>
              <main>
                { this.state.active === "Dashboard" ? <Dashboard /> : ""}
                { this.state.active === "Courses" ? <Course /> : ""}
                { this.state.active === "Rooms" ? <Room /> : ""}
                { this.state.active === "Lecturers" ? <Lecturer /> : ""}
                { this.state.active === "Classes" ? <Classes /> : ""}
                { this.state.active === "Periods" ? <Period /> : ""}
              </main>
            </div>
        </div>
      </>
    )
  }
  
}

export default Layout
