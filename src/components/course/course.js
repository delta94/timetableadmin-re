import React,{useEffect, useState} from "react"
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
import axios from "axios"


const Course = (props) => {
    const [modalOut, setModalOut] = useState(false)

    const [courses, setCourses] = useState([])


    // Get request
    const fetchCourses = () => {
            let config = {
                method: 'get',
                url: 'https://tbe-node-deploy.herokuapp.com/Admin/getCourse',
                headers: { }
            };
            
            axios(config)
            .then((response) => {
                var res = response.data.data
                console.log(res)
                setCourses(res)
            })
            .catch((error) => {
                console.log(error);
            });
    }



    useEffect( () => {
            fetchCourses()
        },[]
    )

    // Post Request
    // const createCourse = () => {
    //     var myHeaders = new Headers();
    //     myHeaders.append("Content-Type", "application/json");

    //     var raw = JSON.stringify({"name":"English","code":"505","unit":2,"day":"Friday","description":"English Language","level":200,"venue":"5f1f5uhbucw662gs0017f255463","time":"5.00pm - 7.00pm"});

    //     var requestOptions = {
    //     method: 'POST',
    //     headers: myHeaders,
    //     body: raw,
    //     redirect: 'follow'
    //     };

    //     fetch("https://tbe-node-deploy.herokuapp.com/Admin/course", requestOptions)
    //     .then(response => response.text())
    //     .then(result => console.log(result))
    //     .catch(error => console.log('error', error));


    //     console.log("created")
    // }

    // Delete request
    const deleteCourse = (data) => {
        let config = {
            method: 'delete',
            url: 'https://tbe-node-deploy.herokuapp.com/Admin/course/delete',
            headers: { 
              '_id': data
            }
          };
          
          axios(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
          })
          .catch((error) => {
            console.log(error);
          });
          

        console.log("deleted")
    }
    

    return (
        <>
            <header>
                  <div>
                    <img src={logo} className="logo" alt="logo"/>
                    <p>Courses</p>
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
                        // createCourse()
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
                        {courses.map(course => {
                            return(
                                <tr className="default" key={course.name}>
                                    <td>{course.code}</td>
                                    <td>{course.name}</td>
                                    <td>{course.unit}</td>
                                    <td>{course.lecturer.name}</td>
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
                                        onClick={()=>deleteCourse(course._id)}
                                        />
                                    </td>
                                </tr>
                            )})
                        }
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
                    <form name="createCourse">
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
                    </form>
                </div>
            </div>
        </>
    );
}

export default Course;