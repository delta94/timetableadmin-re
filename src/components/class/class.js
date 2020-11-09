/* eslint-disable array-callback-return */
import React,{useState} from "react"
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
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ReactPaginate from "react-paginate"
import { useQuery, useMutation , queryCache } from "react-query"


const getClasses = (page, {pageNo, search}) => {

    return axios.get('https://tbe-node-deploy.herokuapp.com/Admin/class/all', {
        headers: {},
        params: {perPage: 5, page: pageNo, searchQuery: search}
    })
    .then((response) => {
        var classes = response.data?.data.docs
        var pages = response.data?.data.totalPages
        return {classes, pages}
    })
}

const getCourses = () => {

    return axios.get('https://tbe-node-deploy.herokuapp.com/Admin/getCourse', {
        headers: {},
        params: {page: 1, searchQuery: ''}
    })
    .then((response) => {
        return response.data?.data.docs
    })
}

const deleteClass = (deleteId) => {
          
    return axios.delete('https://tbe-node-deploy.herokuapp.com/Admin/class/delete', {
        headers: { 
            '_id': deleteId
        }
    })
    .then((response) => {
        return response
    })      
}

const createClass = (classData) => {
    let data = JSON.stringify(classData);

    return axios.post('https://tbe-node-deploy.herokuapp.com/Admin/class/create', data, {
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

const editClass = (args) => {
    let data = JSON.stringify(args.classData);

    return axios.patch('https://tbe-node-deploy.herokuapp.com/Admin/class/update', data, {
        headers: { 
            'Content-Type': 'application/json',
            '_id': args.editClassId,
        }
    })
    .then((response) => {
        return response;
    })
    .then((error)=> {
        return error
    })
}

const Classes = (props) => {

    const [pageNo,setPageNo] = useState(null) 

    const [search, setSearch] = useState("")

    const {isLoading, data} = useQuery(['classes', {pageNo, search}], getClasses, {
        refetchOnWindowFocus: false
    })

    const courses = useQuery('classes', getCourses, {
        refetchOnWindowFocus: false
    })

    const [deleteFn] = useMutation(deleteClass, { 
        onSuccess: () => {
            console.log("deleted")
            queryCache.refetchQueries('classes')
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

    const [createFn] = useMutation(createClass, {
        onSuccess: () => {
            console.log("created")
            queryCache.refetchQueries('classes')
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

    const [editFn] = useMutation(editClass, {
        onSuccess: () => {
            console.log("edited")
            queryCache.refetchQueries('classes')
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


    const [modalOut, setModalOut] = useState(false)
    const [editModalOut,setEditModalOut] = useState(false)
    const [editClassId,setEditClassId] = useState("")
    const [deleter, setDeleter] = useState(false)
    const [deleteId, setDeleteId] = useState("")
    const [created, setCreated] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [edited, setEdited] = useState(false)
    const [classData, setClassData] = useState(
        {
            name: "",
            Courses: "",
            Population: "",
            UnavailableRooms: ""
        }
    )
    const [id2, setId2] = useState("1234");
    const [labelData, setLabelData] = useState(
        {
            nameLabel: "",
            courseLabel: "",
            populationLabel: "",
            uarLabel: ""
        }
    );
    // setting key for edit form
    const [id, setId] = useState("123");
    

    // Http requests and relatives
    const classFormData = (e) => {
        setClassData({
            ...classData,
            [e.target.name]: e.target.value.trim()
        })
        console.log(classData)
    }

    // Remove empty inputs in edit form obj
    const cleanObj = () => {
        Object.keys(classData).forEach((key) => (classData[key] === "") && delete classData[key]);
    }

    // Generating form labels for edit
    const genFormLabels = (datum) => {
        // eslint-disable-next-line array-callback-return
        data.classes.map((clas) => {
                if(clas._id === datum){
                    setLabelData({
                        ...labelData,
                        nameLabel: clas.name,
                        courseLabel: clas.Courses[0].name,
                        populationLabel: clas.Population,
                        uarLabel: clas.UnavailableRooms
                    })
                }
            })
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
        data.classes.map((clas)=> {
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
        data.classes.map((clas)=> {
            if(clas.name === nameIn.value){
                warningInput.classList.add("display")
                nameIn.classList.add("error")
            }
        })
    }

    const formSubmit = (e) => {
        e.preventDefault()
        createFn(classData)
        success()
    }


    const openDelete = (data) => {
        setDeleter(!deleter)
        setDeleteId(data)
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
                    <select className="select-css2" name="switch">
                        <option>Name</option>
                        {/* <option>Name</option>
                        <option>Size</option>
                        <option>Course</option>
                        <option>Un-Rooms</option> */}
                    </select>
                    <input placeholder="Search by name" onChange={onChangeHandler}/>
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
                    <TransitionGroup component="tbody" className="gfg">
                       {isLoading === false ? data?.classes
                       .map((clas) => {
                               return (
                                <CSSTransition
                                    timeout={300}
                                    classNames="slide"
                                    in={true}
                                    appear={true}
                                    key={clas._id}
                                    onExited={()=> console.log("exited")}
                                >
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
                                        setEditClassId(clas._id)
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
                                </CSSTransition>
                               );
                           }
                       ) : 
                       <CSSTransition
                           timeout={300}
                           classNames="slide3"
                           in={true}
                           appear={true}
                           key="1"
                           onExited={()=> console.log("exited")} 
                       >
                       <tr><td colSpan="5"><img src={spinner} className="spinner" alt="Spinner"/></td></tr>
                       </CSSTransition>
                       }
                       {data?.classes.length === 0 && isLoading === false ? 
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

                {/* Delete modal */}
                <div className={deleter === true ? "deleteModal delModOut" : "deleteModal"}>
                <p>Are you sure you want to delete Class {
                    data?.classes.map((clas)=> {
                        if(clas._id === deleteId){
                            return(
                                <em key={deleteId} className="deleteName">{clas.name}</em>
                            )
                        }
                    })}?</p>
                    <div>
                        <button onClick={()=> deleteFn(deleteId)} className="red2">Yes</button>
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
                                    {courses.data?.map(course => {
                                        return(
                                        <option value={course._id} label={course.name} key={course._id}/>
                                    )})}
                                </select>
                        </div>
                        <div className="input-g">
                            <p>Population</p>
                            <input name="Population" type="number" onChange={classFormData} required/>
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
                                    {courses.data?.map(course => {
                                        return(
                                        <option value={course._id} label={course.name} key={course._id}/>
                                    )})}
                                </select>
                        </div>
                        <div className="input-g">
                            <p>Population</p>
                            <input name="Population" onChange={classFormData} type="number" placeholder={labelData.populationLabel}/>
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
                            editFn({editClassId, classData})
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