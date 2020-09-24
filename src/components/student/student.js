/* eslint-disable array-callback-return */
import React,{useState,useEffect,useRef} from "react"
import {Link} from "react-router-dom"
import "./student.css"
import "../../global/global.css"
import bin from "../../images/bin.png"
import bell from "../../images/alarm-bell@3x.png"
import logo from "../../images/Logo.png"
import search from "../../images/search.png"
import axios from "axios"
import spinner from "../../images/spinner.gif"
import propic from "../../images/Profile Picture.svg"
import cross from "../../images/close.png"


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
            role: ""
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
        .catch((error) => {
          console.log(error);
        });
    }

    // For cancelling requests
    const source = axios.CancelToken.source();

    //  var formData = new FormData();
    // var imagefile = document.querySelector('#file');
    // formData.append("image", imagefile.files[0]);
    // axios.post('upload_file', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    // })


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
                    role: stud.role
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
    const deleteStud = (data) => {
        let config = {
            method: 'delete',
            url: 'https://tbe-node-deploy.herokuapp.com/Admin/students/delete',
            headers: { 
              '_id': data
            }
          };
          
          axios(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
          })
          .then(()=> getStudents())
          .catch((error) => {
            console.log(error);
          });
          
    }

    useEffect(() => {
        getStudents()
        studentLength()
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

    // Filtering
    const onChangeHandler = () =>{
        console.log(textInput.current.value)
        getStudents()
    }

    const textInput = useRef(null)

    return (
        <>
            <header>
                  <div>
                    <img src={logo} className="logo" alt="logo"/>
                    <p>Student</p>
                  </div>
                  <div className="navMobile"> 
                    <Link to="/app/notification">
                            <img src={bell} alt="bell"/>
                    </Link>
                  </div>
              </header>
            <div className="section">
                <div className="search-container">
                    <img src={search} className="search" alt="search" onClick={()=> onChangeHandler()}/>
                    <input placeholder="Enter keyword to search" ref={textInput}/>
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
                        {loading === true ? students
                        .filter(d=> {
                            return d.firstname.toLowerCase().includes(textInput.current.value.toLowerCase()) === true
                        })
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
                                        onClick={()=> deleteStud(stud._id)}
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
                    </tbody>
                    </table>
                </div>
                : null}

                {pageSwitch === "profile" ?
                <div className="profile-container">
                    <div className="profile">
                        <img src={propic} alt="profile"/>
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
                                        <input placeholder={labelData.levelL} name="level" onChange={setFormDataFn}/>
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
                                    <input placeholder={labelData.emailL} className="wid-4" name="email" onChange={setFormDataFn}/>
                                </div>
                            </div>
                        </div>

                        <div className="input-field">
                            <button className="updateProfileBtn" onClick={(e)=> {
                                cleanObj()
                                setFormDataFn(e)
                                editstud()
                            }}>
                                Update Profile
                            </button>
                        </div>
                    </div>
                </div> : null}
            </div>
        </>
    );
}

export default Student;