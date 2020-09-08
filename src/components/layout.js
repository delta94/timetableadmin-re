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

class Layout extends Component {

  state = {
    active: "dashboard"
  }

  render(){
    return (
      <>
          <aside className="sidenav">
            <ul>
              <li>
                <a href="/">
                <img alt="Profile" className="profile-image" src={profileImg}/>
                  Admin</a> 
              </li>
              <li className={this.state.active === "dashboard" ? "active" : ""} 
                  onClick={(e) => {
                    e.preventDefault(); 
                    this.setState({active: "dashboard"})
                    console.log(this.state)
                  }}
              >
                <a href="/">
                <img alt="sidenav" src={dashboard}/>Dashboard</a>
              </li>
              <li className={this.state.active === "room" ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault(); 
                    this.setState({active: "room"})
                  }}
              >
                <a href="/">
                <img alt="sidenav" src={room}/> 
                Rooms</a>
              </li>
              <li className={this.state.active === "course" ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault(); 
                    this.setState({active: "course"})
                  }}
              >
                <a href="/">
                <img alt="sidenav" src={course}/>
                Courses</a> 
              </li>
              <li className={this.state.active === "lecturer" ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault(); 
                    this.setState({active: "lecturer"})
                  }}
              >
                <a href="/">
                <img alt="sidenav" src={lecturer}/> Lecturer</a>
              </li>
              <li className={this.state.active === "class" ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault(); 
                    this.setState({active: "class"})
                  }}
              >
                <a href="/">
                <img alt="sidenav" src={classes}/>
                Classes</a> 
              </li>
              <li className={this.state.active === "period" ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault(); 
                    this.setState({active: "period"})
                  }}
              >
                <a href="/">
                <img alt="sidenav" src={period}/>
                Periods</a>   
              </li>
              <li className={this.state.active === "account" ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault(); 
                    this.setState({active: "account"})
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
          <main>{this.props.children}</main>
      </>
    )
  }
  
}

export default Layout
