import React,{useEffect, useState} from "react"
import {Link} from "react-router-dom"
import "./room.css"
import "../../global/global.css"
import plus from "../../images/plus.svg"
import bin from "../../images/bin.png"
import pen from "../../images/pencil 1.png"
import cross from "../../images/close.png"
import bell from "../../images/alarm-bell@3x.png"
import logo from "../../images/Logo.png"
import axios from "axios"
import spinner from "../../images/spinner.gif"



const Room = (props) => {
    //Room states
    const [rooms,setRooms] = useState([])   
    const [loading, setLoading] = useState(false) 
    const [roomData, setRoomData] = useState(
        {
            name: "",
            capacity: ""
        }
    );
    const [editModalOut,setEditModalOut] = useState(false)
    const [editRoomId, setEditRoomId] = useState("")
    
    // Labels
    const [labelData, setLabelData] = useState(
        {
            nameLabel: "",
            capacityLabel: ""
        }
    );
    const [modalOut, setModalOut] = useState(false)

     // setting key for edit form
     const [id, setId] = useState("123");

    // For cancelling requests
    const source = axios.CancelToken.source();

    // Create rooms
    const roomFormData = (e) => {

        setRoomData({
            ...roomData,
      
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()
          });

    }

    const [err, setErr] = useState(false)
    const createRooms = () => {
        let data = JSON.stringify(roomData);

        let config = {
        method: 'post',
        url: 'https://tbe-node-deploy.herokuapp.com/Admin/room',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };

        axios(config)
        .then((response) => {
        console.log(JSON.stringify(response.data));
        })
        .then(()=> getRooms())
        .catch((error) => {
            if({...error}.response.status === 401){
                setErr(true)
            }else{
                setErr(false)
            }
            console.log({...error}.response.status);
            console.log(err)
        });
    }

    // Get rooms
    const getRooms = () => {
        let config = {
        method: 'get',
        url: 'https://tbe-node-deploy.herokuapp.com/Admin/room',
        headers: { },
        cancelToken: source.token
        };

        axios(config)
        .then((response) => {
            setRooms(response.data.data)
            setLoading(true)
        })
        .catch((error) => {
        console.log(error);
        });

    }

    useEffect(() => {
        getRooms()
        filterFn()
        return () => {
            source.cancel("Component got unmounted");
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[rooms])


    // Delete room
    const deleteRoom = (data) => {
        let config = {
            method: 'delete',
            url: 'https://tbe-node-deploy.herokuapp.com/Admin/room/delete',
            headers: { 
              'id': data
            }
          };
          
          axios(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
          })
          .then(()=> getRooms())
          .catch((error) => {
            console.log(error);
          });
          
    }


    // Edit room
    const editRooms = () => {
        let data = JSON.stringify(roomData);

        let config = {
        method: 'patch',
        url: `https://tbe-node-deploy.herokuapp.com/Admin/room/${editRoomId}`,
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };

        axios(config)
        .then((response) => {
        console.log(JSON.stringify(response.data));
        })
        .then(()=> getRooms())
        .catch((error) => {
        console.log(error.response.status);
        });
    }

    // Generating form labels for edit
    const genFormLabels = (data) => {
        rooms.map(
            // eslint-disable-next-line array-callback-return
            (room) => {
                if(room._id === data){
                    setLabelData({
                        ...labelData,
                        nameLabel: room.name,
                        capacityLabel: room.capacity
                    })
                }
            })
    }

    
    // Remove empty inputs in edit room form object
    const cleanObj = () => {
        Object.keys(roomData).forEach((key) => (roomData[key] === "") && delete roomData[key]);

        console.log(roomData)
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
            setNewArr(rooms
            // eslint-disable-next-line array-callback-return
            .filter(d=> {
                if(switchState === "Name"){
                    return d.name.toLowerCase().includes(target.toLowerCase()) === true
                }else if(switchState === "" || switchState === "All"){
                    return d.name.toLowerCase().includes(target.toLowerCase()) === true || d.capacity.toString().toLowerCase().includes(target.toLowerCase()) === true
                }else if(switchState === "Capacity"){
                    return d.capacity.toString().toLowerCase().includes(target.toLowerCase()) === true
                }
            }))
    }

    function success() {
        if(document.getElementById("modInput").value==="" || document.getElementById("modInput2").value==="" || err){ 
               document.querySelector('.warning').style.display = "block"; 
           } else { 
                document.querySelector('.warning').style.display = "none"; 
           }
    }

    return (
        <>
            <header>
                  <div>
                    <img src={logo} className="logo" alt="logo"/>
                    <p>Rooms</p>
                  </div>
                  <div className="navMobile"> 
                    <Link to="/app/notification">
                            <img src={bell} alt="bell"/>
                    </Link>
                  </div>
            </header>
            <div className="section">
                <div className="search-container">
                    <select className="select-css2" name="switch" onChange={switchFilter}>
                        <option>All</option>
                        <option>Name</option>
                        <option>Capacity</option>
                    </select>
                    <input placeholder="Enter keyword to search" onChange={onChangeHandler} />
                    <button onClick={()=>{
                        setModalOut(!modalOut);
                    }}><img src={plus} alt="plus"/>Add new room</button>
                </div>
                <div className="table-container">
                    <table className="table">
                    <thead className="table-head">
                        <tr className="row1">
                        <th>Name of Rooms</th>
                        <th>Room Capacity</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="gfg">
                        {loading === true ? newArr
                        .map(room => {
                            return(
                                <tr className="default" key={room._id}>
                                    <td>{room.name}</td>
                                    <td>{room.capacity}</td>
                                    <td>
                                        <img
                                        src={pen}
                                        alt="pencil"
                                        className="pencil"
                                        onClick={()=>{
                                            setEditModalOut(true);
                                            setEditRoomId(room._id)
                                            genFormLabels(room._id)
                                            setId(Math.random().toString())
                                        }}
                                        />
                                        <img
                                        src={bin}
                                        alt="bin"
                                        className="bin"
                                        onClick={()=>deleteRoom(room._id)}
                                        />
                                    </td>
                                </tr>
                            );
                        }) : <tr><td colSpan="5"><img src={spinner} className="spinner" alt="Spinner"/></td></tr>}
                        {newArr.length === 0 && loading === true ? <tr><td colSpan="5" style={{color:  "#0395ff", fontSize: "18px"}}><p>No search results ... </p></td></tr> : null}
                    </tbody> 
                    </table>
                </div>

                <div className={modalOut === true ? "overlay modOut" : "overlay"}
                onClick={()=>{
                    setModalOut(!modalOut);
                }}></div>


                {/* Create room form */}
                <div className={modalOut === true ? "modal modOut" : "modal"}>
                    <div className="head">
                        <h3>Add new room</h3>
                        <img src={cross} alt="cross" onClick={()=>{
                        setModalOut(!modalOut);
                    }}/>
                    </div>
                    <div className="input-g">
                        <div className="warning">Make sure all fields are filled & Room does not already exist </div>
                    </div>
                    
                    <div className="input-c">
                        <div className="input-g">
                            <p>Name</p>
                            <input name="name" onChange={roomFormData} id="modInput"/>
                        </div>
                        <div className="input-g">
                            <p>Room Capacity</p>
                            <input name="capacity" type="number" onChange={roomFormData} id="modInput2"/>
                        </div>
                    </div>
                    <div className="buttons">
                        <button className="red" onClick={(e) => {
                                e.preventDefault()
                                setModalOut(false)
                            }}>Cancel</button>
                        <button className="blue" onClick={
                            (e)=> {
                                e.preventDefault()
                                roomFormData(e)
                                createRooms()
                                success()
                            }
                        }>
                            Add room
                        </button>
                    </div>
                </div>

                {/* Edit room form */}
                <div className={editModalOut === true ? "modal modOut" : "modal"} key={id}>
                    <div className="head">
                        <h3>Edit room</h3>
                        <img src={cross} alt="cross" onClick={()=>{
                        setEditModalOut(false);
                    }}/>
                    </div>
                    <div className="input-c">
                        <div className="input-g">
                            <p>Name</p>
                            <input name="name" onChange={roomFormData} placeholder={labelData.nameLabel}/>
                        </div>
                        <div className="input-g">
                            <p>Room Capacity</p>
                            <input name="capacity" type="number" onChange={roomFormData} placeholder={labelData.capacityLabel}/>
                        </div>
                    </div>
                    <div className="buttons">
                        <button className="red" onClick={(e) => {
                                e.preventDefault()
                                setEditModalOut(false)
                            }}>Cancel</button>
                        <button className="blue" onClick={
                            (e)=> {
                                e.preventDefault()
                                roomFormData(e)
                                cleanObj()
                                editRooms()
                            }
                        }>
                            Edit room
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Room;