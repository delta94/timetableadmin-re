import React,{useState} from "react"
import "./course.css"
import plus from "../../images/plus.svg"
import bin from "../../images/bin.png"
import pen from "../../images/pencil 1.png"
import cross from "../../images/close.png"


const Course = () => {
    const [modalOut, setModalOut] = useState(false)
    return (
        <>
            <div className="course">
                <div className="search-container">
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
                        <div className="input-g">
                            <p>Course code</p>
                            <input />
                        </div>
                        <div className="input-g">
                            <p>Course unit</p>
                            <input />
                        </div>
                        <div className="input-g">
                            <p>Professor</p>
                            <input />
                        </div>
                        <div className="input-g">
                            <p>Venue</p>
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

export default Course;