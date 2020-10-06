/* eslint-disable array-callback-return */
import React,{useState,useEffect} from "react"
import {Link} from "react-router-dom"
import "./period.css"
import "../../global/global.css"
import plus from "../../images/plus.svg"
import bin from "../../images/bin.png"
import pen from "../../images/pencil 1.png"
import cross from "../../images/close.png"
import logo from "../../images/Logo.png"
import axios from "axios"
import spinner from "../../images/spinner.gif"
import checkg from "../../images/checkg.png"
import checkr from "../../images/checkr.png"
import checkb from "../../images/checkb.png"


const Period = (props) => {

    const [modalOut, setModalOut] = useState(false)
    const [periods,setPeriods] = useState([])   
    const [loading, setLoading] = useState(false)
    const [courses, setCourses] = useState([])
    const [editModalOut,setEditModalOut] = useState(false)
    const [editCourseId,setEditCourseId] = useState("")
    const [deleter, setDeleter] = useState(false)
    const [deleteId, setDeleteId] = useState("")
    const [deleteName, setDeleteName] = useState("")
    const [created, setCreated] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [edited, setEdited] = useState(false)
    const [id, setId] = useState("123");
    const [id2, setId2] = useState("1234");
    const [newArr, setNewArr] = useState([])
    const [target, setTarget] = useState("")
    const [switchState, setSwitchState] = useState("")
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

    const periodFormData = (e) => {
        setPeriodData({
            ...periodData,
      
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()
          });
          console.log(periodData)
    }

    
    // Http request C G E D
    // For cancelling requests
    const source = axios.CancelToken.source();


    
    // Create periods
    const createPeriods = (e) => {
        e.preventDefault()
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
        .then(()=> {
            setModalOut(false)
            setTimeout(() => {
                setCreated(true)
            }, 10);
            setCreated(false)
        })
        .catch((error) => {
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
            
        });
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
        .then(()=> {
            setEditModalOut(false)
            setTimeout(() => {
                setEdited(true)
            }, 10);
            setEdited(false)
        })
        .catch((error) => {
        console.log(error);
        });
    }

    // Remove empty inputs in edit form obj
    const cleanObj = () => {
        Object.keys(periodData).forEach((key) => (periodData[key] === "") && delete periodData[key]);
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



    // Delete Periods
    const deletePeriod = () => {
        
        let config = {
            method: 'delete',
            url: 'https://tbe-node-deploy.herokuapp.com/Admin/period/delete',
            headers: { 
            '_id': deleteId
            }
        };
        
        axios(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .then(()=> getPeriods())
        .then(()=> {
            setDeleter(false)
            setTimeout(() => {
              setDeleted(true)
          }, 10);
          setDeleted(false)
        })
        .catch((error) => {
            console.log(error);
        });
    }

    

    useEffect(() => {
        getPeriods()
        fetchCourses()
        filterFn()
        setDelName()
        return () => {
            source.cancel("Component got unmounted");
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[periods])

    
    

    // Filtering
    const onChangeHandler = (e) =>{
        console.log(e.target.value)
        setTarget(e.target.value)
    }

    
    
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

    //Get all the inputs...
    const inputs = document.querySelectorAll('form input, form select');
    // const textareas = document.querySelectorAll('textarea');

    // Loop through them...
    for(let input of inputs) {
    // Just before submit, the invalid event will fire, let's apply our class there.
    input.addEventListener('invalid', (event) => {
        input.classList.add('error');    
    }, false);
    
    // Optional: Check validity onblur
    input.addEventListener('blur', (event) => {
        input.checkValidity();

        if(input.validity.valid){
            input.classList.remove('error')
            input.classList.add('good')
        }
    })

    }

    // Form validation
    const success = () => {
        const nameIn = document.querySelector(".nameInput")
        const warningInput = document.querySelector(".warning")
        periods.map((period)=> {
            if(period.course._id === nameIn.value){
                warningInput.classList.add("display")
                nameIn.classList.add("error")
            }
        })
    }

    const successEdit = () => {
        const nameIn = document.querySelector(".nameInput2")
        const warningInput = document.querySelector(".warning2")
        periods.map((period)=> {
            if(period.course._id === nameIn.value){
                warningInput.classList.add("display")
                nameIn.classList.add("error")
            }
        })
    }

    const formSubmit = (e) => {
        createPeriods(e)
        success()
    }

    const setDelName = () => {
        periods.map((period)=> {
            if(period._id === deleteId){
                setDeleteName(`${period.startTime} - ${period.endTime}`)
            }
        })
    }

    const openDelete = (data) => {
        setDeleter(!deleter)
        setDeleteId(data)
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
                        <div className="bell"></div>
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
                        setId2(Math.random().toString());
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
                                        onClick={()=> openDelete(period._id)}
                                        />
                                    </td>
                                </tr>
                            );
                        }) : <tr><td colSpan="5"><img src={spinner} className="spinner" alt="Spinner"/></td></tr>}
                        {newArr.length === 0 && loading === true ? <tr><td colSpan="5" style={{color:  "#0395ff", fontSize: "18px"}}><p>No search results ... </p></td></tr> : null}
                    </tbody>
                    </table>
                </div>

                {/* Delete modal */}
                <div className={deleter === true ? "deleteModal delModOut" : "deleteModal"}>
                <p>Are you sure you want to delete Period {deleteName}?</p>
                    <div>
                        <button onClick={()=> deletePeriod()} className="red2">Yes</button>
                        <button onClick={()=> setDeleter(false)}>No</button>
                    </div>
                </div>


                {/* Overlays */}
                <div className={deleter === true ? "overlay modOut" : "overlay"}
                onClick={()=>{
                    setDeleter(false);
                }}></div>

                <div className={modalOut === true ? "overlay modOut" : "overlay"}
                onClick={()=>{
                    setModalOut(!modalOut);
                }}></div>

                <div className={editModalOut === true  ? "overlay modOut" : "overlay"}
                    onClick={()=>{
                    setEditModalOut(!editModalOut);
                }}></div>

                {/* Success messages */}
                <div className={created === true ? "successMsg flexModOut" : "successMsg"}>
                    <div>
                        <img src={checkg} style={{"height": "25px"}} alt="good"/>
                        <h3>Success</h3>
                    </div>
                    <p>Room created!</p>
                </div>

                <div className={deleted === true ? "successMsg red3 flexModOut" : "successMsg red2"}>
                    <div>
                        <img src={checkr} style={{"height": "25px"}} alt="good"/>
                        <h3>Success</h3>
                    </div>
                    <p>Room deleted!</p>
                </div>

                <div className={edited === true ? "successMsg blue flexModOut" : "successMsg blue"}>
                    <div>
                        <img src={checkb} style={{"height": "25px"}} alt="good"/>
                        <h3>Success</h3>
                    </div>
                    <p>Room edited!</p>
                </div>

                {/* Create form */}
                <div className={modalOut === true ? "modal modOut" : "modal"} key={id2}>
                    <div className="head">
                        <h3>Add new timeslot</h3>
                        <img src={cross} alt="cross" onClick={()=>{
                        setModalOut(!modalOut);
                    }}/>
                    </div>
                    <form onSubmit={formSubmit}>
                    <div className="input-c">
                        <div className="input-g">
                            <p>Course</p>
                            <select className="select-css nameInput" name="course" onChange={periodFormData} required>
                                    <option value="" defaultValue>Select a course</option>
                                    {courses.map(course => {
                                        return(
                                        <option value={course._id} label={course.name} key={course._id}/>
                                    )})}
                            </select>
                            <em className="warning">Period already exists </em>
                        </div>
                        <div className="input-g">
                            <p>Start Time</p>
                            <input name="startTime" type="time" onChange={periodFormData} required/>
                        </div>
                        <div className="input-g">
                            <p>End Time</p>
                            <input name="endTime" type="time" onChange={periodFormData} required/>
                        </div>
                    </div>
                    <div className="buttons">
                        <button className="red" onClick={()=> setModalOut(!modalOut)}>Cancel</button>
                        <button className="blue" type="submit" onClick={
                            (e)=> {
                                periodFormData(e)
                            }}>
                            Add timeslot
                        </button>
                    </div>
                    </form>
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
                            <select className="select-css nameInput2" name="course" defaultValue={labelData.courseLabel} onChange={periodFormData}>
                                    <option value={labelData.courseLabel} disabled>{labelData.courseLabel}</option>
                                    {courses.map(course => {
                                        return(
                                        <option value={course._id} label={course.name} key={course._id}/>
                                    )})}
                            </select>
                            <em className="warning warning2">Period already exists </em>
                        </div>
                        <div className="input-g">
                            <p>Start Time</p>
                            <input name="startTime" type="time" onChange={periodFormData} placeholder={labelData.sTimeLabel}/>
                        </div>
                        <div className="input-g">
                            <p>End Time</p>
                            <input name="endTime" type="time" onChange={periodFormData} placeholder={labelData.eTimeLabel}/>
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
                                successEdit()
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