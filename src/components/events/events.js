/* eslint-disable array-callback-return */
import React,{useState} from "react"
import {Link} from "react-router-dom"
import "../../global/global.css"
import plus from "../../images/plus.svg"
import logo from "../../images/Logo.png"
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css';
import bin from "../../images/bin.png"
import pen from "../../images/pencil 1.png"
import cross from "../../images/close.png"
import axios from "axios"
import spinner from "../../images/spinner.gif"
import ReactPaginate from "react-paginate"
import { useQuery, useMutation, queryCache } from "react-query"
import {format, isSameDay} from "date-fns"
import checkg from "../../images/checkg.png"
import checkr from "../../images/checkr.png"
import checkb from "../../images/checkb.png"



    const getEvents = (events, {date, pageNo, search}) => {

        var formattedDate = format(new Date(date), "yyyy-MM-dd")   

        return axios.get('https://tbe-node-deploy.herokuapp.com/user/events/day', {
            headers: { 
            'date1': date ? formattedDate : ""
            },
            params: {perPage: 5, page: pageNo, searchQuery: search}
            })
        .then((response) => {
                var events = response.data?.data.docs
                var pages = response.data?.data.totalPages
                return {events, pages}
        })
        .then((error) => error)

    }

    const deleteEvents = (deleteId) => {
            
        return axios.delete('https://tbe-node-deploy.herokuapp.com/user/events/delete', {
            headers: { 
                '_id': deleteId
            }
        })
        .then((response) => {
            return response
        })      
    }


    const createEvent = (finalObj) => {

        return axios.post('https://tbe-node-deploy.herokuapp.com/user/event', finalObj, {
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

    const editEvent = (args) => {

        return axios.patch('https://tbe-node-deploy.herokuapp.com/user/event/update', args.finalObj, {
            headers: { 
                'Content-Type': 'application/json',
                '_id': args.editEventId
            }
        })
        .then((response) => {
            return response;
        })
        .then((error)=> {
            return error
        })
}



const Events = (props) => {

    const [date, setDate] = useState(null)

    const [pageNo,setPageNo] = useState(1) 

    const [search, setSearch] = useState("")

    const [deleter, setDeleter] = useState(false)

    const [deleteId, setDeleteId] = useState("")

    const {data, isLoading} = useQuery(['events', {date, pageNo, search}], getEvents, {
        refetchOnWindowFocus: false
    })

    const [createFn] = useMutation(createEvent, {
        onSuccess: () => {
            console.log("created")
            queryCache.refetchQueries('events')
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


    const [editFn] = useMutation(editEvent, {
        onSuccess: () => {
            console.log("edited")
            queryCache.refetchQueries('events')
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

    const [deleteFn] = useMutation(deleteEvents, { 
        onSuccess: () => {
            console.log("deleted")
            queryCache.refetchQueries('events')
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

    const [editModalOut,setEditModalOut] = useState(false)
    const [editEventId, setEditEventId] = useState("")
    const [modalOut, setModalOut] = useState(false)
    const [id2, setId2] = useState("1234");
    const [id, setId] = useState("124");
    const [created, setCreated] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [edited, setEdited] = useState(false)  
    const [eventData, setEventData] = useState(
        {
            name: "",
            date: ""
        }
    );
    const [time, setTime] = useState(
        {
            time: ""
        }
    )
    const [finalObj, setFinalObj] = useState({})
   

    const timeDataFn = () => {
        setTime({
            time: `${document.querySelector("#stime").value} - ${document.querySelector("#etime").value}`
        })
    }

    const timeDataFnEd = () => {
        setTime({
            time: `${document.querySelector("#stimed").value} - ${document.querySelector("#etimed").value}`
        })
    }

    const eventDataFn = (e) => {

        setEventData({
            ...eventData,
      
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()
          });

          setFinalObj({
              ...eventData,
              ...time
          })
    }

    // Remove empty inputs in edit room form object
    const cleanObj = () => {
        Object.keys(finalObj).forEach((key) => (finalObj[key] === "" || finalObj === "") && delete finalObj[key]);
    }

    //Get all the inputs...
    const inputs = document.querySelectorAll('form input');

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
        data.events.map((eve)=> {
            if(eve.name.toString() === nameIn.value.toString()){
                warningInput.classList.add("display")
                nameIn.classList.add("error")
            }
        })
    }

    const successEdit = () => {
        const nameIn = document.querySelector(".nameInputEd")
        const warningInput = document.querySelector(".warning2")
        data.events.map((eve)=> {
            if(eve.name.toString() === nameIn.value.toString()){
                warningInput.classList.add("display")
                nameIn.classList.add("error")
            }
        })
    }

    const formSubmit = (e) => {
        e.preventDefault()
        console.log(finalObj)
        createFn(finalObj)
        success()
    }

    const formSubmitE = (e) => {
        e.preventDefault()
        cleanObj()
        editFn({finalObj, editEventId})
        successEdit()
    }

    const paginate = (data) => {
        setPageNo(data.selected + 1)
    }

    const onChangeHandler = (e) => {
        setSearch(e.target.value)
    }

    const openDelete = (data) => {
        setDeleter(!deleter)
        setDeleteId(data)
    }

    const changeDate = (data) => {

        if(isSameDay(date, data)){
            setDate(null)
        }else{
            setDate(data)
        }
    }


    return (
        <>
            <header>
                  <div>
                    <img src={logo} className="logo" alt="logo"/>
                    <p>Events</p>
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
                    </select>
                    <input placeholder="Search by name" onChange={onChangeHandler}/>
                    <button onClick={()=>{
                        setModalOut(!modalOut);
                        setId2(Math.random().toString());
                    }}><img src={plus} alt="plus"/>Add new event</button>
                </div>
                <div className="tableXcal">
                    <div className="table-container">
                        <table className="table2">
                        <thead className="table-head">
                            <tr className="row1">
                            <th>Name</th>
                            <th>Time</th>
                            <th>Date</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { isLoading === false ? data.events?.map((eve)=>{
                                return(
                                    <tr className="default" key={eve._id}>
                                        <td>{eve.name}</td>
                                        <td>{eve.time}</td>
                                        <td>{eve.date}</td>
                                        <td>
                                            <img
                                            src={pen}
                                            alt="pencil"
                                            className="pencil"
                                            onClick={()=>{
                                                setEditEventId(eve._id)
                                                setEditModalOut(true)
                                                setId(Math.random().toString());
                                            }}
                                            />
                                            <img
                                            src={bin}
                                            alt="bin"
                                            className="bin"
                                            onClick={()=> {openDelete(eve._id)}}
                                            />
                                        </td>
                                    </tr>
                                );
                            })
                             : <tr><td colSpan="5"><img src={spinner} className="spinner" alt="Spinner"/></td></tr>
                        }
                        {isLoading === false && data.events?.length === 0 ? (
                            <tr><td colSpan="4" style={{color: "#0395ff"}}>No events for this day</td></tr>
                        ) : null}
                        </tbody>
                        </table>
                    </div>
                     
                    <div className="calendar-container">
                        <Calendar onChange={changeDate} className={["calendar"]} value={date} />
                    </div>


                    {/* Delete modal */}
                    <div className={deleter === true ? "deleteModal delModOut" : "deleteModal"}>
                        <p>Are you sure you want to delete Room {
                        data?.events.map((event)=> {
                            if(event._id === deleteId){
                                return(
                                    <em key={deleteId} className="deleteName">{event.name}</em>
                                )
                            }
                        })}?</p>
                        <div>
                            <button onClick={()=> {
                                deleteFn(deleteId)
                            }} className="red2">Yes</button>
                            <button onClick={()=> setDeleter(false)}>No</button>
                        </div>
                    </div>

                    {/* Overlay for all modals */}
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
                        <p>Event created!</p>
                    </div>

                    <div className={deleted === true ? "successMsg red3 flexModOut" : "successMsg red2"}>
                        <div>
                            <img src={checkr} style={{"height": "25px"}} alt="good"/>
                            <h3>Success</h3>
                        </div>
                        <p>Event deleted!</p>
                    </div>

                    <div className={edited === true ? "successMsg blue flexModOut" : "successMsg blue"}>
                        <div>
                            <img src={checkb} style={{"height": "25px"}} alt="good"/>
                            <h3>Success</h3>
                        </div>
                        <p>Event edited!</p>
                    </div>

                    {/* Create room form */}
                    <div className={modalOut === true ? "modal modOut" : "modal"} key={id2}>
                        <div className="head">
                            <h3>Add new event</h3>
                            <img src={cross} alt="cross" onClick={()=>{
                            setModalOut(!modalOut);
                        }}/>
                        </div>
                        <form onSubmit={formSubmit}>
                            <div className="input-c">
                                <div className="input-g">
                                    <p>Name</p>
                                    <input name="name" className="nameInput" id="modInput" onChange={eventDataFn} required/>
                                    <em className="warning">Event already exists</em>
                                </div>
                                <div className="input-g">
                                    <p>Start Time</p>
                                    <input name="time" type="time" id="stime" onChange={timeDataFn} required/>
                                </div>
                                <div className="input-g">
                                    <p>End Time</p>
                                    <input name="time" type="time" id="etime" onChange={timeDataFn} required/>
                                </div>
                                <div className="input-g">
                                    <p>Date</p>
                                    <input name="date" type="date" id="modInput3" onChange={eventDataFn} required/>
                                </div>
                            </div>
                            <div className="buttons">
                                <button className="red" onClick={(e) => {
                                        setModalOut(false)
                                    }}>Cancel</button>
                                <button className="blue" type="submit" onClick={
                                    (e)=> {
                                        eventDataFn(e)
                                    }
                                }>
                                    Add Event
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Edit event form */}
                    <div className={editModalOut === true ? "modal modOut" : "modal"} key={id}>
                        <div className="head">
                            <h3>Edit event</h3>
                            <img src={cross} alt="cross" onClick={()=>{
                            setEditModalOut(false);
                        }}/>
                        </div>
                        <form onSubmit={formSubmitE}>
                            <div className="input-c">
                                <div className="input-g">
                                    <p>Name</p>
                                    <input name="name" onChange={eventDataFn} className="nameInputEd"
                                    />
                                    <em className="warning warning2">Event already exists</em>
                                </div>
                                <div className="input-g">
                                    <p>Start Time</p>
                                    <input name="time" type="time" id="stimed" onChange={timeDataFnEd}
                                    />
                                </div>
                                <div className="input-g">
                                    <p>End Time</p>
                                    <input name="time" type="time" id="etimed" onChange={timeDataFnEd}
                                    />
                                </div>
                                <div className="input-g">
                                    <p>Date</p>
                                    <input name="date" type="date" onChange={eventDataFn}
                                    />
                                </div>
                            </div>
                            <div className="buttons">
                                <button className="red" onClick={(e) => {
                                        setEditModalOut(false)
                                    }}>Cancel</button>
                                <button className="blue" type="submit" onClick={
                                    (e)=> {
                                        eventDataFn(e)
                                    }
                                }>
                                    Edit Event
                                </button>
                            </div>
                        </form>
                    </div>

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
            </div>
        </>
    );
}

export default Events;