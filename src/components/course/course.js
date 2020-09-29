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

    const [id2, setId2] = useState("1234");

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

    const createCourses = (e) => {
        e.preventDefault()
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
        .then(()=> setModalOut(false))
        .catch((error) => {
            
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
        .then(()=> setEditModalOut(false))
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
          })
          .catch((error) => {
            
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

    const success = () => {
        const nameIn = document.querySelector(".nameInput")
        const warningInput = document.querySelector(".warning")
        courses.map((course)=> {
            if(course.name === nameIn.value){
                warningInput.classList.add("display")
                nameIn.classList.add("error")
            }
        })
    }

    //Get all the inputs...
    const inputs = document.querySelectorAll('form input,select');
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

    const successEdit = () => {
        const nameIn = document.querySelector(".nameInput2")
        const warningInput = document.querySelector(".warning2")
        courses.map((course)=> {
            if(course.name.toString() === nameIn.value.toString()){
                warningInput.classList.add("display")
                nameIn.classList.add("error")
            }
        })
    }
    
    const formSubmit = (e) => {
        createCourses(e)
        success()
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
                        setId2(Math.random().toString());
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
                <div className={modalOut === true ? "modal modOut" : "modal"} key={id2}>
                    <div className="head">
                        <h3>Add new course</h3>
                        <img src={cross} alt="cross" onClick={()=>{
                        setModalOut(!modalOut);
                    }}/>
                    </div>
                    <form  name="courseFormData" id="courses" onSubmit={formSubmit}>
                        <div className="input-g">
                            
                        </div>
                        <div className="input-c">
                            <div className="input-flex">
                                <div className="input-gi">
                                    <p>Name</p>
                                    <input name="name" className="nameInput"  onChange={courseFormData} required/>
                                    <em className="warning">Course already exist</em>
                                </div>
                                <div className="input-gi">
                                    <p>Course code</p>
                                    <input list="code" type="number" name="code" onChange={courseFormData}required/>
                                </div>
                            </div>
                            <div className="input-flex">
                                <div className="input-gi">
                                    <p>Course unit</p>
                                    <input name="unit" type="number" onChange={courseFormData} required/>
                                </div>
                                <div className="input-gi">
                                    <p>Time</p>
                                    <input name="time" onChange={courseFormData} required/>
                                </div>
                            </div>
                            <div className="input-flex">
                                <div className="input-gi">
                                    <p>Level</p>
                                    <input list="levels" name="level" type="number" onChange={courseFormData} required/>
                                    <datalist id="levels">
                                        <option value="100"></option>
                                        <option value="200"></option>
                                        <option value="300"></option>
                                        <option value="400"></option>
                                    </datalist>
                                </div>
                                <div className="input-gi">
                                <p>Venue</p>
                                <select className="select-css" name="venue" onChange={venueFormData} required>
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
                                    <input name="day" placeholder="E.g monday,tuesday" onChange={courseFormData} required/>
                                </div>
                                <div className="input-gi">
                                    <p>Description</p>
                                    <input name="description" onChange={courseFormData} required/>
                                </div>
                            </div>
                            <div className="input-gi">
                                    <p>Professor</p>
                                    <select className="select-css" name="lecturer" onChange={lecturerFormData} required>
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
                                courseFormData(e);
                                lecturerFormData(e);
                                venueFormData(e);
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
                                    <input name="name" className="nameInput2" placeholder={labelData.nameLabel} onChange={courseFormData}/>
                                    <em className="warning warning2">Course already exist</em>
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
                                cleanObj()
                                editCourses()
                                successEdit()
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