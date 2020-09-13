import React,{useState} from "react"
import {Link} from "react-router-dom"
import "./class.css"
import "../../global/global.css"
import plus from "../../images/plus.svg"
import bin from "../../images/bin.png"
import pen from "../../images/pencil 1.png"
import cross from "../../images/close.png"
import bell from "../../images/alarm-bell@3x.png"
import logo from "../../images/Logo.png"
import search from "../../images/search.png"

const Classes = (props) => {

    const [modalOut, setModalOut] = useState(false)

    return (
        <>
            <header>
                  <div>
                    <img src={logo} className="logo" alt="logo"/>
                    <p>Classes</p>
                  </div>
                  <div className="navMobile"> 
                    <Link to="/app/notification">
                            <img src={bell} alt="bell"/>
                    </Link>
                  </div>
            </header>
            <div className="section">
                <div className="search-container">
                    <img src={search} className="search" alt="search"/>
                    <input placeholder="Enter keyword to search"/>
                    <button onClick={()=>{
                        setModalOut(!modalOut);
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
                    <tbody className="gfg">
                        <tr className="default">
                        <td>Lr5</td>
                        <td>120</td>
                        <td><b>First semester</b>
                            <div className="row-mid">.GST 402 Introduction To Account</div>
                            <div className="row-mid">.GST 402 Introduction To Account</div>
                            <div className="row-mid">.GST 402 Introduction To Account</div>
                            <div className="row-mid">.GST 402 Introduction To Account</div>
                        </td>
                        <td>Lr4</td>
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

                <div className={modalOut === true ? "modal modalClass modOut" : "modal modalClass"}>
                    <div className="head">
                        <h3>Add new class</h3>
                        <img src={cross} alt="cross" onClick={()=>{
                        setModalOut(!modalOut);
                    }}/>
                    </div>
                    <div className="input-c">
                        <div className="input-g">
                            <p>Name</p>
                            <input />
                        </div>
                        <div className="input-sub-group">
                            <div className="input-g2">
                                <p>Course</p>
                                <input list="courses" name="courses" />
                                <datalist id="courses">
                                    <option value="Maths"/>
                                    <option value="English"/>
                                    <option value="Physics"/>
                                </datalist>
                            </div>
                            <div className="input-g2">
                                <p>Academic Period</p>
                                <input list="aca-period" name="aca-period" />
                                <datalist id="aca-period">
                                    <option value="2015/2016"/>
                                    <option value="2016/2017"/>
                                </datalist>
                            </div>
                        </div>
                        <div className="input-sub-group">
                            <div className="input-g2">
                                <p>Meeting</p>
                                <input list="meeting" name="meeting" />
                                <datalist id="meeting">
                                    <option value="Xyz"/>
                                </datalist>
                            </div>
                            <div className="input-g2">
                                <p>Population</p>
                                <input list="pop" name="pop" />
                                <datalist id="pop">
                                    <option value="100 - 400"/>
                                    <option value="500 - 1000"/>
                                </datalist>
                            </div>
                        </div>
                        <div className="input-g">
                            <p>Unavailable lecture rooms</p>
                            <input list="un-rooms" name="un-rooms" />
                            <datalist id="un-rooms">
                                <option value="B12"/>
                                <option value="A233"/>
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

export default Classes;