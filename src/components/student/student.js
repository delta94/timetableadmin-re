/* eslint-disable array-callback-return */
import React,{useState} from "react"
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
import ReactPaginate from "react-paginate"
import { useQuery, useMutation , queryCache } from "react-query"

const getStud = (page, {pageNo, search}) => {

        return axios.get('https://tbe-node-deploy.herokuapp.com/Admin/students/all', {
            headers: {},
            params: {perPage: 2, page: pageNo, searchQuery: search}
        })
        .then((response) => {
            var students = response.data?.data.docs
            var pages = response.data?.data.totalPages
            return {students, pages}
        })
 }

 const deleteStud = (deleteId) => {
          
        return axios.delete('https://tbe-node-deploy.herokuapp.com/Admin/students/delete', {
            headers: { 
                '_id': deleteId
            }
        })
        .then((response) => {
            return response
        })      
}

const createStud = () => {
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

        return axios.post('https://tbe-node-deploy.herokuapp.com/signup', data, {
            headers: { 
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            return response;
        })
        .then((error)=> {
            return error
        })
}

const editStud = (args) => {
        let data = JSON.stringify(args.formData);

        return axios.patch('https://tbe-node-deploy.herokuapp.com/Admin/students/update', data, {
            headers: { 
                'Content-Type': 'application/json',
                '_id': args.studId
            }
        })
        .then((response) => {
            return response;
        })
        .then((error)=> {
            return error
        })
}

const getStudentsL = () => {

    return axios.get('https://tbe-node-deploy.herokuapp.com/Admin/students/all', {
        headers: {},
        params: { page: 1, searchQuery: ''}
    })
    .then((response) => {
        return response.data.data.docs
    })
}



const Student = (props) => {

    const [pageNo,setPageNo] = useState(null) 

    const [search, setSearch] = useState("")
    
    const {isLoading, data} = useQuery(['students', {pageNo, search}], getStud, {
        refetchOnWindowFocus: false
    })

    const studentsL = useQuery('students', getStudentsL, {
        refetchOnWindowFocus: false
    })

    const [deleteFn] = useMutation(deleteStud, { 
        onSuccess: () => {
            console.log("deleted")
            queryCache.refetchQueries('students')
            setDeleter(false)
            setTimeout(() => {
                setDeleted(true)
            }, 10);
            setDeleted(false)
        },
        onError: () => {
            console.log("error o")
        }
    })

    const [createFn] = useMutation(createStud, {
        onSuccess: () => {
            console.log("created")
            queryCache.refetchQueries('students')
            setPageSwitch("home")
            setTimeout(() => {
                setCreated(true)
            }, 10);
            setCreated(false)
        },
        onError: (error) => {
            console.log({...error})
        }
    })

    const [editFn] = useMutation(editStud, {
        onSuccess: () => {
            console.log("edited")
            queryCache.refetchQueries('students')
            setPageSwitch("home")
            setTimeout(() => {
                setEdited(true)
            }, 10);
            setEdited(false)
        },
        onError: () => {
            console.log("error o")
        }
    })



    // Student states
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
    const [deleter, setDeleter] = useState(false)
    const [deleteId, setDeleteId] = useState("")
    const [created, setCreated] = useState(false)

    


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

    // Generating courses handled
    const setCoursesHandled = (datum) => {
        data.students.map(stud => {
            if(stud._id === datum){
                coursesHandler(stud.courses)
            }
        }) 
    }

    // Generate profile data
    const genProfileData = (datum) => {
        data.students.map((stud) => {
            if(stud._id === datum){
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
    const genLabelData = (datum) => {
        data.students.map((stud) => {
            if(stud._id === datum){
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

    const openDelete = (data) => {
        setDeleter(!deleter)
        setDeleteId(data)
    }

    // Form validation
    const success = () => {
        const matric = document.querySelector("#matric")
        const warningInput = document.querySelector(".warning")
        // eslint-disable-next-line array-callback-return
        data.students.map((stud)=> {
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
        data.students.map((stud)=> {
            if(stud.matric === matric.value){
                warningInput.classList.add("display")
                matric.classList.add("error")
            }
        })
    }

    const formSub = (e) => {
        e.preventDefault()
        createFn()
        success()
    }

    const formSubE = (e) => {
        e.preventDefault()
        editFn({studId, formData})
        successE()
    }

    const onChangeHandler = (e) => {
        setSearch(e.target.value)
    }

    const paginate = (data) => {
        setPageNo(data.selected + 1)
        console.log(data)
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
                    <select className="select-css2" name="switch">
                        <option>Name</option>
                        {/* <option>First Name</option>
                        <option>Email</option> */}
                    </select>
                    <input placeholder="Search by first name" onChange={onChangeHandler} />
                    <button onClick={()=>setPageSwitch("create")}><img src={plus} alt="plus"/>Add new student</button>
                </div>

                <p className="studReg">Students registered : {studentsL.data?.length}</p>
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
                        {isLoading === false ? data?.students
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
                        {data?.students.length === 0 && isLoading === false ? 
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

                    {pageSwitch === 'home' ? <ReactPaginate 
                        previousLabel="<" 
                        nextLabel=">"
                        pageCount={data ? data?.pages : 0} 
                        pageRangeDisplayed="2" 
                        marginPagesDisplayed="2" 
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active2'}
                        onPageChange={paginate}
                    /> : null}


                {/* Delete Modal */}
                <div className={deleter === true ? "deleteModal delModOut" : "deleteModal"}>
                    <p>Are you sure you want to delete Student {
                    data?.students.map((stud)=> {
                        if(stud._id === deleteId){
                            return(
                                <em key={deleteId} className="deleteName">{stud.firstname}</em>
                            )
                        }
                    })}?</p>
                    <div>
                        <button onClick={()=> deleteFn(deleteId)} className="red2">Yes</button>
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
                                        <input id="role" name="role" disabled value="basic" placeholder="basic" required/>
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