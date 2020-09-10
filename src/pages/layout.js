import React, { Component } from "react";
import {
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";

// Components
import Dashboard from "../components/dashboard/dashboard"
import Course from "../components/course/course"
import Classes from "../components/class/class"
import Period from "../components/period/period"
import Room from "../components/room/room"
import Lecturer from "../components/lecturer/lecturer"
import StudentPro from "../components/studentProfile/studentProfile"
import "./layout.css"

// Images
import profileImg from "../images/profile-image.png"
import dashboard from "../images/dashboard-icon-unclicked.png"
import room from "../images/room-icon.png"
import course from "../images/course-icon.png"
import lecturer from "../images/lecturer-icon.png"
import classes from "../images/room-icon.png"
import period from "../images/clock.png"
import acct from "../images/account-icon.png"
import logout from "../images/logout-icon.png"


const routes = [
  {
    path: "/Dashboard",
    exact: true,
    main: () => <Dashboard />
  },
  {
    path: "/Rooms",
    main: () => <Room />
  },
  {
    path: "/Courses",
    main: () => <Course />
  },
  {
    path: "/Lecturers",
    main: () => <Lecturer />
  }
  ,
  {
    path: "/Classes",
    main: () => <Classes />
  }
  ,
  {
    path: "/Periods",
    main: () => <Period />
  }
  ,
  {
    path: "/studentPro",
    main: () => <StudentPro />
  }
];


export default class SidebarExample extends Component  {

      render(){

        return (
            <div>
                <aside className="sidenav">
                      <ul>
                          <Link to="/">
                          <img alt="Profile" className="profile-image" src={profileImg}/>
                              Admin</Link> 
          
                          <NavLink to="/app//Dashboard" activeClassName="active" style={{marginTop: "10px"}}>
                          <img alt="sidenav" src={dashboard}/>Dashboard</NavLink>

                          <NavLink to="/app//Rooms" activeClassName="active">
                          <img alt="sidenav" src={room}/> 
                          Rooms</NavLink>

                          <NavLink to="/app//Courses" activeClassName="active">
                          <img alt="sidenav" src={course}/>
                          Courses</NavLink> 
          
                          <NavLink to="/app//Lecturers" activeClassName="active">
                          <img alt="sidenav" src={lecturer}/> Lecturer</NavLink>
          
                          <NavLink to="/app//Classes" activeClassName="active">
                          <img alt="sidenav" src={classes}/>
                          Classes</NavLink> 
          
                          <NavLink to="/app//Periods" activeClassName="active">
                          <img alt="sidenav" src={period}/>
                          Periods</NavLink>   
          
                          <NavLink to="/App//studentPro" activeClassName="active">
                          <img alt="sidenav" src={acct}/>
                          Student</NavLink>  
              
                          <Link to="/" className="logout-image">
                          <img alt="sidenav" src={logout}/> 
                          Logout</Link>
                      </ul>
              </aside>
                <div className="main-content">
                  <main>
                    <Switch>
                          {routes.map((route, index) => (
                          <Route
                              key={index}
                              path={`/App/${route.path}`}
                              exact={route.exact}
                              children={<route.main />}
                          />
                          ))}
                      </Switch>
                  </main>
                </div>
            </div>
    )
  }

}