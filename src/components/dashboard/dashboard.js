import React,{useState} from "react"
import {Link} from "react-router-dom"
import "./dashboard.css"
import "../../global/global.css"
import logo from "../../images/Logo.png"
import cross from "../../images/close.png"
import axios from "axios"
import spinner from "../../images/spinner.gif"
import { CSSTransition} from "react-transition-group";
import {useQuery} from "react-query"


const getVenues = () => {

    return axios.get('https://tbe-node-deploy.herokuapp.com/Admin/room', {
        headers: {},
        params: { page: 1, searchQuery: ''}
    })
    .then((response) => {
        return response.data.data.docs
    })
}

const getCourses = () => {

    return axios.get('https://tbe-node-deploy.herokuapp.com/Admin/getCourse', {
        headers: {},
        params: { page: 1, searchQuery: ''}
    })
    .then((response) => {
        return response.data.data.docs
    })
}

const getLecturers = () => {

    return axios.get('https://tbe-node-deploy.herokuapp.com/Admin/getlecturer', {
        headers: {},
        params: { page: 1, searchQuery: ''}
    })
    .then((response) => {
        return response.data.data.docs
    })
}

const getClasses = () => {

    return axios.get('https://tbe-node-deploy.herokuapp.com/Admin/class/all', {
        headers: {},
        params: { page: 1, searchQuery: ''}
    })
    .then((response) => {
        return response.data.data.docs
    })
}

const getEvents = () => {

    return axios.get('https://tbe-node-deploy.herokuapp.com/user/events/day', {
        headers: {
            'date1': ''
        },
        params: { page: 1, searchQuery: ''}
    })
    .then((response) => {
        return response.data.data.docs
    })
}

const getStudents = () => {

    return axios.get('https://tbe-node-deploy.herokuapp.com/Admin/students/all', {
        headers: {},
        params: { page: 1, searchQuery: ''}
    })
    .then((response) => {
        return response.data.data.docs
    })
}


const Dashboard = (props) => {

    const venues = useQuery('venues', getVenues, {
        refetchOnWindowFocus: false
    })

    const courses = useQuery('courses', getCourses, {
        refetchOnWindowFocus: false
    })

    const classes = useQuery('classes', getClasses, {
        refetchOnWindowFocus: false
    })

    const lecturers = useQuery('lecturers', getLecturers, {
        refetchOnWindowFocus: false
    })

    const events = useQuery('events', getEvents, {
        refetchOnWindowFocus: false
    })

    const {isLoading, data} = useQuery('students', getStudents, {
        refetchOnWindowFocus: false
    })

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
                    <div className="update" 
                    onClick={()=>{
                        setUpdateOut(!updateOut);
                    }}></div>
                    <Link to="/app/notification">
                        <div className="bell"></div>
                    </Link>
                  </div>
              </header>
              {isLoading === false ?  
                <div className="card-container">       
                    <CSSTransition
                            timeout={10}
                            className="cardani"
                            in={true}
                            appear={true}
                            key="e"
                            onEntered={()=> {
                                console.log("entered")
                                document.querySelector(".cardani").classList.add("cardani2")
                                }}>
                            <Link to="/app/rooms">
                                <div className="card card-room">
                                    <h3>Lecture Rooms</h3>
                                    <p>{venues.data?.length}</p>
                                </div>
                            </Link>
                    </CSSTransition>
                    <CSSTransition
                            timeout={10}
                            className="cardania"
                            in={true}
                            appear={true}
                            key="a"
                            onEntered={()=> {
                                console.log("entered")
                                document.querySelector(".cardania").classList.add("cardania2")
                                }}>
                            <Link to="/app/courses">
                                <div className="card card-course">
                                    <h3>Courses</h3>
                                    <p>{courses.data?.length}</p>
                                </div>
                            </Link>
                    </CSSTransition>
                    <CSSTransition
                            timeout={10}
                            className="cardanib"
                            in={true}
                            appear={true}
                            key="b"
                            onEntered={()=> {
                                console.log("entered")
                                document.querySelector(".cardanib").classList.add("cardanib2")
                                }}>
                            <Link to="/app/lecturers">
                                <div className="card card-lect">
                                    <h3>Lecturers</h3>
                                    <p>{lecturers.data?.length}</p>
                                </div>
                            </Link>
                    </CSSTransition>
                    <CSSTransition
                            timeout={10}
                            className="cardanic"
                            in={true}
                            appear={true}
                            key="c"
                            onEntered={()=> {
                                console.log("entered")
                                document.querySelector(".cardanic").classList.add("cardanic2")
                                }}>
                            <Link to="/app/classes">
                                <div className="card card-class">
                                    <h3>Classes</h3>
                                    <p>{classes.data?.length}</p>
                                </div>
                            </Link>
                    </CSSTransition>
                    <CSSTransition
                            timeout={10}
                            className="cardanid"
                            in={true}
                            appear={true}
                            key="d"
                            onEntered={()=> {
                                console.log("entered")
                                document.querySelector(".cardanid").classList.add("cardanid2")
                                }}>
                            <Link to='/app/student'>
                                <div className="card card-stud">
                                    <h3>Students</h3>
                                    <p>{data?.length}</p>
                                </div>
                            </Link>
                    </CSSTransition>
                    <CSSTransition
                            timeout={10}
                            className="cardanie"
                            in={true}
                            appear={true}
                            key="evvd"
                            onEntered={()=> {
                                console.log("entered")
                                document.querySelector(".cardanie").classList.add("cardanid2")
                                }}>
                            <Link to='/app/events'>
                                <div className="card card-event">
                                    <h3>Events</h3>
                                    <p>{events.data?.length}</p>
                                </div>
                            </Link>
                    </CSSTransition>
            </div>
                : <div className="spinnerContainer"><img src={spinner} alt="loading.."/></div>}

            <div className={updateOut === true ? "timetable-update updateOut" : "timetable-update"}>
                <p>Timetable update</p>

                <hr />

                <p>Timetable unavailable for now</p>

                <button onClick={()=>{
                        setModalOut(!modalOut);
                    }}>Create new timetable now</button>
            </div>

            <div className={updateOut === true ? "timetable-update updateOut" : "timetable-update"}>
                <p className="mb-30">Timetable update</p>

                <hr />

                <p className="mb-20">Timetable available</p>

                <em className="mb-30">Timetable available for 200 level management sciences</em>

                <div className="timetable-stats">
                    <p>Status</p>
                    <p>Complete</p>
                </div>

                <div className="timetable-stats mb-30">
                    <p>Time</p>
                    <p>June 12th 2018 at 11:59pm</p>
                </div>

                <a href="/">Print Timetable</a>
                <a href=".">View More</a>
            </div>

            <div className={updateOut === true ? "timetable-update updateOut" : "timetable-update"}>
                <p className="mb-30">Timetable update</p>

                <hr />

                <p className="mb-20">Timetable available</p>

                <em className="mb-20">Timetable available for 200 level management sciences</em>
                <em className="mb-30">Timetable available for 300 level management sciences</em>

                <div className="timetable-stats">
                    <p>Created</p>
                    <p>June 12th 2018 at 11:59PM</p>
                </div>

                <button className="mb-20">Submit</button>
                <Link to="/app/timetable">View More</Link>
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