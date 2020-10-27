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
import Notification from "../components/notification/notification"
import Student from "../components/student/student"
import Timetable from "../components/timetable/timetable";
import Events from "../components/events/events"
import "./layout.css"

// Images
import profileImg from "../images/profile-image.png"
import dashboard from "../images/dashboard.png"
import room from "../images/room-icon.png"
import course from "../images/course-icon.png"
import lecturer from "../images/lecturer-icon.png"
import classes from "../images/room-icon.png"
import period from "../images/clock.png"
import acct from "../images/account-icon.png"
import logout from "../images/logout-icon.png"
import event from "../images/Group 190.png"
import {Swipeable} from 'react-swipeable'


const routes = [
  {
    path: "dashboard",
    exact: true,
    main: Dashboard
  },
  {
    path: "rooms",
    main: Room
  },
  {
    path: "courses",
    main: Course
  },
  {
    path: "lecturers",
    main: Lecturer
  }
  ,
  {
    path: "classes",
    main: Classes
  }
  ,
  {
    path: "periods",
    main: Period
  },
  {
    path: "notification",
    main: Notification
  },
  {
    path: "student",
    main: Student
  },
  {
    path: "timetable",
    main: Timetable
  },
  {
    path: "events",
    main: Events
  }
];

class SidebarExample extends Component{

        state={
          sideBarOut: false
        }

        userSwipedRight = () => {
          this.setState({sideBarOut: true})
        }

        userSwipedLeft = () => {
          this.setState({sideBarOut: false})
        }


        render(){

        return (
            <div>
                <Swipeable onSwipedLeft={this.userSwipedLeft}>
                  <div className={this.state.sideBarOut === true ? "overlay overlayOut" : "overlay"}
                    onClick={()=> this.setState({sideBarOut: false})}></div>
                </Swipeable>
                <aside className={this.state.sideBarOut === true ? "sidenav sidenavOut" : "sidenav"}>
                      <ul>
                          <Link to="/" onClick={()=> {
                            this.setState({sideBarOut: false})
                            localStorage.clear()
                          }}>
                          <img alt="Profile" className="profile-image" src={profileImg}/>
                              Admin</Link> 
          
                          <NavLink 
                          to="/app/dashboard" 
                          onClick={()=> this.setState({sideBarOut: false})} activeClassName="active" style={{marginTop: "10px"}}>
                          <img alt="sidenav" src={dashboard}/>Dashboard</NavLink>

                          <NavLink 
                          to="/app/rooms" 
                          onClick={()=> this.setState({sideBarOut: false})} activeClassName="active">
                          <img alt="sidenav" src={room}/> 
                          Rooms</NavLink>

                          <NavLink 
                          to="/app/courses" 
                          onClick={()=> this.setState({sideBarOut: false})} activeClassName="active">
                          <img alt="sidenav" src={course}/>
                          Courses</NavLink> 
          
                          <NavLink 
                          to="/app/lecturers" 
                          onClick={()=> this.setState({sideBarOut: false})} activeClassName="active">
                          <img alt="sidenav" src={lecturer}/> Lecturer</NavLink>
          
                          <NavLink 
                          to="/app/classes" 
                          onClick={()=> this.setState({sideBarOut: false})} activeClassName="active">
                          <img alt="sidenav" src={classes}/>
                          Classes</NavLink> 
          
                          <NavLink 
                          to="/app/periods" 
                          onClick={()=> this.setState({sideBarOut: false})} activeClassName="active">
                          <img alt="sidenav" src={period}/>
                          Periods</NavLink>   
          
                          <NavLink 
                          to="/app/student" 
                          onClick={()=> {
                            this.setState({sideBarOut: false})
                          }} activeClassName="active">
                          <img alt="sidenav" src={acct}/>
                          Student</NavLink>

                          <NavLink 
                          to="/app/events" 
                          onClick={()=> {
                            this.setState({sideBarOut: false})
                          }} activeClassName="active">
                          <img alt="sidenav" src={event}/>
                          Events</NavLink>  
              
                          <Link 
                          to="/" 
                          onClick={()=> {
                              this.setState({sideBarOut: false})
                              localStorage.clear()
                          }} className="logout-image">
                          <img alt="sidenav" src={logout}/> 
                          Logout</Link>
                      </ul>
              </aside>
              <Swipeable
                onSwipedRight={this.userSwipedRight}
                style={{height: "100vh"}}
                >
                <div className="main-content">
                    <main>
                      <Switch>
                            {routes.map((route, index) => (
                            <Route
                                key={index}
                                path={`/App/${route.path}`}
                                exact={route.exact}
                                component={() => <route.main onHelp={this.eventhandler}/>}
                            />
                            ))}
                        </Switch>
                    </main>
                  </div>
              </Swipeable>
            </div>
        )
      }                        
    }

    export default SidebarExample;