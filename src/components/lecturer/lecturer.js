/* eslint-disable array-callback-return */
import React,{useState,useEffect} from "react"
import {Link} from "react-router-dom"
import "./lecturer.css"
import "../../global/global.css"
import bin from "../../images/bin.png"
import plus from "../../images/plus.svg"
import logo from "../../images/Logo.png"
import axios from "axios"
import spinner from "../../images/spinner.gif"
import cross from "../../images/close.png"

const Lecturer = (props) => {

    const [lecturers,setLecturers] = useState([])   
    const [loading, setLoading] = useState(false)
    const [pageSwitch, setPageSwitch] = useState("home")
    const [lectId, setLectId] = useState("")
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

    const [formData, setFormData] = useState(
        {
            name: "",
            email: "",
            phone_no: "",
            areaOfSpec: "",
            ranking: "",
            office_no: "",
            education_bg: "",
            degree: ""
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
    const editLect = (e) => {
        e.preventDefault()
        let data = JSON.stringify(formData);

        let config = {
          method: 'patch',
          url: 'https://tbe-node-deploy.herokuapp.com/Admin/lecturer/update',
          headers: { 
            '_id': lectId, 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .then(()=> getLecturers())
        .then(()=> setPageSwitch("home"))
        .catch((error) => {
          console.log(error);
        });
    }

    // For cancelling requests
    const source = axios.CancelToken.source();


    // Create lecturer(post)
    const createLect = (e) => {
        e.preventDefault()

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

        let config = {
        method: 'post',
        url: 'https://tbe-node-deploy.herokuapp.com/Admin/lecturer/image',
        headers: { 
            'content-type': 'multipart/form-data'
        },
        data : data
        };

        axios(config)
        .then((response) => {
        console.log(JSON.stringify(response.data));
        })
        .then(()=> setPageSwitch("home"))
        .catch((error) => {
        console.log(error);
        });
    }

    // Get request
    const getLecturers = () => {
        let config = {
            method: 'get',
            url: 'https://tbe-node-deploy.herokuapp.com/Admin/getlecturer',
            headers: { },
            cancelToken: source.token
          };
          
          axios(config)
          .then((response) => {
            setLecturers(response.data.data)
            setLoading(true)
          })
          .catch((error) => {
            console.log(error);
          });
    }

    useEffect(() => {
        getLecturers()
        filterFn()


        return () => {
            source.cancel("Component got unmounted");
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[lecturers])


    // Generate profile data
    const genProfileData = (data) => {
        lecturers.map((lect) => {
            if(lect._id === data){
                setProfileData({
                    ...profileData,
                    name: lect.name,
                    email: lect.email,
                    phoneNo: lect.phone_no,
                    officeNo: lect.office_no,
                    degree: lect.degree,
                    areaOfSpec: lect.areaOfSpec,
                    ranking: lect.ranking,
                    educationBg: lect.education_bg,
                    image: lect.image
                })
            }
        })
    }

    // Generate label for edit form
    const genLabelData = (data) => {
        lecturers.map((lect) => {
            if(lect._id === data){
                setLabelData({
                    ...labelData,
                    nameL: lect.name,
                    emailL: lect.email,
                    phoneNoL: lect.phone_no,
                    officeNoL: lect.office_no,
                    degreeL: lect.degree,
                    areaOfSpecL: lect.areaOfSpec,
                    rankingL: lect.ranking,
                    educationBgL: lect.education_bg
                })
            }
        })
    }

    // Delete lecturer
    const deleteLect = (data) => {
        let config = {
            method: 'delete',
            url: 'https://tbe-node-deploy.herokuapp.com/Admin/lecturer/delete',
            headers: { 
              '_id': data
            }
          };
          
          axios(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
          })
          .then(()=> getLecturers())
          .catch((error) => {
            console.log(error);
          });
          
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
            setNewArr(lecturers
            .filter(d=> {
                if(switchState === "Name"){
                    return d.name.toLowerCase().includes(target.toLowerCase()) === true
                }else if(switchState === "" || switchState === "All"){
                    return d.name.toLowerCase().includes(target.toLowerCase()) === true || d.email.toLowerCase().includes(target.toLowerCase()) === true
                }else if(switchState === "Email"){
                    return d.email.toLowerCase().includes(target.toLowerCase()) === true
                }
            }))
    }

    const updateImage = () => {
        var data = new FormData()
        var file = document.getElementById("fileInput").files[0]

        data.append("image", file)

        console.log([...data])

        let config = {
        method: 'patch',
        url: 'https://tbe-node-deploy.herokuapp.com/image',
        headers: { 
            '_id': lectId,
            'content-type': 'multipart/form-data'
        },
        data : data
        };

        axios(config)
        .then((response) => {
        console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
        console.log(error);
        });
    }

    const editSub = (e) => {
        editLect(e) || updateImage()
    }

    
    //Get all the inputs...
    const inputs = document.querySelectorAll('.editProfileContainer input, textarea');
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
            console.log("valid")
            input.classList.remove('error')
            input.classList.add('good')
        }
    })

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
                    <select className="select-css2" name="switch" onChange={switchFilter}>
                        <option>All</option>
                        <option>Name</option>
                        <option>Email</option>
                    </select>
                    <input placeholder="Enter keyword to search" onChange={onChangeHandler} />
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
                    <tbody className="gfg">
                        {loading === true ? newArr
                        .map((lect) => {
                            return (
                                <tr className="default" key={lect._id}>
                                    <td>{lect.name}</td>
                                    <td>{lect.email}</td>
                                    <td>Courses handled</td>
                                    <td>
                                        <img
                                        src={bin}
                                        alt="bin"
                                        className="bin"
                                        onClick={()=> deleteLect(lect._id)}
                                        />
                                    </td>
                                    <td><button className="proBtn" onClick={()=> {
                                        setPageSwitch("profile")
                                        genProfileData(lect._id)
                                        genLabelData(lect._id)
                                        setLectId(lect._id)
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

                {pageSwitch === "profile" ?
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
                : null}

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
                                    <input placeholder={labelData.nameL} name="name" onChange={setFormDataFn} className="wid-4"/>
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
                                        <input placeholder={labelData.rankingL} name="ranking" onChange={setFormDataFn}/>
                                    </div>
                                    <div className="field">
                                        <p>Area of specialization</p>
                                        <textarea placeholder={labelData.areaOfSpecL} name="areaOfSpec" onChange={setFormDataFn}/>
                                    </div>
                                </div>
                                {/* <div className="field-details">
                                    <div className="field">
                                        <p>Courses</p>
                                        <input className="wid-4"/>
                                    </div>
                                </div> */}
                            </div>
                        </div>

                        <div className="input-field">
                            <div className="field-details">
                                    <div className="field">
                                        <p>Education Background</p>
                                        <input placeholder={labelData.educationBgL} className="wid-4" name="email" onChange={setFormDataFn}/>
                                    </div>
                            </div> 

                                <div className="field">
                                    <p>Office No</p>
                                    <input className="wid-4" name="office_no" placeholder={labelData.officeNoL} onChange={setFormDataFn}/>
                                </div>

                                <div className="field">
                                    <p>Degree</p>
                                    <input className="wid-4" name="degree" placeholder={labelData.degreeL}  onChange={setFormDataFn}/>
                                </div>

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
                            <div className="field-name">
                                Phone Number
                                <p className="notbold">We send sms verification messages to your phone number</p>
                            </div>
                            <div className="field-details">
                                <div className="field">
                                    <p>Phone Number</p>
                                    <input placeholder={labelData.phoneNoL} className="wid-4" name="phone_no" type="tel" pattern="(^[0]\d{10}$)|(^[\+]?[234]\d{12}$)" onChange={setFormDataFn}/>
                                </div>
                                <button className="updateProfileBtn" type="submit" onClick={(e)=> {
                                    cleanObj()
                                    setFormDataFn(e)
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
                    <form onSubmit={createLect}>
                        <div className="input-field">
                            <div className="field">
                                <p>Edit Picture</p>
                                <input type="file" className="wid-4" id="fileInput"/>
                            </div>
                            <div className="field-details">
                                <div className="field pr">
                                    <p>Name</p>
                                    <input name="name" id="namec" onChange={setFormDataFn} className="wid-4" required placeholder="Name"/>
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
                                        <input name="ranking" id="posc" onChange={setFormDataFn} required/>
                                    </div>
                                    <div className="field">
                                        <p>Area of specialization</p>
                                        <textarea name="areaOfSpec" id="aosc" onChange={setFormDataFn} required/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="input-field">
                                <div className="field">
                                    <p>Education Background</p>
                                    <input className="wid-4" id="edubgc" name="education_bg" onChange={setFormDataFn} required/>
                                </div>
                                <div className="field">
                                    <p>Office No</p>
                                    <input className="wid-4" id="officenoc" name="office_no" onChange={setFormDataFn} required/>
                                </div>
                                <div className="field">
                                    <p>Degree</p>
                                    <input className="wid-4" id="degreec" name="degree" onChange={setFormDataFn} required/>
                                </div>
                            <div className="field-name">
                                Email Address
                                <p className="notbold">We send saving notifications and other account updates to your confirmed email address</p>
                            </div>
                            <div className="field-details">
                                <div className="field">
                                    <p>Email Address</p>
                                    <input className="wid-4" id="emailc" name="email" type="email" onChange={setFormDataFn} required/>
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
                                    <input className="wid-4" id="phonec" type="tel" pattern="(^[0]\d{10}$)|(^[\+]?[234]\d{12}$)" placeholder="+2341235467387" name="phone_no" onChange={setFormDataFn} title="must be a valid phone number" required/>
                                </div>
                                <button className="updateProfileBtn" type="submit" onClick={(e)=> {
                                    setFormDataFn(e)
                                }}>
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