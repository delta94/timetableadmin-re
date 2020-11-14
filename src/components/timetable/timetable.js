/* eslint-disable array-callback-return */
/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React,{useState} from "react"
import {Link} from "react-router-dom"
// import "./dashboard.css"
import "../../global/global.css"
import logo from "../../images/Logo.png"
import cross from "../../images/close.png"
import axios from "axios"
import spinner from "../../images/spinner.gif"
import { CSSTransition} from "react-transition-group";
import {useQuery, useMutation} from "react-query"



const getLength = () => {

    return axios.get('https://tbe-node-deploy.herokuapp.com/admin/count', {
        headers: {}
    })
    .then((response) => {
        return response.data
    })
}

const getCoursesT = () => {

    return axios.get('https://tbe-node-deploy.herokuapp.com/Admin/getCourse', {
        headers: {},
        params: {searchQuery: ''}
    })
    .then((response) => {
        return response.data.data.docs
    })
}

const getRoomsT = () => {

    return axios.get('https://tbe-node-deploy.herokuapp.com/Admin/room', {
        headers: {},
        params: {searchQuery: ''}
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

    args.roomsT.data.forEach((ar)=> {
        group1 = { ...group1,
            [ar.name]: {
                capacity: ar.capacity,
                type: 'theory'
            }
        }
    })

    args.coursesT.data.forEach((arr)=> {
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
    const [int, setInt] = useState(2000)
    const [enable, setEnable] = useState(false)

    const tResponse = useQuery(['tResponse', {uuid}], getTRes, {
        refetchOnWindowFocus: false,
        refetchInterval: int,
        enabled: enable
    })

    const coursesT = useQuery('coursesT', getCoursesT, {
        refetchOnWindowFocus: false
    })

    console.log(tResponse.data?.data.data)

    const roomsT = useQuery('roomsT', getRoomsT, {
        refetchOnWindowFocus: false
    })

    const {isLoading, data} = useQuery('lengths', getLength, {
        refetchOnWindowFocus: false
    })

    const [modalOut, setModalOut] = useState(false)
    const [updateOut, setUpdateOut] = useState(false)
    const [created, setCreated] = useState(false)
    const [showT, setShowT] = useState(false)



    const submit = (e) => {

        e.preventDefault()
        const datum = [...document.querySelectorAll('input[type=checkbox]:checked')].map(e => e.value);

        timetableFn({roomsT, coursesT, datum, uuid})

        setEnable(true)
        tResponse.refetch()
    }

    setInterval(()=> {
        if(tResponse.data?.data.data?.current_progress === 5000){
            setInt(-1)
        }
    }, 1000)

    const cProgress = tResponse.data?.data.data?.current_progress;
    const tProgress = tResponse.data?.data.data?.total_progress;
    const tDate = new Date(tResponse.data?.data.data?.updatedAt.substring(0,10)).toDateString();
    const tTime = tResponse.data?.data.data?.updatedAt.substring(11,16);


    var monday;

    const [mon1, setMon1] = useState([])
    const [mon2, setMon2] = useState([])
    const [mon3, setMon3] = useState([])
    const [mon4, setMon4] = useState([])

    var tuesday;

    const [tue1, setTue1] = useState([])
    const [tue2, setTue2] = useState([])
    const [tue3, setTue3] = useState([])
    const [tue4, setTue4] = useState([])

    var wednesday;

    const [wed1, setWed1] = useState([])
    const [wed2, setWed2] = useState([])
    const [wed3, setWed3] = useState([])
    const [wed4, setWed4] = useState([])

    var thursday;

    const [thur1, setThur1] = useState([])
    const [thur2, setThur2] = useState([])
    const [thur3, setThur3] = useState([])
    const [thur4, setThur4] = useState([])

    var friday;

    const [fri1, setFri1] = useState([])
    const [fri2, setFri2] = useState([])
    const [fri3, setFri3] = useState([])
    const [fri4, setFri4] = useState([])

    var saturday;

    const [sat1, setSat1] = useState([])
    const [sat2, setSat2] = useState([])
    const [sat3, setSat3] = useState([])
    const [sat4, setSat4] = useState([])

    const arrangeT = () => {
        // eslint-disable-next-line no-unused-expressions

        console.log(JSON.stringify(tResponse.data?.data.data?.courses))

        monday = tResponse.data?.data.data?.courses.filter((course) => {
            return course.assignedDay === 'monday'
        })

        tuesday = tResponse.data?.data.data?.courses.filter((course) => {
            return course.assignedDay === 'tuesday'
        })

        wednesday = tResponse.data?.data.data?.courses.filter((course) => {
            return course.assignedDay === 'wednesday'
        })

        thursday = tResponse.data?.data.data?.courses.filter((course) => {
            return course.assignedDay === 'thursday'
        })

        friday = tResponse.data?.data.data?.courses.filter((course) => {
            return course.assignedDay === 'friday'
        })

        saturday = tResponse.data?.data.data?.courses.filter((course) => {
            return course.assignedDay === 'saturday'
        })



        console.log(monday)
        console.log(tuesday)
        console.log(wednesday)
        console.log(thursday)
        console.log(friday)
        console.log(saturday)

        monday.map((mon)=> {
            if(mon.startHour === 9){
                setMon1(mon.name)
            }else if(mon.startHour === 11){
                setMon2(mon.name)
            }else if(mon.startHour === 13){
                setMon3(mon.name)
            }else if(mon.startHour === 15){
                setMon4(mon.name)
            }
        })

        tuesday.map((tue)=> {
            if(tue.startHour === 9){
                setTue1(tue.name)
            }else if(tue.startHour === 11){
                setTue2(tue.name)
            }else if(tue.startHour === 13){
                setTue3(tue.name)
            }else if(tue.startHour === 15){
                setTue4(tue.name)
            }
        })

        wednesday.map((wed)=> {
            if(wed.startHour === 9){
                setWed1(wed.name)
            }else if(wed.startHour === 11){
                setWed2(wed.name)
            }else if(wed.startHour === 13){
                setWed3(wed.name)
            }else if(wed.startHour === 15){
                setWed4(wed.name)
            }
        })

        thursday.map((thur)=> {
            if(thur.startHour === 9){
                setThur1(thur.name)
            }else if(thur.startHour === 11){
                setThur2(thur.name)
            }else if(thur.startHour === 13){
                setThur3(thur.name)
            }else if(thur.startHour === 15){
                setThur4(thur.name)
            }
        })

        friday.map((fri)=> {
            if(fri.startHour === 9){
                setFri1(fri.name)
            }else if(fri.startHour === 11){
                setFri2(fri.name)
            }else if(fri.startHour === 13){
                setFri3(fri.name)
            }else if(fri.startHour === 15){
                setFri4(fri.name)
            }
        })

        saturday.map((sat)=> {
            if(sat.startHour === 9){
                setSat1(sat.name)
            }else if(sat.startHour === 11){
                setSat2(sat.name)
            }else if(sat.startHour === 13){
                setSat3(sat.name)
            }else if(sat.startHour === 15){
                setSat4(sat.name)
            }
        })
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
                    {showT === false ? 
                    <>     
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
                                    <p>{data.rooms}</p>
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
                                    <p>{data.courses}</p>
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
                                    <p>{data.lecturers}</p>
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
                                    <p>{data.classess}</p>
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
                                    <p>{data.students}</p>
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
                                    <p>{data.events}</p>
                                </div>
                            </Link>
                    </CSSTransition>
                    </>
                    : null}
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

                <em className="mb-30">{cProgress === 5000 ? <span>{tResponse.data?.data.data?.name}</span> : <span>Loading...</span>}</em>

                <div className="timetable-stats">
                    <p>Status</p>
                    {cProgress === 5000 ? <p>Complete</p> : <progress value={!tResponse.data.data.error && cProgress  ? (cProgress/tProgress) * 100 : 0} max="100"/>}
                </div>

                <div className="timetable-stats mb-30">
                    <p>Time</p>
                    <p>{cProgress === 5000 ? <span>{tDate} - {tTime}</span> : <span>Loading...</span>}</p>
                </div>

                <button onClick={()=> arrangeT()}>Print Timetable</button>
                <button onClick={()=> {
                    arrangeT()
                    setShowT(true)}
                }>View More</button>
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

            { showT === true ? <div className="timetable">

                <div className="note">
                    <p>Lr - Lecture room</p>
                    <p>Lt - Lecture theatre</p>
                    <p>Lh - Lecture hall</p>
                </div>

                <div className="tDetails">
                    <p>Name : Timetable for 200L</p>
                    <p>Academic Session : 2020/2021</p>
                </div>

                
                <div className="table-container">
                        <table className="table table2">
                        <thead className="table-head">
                            <tr className="row1">
                            <th></th>
                            <th>9:00-11:00</th>
                            <th>11:00-13:00</th>
                            <th>13:00-15:00</th>
                            <th>15:00-17:00</th>
                            </tr>
                        </thead>
                        <tbody className="gfg">
                                    <tr className="default default2">
                                        <td>Monday</td>
                                        <td>{mon1}</td>
                                        <td>{mon2}</td>
                                        <td>{mon3}</td>
                                        <td>{mon4}</td>
                                    </tr>
                                    <tr className="default default2">
                                        <td>Tuesday</td>
                                        <td>{tue1}</td>
                                        <td>{tue2}</td>
                                        <td>{tue3}</td>
                                        <td>{tue4}</td>
                                    </tr>
                                    <tr className="default default2">
                                        <td>Wednesday</td>
                                        <td>{wed1}</td>
                                        <td>{wed2}</td>
                                        <td>{wed3}</td>
                                        <td>{wed4}</td>
                                    </tr>
                                    <tr className="default default2">
                                        <td>Thursday</td>
                                        <td>{thur1}</td>
                                        <td>{thur2}</td>
                                        <td>{thur3}</td>
                                        <td>{thur4}</td>
                                    </tr>
                                    <tr className="default default2">
                                        <td>Friday</td>
                                        <td>{fri1}</td>
                                        <td>{fri2}</td>
                                        <td>{fri3}</td>
                                        <td>{fri4}</td>
                                    </tr>
                                    {/* <tr className="default default2">
                                        <td>Saturday</td>
                                        <td>{sat1}</td>
                                        <td>{sat2}</td>
                                        <td>{sat3}</td>
                                        <td>{sat4}</td>
                                    </tr> */}
                            {/* { tuesday.map((timet)=>{
                                    return (
                                    <tr className="default default2" key={timet.name}>
                                        <td>Tuesday</td>
                                        <td>{timet.startHour === 9 ? <p>{timet.name}</p> : null}</td>
                                        <td>{timet.startHour === 11 ? <p>{timet.name}</p> : null}</td>
                                        <td>{timet.startHour === 13 ? <p>{timet.name}</p> : null}</td>
                                        <td>{timet.startHour === 15 ? <p>{timet.name}</p> : null}</td>
                                    </tr>
                                    )})} */}
                        </tbody>
                        </table>
                    </div>
                </div> : null}
        </>
    );
}

export default Dashboard;