import React,{useState} from "react"
import {Link} from "react-router-dom"
import "./course.css"
import "../../global/global.css"
import plus from "../../images/plus.svg"
import bin from "../../images/bin.png"
import pen from "../../images/pencil 1.png"
import cross from "../../images/close.png"
import bell from "../../images/alarm-bell@3x.png"
import logo from "../../images/Logo.png"
import search from "../../images/search.png"


const Course = () => {
    const [modalOut, setModalOut] = useState(false)
    return (
        <>
            <header>
                  <div>
                    <img src={logo} className="logo" alt="logo"/>
                    <p>Courses</p>
                  </div>
                  <Link to="/app/notification">
                        <img src={bell} alt="bell"/>
                  </Link>
            </header>
            <div className="section">
                <div className="search-container">
                    <img src={search} className="search" alt="search"/>
                    <input placeholder="Enter keyword to search"/>
                    <button onClick={()=>{
                        setModalOut(!modalOut);
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
                        <h3>Add new course</h3>
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
                            <p>Course code</p>
                            <input list="code" name="course-code" />
                            <datalist id="code">
                                <option value="100L"/>
                                <option value="200L"/>
                                <option value="300L"/>
                                <option value="400L"/>
                            </datalist>
                        </div>
                        <div className="input-g">
                            <p>Course unit</p>
                            <input />
                        </div>
                        <div className="input-g">
                            <p>Professor</p>
                            <input list="prof" name="prof" />
                            <datalist id="prof">
                                <option value="Mr Agbado"/>
                                <option value="Dr Thompson"/>
                            </datalist>
                        </div>
                        <div className="input-g">
                            <p>Venue</p>
                            <input list="venue" name="venue" />
                            <datalist id="venue">
                                <option value="New hall"/>
                                <option value="Fsc"/>
                            </datalist>
                        </div>
                    </div>
                    <div className="buttons">
                        <button className="red">Cancel</button>
                        <button className="blue">
                            Add course
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Course;