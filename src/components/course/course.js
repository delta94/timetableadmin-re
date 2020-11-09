/* eslint-disable array-callback-return */
import React,{useState} from "react"
import {Link} from "react-router-dom"
import "./course.css"
import { CSSTransition, TransitionGroup } from "react-transition-group";
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
import {useMutation, queryCache, useQuery} from "react-query"
import ReactPaginate from "react-paginate"


const deleteCourse = (deleteId) => {
          
    return axios.delete('https://tbe-node-deploy.herokuapp.com/Admin/course/delete', {
        headers: { 
            '_id': deleteId
        }
    })
    .then((response) => {
        return response
    })      
}

const editCourse = (args) => {
    Object.keys(args.finalDataObj1).forEach((key) => (args.finalDataObj1[key] === "") && delete args.finalDataObj1[key]);

    let data = JSON.stringify(args.finalDataObj1);

    return axios.patch(`https://tbe-node-deploy.herokuapp.com/Admin/course/update`, data, {
        headers: { 
            '_id': args.editCourseId,
            'Content-Type': 'application/json'
        }
    })
    .then((response) => {
        return response;
    })
    .then((error)=> {
        return error
    })
}

const createCourse = (finalDataObj) => {

    let data = JSON.stringify(finalDataObj);

    return axios.post('https://tbe-node-deploy.herokuapp.com/Admin/course', data, {
        headers: { 
            'Content-Type': 'application/json'
        }
    })
    .then((response) => {
        return response;
    })
    .then((error)=> {
        return error
    })
}

const getCourses = (page, {pageNo, search}) => {

    return axios.get('https://tbe-node-deploy.herokuapp.com/Admin/getCourse', {
        headers: {},
        params: {perPage: 5, page: pageNo, searchQuery: search}
    })
    .then((response) => {
        var courses = response.data?.data.docs
        var pages = response.data?.data.totalPages
        return {courses, pages}
    })
}

const getVenues = () => {

    return axios.get('https://tbe-node-deploy.herokuapp.com/Admin/room', {
        headers: {},
        params: { page: 1, searchQuery: ''}
    })
    .then((response) => {
        return response.data.data.docs
    })
}

const getLecturers = () => {

    return axios.get('https://tbe-node-deploy.herokuapp.com/Admin/getlecturer', {
        headers: {},
        params: { page: 1, searchQuery: ''}
    })
    .then((response) => {
        return response.data.data.docs
    })
}



