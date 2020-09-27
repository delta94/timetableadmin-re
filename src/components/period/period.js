import React,{useState,useEffect} from "react"
import {Link} from "react-router-dom"
import "./period.css"
import "../../global/global.css"
import plus from "../../images/plus.svg"
import bin from "../../images/bin.png"
import pen from "../../images/pencil 1.png"
import cross from "../../images/close.png"
import bell from "../../images/alarm-bell@3x.png"
import logo from "../../images/Logo.png"
import axios from "axios"
import spinner from "../../images/spinner.gif"


const Period = (props) => {

    const [modalOut, setModalOut] = useState(false)
    const [periods,setPeriods] = useState([])   
    const [loading, setLoading] = useState(false)
    const [courses, setCourses] = useState([])
    const [editModalOut,setEditModalOut] = useState(false)
    const [editCourseId,setEditCourseId] = useState("")
    const [periodData, setPeriodData] = useState(
        {
            startTime: "",
            endTime: "",
            course: ""
        }
    );
    const [labelData, setLabelData] = useState(
        {
            courseLabel: "",
            sTimeLabel: "",
            eTimeLabel: ""
        }
    );
     // setting key for edit form
     const [id, setId] = useState("123");

    const periodFormData = (e) => {
        setPeriodData({
            ...periodData,
      
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()
          });
          console.log(periodData)
    }

    // For cancelling requests
    const source = axios.CancelToken.source();

    // Create periods
    const [err, setErr] = useState(false)
    const createPeriods = () => {
        let data = JSON.stringify(periodData);

        let config = {
        method: 'post',
        url: 'https://tbe-node-deploy.herokuapp.com/Admin/period',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };

        axios(config)
        .then((response) => {
        console.log(JSON.stringify(response.data));
        })
        .then(()=>{
            getPeriods()
        })
        .catch((error) => {
            if({...error}.response.status === 401){
                setErr(true)
            }else{
                setErr(false)
            }
            console.log({...error}.response.status);
            console.log(err)
        });
    }

    const fetchCourses = () => {
        let config = {
            method: 'get',
            url: 'https://tbe-node-deploy.herokuapp.com/Admin/getCourse',
            headers: { },
            cancelToken: source.token
        };
        
        axios(config)
        .then((response) => {
            var res = response.data.data
            setCourses(res)
            setLoading(true)
        })
        .catch((error) => {
            console.log(error);
        });
    }


    // Delete Periods
    const deletePeriod = (data) => {
        
        let config = {
            method: 'delete',
            url: 'https://tbe-node-deploy.herokuapp.com/Admin/period/delete',
            headers: { 
            '_id': data
            }
        };
        
        axios(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .then(()=> getPeriods())
        .catch((error) => {
            console.log(error);
        });
    }

    // Get periods
    const getPeriods = () => {
        let config = {
        method: 'get',
        url: 'https://tbe-node-deploy.herokuapp.com/Admin/getPeriod',
        headers: { },
        cancelToken: source.token
        };

        axios(config)
        .then((response) => {
            setPeriods(response.data.data)
            setLoading(true)
        })
        .catch((error) => {
        console.log(error);
        });

    }

    useEffect(() => {
        getPeriods()
        fetchCourses()
        filterFn()
        return () => {
            source.cancel("Component got unmounted");
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[periods])

    // Edit Patch request
    // Remove empty inputs in edit form obj
    const cleanObj = () => {
        Object.keys(periodData).forEach((key) => (periodData[key] === "") && delete periodData[key]);
    }

    const editPeriod = () => {
        let data = JSON.stringify(periodData);

        let config = {
        method: 'patch',
        url: 'https://tbe-node-deploy.herokuapp.com/Admin/period/update',
        headers: { 
            '_id': editCourseId, 
            'Content-Type': 'application/json'
        },
        data : data
        };

        axios(config)
        .then((response) => {
        console.log(JSON.stringify(response.data));
        })
        .then(()=> getPeriods())
        .catch((error) => {
        console.log(error);
        });
    }

    // Generating form labels for edit
    const genFormLabels = (data) => {
        // eslint-disable-next-line array-callback-return
        periods.map((period) => {
                if(period._id === data){
                    setLabelData({
                        ...labelData,
                        courseLabel: period.course.name,
                        sTimeLabel: period.startTime,
                        eTimeLabel: period.endTime,
                    })
                }
            })
    }

    const [target, setTarget] = useState("")

    // Filtering
    const onChangeHandler = (e) =>{
        console.log(e.target.value)
        setTarget(e.target.value)
    }

    const [newArr, setNewArr] = useState([])

    const [switchState, setSwitchState] = useState("")
    
    const switchFilter = (e) => {
        setSwitchState(e.target.value)
    }

    const filterFn = () => {
            setNewArr(periods
            // eslint-disable-next-line array-callback-return
            .filter(d=> {
                if(switchState === "Name"){
                    return d.course.name.toLowerCase().includes(target.toLowerCase()) === true
                }else if(switchState === "" || switchState === "All"){
                    return d.course.name.toLowerCase().includes(target.toLowerCase()) === true || d.startTime.toLowerCase().includes(target.toLowerCase()) === true
                }else if(switchState === "Time"){
                    return d.startTime.toLowerCase().includes(target.toLowerCase()) === true
                }
            }))
    }

    function success() {
        if(document.getElementById("modInput").value==="" || document.getElementById("modInput2").value==="" || document.getElementById("modInput3").value==="" || err){ 
               document.querySelector('.warning').style.display = "block"; 
           } else { 
                document.querySelector('.warning').style.display = "none"; 
           }
    }


    return (
        <>
            <header>
                  <div>
                    <img src={logo} className="logo" alt="logo"/>
                    <p>Period</p>
                  </div>
                  <div className="navMobile"> 
                    <Link to="/app/notification">
                            <img src={bell} alt="bell"/>
                    </Link>
                  </div>
            </header>
            <div className="section">
                <div className="search-container">
                <select className="select-css2" name="switch" onChange={switchFilter}>
                        <option>All</option>
                        <option>Name</option>
                        <option>Time</option>
                    </select>
                    <input placeholder="Enter keyword to search" onChange={onChangeHandler} />
                    <button onClick={()=>{
                        setModalOut(!modalOut);
                    }}><img src={plus} alt="plus"/>Add new timeslot</button>
                </div>
                <div className="table-container">
                    <table className="table">
                    <thead className="table-head">
                        <tr className="row1">
                        <th>Period</th>
                        <th>Courses</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="gfg">
                        {loading === true ? newArr
                        .map(period => {
                            return (
                                <tr className="default" key={period._id}>
                                    <td>{period.startTime} - {period.endTime}</td>
                                    <td>{period.course.name}</td>
                                    <td>
                                        <img
                                        src={pen}
                                        alt="pencil"
                                        className="pencil"
                                        onClick={()=> {
                                            setEditModalOut(!editModalOut)
                                            setEditCourseId(period._id)
                                            genFormLabels(period._id)
                                            setId(Math.random().toString())
                                        }}
                                        />
                                        <img
                                        src={bin}
                                        alt="bin"
                                        className="bin"
                                        onClick={()=> deletePeriod(period._id)}
                                        />
                                    </td>
                                </tr>
                            );
                        }) : <tr><td colSpan="5"><img src={spinner} className="spinner" alt="Spinner"/></td></tr>}
                        {newArr.length === 0 && loading === true ? <tr><td colSpan="5" style={{color:  "#0395ff", fontSize: "18px"}}><p>No search results ... </p></td></tr> : null}
                    </tbody>
                    </table>
                </div>

                <div className={modalOut === true ? "overlay modOut" : "overlay"}
                onClick={()=>{
                    setModalOut(!modalOut);
                }}></div>

                {/* Create form */}
                <div className={modalOut === true ? "modal modOut" : "modal"}>
                    <div className="head">
                        <h3>Add new timeslot</h3>
                        <img src={cross} alt="cross" onClick={()=>{
                        setModalOut(!modalOut);
                    }}/>
                    </div>
                    <div className="input-g">
                        <div className="warning">Make sure all fields are filled & Room does not already exist </div>
                    </div>
                    <div className="input-c">
                        <div className="input-g">
                            <p>Course</p>
                            <select className="select-css" id="modInput" name="course" onChange={periodFormData}>
                                    <option value="" defaultValue>Select a course</option>
                                    {courses.map(course => {
                                        return(
                                        <option value={course._id} label={course.name} key={course._id}/>
                                    )})}
                            </select>
                        </div>
                        <div className="input-g">
                            <p>Start Time</p>
                            <input name="startTime" id="modInput2" onChange={periodFormData}/>
                        </div>
                        <div className="input-g">
                            <p>End Time</p>
                            <input name="endTime" id="modInput3" onChange={periodFormData}/>
                        </div>
                    </div>
                    <div className="buttons">
                        <button className="red" onClick={()=> setModalOut(!modalOut)}>Cancel</button>
                        <button className="blue" onClick={
                            (e)=> {
                                e.preventDefault()
                                periodFormData(e)
                                createPeriods()
                                success()
                            }}>
                            Add timeslot
                        </button>
                    </div>
                </div>

                {/* Edit form */}
                <div className={editModalOut === true ? "modal modOut" : "modal"} key={id}>
                    <div className="head">
                        <h3>Edit timeslot</h3>
                        <img src={cross} alt="cross" onClick={()=>{
                        setEditModalOut(!editModalOut);
                    }}/>
                    </div>
                    <div className="input-c">
                        <div className="input-g">
                            <p>Course</p>
                            <select className="select-css" name="course" defaultValue={labelData.courseLabel} onChange={periodFormData}>
                                    <option value={labelData.courseLabel} disabled>{labelData.courseLabel}</option>
                                    {courses.map(course => {
                                        return(
                                        <option value={course._id} label={course.name} key={course._id}/>
                                    )})}
                            </select>
                        </div>
                        <div className="input-g">
                            <p>Start Time</p>
                            <input name="startTime" onChange={periodFormData} placeholder={labelData.sTimeLabel}/>
                        </div>
                        <div className="input-g">
                            <p>End Time</p>
                            <input name="endTime" onChange={periodFormData} placeholder={labelData.eTimeLabel}/>
                        </div>
                    </div>
                    <div className="buttons">
                        <button className="red" onClick={()=> setEditModalOut(!editModalOut)}>Cancel</button>
                        <button className="blue" onClick={
                            (e)=> {
                                e.preventDefault()
                                periodFormData(e)
                                cleanObj()
                                editPeriod()
                            }}>
                            Edit timeslot
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Period;