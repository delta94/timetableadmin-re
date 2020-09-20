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
import search from "../../images/search.png"
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
        console.log(error);
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
            console.log(res)
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
        return () => {
            source.cancel("Component got unmounted");
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

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
                    <img src={search} className="search" alt="search"/>
                    <input placeholder="Enter keyword to search"/>
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
                        {loading === true ? periods.map(period => {
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
                    <div className="input-c">
                        <div className="input-g">
                            <p>Course</p>
                            <select className="select-css" name="course" onChange={periodFormData}>
                                    <option value="" defaultValue>Select a course</option>
                                    {courses.map(course => {
                                        return(
                                        <option value={course._id} label={course.name} key={course._id}/>
                                    )})}
                            </select>
                        </div>
                        <div className="input-g">
                            <p>Start Time</p>
                            <input name="startTime" onChange={periodFormData}/>
                        </div>
                        <div className="input-g">
                            <p>End Time</p>
                            <input name="endTime" onChange={periodFormData}/>
                        </div>
                    </div>
                    <div className="buttons">
                        <button className="red" onClick={()=> setModalOut(!modalOut)}>Cancel</button>
                        <button className="blue" onClick={
                            (e)=> {
                                e.preventDefault()
                                periodFormData(e)
                                setModalOut(!modalOut)
                                createPeriods()
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
                                setEditModalOut(!editModalOut)
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