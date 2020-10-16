/* eslint-disable array-callback-return */
import React,{useState} from "react"
import {Link} from "react-router-dom"
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./room.css"
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
import ReactPaginate from "react-paginate"
import { useQuery, useMutation , queryCache } from "react-query"

const getRooms = (page, {pageNo, search}) => {

        return axios.get('https://tbe-node-deploy.herokuapp.com/Admin/room', {
            headers: {},
            params: {perPage: 5, page: pageNo, searchQuery: search}
        })
        .then((response) => {
            var rooms = response.data?.data.docs
            var pages = response.data?.data.totalPages
            return {rooms, pages}
        })
 }

 const deleteRoom = (deleteId) => {
          
        return axios.delete('https://tbe-node-deploy.herokuapp.com/Admin/room/delete', {
            headers: { 
                'id': deleteId
            }
        })
        .then((response) => {
            return response
        })      
}

const createRoom = (roomData) => {
        let data = JSON.stringify(roomData);

        return axios.post('https://tbe-node-deploy.herokuapp.com/Admin/room', data, {
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

const editRoom = (args) => {
        let data = JSON.stringify(args.roomData);

        return axios.patch(`https://tbe-node-deploy.herokuapp.com/Admin/room/${args.editRoomId}`, data, {
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


const Room = (props) => {

    const [pageNo,setPageNo] = useState(null) 

    const [search, setSearch] = useState("")
    
    const {isLoading, data} = useQuery(['rooms', {pageNo, search}], getRooms, {
        refetchOnWindowFocus: false
    })

    const [deleteFn] = useMutation(deleteRoom, { 
        onSuccess: () => {
            console.log("deleted")
            queryCache.refetchQueries('rooms')
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

    const [createFn] = useMutation(createRoom, {
        onSuccess: () => {
            console.log("created")
            queryCache.refetchQueries('rooms')
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

    const [editFn] = useMutation(editRoom, {
        onSuccess: () => {
            console.log("edited")
            queryCache.refetchQueries('rooms')
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

    //Local states
    const [editModalOut,setEditModalOut] = useState(false)
    const [editRoomId, setEditRoomId] = useState("")
    const [modalOut, setModalOut] = useState(false)
    const [id, setId] = useState("123");
    const [id2, setId2] = useState("1234");
    const [created, setCreated] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [edited, setEdited] = useState(false)    
    const [deleter, setDeleter] = useState(false)
    const [deleteId, setDeleteId] = useState("")
    const [labelData, setLabelData] = useState(
        {
            nameLabel: "",
            capacityLabel: ""
        }
    );
    const [roomData, setRoomData] = useState(
        {
            name: "",
            capacity: ""
        }
    );


    // Create rooms
    const roomFormData = (e) => {

        setRoomData({
            ...roomData,
      
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()
          });

    }

    const onChangeHandler = (e) => {
        setSearch(e.target.value)
    }
 
    // Generating form labels for edit
    const genFormLabels = (datum) => {
        data.rooms.map(
            // eslint-disable-next-line array-callback-return
            (room) => {
                if(room._id === datum){
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
    }



    // Form validation
    const success = () => {
        const nameIn = document.querySelector(".nameInput")
        const warningInput = document.querySelector(".warning")
        data.rooms.map((room)=> {
            if(room.name === nameIn.value){
                warningInput.classList.add("display")
                nameIn.classList.add("error")
            }
        })
    }

    const successEdit = () => {
        const nameIn = document.querySelector(".nameInputEdit")
        const warningInput = document.querySelector(".warning2")
        data.rooms.map((room)=> {
            if(room.name.toString() === nameIn.value.toString()){
                warningInput.classList.add("display")
                nameIn.classList.add("error")
            }
        })
    }

    //Get all the inputs...
    const inputs = document.querySelectorAll('form input');
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

    const formSubmit = (e) => {
        e.preventDefault()

        createFn(roomData)
        success()
    }

    const formSubmitE = (e) => {
        e.preventDefault()
        
        editFn({editRoomId, roomData})
        successEdit()
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
                    <p>Rooms</p>
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
                        <option>Capacity</option> */}
                    </select>
                    <input placeholder="Search by name" onChange={onChangeHandler}/>
                    <button onClick={()=>{
                        setModalOut(!modalOut);
                        setId2(Math.random().toString());
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
                    <TransitionGroup component="tbody" className="gfg">
                        {isLoading === false && data ? data.rooms
                        .map(room => {
                            return(
                                <CSSTransition
                                    timeout={900}
                                    classNames="slide"
                                    in={true}
                                    appear={true}
                                    key={room._id}
                                    onExited={()=> console.log("exited")}
                                >
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
                                        onClick={()=> {
                                            openDelete(room._id)
                                        }}
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
                        </CSSTransition>}
                        {data?.rooms.length === 0 && isLoading === false ? 
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
                    <p>Are you sure you want to delete Room {
                    data?.rooms.map((room)=> {
                        if(room._id === deleteId){
                            return(
                                <em key={deleteId} className="deleteName">{room.name}</em>
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


                {/* Create room form */}
                <div className={modalOut === true ? "modal modOut" : "modal"} key={id2}>
                    <div className="head">
                        <h3>Add new room</h3>
                        <img src={cross} alt="cross" onClick={()=>{
                        setModalOut(!modalOut);
                    }}/>
                    </div>
                    <form onSubmit={formSubmit}>
                    <div className="input-c">
                        <div className="input-g">
                            <p>Name</p>
                            <input name="name" onChange={roomFormData} id="modInput" className="nameInput" required/>
                            <em className="warning">Room already exists</em>
                        </div>
                        <div className="input-g">
                            <p>Room Capacity</p>
                            <input name="capacity" type="number" onChange={roomFormData} id="modInput2" required/>
                        </div>
                    </div>
                    <div className="buttons">
                        <button className="red" onClick={(e) => {
                                setModalOut(false)
                            }}>Cancel</button>
                        <button className="blue" type="submit" onClick={
                            (e)=> {
                                roomFormData(e)
                                cleanObj()
                            }
                        }>
                            Add room
                        </button>
                    </div>
                    </form>
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
                            <input name="name" className="nameInputEdit" onChange={roomFormData} placeholder={labelData.nameLabel}/>
                            <em className="warning warning2">Room already exists</em>
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
                                formSubmitE(e)
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