const Course = (props) => {

    const [pageNo,setPageNo] = useState(null) 

    const [search, setSearch] = useState("")

    const {isLoading, data} = useQuery(['courses', {pageNo, search}], getCourses, {
        refetchOnWindowFocus: false
    })

    const venues = useQuery('venues', getVenues, {
        refetchOnWindowFocus: false
    })

    const lecturers = useQuery('lecturers', getLecturers, {
        refetchOnWindowFocus: false
    })

    const [createFn] = useMutation(createCourse, {
        onSuccess: () => {
            console.log("created")
            queryCache.refetchQueries('courses')
            setModalOut(false)
            setTimeout(() => {
                setCreated(true)
            }, 10);
            setCreated(false)
        },
        onError: (error) => {
            console.log({...error})
        }
    })

    const [deleteFn] = useMutation(deleteCourse, { 
        onSuccess: () => {
            console.log("deleted")
            queryCache.refetchQueries('courses')
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

    const [editFn] = useMutation(editCourse, {
        onSuccess: () => {
            console.log("edited")
            queryCache.refetchQueries('courses')
            setEditModalOut(false)
            setTimeout(() => {
                setEdited(true)
            }, 10);
            setEdited(false)
        },
        onError: () => {
            console.log("error o")
        }
    })

    // Course app state
    const [modalOut, setModalOut] = useState(false)
    const [editModalOut, setEditModalOut] = useState(false)
    const [editCourseId, setEditCourseId] = useState("")
    const [created, setCreated] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [edited, setEdited] = useState(false)
    const [deleter, setDeleter] = useState(false)
    const [deleteId, setDeleteId] = useState("")
    const [formData, updateFormData] = useState(
        {
            name: "",
            code: "",
            unit: "",
            level: "",
            description: ""
        }
    );
    const [lecturer, lecturerData] = useState(
        {
            lecturer: ""
        }
    )
    const [id2, setId2] = useState("1234");
    const [finalDataObj, setFinalDataObj] = useState({})
    const [labelData, setLabelData] = useState(
        {
            nameLabel: "",
            codeLabel: "",
            unitLabel: "",
            lecturerLabel: "",
            levelL: "",
            descLabel: ""
        }
    );

    const [id, setId] = useState("123");


    // Post Request
    const courseFormData = (e) => {

        updateFormData({
            ...formData,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()
          });
        
    }

    var finalDataObj1 = {}

    const lecturerFormData = (e) => {

        lecturerData({
            ...lecturer,
            // Trimming any whitespace
            [e.target.name]: {
                _id: e.target.value.trim()
            }
          });

          finalDataObj1 = {
            ...formData,
            ...lecturer
        }

        setFinalDataObj({
            ...formData,
            ...lecturer
        })

    }

    // Generating form labels for edit
    const genFormLabels = (datum) => {
        // eslint-disable-next-line array-callback-return
        data.courses.map((course) => {
                if(course._id === datum){
                    setLabelData({
                        ...labelData,
                        nameLabel: course.name,
                        codeLabel: course.code,
                        unitLabel: course.unit,
                        lecturerLabel: course.lecturer.name,
                        levelL: course.level,
                        descLabel: course.description
                    })
                }
            })
    }

    // Form validation
    const success = () => {
        const nameIn = document.querySelector(".nameInput")
        const warningInput = document.querySelector(".warning")
        data.courses.map((course)=> {
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

    const onChangeHandler = (e) => {
        setSearch(e.target.value)
    }

    const successEdit = () => {
        const nameIn = document.querySelector(".nameInput2")
        const warningInput = document.querySelector(".warning2")
        data.courses.map((course)=> {
            if(course.name.toString() === nameIn.value.toString()){
                warningInput.classList.add("display")
                nameIn.classList.add("error")
            }
        })
    }
    
    const formSubmit = (e) => {
        e.preventDefault()

        createFn(finalDataObj)
        success()
    }

    const openDelete = (data) => {
        setDeleter(!deleter)
        setDeleteId(data)
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
                    <p>Courses</p>
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
                        {/* <option>Code</option>
                        <option>Name</option>
                        <option>Unit</option>
                        <option>Lecturer</option> */}
                    </select>
                    <input placeholder="Search by name" onChange={onChangeHandler} />
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
                        <th>Students registered</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <TransitionGroup component="tbody" className="gfg">
                       {isLoading === false ? data?.courses.map(course => {
                            return(
                                <CSSTransition
                                timeout={900}
                                classNames="slide"
                                in={true}
                                appear={true}
                                key={course._id}
                                onExited={()=> console.log("exited")}
                              >
                                <tr className="default" key={course._id}>
                                    <td>{course.code}</td>
                                    <td>{course.name}</td>
                                    <td>{course.unit}</td>
                                    <td>{course.lecturer[0].name}</td>
                                    <td>{course.number}</td>
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
                                        onClick={()=> openDelete(course._id)}
                                        />
                                    </td>
                                </tr>
                                </CSSTransition>
                            )}) : <CSSTransition
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
                        {data?.courses.length === 0 && isLoading === false ? 
                                <CSSTransition
                                    timeout={900}
                                    classNames="slide2"
                                    in={true}
                                    appear={true}
                                    key="2"
                                    onExited={()=> console.log("exited")} 
                                >
                                    <tr><td colSpan="5" style={{color:  "#0395ff", fontSize: "18px"}}><p>No search results ... </p></td></tr>
                                </CSSTransition> : null}
                    </TransitionGroup>
                    </table>
                </div>

                <ReactPaginate 
                        previousLabel="<" 
                        nextLabel=">"
                        pageCount={data ? data?.pages : 0} 
                        pageRangeDisplayed="2" 
                        marginPagesDisplayed="2" 
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active2'}
                        onPageChange={paginate}
                    />


                {/* Delete Modal */}
                <div className={deleter === true ? "deleteModal delModOut" : "deleteModal"}>
                <p>Are you sure you want to delete Course {
                    data?.courses.map((course)=> {
                        if(course._id === deleteId){
                            return(
                                <em key={deleteId} className="deleteName">{course.name}</em>
                            )
                        }
                    })} ? </p>
                    <div>
                        <button onClick={()=> deleteFn(deleteId)} className="red2">Yes</button>
                        <button onClick={()=> setDeleter(false)}>No</button>
                    </div>
                </div>

                
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

                {/* Overlays */}
                <div className={modalOut === true ? "overlay modOut" : "overlay"}
                    onClick={()=>{
                        setModalOut(!modalOut);
                }}></div>

                <div className={editModalOut === true  ? "overlay modOut" : "overlay"}
                    onClick={()=>{
                    setEditModalOut(!editModalOut);
                }}></div>

                <div className={deleter === true ? "overlay modOut" : "overlay"}
                    onClick={()=>{
                        setDeleter(false);
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
                                    <input list="code" name="code" onChange={courseFormData}required/>
                                </div>
                            </div>
                            <div className="input-flex">
                                <div className="input-gi">
                                    <p>Course unit</p>
                                    <input name="unit" type="number" onChange={courseFormData} required/>
                                </div>
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
                            </div>
                            <div className="input-flex">
                                <div className="input-gi">
                                    <p>Description</p>
                                    <input name="description" onChange={courseFormData} required/>
                                </div>
                                <div className="input-gi">
                                        <p>Lecturer</p>
                                        <select className="select-css" name="lecturer" onChange={lecturerFormData} required>
                                            <option value="" defaultValue>Select a lecturer</option>
                                            {lecturers.data?.map(lect => {
                                                return(
                                                <option value={lect._id} label={lect.name} key={lect._id}/>
                                            )})}
                                        </select>
                                </div>
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
                                    <input list="code" name="code" placeholder={labelData.codeLabel} onChange={courseFormData}/>
                                </div>
                            </div>
                            <div className="input-flex">
                                <div className="input-gi">
                                    <p>Level</p>
                                    <input name="level" type="number" placeholder={labelData.levelL} onChange={courseFormData}/>
                                </div>
                                <div className="input-gi">
                                    <p>Course unit</p>
                                    <input name="unit" type="number" placeholder={labelData.unitLabel} onChange={courseFormData}/>
                                </div>
                            </div>
                            <div className="input-gi">
                                    <p>Description</p>
                                    <input name="description" placeholder={labelData.descLabel} onChange={courseFormData}/>
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
                                editFn({editCourseId, finalDataObj1})
                                successEdit()
                                console.log(finalDataObj1)
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