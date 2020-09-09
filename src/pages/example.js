import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import Dashboard from "../components/dashboard/dashboard"
import Course from "../components/course/course"
import Classes from "../components/class/class"
import Period from "../components/period/period"
import Room from "../components/room/room"
import Lecturer from "../components/lecturer/lecturer"
import "../components/layout.css"
import profileImg from "../images/profile-image.png"
import dashboard from "../images/dashboard-icon-unclicked.png"
import room from "../images/room-icon.png"
import course from "../images/course-icon.png"
import lecturer from "../images/lecturer-icon.png"
import classes from "../images/room-icon.png"
import period from "../images/clock.png"
import acct from "../images/account-icon.png"
import logout from "../images/logout-icon.png"

// Each logical "route" has two components, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.

// We are going to use this route config in 2
// spots: once for the sidebar and once in the main
// content section. All routes are in the same
// order they would appear in a <Switch>.
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
//   ,
//   {
//     path: "/My-Account",
//     main: () => <Account />
//   }
];

export default class SidebarExample extends Component  {

    state = {
        active: "Dashboard"
      }
      render(){

        return (
        <Router>
            <div>
            <aside className="sidenav">
                    <ul>
                        <Link to="/">
                        <img alt="Profile" className="profile-image" src={profileImg}/>
                            Admin</Link> 
        
                        <NavLink to="/Dashboard" activeClassName="active">
                        <img alt="sidenav" src={dashboard}/>Dashboard</NavLink>

                        <NavLink to="/Rooms" activeClassName="active">
                        <img alt="sidenav" src={room}/> 
                        Rooms</NavLink>

                        <NavLink to="Courses" activeClassName="active">
                        <img alt="sidenav" src={course}/>
                        Courses</NavLink> 
        
                        <NavLink to="Lecturers" activeClassName="active">
                        <img alt="sidenav" src={lecturer}/> Lecturer</NavLink>
        
                        <NavLink to="/Classes" activeClassName="active">
                        <img alt="sidenav" src={classes}/>
                        Classes</NavLink> 
        
                        <NavLink to="/Periods" activeClassName="active">
                        <img alt="sidenav" src={period}/>
                        Periods</NavLink>   
        
                        <Link to="/">
                        <img alt="sidenav" src={acct}/>
                        My Account</Link>  
            
                        <Link href="/" className="logout-image">
                        <img alt="sidenav" src={logout}/> 
                        Logout</Link>
                    </ul>
                    </aside>
            <div className="main-content">
              <main>
              <Switch>
                    {routes.map((route, index) => (
                    // Render more <Route>s with the same paths as
                    // above, but different components this time.
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        children={<route.main />}
                    />
                    ))}
                </Switch>
              </main>
            </div>
            </div>
        </Router>
    )
  }

}