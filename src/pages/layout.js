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
import Notification from "../components/notification/notification"
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
    path: "dashboard",
    exact: true,
    main: () => <Dashboard />
  },
  {
    path: "rooms",
    main: () => <Room />
  },
  {
    path: "courses",
    main: () => <Course />
  },
  {
    path: "lecturers",
    main: () => <Lecturer />
  }
  ,
  {
    path: "classes",
    main: () => <Classes />
  }
  ,
  {
    path: "periods",
    main: () => <Period />
  }
  ,
  {
    path: "studentPro",
    main: () => <StudentPro />
  },
  {
    path: "notification",
    main: () => <Notification />
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
          
                          <NavLink to="/app/dashboard" activeClassName="active" style={{marginTop: "10px"}}>
                          <img alt="sidenav" src={dashboard}/>Dashboard</NavLink>

                          <NavLink to="/app/rooms" activeClassName="active">
                          <img alt="sidenav" src={room}/> 
                          Rooms</NavLink>

                          <NavLink to="/app/courses" activeClassName="active">
                          <img alt="sidenav" src={course}/>
                          Courses</NavLink> 
          
                          <NavLink to="/app/lecturers" activeClassName="active">
                          <img alt="sidenav" src={lecturer}/> Lecturer</NavLink>
          
                          <NavLink to="/app/classes" activeClassName="active">
                          <img alt="sidenav" src={classes}/>
                          Classes</NavLink> 
          
                          <NavLink to="/app/periods" activeClassName="active">
                          <img alt="sidenav" src={period}/>
                          Periods</NavLink>   
          
                          <NavLink to="/app/studentPro" activeClassName="active">
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