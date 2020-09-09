import React from "react"
import course from "../../images/course-icon.png"
import lecturer from "../../images/lecturer-icon.png"
import room from "../../images/room-icon.png"
import "./dashboard.css"
import bell from "../../images/alarm-bell@3x.png"
import logo from "../../images/Logo.png"

const Dashboard = () => {
    return(
        <>  
            <header>
                  <div>
                    <img src={logo} className="logo" alt="logo"/>
                    <p>Dashboard</p>
                  </div>
                <img src={bell} alt="bell"/>
              </header>
            <div className="card-container">
                <div className="card">
                    <img src={room} alt="card"/>
                    <h3>Lecture Rooms</h3>
                    <p>95</p>
                </div>
                <div className="card">
                    <img src={course} alt="card"/>
                    <h3>Courses</h3>
                    <p>95</p>
                </div>
                <div className="card">
                    <img src={lecturer} alt="card"/>
                    <h3>Lecturers</h3>
                    <p>95</p>
                </div>
                <div className="card">
                    <img src={room} alt="card"/>
                    <h3>Classes</h3>
                    <p>95</p>
                </div>
            </div>

            <div className="timetable-update">
                <p>Timetable update</p>

                <hr />

                <p>Timetable unavailable for now</p>

                <button>Update timetable now</button>
            </div>
        </>
    );
}

export default Dashboard;