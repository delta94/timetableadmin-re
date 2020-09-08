import React from "react"
import "./period.css"
import plus from "../../images/plus.svg"
import bin from "../../images/bin.png"
import pen from "../../images/pencil 1.png"
import cross from "../../images/close.png"


const Period = () => {
    return (
        <>
            <div className="room">
                <div className="search-container">
                    <input placeholder="Enter keyword to search"/>
                    <button><img src={plus} alt="plus"/>Add new period</button>
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

                <div className="modal">
                    <div className="head">
                        <h3>Add new lecture room</h3>
                        <img src={cross} alt="cross"/>
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