import React,{useState} from "react"
import {Link} from "react-router-dom"
import "./lecturer.css"
import "../../global/global.css"
import plus from "../../images/plus.svg"
import bin from "../../images/bin.png"
import pen from "../../images/pencil 1.png"
import cross from "../../images/close.png"
import bell from "../../images/alarm-bell@3x.png"
import logo from "../../images/Logo.png"
import search from "../../images/search.png"


const Lecturer = () => {

    const [modalOut, setModalOut] = useState(false)
    return (
        <>
            <header>
                  <div>
                    <img src={logo} className="logo" alt="logo"/>
                    <p>Lecturer</p>
                  </div>
                  <Link to="/app/notification">
                        <img src={bell} alt="bell"/>
                  </Link>
              </header>
            <div className="section">
                <div className="search-container">
                    <img src={search} className="search" alt="search"/>
                    <input placeholder="Enter keyword to search"/>
                    <Link to="/app/lecturerPro" className="addLect"><img src={plus} alt="plus"/>Add new lecture</Link>
                </div>
                <div className="table-container">
                    <table className="table">
                    <thead className="table-head">
                        <tr className="row1">
                        <th>Course Code</th>
                        <th>Course Name</th>
                        <th>Course Unit</th>
                        <th>Lecturer</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="gfg">
                        <tr className="default">
                        <td>Lecture room 1</td>
                        <td>110</td>
                        <td>2 Units</td>
                        <td>Johnny</td>
                        <td>
                            <img
                            src={pen}
                            alt="pencil"
                            className="pencil"
                            />
                            <img
                            src={bin}
                            alt="bin"
                            className="bin"
                            />
                        </td>
                        </tr>
                    </tbody>
                    </table>
                </div>

                <div className={modalOut === true ? "overlay modOut" : "overlay"}
                onClick={()=>{
                    setModalOut(!modalOut);
                }}></div>

                <div className={modalOut === true ? "modal modOut" : "modal"}>
                    <div className="head">
                        <h3>Add new lecture</h3>
                        <img src={cross} alt="cross" onClick={()=>{
                        setModalOut(!modalOut);
                    }}/>
                    </div>
                    <div className="input-c">
                        <div className="input-g">
                            <p>Name</p>
                            <input />
                        </div>
                        <div className="input-g">
                            <p>Email</p>
                            <input />
                        </div>
                        <div className="input-g">
                            <p>Courses</p>
                            <input list="courses" name="courses" />
                            <datalist id="courses">
                                <option value="Maths"/>
                                <option value="English"/>
                            </datalist>
                        </div>
                        <div className="input-g">
                            <p>Unavailable periods</p>
                            <input list="un-period" name="un-period" />
                            <datalist id="un-period">
                                <option value="10AM - 12AM"/>
                                <option value="1PM - 3PM"/>
                            </datalist>
                        </div>
                    </div>
                    <div className="buttons">
                        <button className="red">Cancel</button>
                        <button className="blue">
                            Add lecture
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Lecturer;