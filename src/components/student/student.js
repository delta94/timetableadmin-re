import React from "react"
import {Link} from "react-router-dom"
import "./student.css"
import bell from "../../images/alarm-bell@3x.png"
import logo from "../../images/Logo.png"
import bin from "../../images/bin.png"
import pen from "../../images/pencil 1.png"
import search from "../../images/search.png"
import ham from "../../images/ham.png"


 const student = ({onHelp}) => {
     return (
        <>
            <header>
                  <div>
                    <img src={logo} className="logo" alt="logo"/>
                    <p>student Profile</p>
                  </div>
                  <div className="navMobile"> 
                    <Link to="/app/notification">
                            <img src={bell} alt="bell"/>
                    </Link>
                    <div onClick={() => onHelp()} className="ham">
                        <img src={ham} alt="hamburger"/>
                    </div>
                  </div>
            </header>


            <div className="student">
                <div className="search-container">
                    <img src={search} className="search" alt="search"/>
                    <input placeholder="Search for student"/>
                </div>

                <div className="table-container">
                        <table className="table">
                        <thead className="table-head">
                            <tr className="row1">
                            <th>Students</th>
                            <th>Matric/No</th>
                            <th>Level</th>
                            <th>Action</th>
                            <th>Profile</th>
                            </tr>
                        </thead>
                        <tbody className="gfg">
                            <tr className="default">
                            <td>Deji Thompson</td>
                            <td>16/54hl012</td>
                            <td>300</td>
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
                            <td><Link to="/app/studentPro">View</Link></td>
                            </tr>
                            <tr className="default">
                            <td>Deji Thompson</td>
                            <td>16/54hl012</td>
                            <td>300</td>
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
                            <td><Link to="/app/studentPro">View</Link></td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                </div>
        </>
     );
 }

 export default student;