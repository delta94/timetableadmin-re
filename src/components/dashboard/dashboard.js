/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React,{useState} from "react"
import {Link} from "react-router-dom"
import "./dashboard.css"
import '../timetable/timetable.css'
import "../../global/global.css"
import logo from "../../images/Logo.png"
import cross from "../../images/close.png"
import axios from "axios"
import spinner from "../../images/spinner.gif"
import arrowD from "../../images/down-arrow.png"
import { CSSTransition} from "react-transition-group";
import {useQuery, useMutation, queryCache} from "react-query"



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

const getTimetables = () => {

    return axios.get('https://tbe-node-deploy.herokuapp.com/timetable/all', {
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
            unit: arr.unit,
            code: arr.code
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


const deleteT = (deleteId) => {
          
    return axios.delete('https://tbe-node-deploy.herokuapp.com/timetable/delete', {
        headers: { 
            'id': deleteId
        }
    })
    .then((response) => {
        return response
    })      
}


const Dashboard = (props) => {
    const [timetableFn, {status}] = useMutation(postTimetable, {
        onSuccess: () => {
            console.log("created")
            setCreated(true)
            setModalOut(false)
        },
        onError: (error) => {
            console.log({...error})
        }
    })

    const [deleteTimetable] = useMutation(deleteT, {
        onSuccess: () => {
            console.log("deleted")
            queryCache.refetchQueries('timetables')
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

    const timetables = useQuery('timetables', getTimetables, {
        refetchOnWindowFocus: false
    })

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
    const [active, _setActive] = useState({});

    const toggleActive = (idx) => () => {
      _setActive((prev) => ({
        ...prev,
        [idx]: !prev[idx]
      }));
    };

    const [timetableDetails, setTimeTableDetails] = useState({
        name: '',
        session: ''
    }) 


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

    var monday; var tuesday; var wednesday; var thursday; var friday; var saturday;

    const [monday1, setMonday1] = useState([])

    const [monday2, setMonday2] = useState([]) 

    const [monday3, setMonday3] = useState([]) 

    const [monday4, setMonday4] = useState([])

    const [tuesday1, setTuesday1] = useState([])

    const [tuesday2, setTuesday2] = useState([]) 

    const [tuesday3, setTuesday3] = useState([]) 

    const [tuesday4, setTuesday4] = useState([])

    const [wednesday1, setWednesday1] = useState([])

    const [wednesday2, setWednesday2] = useState([]) 

    const [wednesday3, setWednesday3] = useState([]) 

    const [wednesday4, setWednesday4] = useState([]) 

    const [thursday1, setThursday1] = useState([])

    const [thursday2, setThursday2] = useState([]) 

    const [thursday3, setThursday3] = useState([]) 

    const [thursday4, setThursday4] = useState([])

    const [friday1, setFriday1] = useState([])

    const [friday2, setFriday2] = useState([]) 

    const [friday3, setFriday3] = useState([]) 

    const [friday4, setFriday4] = useState([]) 

    const [saturday1, setSaturday1] = useState([])

    const [saturday2, setSaturday2] = useState([]) 

    const [saturday3, setSaturday3] = useState([]) 

    const [saturday4, setSaturday4] = useState([]) 

    const [satCheck, setSat] = useState(false)

    const arrangeT = (data) => {
        // eslint-disable-next-line no-unused-expressions

        // Monday
        monday = data.filter((course) => {
            return course.assignedDay === 'monday'
        })

        setMonday1(monday.filter((mon)=> {
            return mon.startHour === 9
        }))

        setMonday2(monday.filter((mon)=> {
            return mon.startHour === 11
        }))

        setMonday3(monday.filter((mon)=> {
            return mon.startHour === 13
        }))

        setMonday4(monday.filter((mon)=> {
            return mon.startHour === 15
        }))

    
        // Tuesday
        tuesday = data.filter((course) => {
            return course.assignedDay === 'tuesday'
        })

        setTuesday1(tuesday.filter((tue)=> {
            return tue.startHour === 9
        }))

        setTuesday2(tuesday.filter((tue)=> {
            return tue.startHour === 11
        }))

        setTuesday3(tuesday.filter((tue)=> {
            return tue.startHour === 13
        }))

        setTuesday4(tuesday.filter((tue)=> {
            return tue.startHour === 15
        }))

        // Wednesday
        wednesday = data.filter((course) => {
            return course.assignedDay === 'wednesday'
        })

        setWednesday1(wednesday.filter((wed)=> {
            return wed.startHour === 9
        }))

        setWednesday2(wednesday.filter((wed)=> {
            return wed.startHour === 11
        }))

        setWednesday3(wednesday.filter((wed)=> {
            return wed.startHour === 13
        }))

        setWednesday4(wednesday.filter((wed)=> {
            return wed.startHour === 15
        }))


        console.log(wednesday1, wednesday2, wednesday3, wednesday4)


        // Thursday
        thursday = data.filter((course) => {
            return course.assignedDay === 'thursday'
        })

        setThursday1(thursday.filter((thur)=> {
            return thur.startHour === 9
        }))

        setThursday2(thursday.filter((thur)=> {
            return thur.startHour === 11
        }))

        setThursday3(thursday.filter((thur)=> {
            return thur.startHour === 13
        }))

        setThursday4(thursday.filter((thur)=> {
            return thur.startHour === 15
        }))

        // Friday
        friday = data.filter((course) => {
            return course.assignedDay === 'friday'
        })

        setFriday1(friday.filter((fri)=> {
            return fri.startHour === 9
        }))

        setFriday2(friday.filter((fri)=> {
            return fri.startHour === 11
        }))

        setFriday3(friday.filter((fri)=> {
            return fri.startHour === 13
        }))

        setFriday4(friday.filter((fri)=> {
            return fri.startHour === 15
        }))

        console.log(friday1, friday2, friday3, friday4)

         // Saturday
         saturday = data.filter((course) => {
            return course.assignedDay === 'saturday'
        })

        if(saturday.length !== 0){
            setSat(true)
        }

        setSaturday1(saturday.filter((sat)=> {
            return sat.startHour === 9
        }))

        setSaturday2(saturday.filter((sat)=> {
            return sat.startHour === 11
        }))

        setSaturday3(saturday.filter((sat)=> {
            return sat.startHour === 13
        }))

        setSaturday4(saturday.filter((sat)=> {
            return sat.startHour === 15
        }))
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

                {timetables.data?.data.data.length > 0 ? <p>Timetables available</p> : <p>Timetables unavailable for now</p>}
                <div className="timetables-container">
                {
                    timetables.data?.data.data.map((tt, idx)=> {
                        return (
                            <div key={tt._id}>
                                <p className="timetables" onClick={toggleActive(idx)}>{tt.name}<img src={arrowD} alt="arrow"/></p>
                                {active[idx] === true ? <div className="view-flex-container">
                                    <em>Created - {new Date(tt.updatedAt.substring(0,10)).toDateString()} - {tt.updatedAt.substring(11,16)}</em>
                                    <div className="view-flex">
                                        <button onClick={()=>{
                                            arrangeT(tt.courses)
                                            setShowT(true)
                                            setTimeTableDetails({
                                                name: tt.name,
                                                session: tt.session
                                            })
                                        }}>View more</button>
                                        <button onClick={()=> {
                                            deleteTimetable(tt._id)
                                        }}>Delete</button>
                                    </div>
                                </div> : null}
                            </div>
                        );
                    })
                }
                </div>
                <button onClick={()=>{
                        setModalOut(!modalOut);
                        // test()
                        // setShowT(true)
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

                <button>Print Timetable</button>
                <button onClick={()=> {
                    arrangeT(tResponse.data?.data.data?.courses)
                    setTimeTableDetails({
                        name: tResponse.data?.data.data?.name,
                        session: tResponse.data?.data.data?.session
                    })
                    setShowT(true)
                }
                }>View More</button>
            </div> : null}

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
                    <p>Name : {timetableDetails.name}</p>
                    <p>Academic Session : {timetableDetails.session}</p>
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
                                    <td>
                                        {monday1.map((mon)=>{
                                            return(
                                                <div key={mon.venue}>
                                                    <span>{mon.code}</span><br />
                                                    <em>({mon.venue})</em>
                                                </div>
                                            );
                                        })}
                                    </td>
                                    <td>
                                        {monday2.map((mon)=>{
                                            return(
                                                <div key={mon.venue}>
                                                    <span>{mon.code}</span><br />
                                                    <em>({mon.venue})</em>
                                                </div>
                                            );
                                        })}
                                    </td>
                                    <td>
                                        {monday3.map((mon)=>{
                                            return(
                                                <div key={mon.venue}>
                                                    <span>{mon.code}</span><br />
                                                    <em>({mon.venue})</em>
                                                </div>
                                            );
                                        })}
                                    </td>
                                    <td>
                                        {monday4.map((mon)=>{
                                            return(
                                                <div key={mon.venue}>
                                                    <span>{mon.code}</span><br />
                                                    <em>({mon.venue})</em>
                                                </div>
                                            );
                                        })}
                                    </td>
                                </tr>
                                <tr className="default default2">
                                    <td>Tuesday</td>
                                    <td>
                                        {tuesday1.map((tue)=>{
                                            return(
                                                <div key={tue.venue}>
                                                    <span>{tue.code}</span><br />
                                                    <em>({tue.venue})</em>
                                                </div>
                                            );
                                        })}
                                    </td>
                                    <td>
                                        {tuesday2.map((tue)=>{
                                            return(
                                                <div key={tue.venue}>
                                                    <span>{tue.code}</span><br />
                                                    <em>({tue.venue})</em>
                                                </div>
                                            );
                                        })}
                                    </td>
                                    <td>
                                        {tuesday3.map((tue)=>{
                                            return(
                                                <div key={tue.venue}>
                                                    <span>{tue.code}</span><br />
                                                    <em>({tue.venue})</em>
                                                </div>
                                            );
                                        })}
                                    </td>
                                    <td>
                                        {tuesday4.map((tue)=>{
                                            return(
                                                <div key={tue.venue}>
                                                    <span>{tue.code}</span><br />
                                                    <em>({tue.venue})</em>
                                                </div>
                                            );
                                        })}
                                    </td>
                                </tr>
                                <tr className="default default2">
                                    <td>Wednesday</td>
                                    <td>
                                        {wednesday1.map((wed)=>{
                                            return(
                                                <div key={wed.venue}>
                                                    <span>{wed.code}</span><br />
                                                    <em>({wed.venue})</em><br />
                                                </div>
                                            );
                                        })}
                                    </td>
                                    <td>
                                        {wednesday2.map((wed)=>{
                                            return(
                                                <div  key={wed.venue}>
                                                    <span>{wed.code}</span><br />
                                                    <em>({wed.venue})</em><br />
                                                </div>
                                            );
                                        })}
                                    </td>
                                    <td>
                                        {wednesday3.map((wed)=>{
                                            return(
                                                <div  key={wed.venue}>
                                                    <span>{wed.code}</span><br />
                                                    <em>({wed.venue})</em><br />
                                                </div>
                                            );
                                        })}
                                    </td>
                                    <td>
                                        {wednesday4.map((wed)=>{
                                            return(
                                                <div  key={wed.venue}>
                                                    <span>{wed.code}</span><br />
                                                    <em>({wed.venue})</em><br />
                                                </div>
                                            );
                                        })}
                                    </td>
                                </tr>
                                <tr className="default default2">
                                    <td>Thursday</td>
                                    <td>
                                        {thursday1.map((thur)=>{
                                            return(
                                                <div key={thur.venue}>
                                                    <span>{thur.code}</span><br />
                                                    <em>({thur.venue})</em>
                                                </div>
                                            );
                                        })}
                                    </td>
                                    <td>
                                        {thursday2.map((thur)=>{
                                            return(
                                                <div key={thur.venue}>
                                                    <span>{thur.code}</span><br />
                                                    <em>({thur.venue})</em>
                                                </div>
                                            );
                                        })}
                                    </td>
                                    <td>
                                        {thursday3.map((thur)=>{
                                            return(
                                                <div key={thur.venue}>
                                                    <span>{thur.code}</span><br />
                                                    <em>({thur.venue})</em>
                                                </div>
                                            );
                                        })}
                                    </td>
                                    <td>
                                        {thursday4.map((thur)=>{
                                            return(
                                                <div key={thur.venue}>
                                                    <span>{thur.code}</span><br />
                                                    <em>({thur.venue})</em>
                                                </div>
                                            );
                                        })}
                                    </td>
                                </tr>
                                <tr className="default default2">
                                    <td>Friday</td>
                                    <td>
                                        {friday1.map((fri)=>{
                                            return(
                                                <div key={fri.venue}>
                                                    <span>{fri.code}</span><br />
                                                    <em>({fri.venue})</em>
                                                </div>
                                            );
                                        })}
                                    </td>
                                    <td>
                                        {friday2.map((fri)=>{
                                            return(
                                                <div key={fri.venue}>
                                                    <span>{fri.code}</span><br />
                                                    <em>({fri.venue})</em>
                                                </div>
                                            );
                                        })}
                                    </td>
                                    <td>
                                        {friday3.map((fri)=>{
                                            return(
                                                <div key={fri.venue}>
                                                    <span>{fri.code}</span><br />
                                                    <em>({fri.venue})</em>
                                                </div>
                                            );
                                        })}
                                    </td>
                                    <td>
                                        {friday4.map((fri)=>{
                                            return(
                                                <div key={fri.venue}>
                                                    <span>{fri.code}</span><br />
                                                    <em>({fri.venue})</em>
                                                </div>
                                            );
                                        })}
                                    </td>
                                </tr>
                                { satCheck === true ? <tr className="default default2">
                                    <td>Saturday</td>
                                    <td>
                                        {saturday1.map((sat)=>{
                                            return(
                                                <div key={sat.venue}>
                                                    <span>{sat.code}</span><br />
                                                    <em>({sat.venue})</em>
                                                </div>
                                            );
                                        })}
                                    </td>
                                    <td>
                                        {saturday2.map((sat)=>{
                                            return(
                                                <div key={sat.venue}>
                                                    <span>{sat.code}</span><br />
                                                    <em>({sat.venue})</em>
                                                </div>
                                            );
                                        })}
                                    </td>
                                    <td>
                                        {saturday3.map((sat)=>{
                                            return(
                                                <div key={sat.venue}>
                                                    <span>{sat.code}</span><br />
                                                    <em>({sat.venue})</em>
                                                </div>
                                            );
                                        })}
                                    </td>
                                    <td>
                                        {saturday4.map((sat)=>{
                                            return(
                                                <div key={sat.venue}>
                                                    <span>{sat.code}</span><br />
                                                    <em>({sat.venue})</em>
                                                </div>
                                            );
                                        })}
                                    </td>
                                </tr> : null}
                        </tbody>
                        </table>
                    </div>
                </div> : null}
        </>
    );
}

export default Dashboard;