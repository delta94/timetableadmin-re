import React from "react"
import "./lecturer.css"
import plus from "../../images/plus.svg"
import bin from "../../images/bin.png"
import pen from "../../images/pencil 1.png"
import cross from "../../images/close.png"


const Lecturer = () => {
    return (
        <>
            <div className="room">
                <div className="search-container">
                    <input placeholder="Enter keyword to search"/>
                    <button><img src={plus} alt="plus"/>Add new lecturer</button>
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

                <div className="modal">
                    <div className="head">
                        <h3>Add new lecturer</h3>
                        <img src={cross} alt="cross"/>
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
                            <input />
                        </div>
                        <div className="input-g">
                            <p>Unavailable period</p>
                            <input />
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

export default Lecturer;