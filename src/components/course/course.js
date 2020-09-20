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
import search from "../../images/search.png"
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

    const [formData, updateFormData] = useState(
        {
            name: "",
            code: "",
            unit: "",
            time: ""
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
            venueLabel: ""
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
        console.log(error);
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
                        venueLabel: course.venue.name
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


            return () => {
                source.cancel("Component got unmounted");
            };
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[]
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
                    <img src={search} className="search" alt="search"/>
                    <input placeholder="Enter keyword to search"/>
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
                       {loading === true ?  courses.map(course => {
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
                        <div className="input-c">
                            <div className="input-g">
                                <p>Name</p>
                                <input name="name" onChange={courseFormData}/>
                            </div>
                            <div className="input-g">
                                <p>Course code</p>
                                <input list="code" name="code" onChange={courseFormData}/>
                                <datalist id="code">
                                    <option value="100"/>
                                    <option value="200"/>
                                    <option value="300"/>
                                    <option value="400"/>
                                </datalist>
                            </div>
                            <div className="input-g">
                                <p>Course unit</p>
                                <input name="unit" onChange={courseFormData}/>
                            </div>
                            <div className="input-g">
                                <p>Time</p>
                                <input name="time" onChange={courseFormData}/>
                            </div>
                            <div className="input-g">
                                <p>Professor</p>
                                <select className="select-css" name="lecturer" onChange={lecturerFormData}>
                                    <option value="" defaultValue>Select a lecturer</option>
                                    {lecturers.map(lect => {
                                        return(
                                        <option value={lect._id} label={lect.name} key={lect._id}/>
                                    )})}
                                </select>
                            </div>
                            <div className="input-g">
                                <p>Venue</p>
                                <select className="select-css" name="venue" onChange={venueFormData}>
                                <option value="" defaultValue>Select a venue</option>
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
                                setModalOut(false)
                            }}>Cancel</button>
                            <button className="blue" type="submit" onClick={(e) => {
                                e.preventDefault()
                                courseFormData(e);
                                lecturerFormData(e);
                                venueFormData(e);
                                createCourses()
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
                            <div className="input-g">
                                <p>Name</p>
                                <input name="name" placeholder={labelData.nameLabel} onChange={courseFormData}/>
                            </div>
                            <div className="input-g">
                                <p>Course code</p>
                                <input list="code" name="code" placeholder={labelData.codeLabel} onChange={courseFormData}/>
                                <datalist id="code">
                                    <option value="100"/>
                                    <option value="200"/>
                                    <option value="300"/>
                                    <option value="400"/>
                                </datalist>
                            </div>
                            <div className="input-g">
                                <p>Course unit</p>
                                <input name="unit" placeholder={labelData.unitLabel} onChange={courseFormData}/>
                            </div>
                            <div className="input-g">
                                <p>Time</p>
                                <input name="time" placeholder={labelData.timeLabel} onChange={courseFormData}/>
                            </div>
                            <div className="input-g">
                                <p>Professor</p>
                                <select className="select-css" name="lecturer" defaultValue={labelData.lecturerLabel} onChange={lecturerFormData}>
                                    <option disabled value={labelData.lecturerLabel}>{labelData.lecturerLabel}</option>
                                    {lecturers.map(lect => {
                                        return(
                                        <option value={lect._id} label={lect.name} key={lect._id}/>
                                    )})}
                                </select>
                            </div>
                            <div className="input-g">
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