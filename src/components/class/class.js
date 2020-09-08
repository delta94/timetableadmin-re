import React from "react"
import "./class.css"
import plus from "../../images/plus.svg"
import bin from "../../images/bin.png"
import pen from "../../images/pencil 1.png"
import cross from "../../images/close.png"


const Classes = () => {
    return (
        <>
            <div className="room">
                <div className="search-container">
                    <input placeholder="Enter keyword to search"/>
                    <button><img src={plus} alt="plus"/>Add new class</button>
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

                <div className="modal">
                    <div className="head">
                        <h3>Add new class</h3>
                        <img src={cross} alt="cross"/>
                    </div>
                    <div className="input-c">
                        <div className="input-g">
                            <p>Name</p>
                            <input />
                        </div>
                        <div className="input-g">
                            <p>Course</p>
                            <input />
                        </div>
                        <div className="input-g">
                            <p>Academic Period</p>
                            <input />
                        </div>
                        <div className="input-g">
                            <p>Meeting</p>
                            <input />
                        </div>
                        <div className="input-g">
                            <p>Population</p>
                            <input />Name
                        </div>
                        <div className="input-g">
                            <p>Unavailable rooms</p>
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

export default Classes;