import React,{useState, useEffect} from "react"
import {Link} from "react-router-dom"
import "./dashboard.css"
import logo from "../../images/Logo.png"
import cross from "../../images/close.png"
import axios from "axios"
import spinner from "../../images/spinner.gif"


const Dashboard = (props) => {

    const [modalOut, setModalOut] = useState(false)
    const [updateOut, setUpdateOut] = useState(false)
    const [loading, setLoading] = useState(false)
    const [rooms,setRooms] = useState([])   
    const [courses, setCourses] = useState([])
    const [lecturers,setLecturers] = useState([])
    const [classes,setClasses] = useState([])
    const [students,setStudents] = useState([])   

    // For cancelling requests
    const source = axios.CancelToken.source();

    const [roomL, setRoomL] = useState("")
    const [courseL, setCourseL] = useState("")
    const [lectL, setLectL] = useState("")
    const [classL, setClassL] = useState("")
    const [studentsL,setStudentsL] = useState([])   

    const getDetails = () => {

            axios({
                method: 'get',
                url: 'https://tbe-node-deploy.herokuapp.com/Admin/room',
                headers: { },
                cancelToken: source.token
            })
            .then((response) => {
                setRooms(response.data.data)
            })
            .catch((error) => {
            });

            axios({
                method: 'get',
                url: 'https://tbe-node-deploy.herokuapp.com/Admin/getCourse',
                headers: { },
                cancelToken: source.token
                })
            .then((response) => {
                var res = response.data.data
                setCourses(res)
            })
            .catch((error) => {
            });

            axios({
            method: 'get',
            url: 'https://tbe-node-deploy.herokuapp.com/Admin/getlecturer',
            headers: { },
            cancelToken: source.token
            })
            .then((response) => {
            setLecturers(response.data.data)
            })
            .catch((error) => {
            });

            axios({
                method: 'get',
                url: 'https://tbe-node-deploy.herokuapp.com/Admin/class/all',
                headers: { },
                cancelToken: source.token
                })
            .then((response) => {
                setClasses(response.data.data)
            })
            .catch((error) => {
            });

            axios({
            method: 'get',
            url: 'https://tbe-node-deploy.herokuapp.com/Admin/students/all',
            headers: { },
            cancelToken: source.token
            })
            .then((response) => {
            setStudents(response.data.data)
            setLoading(true)
            })
            .catch((error) => {
            });
    }

    const getDetailsLength = () => {
        setRoomL(rooms.length)
        setCourseL(courses.length)
        setLectL(lecturers.length)
        setClassL(classes.length)
        setStudentsL(students.length)
    }

    useEffect(() => {
        getDetails()
        getDetailsLength()
        return () => {
            source.cancel("Component got unmounted");
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[students])

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
              {loading === true ?  
                <div className="card-container">       
                    <Link to="/app/rooms">
                        <div className="card card-room">
                            <h3>Lecture Rooms</h3>
                            <p>{roomL}</p>
                        </div>
                    </Link>
                    <Link to="/app/courses">
                        <div className="card card-course">
                            <h3>Courses</h3>
                            <p>{courseL}</p>
                        </div>
                    </Link>
                    <Link to="/app/lecturers">
                        <div className="card card-lect">
                            <h3>Lecturers</h3>
                            <p>{lectL}</p>
                        </div>
                    </Link>
                    <Link to="/app/classes">
                        <div className="card card-class">
                            <h3>Classes</h3>
                            <p>{classL}</p>
                        </div>
                    </Link>
                    <Link to='/app/student'>
                        <div className="card card-stud">
                            <h3>Students</h3>
                            <p>{studentsL}</p>
                        </div>
                    </Link>
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