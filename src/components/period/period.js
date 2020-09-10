import React,{useState} from "react"
import "./period.css"
import "../../global/global.css"
import plus from "../../images/plus.svg"
import bin from "../../images/bin.png"
import pen from "../../images/pencil 1.png"
import cross from "../../images/close.png"
import bell from "../../images/alarm-bell@3x.png"
import logo from "../../images/Logo.png"

const Period = () => {

    const [modalOut, setModalOut] = useState(false)
    return (
        <>
            <header>
                  <div>
                    <img src={logo} className="logo" alt="logo"/>
                    <p>Period</p>
                  </div>
                <img src={bell} alt="bell"/>
            </header>
            <div className="section">
                <div className="search-container">
                    <input placeholder="Enter keyword to search"/>
                    <button onClick={()=>{
                        setModalOut(!modalOut);
                    }}><img src={plus} alt="plus"/>Add new period</button>
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
                    <tbody className="gfg">
                        <tr className="default">
                        <td>8:00am - 10:00am</td>
                        <td>GST 402</td>
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

                        <tr className="default">
                        <td>8:00am - 10:00am</td>
                        <td>GST 402</td>
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
                        <h3>Add new class</h3>
                        <img src={cross} alt="cross" onClick={()=>{
                        setModalOut(!modalOut);
                    }}/>
                    </div>
                    <div className="input-c">
                        <div className="input-g">
                            <p>Course</p>
                            <input />
                        </div>
                        <div className="input-g">
                            <p>Time</p>
                            <input />
                        </div>
                    </div>
                    <div className="buttons">
                        <button className="red">Cancel</button>
                        <button className="blue">
                            Add room
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Period;