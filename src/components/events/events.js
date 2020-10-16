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
import {format} from "date-fns"



const getEvents = (events, {date, pageNo, search}) => {

    var formattedDate = format(new Date(date), "yyyy-MM-dd")   

      return axios.get('https://tbe-node-deploy.herokuapp.com/user/events/day', {
        headers: { 
          'date1': date ? formattedDate : ""
        },
        params: {perPage: 5, page: pageNo, searchQuery: search}
        })
      .then((response) => {
        return response.data?.data
      })

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



const Events = (props) => {

    const [date, setDate] = useState(null)

    const [pageNo,setPageNo] = useState(null) 

    const [search, setSearch] = useState("")

    const {data, isLoading} = useQuery(['events', {date, pageNo, search}], getEvents, {
        refetchOnWindowFocus: false
    })

    // const [deleteFn] = useMutation(deleteEvents, { 
    //     onSuccess: () => {
    //         console.log("deleted")
    //         queryCache.refetchQueries('events')
    //         // setDeleter(false)
    //         // setTimeout(() => {
    //         //     setDeleted(true)
    //         // }, 10);
    //         // setDeleted(false)
    //     },
    //     onError: () => {
    //         console.log("error o")
    //     }
    // })


    const [modalOut, setModalOut] = useState(false)
    const [id2, setId2] = useState("1234");
    // const [deleteId, setDeleteId] = useState("")
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

    // const createEve = () => {
    //     let config = {
    //       method: 'post',
    //       url: 'https://tbe-node-deploy.herokuapp.com/user/event',
    //       cancelToken: source.token,
    //       headers: { 
    //         'Content-Type': 'application/json'
    //       },
    //       data : finalObj
    //     };
        
    //     axios(config)
    //     .then((response) => {
    //       console.log(JSON.stringify(response.data));
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
    
    // Remove empty inputs in edit room form object
    const cleanObj = () => {
        Object.keys(eventData).forEach((key) => (eventData[key] === "" || eventData === "") && delete eventData[key]);
    }

    const formSubmit = (e) => {
        e.preventDefault()
        console.log(finalObj)
        // createEve()
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
                    <div className="calendar-container">
                        <Calendar onChange={setDate}  className={["calendar"]} value={date} />
                    </div>
                    <div className="table-container">
                        <table className="table2">
                        <thead className="table-head">
                            <tr className="row1">
                            <th>Event name</th>
                            <th>Event Time</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { isLoading === false ? data.map((eve)=>{
                                return(
                                    <tr className="default" key={eve._id}>
                                        <td>{eve.name}</td>
                                        <td>{eve.time}</td>
                                        <td>
                                            <img
                                            src={pen}
                                            alt="pencil"
                                            className="pencil"
                                            onClick={()=>{}}
                                            />
                                            <img
                                            src={bin}
                                            alt="bin"
                                            className="bin"
                                            // onClick={()=> {deleteFn(deleteId)}}
                                            />
                                        </td>
                                    </tr>
                                );
                            })
                             : <tr><td colSpan="5"><img src={spinner} className="spinner" alt="Spinner"/></td></tr>
                        }   
                        {isLoading === false && data?.length === 0 ? (
                            <tr><td colSpan="3" style={{color: "#0395ff"}}>No events for this day</td></tr>
                        ) : null}
                        </tbody>
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

                    <div className={modalOut === true ? "overlay modOut" : "overlay"}
                        onClick={()=>{
                            setModalOut(!modalOut);
                        }}></div>

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
                                    <input name="name" id="modInput" onChange={eventDataFn} className="nameInput" required/>
                                    <em className="warning">Room already exists</em>
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
                                        cleanObj()
                                        eventDataFn(e)
                                    }
                                }>
                                    Add Event
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Events;