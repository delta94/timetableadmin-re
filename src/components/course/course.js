import React,{useEffect, useState} from "react"
import {Link} from "react-router-dom"
import "./course.css"
import "../../global/global.css"
import plus from "../../images/plus.svg"
import bin from "../../images/bin.png"
import pen from "../../images/pencil 1.png"
import cross from "../../images/close.png"
import bell from "../../images/alarm-bell@3x.png"
import logo from "../../images/Logo.png"
import axios from "axios"
import spinner from "../../images/spinner.gif"


const Course = (props) => {

    // Course app state
    const [modalOut, setModalOut] = useState(false)
    const [editModalOut, setEditModalOut] = useState(false)
    const [loading, setLoading] = useState(false)
    const [courses, setCourses] = useState([])
    const [lecturers, setLecturers] = useState([])
    const [venues, setVenues] = useState([])
    const [editCourseId, setEditCourseId] = useState("")
    const [newArr, setNewArr] = useState([])
    const [switchState, setSwitchState] = useState("")  
    const [target, setTarget] = useState("")
    const [formData, updateFormData] = useState(
        {
            name: "",
            code: "",
            unit: "",
            time: "",
            level: "",
            day: "",
            description: ""
        }
    );

    const [lecturer, lecturerData] = useState(
        {
            lecturer: ""
        }
    )

    const [venue, venueData] = useState(
        {
            venue: ""
        }
    )

    var finalDataObj = {}

    // Labels
    const [labelData, setLabelData] = useState(
        {
            nameLabel: "",
            codeLabel: "",
            unitLabel: "",
            timeLabel: "",
            lecturerLabel: "",
            venueLabel: "",
            levelL: "",
            dayLabel: "",
            descLabel: ""
        }
    );

    // setting key for edit form
    const [id, setId] = useState("123");


    // Http requests and relatives
    // For cancelling requests
    const source = axios.CancelToken.source();
    // Post Request
    const courseFormData = (e) => {

        updateFormData({
            ...formData,
      
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()
          });

    }

    const venueFormData = (e) => {

        venueData({
            ...venue,
      
            // Trimming any whitespace
            [e.target.name]: {
                _id: e.target.value.trim()
            }
          });

    }

    const lecturerFormData = (e) => {

        lecturerData({
            ...lecturer,
      
            // Trimming any whitespace
            [e.target.name]: {
                _id: e.target.value.trim()
            }
          });

          finalDataObj = {
            ...formData,
            ...lecturer,
            ...venue
        }
    }

    const [err, setErr] = useState(false)
    const createCourses = () => {
        let data = JSON.stringify(finalDataObj);

        let config = {
        method: 'post',
        url: 'https://tbe-node-deploy.herokuapp.com/Admin/course',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };
        
        axios(config)
        .then((response) => {
        console.log(JSON.stringify(response.data));
        })
        .then(()=> {
            fetchCourses()
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

    // Patch request
    const editCourses = () => {
        let data = JSON.stringify(finalDataObj);

        let config = {
        method: 'patch',
        url: 'https://tbe-node-deploy.herokuapp.com/Admin/course/update',
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
        .then(()=>{ 
            fetchCourses()
        })
        .catch((error) => {
        console.log(error);
        });

        console.log(data)
    }

    // Generating form labels for edit
    const genFormLabels = (data) => {
        // eslint-disable-next-line array-callback-return
        courses.map((course) => {
                if(course._id === data){
                    setLabelData({
                        ...labelData,
                        nameLabel: course.name,
                        codeLabel: course.code,
                        unitLabel: course.unit,
                        timeLabel: course.time,
                        lecturerLabel: course.lecturer.name,
                        venueLabel: course.venue.name,
                        levelL: course.level,
                        dayLabel: course.day.join(),
                        descLabel: course.description
                    })
                }
            })
    }

    // Remove empty inputs in edit form obj
    const cleanObj = () => {
        Object.keys(finalDataObj).forEach((key) => (finalDataObj[key] === "") && delete finalDataObj[key]);
    }



    // Get request
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

    // Getting lecturers
    const getLect = () => {
        let config = {
            method: 'get',
            url: 'https://tbe-node-deploy.herokuapp.com/Admin/getlecturer',
            headers: { },
            cancelToken: source.token
          };
          
          axios(config)
          .then((response) => {
                setLecturers(response.data.data)

                console.log(lecturers)
          })
          .catch((error) => {
            console.log(error);
          });
    }

    const getVenue = () => {
        let config = {
            method: 'get',
            url: 'https://tbe-node-deploy.herokuapp.com/Admin/room',
            headers: { },
            cancelToken: source.token
          };
          
          axios(config)
          .then((response) => {
            setVenues(response.data.data)
          })
          .catch((error) => {
            console.log(error);
          });
          
    }



    useEffect( () => {
            fetchCourses()
            getLect()
            getVenue()
            filterFn()

            return () => {
                source.cancel("Component got unmounted");
            };
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[courses]
    )

    // Delete request
    const deleteCourse = (data) => {
        let config = {
            method: 'delete',
            url: 'https://tbe-node-deploy.herokuapp.com/Admin/course/delete',
            headers: { 
              '_id': data
            }
          };
          
          axios(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
          })
          .then(()=> {
              fetchCourses()
          })
          .catch((error) => {
            console.log(error);
          });
          
        console.log("deleted")
    }

    // Filtering
    const onChangeHandler = (e) =>{
        console.log(e.target.value)
        setTarget(e.target.value)
    }
    const switchFilter = (e) => {
        setSwitchState(e.target.value)
    }

    const filterFn = () => {
            setNewArr(courses
            // eslint-disable-next-line array-callback-return
            .filter(d=> {
                if(switchState === "Name"){
                    return d.name.toLowerCase().includes(target.toLowerCase()) === true
                }else if(switchState === "" || switchState === "All"){
                    return d.name.toLowerCase().includes(target.toLowerCase()) === true || d.code.toString().toLowerCase().includes(target.toLowerCase()) === true || d.unit.toString().toLowerCase().includes(target.toLowerCase()) === true || d.lecturer.name.toLowerCase().includes(target.toLowerCase()) === true
                }else if(switchState === "Code"){
                    return d.code.toString().toLowerCase().includes(target.toLowerCase()) === true
                }else if(switchState === "Unit"){
                    return d.unit.toString().toLowerCase().includes(target.toLowerCase()) === true
                }else if(switchState === "Lecturer"){
                    return d.lecturer.name.toLowerCase().includes(target.toLowerCase()) === true
                }
            }))
    }
    
    function success() {
        if(document.getElementById("modInput").value==="" 
        || document.getElementById("modInput2").value===""
        || document.getElementById("modInput3").value===""
        || document.getElementById("modInput4").value===""
        || document.getElementById("modInput5").value===""
        || document.getElementById("modInput6").value===""
        || document.getElementById("modInput7").value===""
        || document.getElementById("modInput8").value===""
        || document.getElementById("modInput9").value==="" || err){ 
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
                    <p>Courses</p>
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
                        <option>Code</option>
                        <option>Name</option>
                        <option>Unit</option>
                        <option>Lecturer</option>
                    </select>
                    <input placeholder="Enter keyword to search" onChange={onChangeHandler}/>
                    <button onClick={()=>{
                        setModalOut(!modalOut);
                    }}><img src={plus} alt="plus"/>Add new course</button>
                </div>
                <div className="table-container">
                    <table className="table">
                    <thead className="table-head">
                        <tr className="row1">
                        <th>Course Code</th>
                        <th>Course Name</th>
                        <th>Course Unit</th>
                        <th>Lecturer</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="gfg">
                       {loading === true ? newArr.map(course => {
                            return(
                                <tr className="default" key={course._id}>
                                    <td>{course.code}</td>
                                    <td>{course.name}</td>
                                    <td>{course.unit}</td>
                                    <td>{course.lecturer.name}</td>
                                    <td>
                                        <img
                                        src={pen}
                                        alt="pencil"
                                        className="pencil"
                                        onClick={() => {
                                            setEditModalOut(!editModalOut)
                                            setEditCourseId(course._id)
                                            genFormLabels(course._id)
                                            setId(Math.random().toString())
                                        }}
                                        />
                                        <img
                                        src={bin}
                                        alt="bin"
                                        className="bin"
                                        onClick={()=>deleteCourse(course._id)}
                                        />
                                    </td>
                                </tr>
                            )}) : <tr><td colSpan="5"><img src={spinner} className="spinner" alt="Spinner"/></td></tr>
                        }
                        {newArr.length === 0 && loading === true ? <tr><td colSpan="5" style={{color:  "#0395ff", fontSize: "18px"}}><p>No search results ... </p></td></tr> : null}
                    </tbody>
                    </table>
                </div>



                {/* Overlay */}
                <div className={modalOut === true ? "overlay modOut" : "overlay"}
                onClick={()=>{
                    setModalOut(!modalOut);
                }}></div>


                {/* Create course form */}
                <div className={modalOut === true ? "modal modOut" : "modal"}>
                    <div className="head">
                        <h3>Add new course</h3>
                        <img src={cross} alt="cross" onClick={()=>{
                        setModalOut(!modalOut);
                    }}/>
                    </div>
                    <form  name="courseFormData" id="courses">
                        <div className="input-g">
                            <div className="warning">Make sure all fields are filled & Course does not already exist</div>
                        </div>
                        <div className="input-c">
                            <div className="input-flex">
                                <div className="input-gi">
                                    <p>Name</p>
                                    <input name="name" className="mInput" id="modInput"  onChange={courseFormData}/>
                                </div>
                                <div className="input-gi">
                                    <p>Course code</p>
                                    <input list="code" className="mInput" type="number" id="modInput2" name="code" onChange={courseFormData}/>
                                </div>
                            </div>
                            <div className="input-flex">
                                <div className="input-gi">
                                    <p>Course unit</p>
                                    <input name="unit" className="mInput" type="number" id="modInput3" onChange={courseFormData}/>
                                </div>
                                <div className="input-gi">
                                    <p>Time</p>
                                    <input name="time" className="mInput" id="modInput4" onChange={courseFormData}/>
                                </div>
                            </div>
                            <div className="input-flex">
                                <div className="input-gi">
                                    <p>Level</p>
                                    <input name="level" className="mInput" type="number" id="modInput5" onChange={courseFormData}/>
                                </div>
                                <div className="input-gi">
                                <p>Venue</p>
                                <select className="select-css" name="venue" id="modInput6" onChange={venueFormData}>
                                <option value="" defaultValue>Select a venue</option>
                                    {venues.map(venue => {
                                        return(
                                        <option value={venue._id} label={venue.name} key={venue._id}/>
                                    )})}
                                </select>
                            </div>
                                
                            </div>
                            <div className="input-flex">
                                <div className="input-gi">
                                    <p>day</p>
                                    <input name="day" className="mInput" id="modInput7" placeholder="E.g monday,tuesday" onChange={courseFormData}/>
                                </div>
                                <div className="input-gi">
                                    <p>Description</p>
                                    <input name="description" className="mInput" id="modInput8" onChange={courseFormData}/>
                                </div>
                            </div>
                            <div className="input-gi">
                                    <p>Professor</p>
                                    <select className="select-css" id="modInput9" name="lecturer" onChange={lecturerFormData}>
                                        <option value="" defaultValue>Select a lecturer</option>
                                        {lecturers.map(lect => {
                                            return(
                                            <option value={lect._id} label={lect.name} key={lect._id}/>
                                        )})}
                                    </select>
                            </div>
                        </div>
                        <div className="buttons">
                            <button className="red" onClick={(e) => {
                                e.preventDefault()
                                setModalOut(false)
                            }}>Cancel</button>
                            <button className="blue" type="submit" onClick={(e) => {
                                e.preventDefault()
                                courseFormData(e);
                                lecturerFormData(e);
                                venueFormData(e);
                                createCourses()
                                success()
                            }}>
                                Add course
                            </button>
                        </div>  
                    </form>
                </div>

                {/* Edit course form */}
                <div className={editModalOut === true ? "modal modOut" : "modal"} key={id}>
                    <div className="head">
                        <h3>Edit course</h3>
                        <img src={cross} alt="cross" onClick={()=>{
                        setEditModalOut(false);
                    }}/>
                    </div>
                    <form  name="editCourseFormData">
                        <div className="input-c">
                            <div className="input-flex">
                                <div className="input-gi">
                                    <p>Name</p>
                                    <input name="name" placeholder={labelData.nameLabel} onChange={courseFormData}/>
                                </div>
                                <div className="input-gi">
                                    <p>Course code</p>
                                    <input list="code" name="code" type="number" placeholder={labelData.codeLabel} onChange={courseFormData}/>
                                </div>
                            </div>
                            <div className="input-flex">
                                <div className="input-gi">
                                    <p>Course unit</p>
                                    <input name="unit" type="number" placeholder={labelData.unitLabel} onChange={courseFormData}/>
                                </div>
                                <div className="input-gi">
                                    <p>Time</p>
                                    <input name="time" placeholder={labelData.timeLabel} onChange={courseFormData}/>
                                </div>
                            </div>
                            <div className="input-flex">
                                <div className="input-gi">
                                    <p>Level</p>
                                    <input name="level" type="number" placeholder={labelData.levelL} onChange={courseFormData}/>
                                </div>
                                <div className="input-gi">
                                    <p>Professor</p>
                                    <select className="select-css" name="lecturer" defaultValue={labelData.lecturerLabel} onChange={lecturerFormData}>
                                        <option disabled value={labelData.lecturerLabel}>{labelData.lecturerLabel}</option>
                                        {lecturers.map(lect => {
                                            return(
                                            <option value={lect._id} label={lect.name} key={lect._id}/>
                                        )})}
                                    </select>
                                </div>
                            </div>
                            
                            <div className="input-flex">
                                    <div className="input-gi">
                                        <p>day</p>
                                        <input name="day" placeholder={labelData.dayLabel} onChange={courseFormData}/>
                                    </div>
                                    <div className="input-gi">
                                        <p>Description</p>
                                        <input name="description" placeholder={labelData.descLabel} onChange={courseFormData}/>
                                    </div>
                            </div>
                            <div className="input-gi">
                                <p>Venue</p>
                                <select className="select-css" name="venue" defaultValue={labelData.venueLabel} onChange={venueFormData}>
                                <option value={labelData.venueLabel} disabled>{labelData.venueLabel}</option>
                                    {venues.map(venue => {
                                        return(
                                        <option value={venue._id} label={venue.name} key={venue._id}/>
                                    )})}
                                </select>
                            </div>
                        </div>
                        <div className="buttons">
                            <button className="red" onClick={(e) => {
                                e.preventDefault()
                                setEditModalOut(false)
                            }}>Cancel</button>
                            <button className="blue" type="submit" onClick={(e) => {
                                e.preventDefault()
                                courseFormData(e);
                                lecturerFormData(e);
                                venueFormData(e);
                                setEditModalOut(false)
                                cleanObj()
                                editCourses()
                            }}>
                                Edit course
                            </button>
                        </div>  
                    </form>
                </div>
            </div>
        </>
    );
}

export default Course;