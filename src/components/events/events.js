/* eslint-disable array-callback-return */
import React,{useState, useEffect} from "react"
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


const source = axios.CancelToken.source();


const Events = (props) => {

    const [modalOut, setModalOut] = useState(false)
    const [id2, setId2] = useState("1234");
    const [date, setDate] = useState(new Date())
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(false)
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
    const [getDate, setGetDate] = useState("")

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

    const createEve = () => {
        let config = {
          method: 'post',
          url: 'https://tbe-node-deploy.herokuapp.com/user/event',
          cancelToken: source.token,
          headers: { 
            'Content-Type': 'application/json'
          },
          data : finalObj
        };
        
        axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    }

    const getEve = () => {

        // setLoading(false)

        let config = {
            method: 'get',
            url: 'https://tbe-node-deploy.herokuapp.com/user/events/day',
            headers: { 
              'date1': getDate
            }
          };
          
          axios(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            setEvents(response.data.data)
            setLoading(true)
          })
          .catch((error) => {
            console.log(error);
          });
    }

    useEffect(() => {
        getEve()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[events])

    const onDateChange = (date) => {
        var day  = date.getDate().toString().padStart(2, '0');
        var month  = (date.getMonth()+1).toString().padStart(2, '0');
        var year  = date.getFullYear();

        setDate(date)
        setGetDate(`${year}-${month}-${day}`)

        getEve()
        console.log("date changed")
    }

    // Remove empty inputs in edit room form object
    const cleanObj = () => {
        Object.keys(eventData).forEach((key) => (eventData[key] === "" || eventData === "") && delete eventData[key]);
    }

    const formSubmit = (e) => {
        e.preventDefault()
        console.log(finalObj)
        createEve()
    }

    // new Date().toISOString().substring(0,10)

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
                        <option>All</option>
                        <option>Name</option>
                        <option>Capacity</option>
                    </select>
                    <input placeholder="Enter keyword to search"/>
                    <button onClick={()=>{
                        setModalOut(!modalOut);
                        setId2(Math.random().toString());
                    }}><img src={plus} alt="plus"/>Add new event</button>
                </div>
                <div className="tableXcal">
                    <div className="calendar-container">
                        <Calendar onChange={onDateChange} className={["calendar"]} value={date} />
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
                            { loading === true ? events.map((eve)=>{
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
                                            onClick={()=> {}}
                                            />
                                        </td>
                                    </tr>
                                );
                            })
                             : <tr><td colSpan="5"><img src={spinner} className="spinner" alt="Spinner"/></td></tr>
                        }   
                        </tbody>
                        </table>
                    </div>
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