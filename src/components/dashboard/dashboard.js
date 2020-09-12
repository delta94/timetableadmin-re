import React,{useState} from "react"
import {Link} from "react-router-dom"
import course from "../../images/course-icon.png"
import lecturer from "../../images/lecturer-icon.png"
import room from "../../images/room-icon.png"
import "./dashboard.css"
import bell from "../../images/alarm-bell@3x.png"
import logo from "../../images/Logo.png"
import pro from "../../images/single-man-profile-picture.png"
import cross from "../../images/close.png"
import update from "../../images/refresh.png"
import ham from "../../images/ham.png"


const Dashboard = ({onHelp}) => {

    const [modalOut, setModalOut] = useState(false)

    const [updateOut, setUpdateOut] = useState(false)

    return(
        <>  
            <header>
                  <div>
                    <img src={logo} className="logo" alt="logo" />
                    <p>Dashboard</p>
                  </div>
                  <div className="navMobile">
                    <img src={update} alt="update" className="update" 
                    onClick={()=>{
                        setUpdateOut(!updateOut);
                    }}/>
                    <Link to="/app/notification">
                        <img src={bell} alt="bell"/>
                    </Link>
                    <div onClick={() => onHelp()} className="ham">
                        <img src={ham} alt="hamburger"/>
                    </div>
                  </div>
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
                    <p>120</p>
                </div>
                <div className="card">
                    <img src={lecturer} alt="card"/>
                    <h3>Lecturers</h3>
                    <p>32</p>
                </div>
                <div className="card">
                    <img src={room} alt="card"/>
                    <h3>Classes</h3>
                    <p>46</p>
                </div>
                <div className="card">
                    <img src={pro} alt="card"/>
                    <h3>Students</h3>
                    <p>41</p>
                </div>
            </div>

            <div className={updateOut === true ? "timetable-update updateOut" : "timetable-update"}>
                <p>Timetable update</p>

                <hr />

                <p>Timetable unavailable for now</p>

                <button onClick={()=>{
                        setModalOut(!modalOut);
                    }}>Create new timetable now</button>
            </div>

                <div className={modalOut === true ? "overlay modOut" : "overlay"}
                    onClick={()=>{
                        setModalOut(!modalOut);
                    }}></div>

                <div className={modalOut === true ? "modal dashModal modOut" : " dashModal modal"}>
                    <div className="head">
                        <h3>Add new timetable</h3>
                        <img src={cross} alt="cross" onClick={()=>{
                        setModalOut(!modalOut);
                    }}/>
                    </div>
                    <div className="input-c">
                        <div className="input-g">
                            <p>Timetable Name</p>
                            <input />
                        </div>
                        <div className="input-g">
                            <p>Select Academic Period</p>
                            <input placeholder="Select an academic period"/>
                        </div>
                        <div className="input-g">
                            <p>Select days</p>
                            <div className="labels">
                                <label className="container">Monday
                                    <input type="checkbox" defaultChecked="checked" />
                                    <span className="checkmark"></span>
                                </label>

                                <label className="container">Tuesday
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                </label>

                                <label className="container">Wednesday
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                </label>

                                <label className="container">Thursday
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                </label>
                                <label className="container">Friday
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                </label>
                                <label className="container">Saturday
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                </label>
                            <div />
                        </div>
                    </div>
                    <div className="buttons">
                        <button className="red">Cancel</button>
                        <button className="blue">
                            Add course
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;