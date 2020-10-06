/* eslint-disable array-callback-return */
import React,{useState,useEffect} from "react"
import {Link} from "react-router-dom"
import "./class.css"
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


const Classes = (props) => {

    const [modalOut, setModalOut] = useState(false)
    const [classes,setClasses] = useState([])   
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
    const [classData, setClassData] = useState(
        {
            name: "",
            Courses: "",
            Population: "",
            Meeting: "",
            UnavailableRooms: ""
        }
    )
    const [id2, setId2] = useState("1234");
    const [labelData, setLabelData] = useState(
        {
            nameLabel: "",
            courseLabel: "",
            meetingLabel: "",
            populationLabel: "",
            uarLabel: ""
        }
    );
    // setting key for edit form
    const [id, setId] = useState("123");
    const [target, setTarget] = useState("")
    const [newArr, setNewArr] = useState([])
    const [switchState, setSwitchState] = useState("")
    

    // Http requests and relatives
    const classFormData = (e) => {
        setClassData({
            ...classData,
            [e.target.name]: e.target.value.trim()
        })
        console.log(classData)
    }


    // For cancelling requests
    const source = axios.CancelToken.source();

    // Create Classes
    const createClass = (e) => {
        e.preventDefault()
        let data = JSON.stringify(classData);

        let config = {
        method: 'post',
        url: 'https://tbe-node-deploy.herokuapp.com/Admin/class/create',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };

        axios(config)
        .then((response) => {
        console.log(JSON.stringify(response.data));
        })
        .then(()=> getClasses())
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

    // Get classes
    const getClasses = () => {
        let config = {
        method: 'get',
        url: 'https://tbe-node-deploy.herokuapp.com/Admin/class/all',
        headers: { },
        cancelToken: source.token
        };

        axios(config)
        .then((response) => {
            setClasses(response.data.data)
            setLoading(true)
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
            setCourses(res)
            setLoading(true)
        })
        .catch((error) => {
           
        });
    }

    // Edit class
    const editClass = () => {
        let data = JSON.stringify(classData);

        let config = {
        method: 'patch',
        url: 'https://tbe-node-deploy.herokuapp.com/Admin/class/update',
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
        .then(()=> getClasses())
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

    // Delete class
    const deleteClass = () => {
        let config = {
            method: 'delete',
            url: 'https://tbe-node-deploy.herokuapp.com/Admin/class/delete',
            headers: { 
              '_id': deleteId
            }
          };
          
          axios(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
          })
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
        getClasses()
        fetchCourses()
        filterFn()
        setDelName()
        return () => {
            source.cancel("Component got unmounted");
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[classes])


    // Remove empty inputs in edit form obj
    const cleanObj = () => {
        Object.keys(classData).forEach((key) => (classData[key] === "") && delete classData[key]);
    }

    // Generating form labels for edit
    const genFormLabels = (data) => {
        // eslint-disable-next-line array-callback-return
        classes.map((clas) => {
                if(clas._id === data){
                    setLabelData({
                        ...labelData,
                        nameLabel: clas.name,
                        courseLabel: clas.Courses[0].name,
                        meetingLabel: clas.Meeting,
                        populationLabel: clas.Population,
                        uarLabel: clas.UnavailableRooms
                    })
                }
            })
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
            setNewArr(classes
            // eslint-disable-next-line array-callback-return
            .filter(d=> {
                if(switchState === "Name"){
                    return d.name.toLowerCase().includes(target.toLowerCase()) === true
                }else if(switchState === "" || switchState === "All"){
                    return d.name.toLowerCase().includes(target.toLowerCase()) === true || 
                    d.Courses[0].name.toLowerCase().includes(target.toLowerCase()) === true ||
                    d.UnavailableRooms.toString().toLowerCase().includes(target.toLowerCase()) === true 
                    || 
                    d.Population.toString().toLowerCase().includes(target.toLowerCase()) === true
                }else if(switchState === "Course"){

                    return d.Courses[0].name.toLowerCase().includes(target.toLowerCase()) === true

                }else if(switchState === "Un-Rooms"){

                    return d.UnavailableRooms.toString().toLowerCase().includes(target.toLowerCase()) === true

                }else if(switchState === "Size"){

                    return d.Population.toString().toLowerCase().includes(target.toLowerCase()) === true

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
        // eslint-disable-next-line array-callback-return
        classes.map((clas)=> {
            if(clas.name === nameIn.value){
                warningInput.classList.add("display")
                nameIn.classList.add("error")
            }
        })
    }

    const successEdit = () => {
        const nameIn = document.querySelector(".nameInput2")
        const warningInput = document.querySelector(".warning2")
        // eslint-disable-next-line array-callback-return
        classes.map((clas)=> {
            if(clas.name === nameIn.value){
                warningInput.classList.add("display")
                nameIn.classList.add("error")
            }
        })
    }

    const formSubmit = (e) => {
        createClass(e)
        success()
    }

    

    // Delete modal
    const setDelName = () => {
        classes.map((clas)=> {
            if(clas._id === deleteId){
                setDeleteName(clas.name)
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
                    <p>Classes</p>
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
                        <option>Size</option>
                        <option>Course</option>
                        <option>Un-Rooms</option>
                    </select>
                    <input placeholder="Enter keyword to search" onChange={onChangeHandler} />
                    <button onClick={()=>{
                        setModalOut(!modalOut);
                        setId2(Math.random().toString());
                    }}><img src={plus} alt="plus"/>Add new class</button>
                </div>
                <div className="table-container">
                    <table className="table">
                    <thead className="table-head">
                        <tr className="row1">
                        <th>Name</th>
                        <th>Class size</th>
                        <th>Course</th>
                        <th>Unavailable Rooms</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="gfg">
                       {loading === true ? newArr
                       .map((clas) => {
                               return (
                                <tr className="default" key={clas._id}>
                                <td>{clas.name}</td>
                                <td>{clas.Population}</td>
                                <td>{clas.Courses[0].name}</td>
                                <td>{clas.UnavailableRooms}</td>
                                <td>
                                    <img
                                    src={pen}
                                    alt="pencil"
                                    className="pencil"
                                    onClick={() => {
                                        setEditModalOut(true)
                                        setEditCourseId(clas._id)
                                        genFormLabels(clas._id)
                                        setId(Math.random().toString())
                                    }}
                                    />
                                    <img
                                    src={bin}
                                    alt="bin"
                                    className="bin"
                                    onClick={()=> openDelete(clas._id)}
                                    />
                                </td>
                                </tr>
                               );
                           }
                       ) : <tr><td colSpan="5"><img src={spinner} className="spinner" alt="Spinner"/></td></tr>}
                       {newArr.length === 0 && loading === true ? <tr><td colSpan="5" style={{color:  "#0395ff", fontSize: "18px"}}><p>No search results ... </p></td></tr> : null}
                    </tbody>
                    </table>
                </div>

                {/* Delete modal */}
                <div className={deleter === true ? "deleteModal delModOut" : "deleteModal"}>
                <p>Are you sure you want to delete Class {deleteName}?</p>
                    <div>
                        <button onClick={()=> deleteClass()} className="red2">Yes</button>
                        <button onClick={()=> setDeleter(false)}>No</button>
                    </div>
                </div>

                {/* Delete overlay */}
                <div className={deleter === true ? "overlay modOut" : "overlay"}
                onClick={()=>{
                    setDeleter(false);
                }}></div>

                {/* Modals */}
                <div className={modalOut === true ? "overlay modOut" : "overlay"}
                onClick={()=>{
                    setModalOut(!modalOut);
                }}></div>
                
                <div className={editModalOut === true  ? "overlay modOut" : "overlay"}
                    onClick={()=>{
                    setEditModalOut(!editModalOut);
                }}></div>

                {/* success messages */}
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

                {/* Create class form */}
                <div className={modalOut === true ? "modal modalClass modOut" : "modal modalClass"} key={id2}>
                    <div className="head">
                        <h3>Add new class</h3>
                        <img src={cross} alt="cross" onClick={()=>{
                        setModalOut(!modalOut);
                    }}/>
                    </div>
                    <form onSubmit={formSubmit}>
                    <div className="input-c">
                        <div className="input-g">
                            <p>Name</p>
                            <input name="name" className="nameInput" onChange={classFormData} required/>
                            <em className="warning">Class already exists </em>
                        </div>
                        <div className="input-g">
                                <p>Course</p>
                                <select className="select-css"  name="Courses" onChange={classFormData} required>
                                    <option value="" defaultValue>Select a course</option>
                                    {courses.map(course => {
                                        return(
                                        <option value={course._id} label={course.name} key={course._id}/>
                                    )})}
                                </select>
                        </div>
                        <div className="input-sub-group">
                            <div className="input-g2">
                                <p>Meeting</p>
                                <input name="Meeting" onChange={classFormData} required/>
                            </div>
                            <div className="input-g2">
                                <p>Population</p>
                                <input name="Population" type="number" onChange={classFormData} required/>
                            </div>
                        </div>
                        <div className="input-g">
                            <p>Unavailable lecture rooms</p>
                            <input name="UnavailableRooms" onChange={classFormData} required/>
                        </div>
                    </div>
                    <div className="buttons">
                        <button className="red" onClick={()=> {
                            setModalOut(false)
                        }}>Cancel</button>
                        <button className="blue" type="submit" onClick={(e)=> {
                            classFormData(e)
                        }}>
                            Add class
                        </button>
                    </div>
                    </form>
                </div>

                {/* Edit class form */}
                <div className={editModalOut === true ? "modal modalClass modOut" : "modal modalClass"} key={id}>
                    <div className="head">
                        <h3>Edit class</h3>
                        <img src={cross} alt="cross" onClick={()=>{
                        setEditModalOut(false);
                    }}/>
                    </div>
                    <div className="input-c">
                        <div className="input-g">
                            <p>Name</p>
                            <input name="name" className="nameInput2" onChange={classFormData} placeholder={labelData.nameLabel}/>
                            <em className="warning warning2">Class already exists </em>
                        </div>
                        <div className="input-g">
                                <p>Course</p>
                                <select className="select-css" name="Courses" defaultValue={labelData.courseLabel} onChange={classFormData}>
                                    <option value={labelData.courseLabel} disabled>{labelData.courseLabel}</option>
                                    {courses.map(course => {
                                        return(
                                        <option value={course._id} label={course.name} key={course._id}/>
                                    )})}
                                </select>
                        </div>
                        <div className="input-sub-group">
                            <div className="input-g2">
                                <p>Meeting</p>
                                <input name="Meeting" onChange={classFormData} placeholder={labelData.meetingLabel}/>
                            </div>
                            <div className="input-g2">
                                <p>Population</p>
                                <input name="Population" onChange={classFormData} type="number" placeholder={labelData.populationLabel}/>
                            </div>
                        </div>
                        <div className="input-g">
                            <p>Unavailable lecture rooms</p>
                            <input name="UnavailableRooms" onChange={classFormData} placeholder={labelData.uarLabel}/>
                        </div>
                    </div>
                    <div className="buttons">
                        <button className="red" onClick={()=> setEditModalOut(false)}>Cancel</button>
                        <button className="blue" onClick={(e)=> {
                            classFormData(e)
                            cleanObj()
                            editClass()
                            successEdit()
                        }}>
                            Edit class
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Classes;