/* eslint-disable array-callback-return */
import React,{useState,useEffect} from "react"
import {Link} from "react-router-dom"
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./student.css"
import "../../global/global.css"
import bin from "../../images/bin.png"
import logo from "../../images/Logo.png"
import axios from "axios"
import spinner from "../../images/spinner.gif"
import cross from "../../images/close.png"
import checkr from "../../images/checkr.png"
import checkb from "../../images/checkb.png"
import checkg from "../../images/checkg.png"
import plus from "../../images/plus.svg"


const Student = (props) => {


    // Student states
    const [students,setStudents] = useState([])   
    const [loading, setLoading] = useState(false)
    const [pageSwitch, setPageSwitch] = useState("home")
    const [studId, setstudId] = useState("")
    const [deleted, setDeleted] = useState(false)
    const [edited, setEdited] = useState(false)
    const [profileData, setProfileData] = useState(
        {
            firstname: "",
            lastname: "",
            email: "",
            dob: "",
            matric: "",
            level: "",
            role: "",
            img: ""
        }
    )
    const [formData, setFormData] = useState(
        {
            firstname: "",
            lastname: "",
            email: "",
            dob: "",
            matric: "",
            level: "",
            role: "",
            password: ""
        }
    )
    
    const [labelData, setLabelData] = useState(
        {
            firstname: "",
            lastname: "",
            email: "",
            dob: "",
            matric: "",
            level: "",
            role: ""
        }
    )
    const [coursesHandled, coursesHandler] = useState([])
    const [studL,setStudL] = useState("")
    const [target, setTarget] = useState("")
    const [newArr, setNewArr] = useState([])
    const [switchState, setSwitchState] = useState("")
    const [deleter, setDeleter] = useState(false)
    const [deleteId, setDeleteId] = useState("")
    const [deleteName, setDeleteName] = useState("")
    const [created, setCreated] = useState(false)

    

    // Http requests G E D

    // For cancelling requests
    const source = axios.CancelToken.source();

    const setFormDataFn = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    // Remove empty inputs in edit form obj
    const cleanObj = () => {
        Object.keys(formData).forEach((key) => (formData[key] === "") && delete formData[key]);
    }

    // Get request
    const getStudents = () => {
        let config = {
            method: 'get',
            url: 'https://tbe-node-deploy.herokuapp.com/Admin/students/all',
            headers: { },
            cancelToken: source.token
          };
          
          axios(config)
          .then((response) => {
            setStudents(response.data.data)
            setLoading(true)
          })
          .catch((error) => {
            console.log(error);
          });
    }

    // Edit request(patch)
    const editstud = () => {
        let data = JSON.stringify(formData);

        let config = {
          method: 'patch',
          url: 'https://tbe-node-deploy.herokuapp.com/Admin/students/update',
          headers: { 
            '_id': studId, 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .then(()=> getStudents())
        .then(()=> {
            setPageSwitch("home")
            setTimeout(() => {
                setEdited(true)
            }, 10);
            setEdited(false)
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // Create request(patch)
    const createstud = () => {
        let data = new FormData();

        var file = document.getElementById("fileInput").files[0]
        var firstname = document.querySelector("#firstname").value
        var lastname = document.querySelector("#lastname").value
        var dob = document.querySelector("#dob").value
        var email = document.querySelector("#email").value
        var matric = document.querySelector("#matric").value
        var role = document.querySelector("#role").value
        var level = document.querySelector("#level").value

        data.append('firstname', firstname);
        data.append('lastname', lastname);
        data.append('email', email);
        data.append('dob', dob);
        data.append('matric', matric);
        data.append('role', role);
        data.append('image', file);
        data.append('level', level)

        console.log(...data)

        let config = {
          method: 'post',
          url: 'https://tbe-node-deploy.herokuapp.com/signup',
          headers: { 
            'content-type': 'multipart/form-data'
        },
          data : data
        };
        
        axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .then(()=> {
            setPageSwitch("home")
            setTimeout(() => {
                setCreated(true)
            }, 10);
            setCreated(false)
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // Delete Student
    const deleteStud = () => {
        let config = {
            method: 'delete',
            url: 'https://tbe-node-deploy.herokuapp.com/Admin/students/delete',
            headers: { 
              '_id': deleteId
            }
          };
          
          axios(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
          })
          .then(()=> getStudents())
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
        getStudents()
        studentLength()
        filterFn()
        setDelName()
        return () => {
            source.cancel("Component got unmounted");
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[students])

    // Generating courses handled
    const setCoursesHandled = (data) => {
        students.map(stud => {
            if(stud._id === data){
                coursesHandler(stud.courses)
            }
        }) 
    }

    // Generating no of students registered
    const studentLength = () => {
        setStudL(students.length)
    }

    // Generate profile data
    const genProfileData = (data) => {
        students.map((stud) => {
            if(stud._id === data){
                setProfileData({
                    ...profileData,
                    firstname: stud.firstname,
                    lastname: stud.lastname,
                    email: stud.email,
                    dob: stud.dob,
                    matric: stud.matric,
                    level: stud.level,
                    role: stud.role,
                    img: stud.image
                })
            }
        })
    }

    // Generate label for edit form
    const genLabelData = (data) => {
        students.map((stud) => {
            if(stud._id === data){
                setLabelData({
                    ...labelData,
                    firstnameL: stud.firstname,
                    lastnameL: stud.lastname,
                    emailL: stud.email,
                    dobL: stud.dob,
                    matricL: stud.matric,
                    levelL: stud.level,
                    roleL: stud.role
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
        setNewArr(students
        .filter(d=> {
            if(switchState === "First Name"){
                return d.firstname.toLowerCase().includes(target.toLowerCase()) === true
            }else if(switchState === "" || switchState === "All"){
                return d.firstname.toLowerCase().includes(target.toLowerCase()) === true || d.email.toLowerCase().includes(target.toLowerCase()) === true
            }else if(switchState === "Email"){
                return d.email.toLowerCase().includes(target.toLowerCase()) === true
            }
        }))
    }

    //Get all the inputs...
    const inputs = document.querySelectorAll('.editProfileContainer input, textarea');

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
            console.log("valid")
            input.classList.remove('error')
            input.classList.add('good')
        }
    })

    }


    // Delete Modal
    const setDelName = () => {
        students.map((stud)=> {
            if(stud._id === deleteId){
                setDeleteName(`${stud.firstname} ${stud.lastname}`)
            }
        })
    }

    const openDelete = (data) => {
        setDeleter(!deleter)
        setDeleteId(data)
    }

    // Form validation
    const success = () => {
        const matric = document.querySelector("#matric")
        const warningInput = document.querySelector(".warning")
        // eslint-disable-next-line array-callback-return
        students.map((stud)=> {
            if(stud.matric === matric.value){
                warningInput.classList.add("display")
                matric.classList.add("error")
            }
        })
    }

    const successE = () => {
        const matric = document.querySelector("#matricE")
        const warningInput = document.querySelector(".warning2")
        // eslint-disable-next-line array-callback-return
        students.map((stud)=> {
            if(stud.matric === matric.value){
                warningInput.classList.add("display")
                matric.classList.add("error")
            }
        })
    }

    const formSub = (e) => {
        e.preventDefault()
        createstud()
        success()
    }

    const formSubE = (e) => {
        e.preventDefault()
        editstud()
        successE()
    }

    return (
        <>
            <header>
                  <div>
                    <img src={logo} className="logo" alt="logo"/>
                    <p>Student</p>
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
                        <option>First Name</option>
                        <option>Email</option>
                    </select>
                    <input placeholder="Enter keyword to search" onChange={onChangeHandler} />
                    <button onClick={()=>setPageSwitch("create")}><img src={plus} alt="plus"/>Add new student</button>
                </div>
                <p className="studReg">Students registered : {studL}</p>
                {pageSwitch === "home" ? 
                <div className="table-container">
                    <table className="table">
                    <thead className="table-head">
                        <tr className="row1">
                        <th>Name</th>
                        <th>Email</th>
                        <th>Courses</th>
                        <th>Action</th>
                        <th>Profile</th>
                        </tr>
                    </thead>
                    <TransitionGroup component="tbody" className="gfg">
                        {loading === true ? newArr
                        .map((stud) => {
                            return (
                                <CSSTransition
                                    timeout={900}
                                    classNames="slide"
                                    in={true}
                                    appear={true}
                                    key={stud._id}
                                    onExited={()=> console.log("exited")}
                                >
                                <tr className="default" key={stud._id}>
                                    <td>{stud.firstname} {stud.lastname}</td>
                                    <td>{stud.email}</td>
                                    <td>Courses handled</td>
                                    <td>
                                        <img
                                        src={bin}
                                        alt="bin"
                                        className="bin"
                                        onClick={()=> openDelete(stud._id)}
                                        />
                                    </td>
                                    <td><button className="proBtn" onClick={()=> {
                                        setPageSwitch("profile")
                                        genProfileData(stud._id)
                                        genLabelData(stud._id)
                                        setstudId(stud._id)
                                        setCoursesHandled(stud._id)
                                        }
                                    }>View</button></td>
                                </tr>
                                </CSSTransition>
                            );
                        }) : 
                        <CSSTransition
                            timeout={900}
                            classNames="slide3"
                            in={true}
                            appear={true}
                            key="1"
                            onExited={()=> console.log("exited")} 
                        >
                        <tr><td colSpan="5"><img src={spinner} className="spinner" alt="Spinner"/></td></tr>
                        </CSSTransition>}
                        {newArr.length === 0 && loading === true ? 
                        <CSSTransition
                        timeout={10}
                        classNames="slide2"
                        in={true}
                        appear={true}
                        key="2"
                        >
                            <tr><td colSpan="5" style={{color:  "#0395ff", fontSize: "18px"}}><p>No search results ... </p></td></tr>
                        </CSSTransition> : null}
                    </TransitionGroup> 
                    </table>
                </div>
                : null}


                {/* Delete Modal */}
                <div className={deleter === true ? "deleteModal delModOut" : "deleteModal"}>
                    <p>Are you sure you want to delete Student {deleteName}?</p>
                    <div>
                        <button onClick={()=> deleteStud()} className="red2">Yes</button>
                        <button onClick={()=> setDeleter(false)}>No</button>
                    </div>
                </div>

                {/* Success messages */}
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

                <div className={created === true ? "successMsg flexModOut" : "successMsg"}>
                    <div>
                        <img src={checkg} style={{"height": "25px"}} alt="good"/>
                        <h3>Success</h3>
                    </div>
                    <p>Room created!</p>
                </div>

                {/* Overlay */}
                <div className={deleter === true ? "overlay modOut" : "overlay"}
                onClick={()=>{
                    setDeleter(false);
                }}></div>

                {pageSwitch === "profile" ?
                <div className="profile-container">
                    <div className="profile">
                        <div className="circular">
                            <img src={profileData.img} alt="profile"/>
                        </div>
                        <div className="name-group">
                            <div className="detail">
                                <p>First Name:</p>
                                <p>{profileData.firstname}</p>
                            </div>
                            <div className="detail">
                                <p>Last Name:</p>
                                <p>{profileData.lastname}</p>
                            </div>
                            <div className="detail">
                                <p>E-Mail:</p>
                                <p>{profileData.email}</p>
                            </div>
                            <div className="detail">
                                <p>Matric No:</p>
                                <p>{profileData.matric}</p>
                            </div>
                            <div className="detail">
                                <p>Date of birth:</p>
                                <p>{profileData.dob}</p>
                            </div>
                            <div className="detail">
                                <p>Level:</p>
                                <p>{profileData.level}</p>
                            </div>
                            <div className="detail">
                                <p>Role:</p>
                                <p>{profileData.role}</p>
                            </div>
                            <div className="detail ma">
                                <button className="backBtn" onClick={()=> setPageSwitch("home")}>Back</button>
                                <button onClick={()=> setPageSwitch("edit")}>Edit</button>
                            </div>
                        </div>  
                    </div>

                    <div className="table-container">
                        <table className="table">
                            <thead className="table-head">
                                <tr className="row1">
                                <th>Course Code</th>
                                <th>Course Name</th>
                                <th>Course Unit</th>
                                <th>Lecturer</th>
                                </tr>
                            </thead>
                            <tbody className="gfg">
                                {coursesHandled.map((course)=> {
                                    return(
                                        <tr className="default" key={course._id}>
                                        <td>{course.code}</td>
                                        <td>{course.name}</td>
                                        <td>{course.unit}</td>
                                        <td>{course.lecturer.name}</td>
                                    </tr>
                                    );
                                })}
                                
                            </tbody>
                        </table>
                    </div>
                </div>
                : null}

                {pageSwitch === "edit" ?
                <div className="editProfile">
                    <div className="editHeading">
                        <h3>Edit your profile</h3>
                        <img src={cross} alt="close" onClick={()=> setPageSwitch("home")}/>
                    </div>
                    <form onSubmit={formSubE}>
                    <div className="editProfileContainer">
                    <div className="input-field field-details-flex2">
                            <div className="field-name">
                                Full Name
                            </div>
                            <div>
                                <div className="field-details field-details-flex">
                                    <div className="field pr">
                                        <p>First name</p>
                                        <input placeholder={labelData.firstnameL} name="firstname" onChange={setFormDataFn}/>
                                    </div>
                                    <div className="field">
                                        <p>Last name</p>
                                        <input placeholder={labelData.lastnameL} name="lastname" onChange={setFormDataFn}/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="input-field field-details-flex2">
                            <div className="field-name">
                                About
                            </div>
                            <div>
                                <div className="field-details field-details-flex">
                                    <div className="field pr">
                                        <p>Matric/No</p>
                                        <input placeholder={labelData.matricL} id="matricE" name="matric" onChange={setFormDataFn}/>
                                        <em className="warning warning2">Matric no already exists </em>
                                    </div>
                                    <div className="field">
                                        <p>Level</p>
                                        <input placeholder={labelData.levelL} type="number" list="levels" name="level" onChange={setFormDataFn}/>
                                        <datalist id="levels">
                                            <option value="100"></option>
                                            <option value="200"></option>
                                            <option value="300"></option>
                                            <option value="400"></option>
                                        </datalist>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="input-field">
                            <div className="field-name">
                                Email Address
                                <p className="notbold">We send saving notifications and other account updates to your confirmed email address</p>
                            </div>
                            <div className="field-details">
                                <div className="field">
                                    <p>Email Address</p>
                                    <input placeholder={labelData.emailL} className="wid-4" name="email" onChange={setFormDataFn} type="email"/>
                                </div>
                            </div>
                        </div>

                        <div className="input-field">
                            <button className="updateProfileBtn" type="submit" onClick={(e)=> {
                                cleanObj()
                                setFormDataFn(e)
                            }}>
                                Update Profile
                            </button>
                        </div>
                    </div>
                    </form>
                </div> : null}

                {pageSwitch === "create" ?
                <div className="editProfile">
                    <div className="editHeading">
                        <h3>Create your profile</h3>
                        <img src={cross} alt="close" onClick={()=> setPageSwitch("home")}/>
                    </div>
                    <form onSubmit={formSub}>
                    <div className="editProfileContainer">
                    <div className="input-field">
                            <div className="field-details">
                                <div className="field">
                                    <p>Add image</p>
                                    <input className="wid-4" type="file" id="fileInput" name="image" required/>
                                </div>
                            </div>
                    </div>
                    <div className="input-field field-details-flex2">
                            <div className="field-name">
                                Full Name
                            </div>
                            <div>
                                <div className="field-details field-details-flex">
                                    <div className="field pr">
                                        <p>First name</p>
                                        <input name="firstname" id="firstname" required/>
                                    </div>
                                    <div className="field">
                                        <p>Last name</p>
                                        <input name="lastname" id="lastname" required/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="input-field field-details-flex2">
                            <div className="field-name">
                                About
                            </div>
                            <div>
                                <div className="field-details field-details-flex">
                                    <div className="field pr">
                                        <p>Matric/No</p>
                                        <input name="matric" id="matric" required/>
                                        <em className="warning">Matric no already exists </em>
                                    </div>
                                    <div className="field">
                                        <p>Level</p>
                                        <input type="number" list="levels" name="level" id="level" required/>
                                        <datalist id="levels">
                                            <option value="100"></option>
                                            <option value="200"></option>
                                            <option value="300"></option>
                                            <option value="400"></option>
                                        </datalist>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="input-field field-details-flex2">
                            <div>
                                <div className="field-details field-details-flex">
                                    <div className="field pr">
                                        <p>Date of birth</p>
                                        <input name="dob" id="dob" required/>
                                    </div>
                                    <div className="field">
                                        <p>Role</p>
                                        <input id="role" name="role" required/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="input-field">
                            <div className="field-name">
                                Email Address
                                <p className="notbold">We send saving notifications and other account updates to your confirmed email address</p>
                            </div>
                            <div className="field-details">
                                <div className="field">
                                    <p>Email Address</p>
                                    <input className="wid-4" id="email" name="email" type="email" required/>
                                </div>
                            </div>
                        </div>

                        <div className="input-field">
                            <button className="updateProfileBtn" type="submit" onClick={(e)=> {
                                cleanObj()
                                setFormDataFn(e)
                            }}>
                                Create Profile
                            </button>
                        </div>
                    </div>
                    </form>
                </div> : null}
            </div>
        </>
    );
}

export default Student;