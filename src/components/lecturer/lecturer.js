/* eslint-disable array-callback-return */
import React,{useState} from "react"
import {Link} from "react-router-dom"
import "./lecturer.css"
import "../../global/global.css"
import bin from "../../images/bin.png"
import plus from "../../images/plus.svg"
import logo from "../../images/Logo.png"
import axios from "axios"
import spinner from "../../images/spinner.gif"
import cross from "../../images/close.png"
import checkg from "../../images/checkg.png"
import pen from "../../images/pencil 1.png"
import checkr from "../../images/checkr.png"
import checkb from "../../images/checkb.png"
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useMutation, queryCache, useQuery} from "react-query"
import ReactPaginate from "react-paginate"



    const deleteLect = (deleteId) => {
            
        return axios.delete('https://tbe-node-deploy.herokuapp.com/Admin/lecturer/delete', {
            headers: { 
                '_id': deleteId
            }
        })
        .then((response) => {
            return response
        })      
    }

    const updateLecturer = (args) => {
        let data = new FormData();

        // Getting values
        var file = document.getElementById("fileInput").files[0]
        var name = document.querySelector("#name").value
        var edubg = document.querySelector("#edubg").value
        var pos = document.querySelector("#ranking").value
        var email = document.querySelector("#email").value
        var phone = document.querySelector("#phoneno").value
        var aos = document.querySelector("#aosc").value
        var officeno = document.querySelector("#officeno").value
        var degree = document.querySelector("#degree").value
        var array = []

        for (var i = 0; i < args.datum.length; i++) {
            array.push(args.datum[i])
            data.append(`Courses[${args.datum.indexOf(args.datum[i])}]`, args.datum[i])
        }

        let data2 = new FormData()

        data.append('name', name);
        data.append('email', email);
        data.append('education_bg', edubg);
        data.append('phone_no', phone);
        data.append('office_no', officeno);
        data.append('ranking', pos);
        data.append('degree', degree);
        data.append('areaOfSpec', aos);
        data.append('image', file);


        for(var pair of data.entries()) {
            if( pair[1] === "" || pair[1] === "undefined" ){
            }else{
                data2.append(pair[0], pair[1])
            }
        }

        console.log(...data2)

        return axios.patch("https://tbe-node-deploy.herokuapp.com/admin/v2/lecturer/update", data2, {
            headers: { 
                'Content-Type': 'multipart/form-data',
                '_id': args.lectId
            }
        })
        .then((response) => {
            return response;
        })
        .then((error)=> {
            return error
        })
    }

    const getLect = (page, {pageNo, search}) => {

        return axios.get('https://tbe-node-deploy.herokuapp.com/Admin/getlecturer', {
            headers: {},
            params: {perPage: 5, page: pageNo, searchQuery: search}
        })
        .then((response) => {
            var lect = response.data?.data.docs
            var pages = response.data?.data.totalPages
            return {lect, pages}
        })
    }

    const createLect = (datum) => {
        let data = new FormData();

        // Getting values
        var file = document.getElementById("fileInput").files[0]
        var name = document.querySelector("#namec").value
        var edubg = document.querySelector("#edubgc").value
        var pos = document.querySelector("#posc").value
        var email = document.querySelector("#emailc").value
        var phone = document.querySelector("#phonec").value
        var aos = document.querySelector("#aosc").value
        var officeno = document.querySelector("#officenoc").value
        var degree = document.querySelector("#degreec").value
        data.append('name', name);
        data.append('email', email);
        data.append('education_bg', edubg);
        data.append('phone_no', phone);
        data.append('office_no', officeno);
        data.append('ranking', pos);
        data.append('degree', degree);
        data.append('areaOfSpec', aos);
        data.append('image', file);
        var array = []

        for (var i = 0; i < datum.length; i++) {
            array.push(datum[i])
            data.append(`Courses[${datum.indexOf(datum[i])}]`, datum[i])
        }
    
        console.log(...data)

        return axios.post('https://tbe-node-deploy.herokuapp.com/Admin/lecturer/image', data, {
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

    const getCourses = () => {

        return axios.get('https://tbe-node-deploy.herokuapp.com/Admin/getCourse', {
            headers: {},
            params: { page: 1, searchQuery: ''}
        })
        .then((response) => {
            return response.data.data.docs
        })
    }

const Lecturer = (props) => {
    const [pageNo,setPageNo] = useState(null)

    const [search, setSearch] = useState("")

    const {isLoading, data} = useQuery(['lecturers', {pageNo, search}], getLect, {
        refetchOnWindowFocus: false
    })

    const courses = useQuery('courses', getCourses, {
        refetchOnWindowFocus: false
    })

    const [deleteFn] = useMutation(deleteLect, { 
        onSuccess: () => {
            console.log("deleted")
            queryCache.refetchQueries('lecturers')
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

    const [editFn] = useMutation(updateLecturer, {
        onSuccess: () => {
            console.log("edited")
            queryCache.refetchQueries('lecturers')
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

    const [createFn] = useMutation(createLect, {
        onSuccess: () => {
            console.log("created")
            queryCache.refetchQueries('lecturers')
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

    const [pageSwitch, setPageSwitch] = useState("home")
    const [lectId, setLectId] = useState("")
    const [created, setCreated] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [edited, setEdited] = useState(false)
    const [deleter, setDeleter] = useState(false)
    const [deleteId, setDeleteId] = useState("")
    const [coursesHandled, coursesHandler] = useState([])
    const [profileData, setProfileData] = useState(
        {
            name: "",
            email: "",
            phoneNo: "",
            officeNo: "",
            degree: "",
            areaOfSpec: "",
            ranking: "",
            educationBg: "",
            image:""
        }
    )
    const [labelData, setLabelData] = useState(
        {
            nameL: "",
            emailL: "",
            phoneNoL: "",
            officeNoL: "",
            degreeL: "",
            areaOfSpecL: "",
            rankingL:"",
            educationBgL: ""
        }
    )

    // Generate profile data
    const genProfileData = (datum) => {
        data.lect.map((lec) => {
            if(lec._id === datum){
                setProfileData({
                    ...profileData,
                    name: lec.name,
                    email: lec.email,
                    phoneNo: lec.phone_no,
                    officeNo: lec.office_no,
                    degree: lec.degree,
                    areaOfSpec: lec.areaOfSpec,
                    ranking: lec.ranking,
                    educationBg: lec.education_bg,
                    image: lec.image
                })
            }
        })
    }

    // Generate label for edit form
    const genLabelData = (datum) => {
        data.lect.map((lec) => {
            if(lec._id === datum){
                setLabelData({
                    ...labelData,
                    nameL: lec.name,
                    emailL: lec.email,
                    phoneNoL: lec.phone_no,
                    officeNoL: lec.office_no,
                    degreeL: lec.degree,
                    areaOfSpecL: lec.areaOfSpec,
                    rankingL: lec.ranking,
                    educationBgL: lec.education_bg
                })
            }
        })
    }
  

    const editSub = (e) => {
        e.preventDefault()
        const datum = [...document.querySelectorAll('input[type=checkbox]:checked')].map(e => e.value);
        editFn({lectId, datum})
    }

    const formSub = (e) => {
        e.preventDefault()
        const datum = [...document.querySelectorAll('input[type=checkbox]:checked')].map(e => e.value);
        createFn(datum)
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

    // Generating courses handled
    const setCoursesHandled = (datum) => {
        data.lect.map(lec => {
            if(lec._id === datum){
                coursesHandler(lec.Courses)
            }
        }) 
    }


    const openDelete = (data) => {
        setDeleter(!deleter)
        setDeleteId(data)
    }

    const paginate = (data) => {
        setPageNo(data.selected + 1)
        console.log(data)
    }

    const onChangeHandler = (e) => {
        setSearch(e.target.value)
    }

    return (
        <>
            <header>
                  <div>
                    <img src={logo} className="logo" alt="logo"/>
                    <p>Lecturer</p>
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
                        {/* <option>Name</option>
                        <option>Email</option> */}
                    </select>
                    <input placeholder="Search by name" onChange={onChangeHandler} />
                    <button onClick={()=>setPageSwitch("create")}><img src={plus} alt="plus"/>Add new lecturer</button>
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
                    <TransitionGroup component="tbody" className="gfg">
                        {isLoading === false ? data?.lect
                        .map((lect) => {
                            return (
                                <CSSTransition
                                    timeout={900}
                                    classNames="slide"
                                    in={true}
                                    appear={true}
                                    key={lect._id}
                                    onExited={()=> console.log("exited")}
                                >
                                <tr className="default" key={lect._id}>
                                    <td>{lect.name}</td>
                                    <td>{lect.email}</td>
                                    <td>{lect.Courses.map((cour)=>{
                                        return (
                                            <p style={{'margin': '5px'}} key={cour._id}>{cour.name}</p>
                                        );
                                    })}</td>
                                    <td>
                                        <img
                                            src={pen}
                                            alt="pencil"
                                            className="pencil"
                                            onClick={()=>{
                                                setPageSwitch("edit")
                                                genLabelData(lect._id)
                                            }}
                                        />
                                        <img
                                        src={bin}
                                        alt="bin"
                                        className="bin"
                                        onClick={()=> openDelete(lect._id)}
                                        />
                                    </td>
                                    <td><button className="proBtn" onClick={()=> {
                                        setPageSwitch("profile")
                                        genProfileData(lect._id)
                                        genLabelData(lect._id)
                                        setLectId(lect._id)
                                        setCoursesHandled(lect._id)
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
                        </CSSTransition>
                        }
                        {data?.lect.length === 0 && isLoading === false ? 
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

                {pageSwitch === "home" ? <ReactPaginate 
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
                <p>Are you sure you want to delete Lecturer {
                    data?.lect.map((lec)=> {
                        if(lec._id === deleteId){
                            return(
                                <em key={deleteId} className="deleteName">{lec.name}</em>
                            )
                        }
                    })}?</p>
                    <div>
                        <button onClick={()=> deleteFn(deleteId)} className="red2">Yes</button>
                        <button onClick={()=> setDeleter(false)}>No</button>
                    </div>
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
                                <img src={profileData.image} alt="profile"/>
                            </div>
                            <div className="name-groupl">
                                <div className="detail">
                                    <p>Name:</p>
                                    <p>{profileData.name}</p>
                                </div>
                                <div className="detail">
                                    <p>E-Mail:</p>
                                    <p>{profileData.email}</p>
                                </div>
                                <div className="detail">
                                    <p>Phone number:</p>
                                    <p>{profileData.phoneNo}</p>
                                </div>
                                <div className="detail">
                                    <p>Office no:</p>
                                    <p>{profileData.officeNo}</p>
                                </div>
                                <div className="detail">
                                    <p>Background:</p>
                                    <p>{profileData.educationBg}</p>
                                </div>
                                <div className="detail">
                                    <p>Degree:</p>
                                    <p>{profileData.degree}</p>
                                </div>
                                <div className="detail">
                                    <p>Position:</p>
                                    <p>{profileData.ranking}</p>
                                </div>
                                <div className="detail">
                                    <p>Area of Spec:</p>
                                    <p>{profileData.areaOfSpec}</p>
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
                                </tr>
                            </thead>
                            <tbody className="gfg">
                                {coursesHandled.map((course)=> {
                                    return(
                                        <tr className="default" key={course._id}>
                                            <td>{course.code}</td>
                                            <td>{course.name}</td>
                                            <td>{course.unit}</td>
                                        </tr>
                                    );
                                })}
                                
                            </tbody>
                        </table>
                    </div>
                </div>
                : null}


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

                {pageSwitch === "edit" ?
                <div className="editProfile">
                    <div className="editHeading">
                        <h3>Edit your profile</h3>
                        <img src={cross} alt="close" onClick={()=> setPageSwitch("home")}/>
                    </div>
                    <form onSubmit={editSub}>
                    <div className="editProfileContainer">
                        <div className="input-field">
                            <div className="field">
                                <p>Edit Picture</p>
                                <input type="file" className="wid-4" id="fileInput"/>
                            </div>
                            <div className="field-details">
                                <div className="field pr">
                                    <p>Name</p>
                                    <input placeholder={labelData.nameL} id="name" name="name" className="wid-4"/>
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
                                        <p>Position</p>
                                        <input placeholder={labelData.rankingL} id="ranking" name="ranking"/>
                                    </div>
                                    <div className="field">
                                        <p>Area of specialization</p>
                                        <textarea placeholder={labelData.areaOfSpecL} id="aosc" name="areaOfSpec"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="input-field">
                            <div className="field-details">
                                    <div className="field">
                                        <p>Education Background</p>
                                        <input placeholder={labelData.educationBgL} id="edubg" className="wid-4" name="email"/>
                                    </div>

                                    <div className="field">
                                    <p>Courses handled</p>
                                    <div className="checkboxes">
                                        {
                                            courses.data?.map((course)=> {
                                                return (
                                                <div key={Math.random()}>
                                                    <input type="checkbox" key={Math.random()}  value={course._id}  name={course.name}/>
                                                    <label key={course.name} htmlFor={course.name}>{course.name}</label>
                                                </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>  
                            </div> 

                                <div className="field">
                                    <p>Office No</p>
                                    <input className="wid-4" name="office_no" id="officeno" placeholder={labelData.officeNoL}/>
                                </div>

                                <div className="field">
                                    <p>Degree</p>
                                    <input className="wid-4" name="degree" id="degree" placeholder={labelData.degreeL} />
                                </div>

                            <div className="field-name">
                                Email Address
                                <p className="notbold">We send saving notifications and other account updates to your confirmed email address</p>
                            </div>
                            <div className="field-details">
                                <div className="field">
                                    <p>Email Address</p>
                                    <input placeholder={labelData.emailL} id="email" className="wid-4" name="email" type="email"/>
                                </div>
                            </div>
                        </div>

                        <div className="input-field">
                            <div className="field-name">
                                Phone Number
                                <p className="notbold">We send sms verification messages to your phone number</p>
                            </div>
                            <div className="field-details">
                                <div className="field">
                                    <p>Phone Number</p>
                                    <input placeholder={labelData.phoneNoL} id="phoneno" className="wid-4" name="phone_no" type="tel" pattern="(^[0]\d{10}$)|(^[\+]?[234]\d{12}$)"/>
                                </div>
                                <button className="updateProfileBtn" type="submit" onClick={(e)=> {
                                    // cleanObj()
                                }}>
                                    Update Profile
                                </button>
                            </div>
                        </div>

                        <hr/>

                        <h3>Change Password</h3>

                        <div className="input-field">
                            <div className="field-name">
                                Password
                                <p className="notbold">Please provide your current password and choose a new password</p>
                            </div>
                            <div className="field-details">
                                <div className="field">
                                    <p>Current Password</p>
                                    <input type="password" className="wid-4"/>
                                </div>

                                <div className="field">
                                    <p>New Password</p>
                                    <input type="password" className="wid-4"/>
                                </div>

                                <div className="field">
                                    <p>Retype New Password</p>
                                    <input 
                                     className="wid-4" type="password"/>
                                </div>

                                <button className="updateProfileBtn">
                                    Update Password
                                </button>
                            </div>
                        </div>
                    </div>
                    </form>
                </div> : null}

                {/* Create lecturer form */}
                {pageSwitch === "create" ?
                <div className="editProfile">
                    <div className="editHeading">
                        <h3>Add new lecturer</h3>
                        <img src={cross} alt="close" onClick={()=> setPageSwitch("home")}/>
                    </div>
                    <div className="editProfileContainer">
                    <form onSubmit={formSub}>
                        <div className="input-field">
                            <div className="field">
                                <p>Edit Picture</p>
                                <input type="file" className="wid-4" id="fileInput"/>
                            </div>
                            <div className="field-details">
                                <div className="field pr">
                                    <p>Name</p>
                                    <input name="name" id="namec" className="wid-4" required placeholder="Name"/>
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
                                        <p>Position</p>
                                        <input name="ranking" id="posc" required/>
                                    </div>
                                    <div className="field">
                                        <p>Area of specialization</p>
                                        <textarea name="areaOfSpec" id="aosc" required/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="input-field">
                                <div className="field">
                                    <p>Courses handled</p>
                                    <div className="checkboxes">
                                            {
                                                courses.data?.map((course)=> {
                                                    return (
                                                    <div key={Math.random()}>
                                                        <input type="checkbox" key={Math.random()}  value={course._id}  name={course.name} />
                                                        <label key={course.name} htmlFor={course.name}>{course.name}</label>
                                                    </div>
                                                    );
                                                })
                                            }
                                    </div>
                                </div>
                                <div className="field">
                                    <p>Education Background</p>
                                    <input className="wid-4" id="edubgc" name="education_bg" required/>
                                </div>
                                <div className="field">
                                    <p>Office No</p>
                                    <input className="wid-4" id="officenoc" name="office_no" required/>
                                </div>
                                <div className="field">
                                    <p>Degree</p>
                                    <input className="wid-4" id="degreec" name="degree" required/>
                                </div>
                            <div className="field-name">
                                Email Address
                                <p className="notbold">We send saving notifications and other account updates to your confirmed email address</p>
                            </div>
                            <div className="field-details">
                                <div className="field">
                                    <p>Email Address</p>
                                    <input className="wid-4" id="emailc" name="email" type="email" required/>
                                </div>
                            </div>
                        </div>

                        <div className="input-field">
                            <div className="field-name">
                                Phone Number
                                <p className="notbold">We send sms verification messages to your phone number</p>
                            </div>
                            <div className="field-details">
                                <div className="field">
                                    <p>Phone Number</p>
                                    <input className="wid-4" id="phonec" type="tel" pattern="(^[0]\d{10}$)|(^[\+]?[234]\d{12}$)" placeholder="+2341235467387" name="phone_no" title="must be a valid phone number" required/>
                                </div>
                                <button className="updateProfileBtn" type="submit">
                                    Create lecturer
                                </button>
                            </div>
                        </div>
                        </form>
                    </div>
                </div> : null}
               
            </div>
        </>
    );
}

export default Lecturer;