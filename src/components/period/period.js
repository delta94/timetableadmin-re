/* eslint-disable array-callback-return */
import React,{useState} from "react"
import {Link} from "react-router-dom"
import "./period.css"
import "../../global/global.css"
import plus from "../../images/plus.svg"
import bin from "../../images/bin.png"
import pen from "../../images/pencil 1.png"
import cross from "../../images/close.png"
import logo from "../../images/Logo.png"
import axios from "axios"
import { CSSTransition, TransitionGroup } from "react-transition-group";
import spinner from "../../images/spinner.gif"
import checkg from "../../images/checkg.png"
import checkr from "../../images/checkr.png"
import checkb from "../../images/checkb.png"
import ReactPaginate from "react-paginate"
import { useQuery, useMutation , queryCache } from "react-query"


    const getPeriods = (page, {pageNo, search}) => {

        return axios.get('https://tbe-node-deploy.herokuapp.com/Admin/getPeriod', {
            headers: {},
            params: {perPage: 5, page: pageNo, searchQuery: search}
        })
        .then((response) => {
            var periods = response.data?.data.docs
            var pages = response.data?.data.totalPages
            return {periods, pages}
        })
    }

    const getCourses = () => {

        return axios.get('https://tbe-node-deploy.herokuapp.com/Admin/getCourse', {
            headers: {},
            params: {page: 1, searchQuery: ""}
        })
        .then((response) => {
            return response.data?.data.docs
        })
    }

    const deletePeriod = (deleteId) => {
          
        return axios.delete('https://tbe-node-deploy.herokuapp.com/Admin/period/delete', {
            headers: { 
                '_id': deleteId
            }
        })
        .then((response) => {
            return response
        })      
    }

    const createPeriod = (periodData) => {
            let data = JSON.stringify(periodData);

            return axios.post('https://tbe-node-deploy.herokuapp.com/Admin/period', data, {
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

    const editPeriod = (args) => {
            let data = JSON.stringify(args.periodData);

            return axios.patch("https://tbe-node-deploy.herokuapp.com/Admin/period/update", data, {
                headers: { 
                    'Content-Type': 'application/json',
                    "_id": args.editCourseId

                }
            })
            .then((response) => {
                return response;
            })
            .then((error)=> {
                return error
            })
    }


const Period = (props) => {

    const [pageNo,setPageNo] = useState(null) 

    const [search, setSearch] = useState("")
    
    const {isLoading, data} = useQuery(['periods', {pageNo, search}], getPeriods, {
        refetchOnWindowFocus: false
    })

    const courses = useQuery('courses', getCourses, {
        refetchOnWindowFocus: false
    })

    const [deleteFn] = useMutation(deletePeriod, { 
        onSuccess: () => {
            console.log("deleted")
            queryCache.refetchQueries('periods')
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

    const [createFn] = useMutation(createPeriod, {
        onSuccess: () => {
            console.log("created")
            queryCache.refetchQueries('periods')
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

    const [editFn] = useMutation(editPeriod, {
        onSuccess: () => {
            console.log("edited")
            queryCache.refetchQueries('periods')
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
    const [editCourseId,setEditCourseId] = useState("")
    const [deleter, setDeleter] = useState(false)
    const [deleteId, setDeleteId] = useState("")
    const [created, setCreated] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [edited, setEdited] = useState(false)
    const [id, setId] = useState("123");
    const [id2, setId2] = useState("1234");
    const [periodData, setPeriodData] = useState(
        {
            startTime: "",
            endTime: "",
            course: ""
        }
    );
    const [labelData, setLabelData] = useState(
        {
            courseLabel: "",
            sTimeLabel: "",
            eTimeLabel: ""
        }
    );

    const periodFormData = (e) => {
        setPeriodData({
            ...periodData,
      
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()
          });
          console.log(periodData)
    }


    // Remove empty inputs in edit form obj
    const cleanObj = () => {
        Object.keys(periodData).forEach((key) => (periodData[key] === "") && delete periodData[key]);
    }

    
    // Generating form labels for edit
    const genFormLabels = (datum) => {
        // eslint-disable-next-line array-callback-return
        data.periods.map((period) => {
                if(period._id === datum){
                    setLabelData({
                        ...labelData,
                        courseLabel: period.course.name,
                        sTimeLabel: period.startTime,
                        eTimeLabel: period.endTime,
                    })
                }
            })
    }


    //Get all the inputs...
    const inputs = document.querySelectorAll('form input, form select');

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
        data.periods.map((period)=> {
            if(period.course._id === nameIn.value){
                warningInput.classList.add("display")
                nameIn.classList.add("error")
            }
        })
    }

    const successEdit = () => {
        const nameIn = document.querySelector(".nameInput2")
        const warningInput = document.querySelector(".warning2")
        data.periods.map((period)=> {
            if(period.course._id === nameIn.value){
                warningInput.classList.add("display")
                nameIn.classList.add("error")
            }
        })
    }

    const formSubmit = (e) => {
        e.preventDefault()
        createFn(periodData)
        success()
    }

    const onChangeHandler = (e) => {
        setSearch(e.target.value)
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
                    <p>Period</p>
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
                        <option>All</option>
                        <option>Name</option>
                        <option>Time</option>
                    </select>
                    <input placeholder="Enter keyword to search" onChange={onChangeHandler} />
                    <button onClick={()=>{
                        setModalOut(!modalOut);
                        setId2(Math.random().toString());
                    }}><img src={plus} alt="plus"/>Add new timeslot</button>
                </div>
                <div className="table-container">
                    <table className="table">
                    <thead className="table-head">
                        <tr className="row1">
                        <th>Period</th>
                        <th>Courses</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <TransitionGroup component="tbody" className="gfg">
                        {isLoading === false ? data?.periods
                        .map(period => {
                            return (
                                <CSSTransition
                                    timeout={900}
                                    classNames="slide"
                                    in={true}
                                    appear={true}
                                    key={period._id}
                                    onExited={()=> console.log("exited")}
                                >
                                <tr className="default" key={period._id}>
                                    <td>{period.startTime} - {period.endTime}</td>
                                    <td>{period.course.name}</td>
                                    <td>
                                        <img
                                        src={pen}
                                        alt="pencil"
                                        className="pencil"
                                        onClick={()=> {
                                            setEditModalOut(!editModalOut)
                                            setEditCourseId(period._id)
                                            genFormLabels(period._id)
                                            setId(Math.random().toString())
                                        }}
                                        />
                                        <img
                                        src={bin}
                                        alt="bin"
                                        className="bin"
                                        onClick={()=> openDelete(period._id)}
                                        />
                                    </td>
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
                        {data?.periods.length === 0 && isLoading === false ? 
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
                <p>Are you sure you want to delete Period {
                    data?.periods.map((period)=> {
                        if(period._id === deleteId){
                            return(
                                <em key={deleteId} className="deleteName">{period.startTime} - {period.endTime}</em>
                            )
                        }
                    })}?</p>
                    <div>
                        <button onClick={()=> deleteFn(deleteId)} className="red2">Yes</button>
                        <button onClick={()=> setDeleter(false)}>No</button>
                    </div>
                </div>


                {/* Overlays */}
                <div className={deleter === true ? "overlay modOut" : "overlay"}
                onClick={()=>{
                    setDeleter(false);
                }}></div>

                <div className={modalOut === true ? "overlay modOut" : "overlay"}
                onClick={()=>{
                    setModalOut(!modalOut);
                }}></div>

                <div className={editModalOut === true  ? "overlay modOut" : "overlay"}
                    onClick={()=>{
                    setEditModalOut(!editModalOut);
                }}></div>

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

                {/* Create form */}
                <div className={modalOut === true ? "modal modOut" : "modal"} key={id2}>
                    <div className="head">
                        <h3>Add new timeslot</h3>
                        <img src={cross} alt="cross" onClick={()=>{
                        setModalOut(!modalOut);
                    }}/>
                    </div>
                    <form onSubmit={formSubmit}>
                    <div className="input-c">
                        <div className="input-g">
                            <p>Course</p>
                            <select className="select-css nameInput" name="course" onChange={periodFormData} required>
                                    <option value="" defaultValue>Select a course</option>
                                    {courses.data?.map(course => {
                                        return(
                                        <option value={course._id} label={course.name} key={course._id}/>
                                    )})}
                            </select>
                            <em className="warning">Period already exists </em>
                        </div>
                        <div className="input-g">
                            <p>Start Time</p>
                            <input name="startTime" type="time" onChange={periodFormData} required/>
                        </div>
                        <div className="input-g">
                            <p>End Time</p>
                            <input name="endTime" type="time" onChange={periodFormData} required/>
                        </div>
                    </div>
                    <div className="buttons">
                        <button className="red" onClick={()=> setModalOut(!modalOut)}>Cancel</button>
                        <button className="blue" type="submit" onClick={
                            (e)=> {
                                periodFormData(e)
                            }}>
                            Add timeslot
                        </button>
                    </div>
                    </form>
                </div>

                {/* Edit form */}
                <div className={editModalOut === true ? "modal modOut" : "modal"} key={id}>
                    <div className="head">
                        <h3>Edit timeslot</h3>
                        <img src={cross} alt="cross" onClick={()=>{
                        setEditModalOut(!editModalOut);
                    }}/>
                    </div>
                    <div className="input-c">
                        <div className="input-g">
                            <p>Course</p>
                            <select className="select-css nameInput2" name="course" defaultValue={labelData.courseLabel} onChange={periodFormData}>
                                    <option value={labelData.courseLabel} disabled>{labelData.courseLabel}</option>
                                    {courses.data?.map(course => {
                                        return(
                                        <option value={course._id} label={course.name} key={course._id}/>
                                    )})}
                            </select>
                            <em className="warning warning2">Period already exists </em>
                        </div>
                        <div className="input-g">
                            <p>Start Time</p>
                            <input name="startTime" type="time" onChange={periodFormData} placeholder={labelData.sTimeLabel}/>
                        </div>
                        <div className="input-g">
                            <p>End Time</p>
                            <input name="endTime" type="time" onChange={periodFormData} placeholder={labelData.eTimeLabel}/>
                        </div>
                    </div>
                    <div className="buttons">
                        <button className="red" onClick={()=> setEditModalOut(!editModalOut)}>Cancel</button>
                        <button className="blue" onClick={
                            (e)=> {
                                e.preventDefault()
                                periodFormData(e)
                                cleanObj()
                                editFn({editCourseId, periodData})
                                successEdit()
                            }}>
                            Edit timeslot
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Period;