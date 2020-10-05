/* eslint-disable array-callback-return */
import React,{useState,useEffect} from "react"
import {Link} from "react-router-dom"
import "./student.css"
import "../../global/global.css"
import bin from "../../images/bin.png"
import logo from "../../images/Logo.png"
import axios from "axios"
import spinner from "../../images/spinner.gif"
import cross from "../../images/close.png"
import checkr from "../../images/checkr.png"
import checkb from "../../images/checkb.png"


const Student = (props) => {

    const [students,setStudents] = useState([])   
    const [loading, setLoading] = useState(false)
    const [pageSwitch, setPageSwitch] = useState("home")
    const [studId, setstudId] = useState("")
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
            role: ""
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

    const setFormDataFn = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
        console.log(formData)
    }

    // Remove empty inputs in edit form obj
    const cleanObj = () => {
        Object.keys(formData).forEach((key) => (formData[key] === "") && delete formData[key]);
    }

    const [deleted, setDeleted] = useState(false)
    const [edited, setEdited] = useState(false)
    // Edit request(patch)
    const editstud = (e) => {
        e.preventDefault()
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

    // For cancelling requests
    const source = axios.CancelToken.source();

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

    const [deleter, setDeleter] = useState(false)
    const [deleteId, setDeleteId] = useState("")
    const [deleteName, setDeleteName] = useState("")

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
                    <p style={{marginLeft: "30px"}}>Students registered : {studL}</p>
                </div>
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
                    <tbody className="gfg">
                        {loading === true ? newArr
                        .map((stud) => {
                            return (
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
                            );
                        }) : <tr><td colSpan="5"><img src={spinner} className="spinner" alt="Spinner"/></td></tr>}
                        {newArr.length === 0 && loading === true ? <tr><td colSpan="5" style={{color:  "#0395ff", fontSize: "18px"}}><p>No search results ... </p></td></tr> : null}
                    </tbody>
                    </table>
                </div>
                : null}

                <div className={deleter === true ? "deleteModal delModOut" : "deleteModal"}>
                    <p>Are you sure you want to delete Student {deleteName}?</p>
                    <div>
                        <button onClick={()=> deleteStud()} className="red2">Yes</button>
                        <button onClick={()=> setDeleter(false)}>No</button>
                    </div>
                </div>

                <div className={deleter === true ? "overlay modOut" : "overlay"}
                onClick={()=>{
                    setDeleter(false);
                }}></div>

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
                    <form onSubmit={editstud}>
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
                                        <input placeholder={labelData.matricL} name="matric" onChange={setFormDataFn}/>
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
            </div>
        </>
    );
}

export default Student;