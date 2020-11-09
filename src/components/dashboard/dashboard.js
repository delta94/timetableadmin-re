/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React,{useState} from "react"
import {Link} from "react-router-dom"
import "./dashboard.css"
import "../../global/global.css"
import logo from "../../images/Logo.png"
import cross from "../../images/close.png"
import axios from "axios"
import spinner from "../../images/spinner.gif"
import { CSSTransition} from "react-transition-group";
import {useQuery, useMutation} from "react-query"


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

const getTRes = (tResponse, {uuid}) => {

    return axios.get(`https://tbe-node-deploy.herokuapp.com/timetable/generated?timetableId=${uuid}`, {
    })
    .then((response) => {
        return response
    })
}

const postTimetable = (args) => {

    var group1 = {}
    var group2 = []
    var group3 = {}
    var group4 = []

    args.classes.data.forEach((ar)=> {
        group1 = { ...group1,
            [ar.name]: {
                capacity: ar.Population,
                type: 'theory'
            }
        }
    })

    args.courses.data.forEach((arr)=> {
        group2= [
            ...group2,
            {
            name: arr.name,
            lecturer: arr.lecturer[0].name,
            type: 'theory',
            students: arr.number,
            unit: arr.unit
        }]
    })

    for (var i = 0; i < args.datum.length; i++) {
        group4.push(args.datum[i])
    }

    group3 = {
        'timetableName': document.querySelector('.name').value,
        'academicSession': document.querySelector('.aca-period').value,
        'timetableId': args.uuid,
        'selectedDay': group4,
        'classroom': group1,
        'courses': group2
    }

    console.log(group3)

    return axios.post('https://tbe-node-deploy.herokuapp.com/timetable/new', group3, {
        headers: { 
            'Content-Type': 'application/json'
        }
    })
    .then((response) => {
        return response;
    })
    .then((error)=> {
        return error
    })
}


const Dashboard = (props) => {
    const [timetableFn, {status}] = useMutation(postTimetable, {
        onSuccess: () => {
            console.log("created")
            setCreated(true)
            setModalOut(false)
            setTimeout(() => {
                // setCreated(true)
            }, 10);
            // setCreated(false)
        },
        onError: (error) => {
            console.log({...error})
        }
    })


    function uuidFn() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    const [uuid, setUuid] = useState(uuidFn())

    const venues = useQuery('venues', getVenues, {
        refetchOnWindowFocus: false
    })

    const tResponse = useQuery(['tResponse', {uuid}], getTRes, {
        refetchOnWindowFocus: false,
        enabled: false
    })

    // console.log(tResponse.data?.data.data?.current_progress)

    const courses = useQuery('courses', getCourses, {
        refetchOnWindowFocus: false
    })

    const classes = useQuery('classes', getClasses, {
        refetchOnWindowFocus: false
    })

    console.log(venues?.data)

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
    const [created, setCreated] = useState(false)


    const submit = (e) => {

        e.preventDefault()
        const datum = [...document.querySelectorAll('input[type=checkbox]:checked')].map(e => e.value);

        timetableFn({classes, courses, datum, uuid})

        setInterval(() => {
            tResponse.refetch()
        }, 500); 
    }


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
                                document.querySelector(".cardanie").classList.add("cardanie2")
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

            { created === false ? <div className={updateOut === true ? "timetable-update updateOut" : "timetable-update"}>
                <p>Timetable update</p>

                <hr />

                <p>Timetable unavailable for now</p>

                <button onClick={()=>{
                        setModalOut(!modalOut);
                    }}>Create new timetable now</button>
            </div> : null}

            {created === true ? <div className={updateOut === true ? "timetable-update updateOut" : "timetable-update"}>
                <p className="mb-30">Timetable update</p>

                <hr />

                <p className="mb-20">Timetable available</p>

                <em className="mb-30">{tResponse.data?.data.data?.current_progress === 5000 ? <span>{tResponse.data?.data.data?.name}</span> : <span>Loading...</span>}</em>

                <div className="timetable-stats">
                    <p>Status</p>
                    {tResponse.data?.data.data?.current_progress === 5000 ? <p>Complete</p> : <progress value={!tResponse.data.data.error && tResponse.data?.data.data?.current_progress  ? (tResponse.data?.data.data?.current_progress/tResponse.data?.data.data?.total_progress) * 100 : 0} max="100"/>}
                </div>

                <div className="timetable-stats mb-30">
                    <p>Time</p>
                    <p>{tResponse.data?.data.data?.current_progress === 5000 ? <span>{new Date(tResponse.data?.data.data?.updatedAt.substring(0,10)).toDateString()} - {tResponse.data?.data.data?.updatedAt.substring(11,16)}</span> : <span>Loading...</span>}</p>
                </div>

                <a href="/">Print Timetable</a>
                <button>View More</button>
            </div> : null}

            {/* <div className={updateOut === true ? "timetable-update updateOut" : "timetable-update"}>
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
            </div> */}

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
                    <form onSubmit={submit}>
                    <div className="input-c">
                        <div className="input-g">
                            <p>Timetable Name</p>
                            <input name="name" className="name"/>
                        </div>
                        <div className="input-g">
                            <p>Select Academic Period</p>
                            <input name="aca-period" className="aca-period" placeholder="Select an academic period"/>
                        </div>
                        <div className="input-g">
                            <p>Select days</p>
                            <div className="labels">
                                <label className="container">Monday
                                    <input type="checkbox" value="monday" defaultChecked/>
                                    <span className="checkmark"></span>
                                </label>

                                <label className="container">Tuesday
                                    <input type="checkbox" value="tuesday" defaultChecked/>
                                    <span className="checkmark"></span>
                                </label>

                                <label className="container">Wednesday
                                    <input type="checkbox" value="wednesday" defaultChecked/>
                                    <span className="checkmark"></span>
                                </label>

                                <label className="container">Thursday
                                    <input type="checkbox" value="thursday" defaultChecked/>
                                    <span className="checkmark"></span>
                                </label>
                                <label className="container">Friday
                                    <input type="checkbox" value="friday" defaultChecked/>
                                    <span className="checkmark"></span>
                                </label>
                                <label className="container">Saturday
                                    <input type="checkbox" value="saturday" />
                                    <span className="checkmark"></span>
                                </label>
                            <div />
                        </div>
                    </div>
                    <div className="buttons">
                        <button className="red" onClick={()=>{
                        setModalOut(!modalOut);
                    }}>Cancel</button>
                        <button className="blue CTBtn" type="submit">
                        {status === "loading" ? <span>Loading...</span> : <span>Create timetable</span>}
                        </button>
                    </div>
                </div>
                </form>
            </div>
        </>
    );
}

export default Dashboard;