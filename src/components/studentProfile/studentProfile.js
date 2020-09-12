import React from "react"
import {Link} from "react-router-dom"
import "./studentProfile.css"
import bell from "../../images/alarm-bell@3x.png"
import logo from "../../images/Logo.png"
import bin from "../../images/bin.png"
import pen from "../../images/pencil 1.png"
import propic from "../../images/Profile Picture.svg"
import icon from "../../images/Group.svg"
import search from "../../images/search.png"
import ham from "../../images/ham.png"


 const studentProfile = ({onHelp}) => {
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
                    <input placeholder="Enter keyword to search"/>
                </div>

                <div className="profile">
                    <div className="profile-left">
                        <img src={propic} alt="profile"/>
                        <div className="name-group">
                            <div className="detail">
                                <p>Name</p>
                                <p>Adebayo Johnson</p>
                            </div>
                            <div className="detail">
                                <p>Matric No</p>
                                <p>16/42hi012</p>
                            </div>
                            <div className="detail">
                                <p>Level</p>
                                <p>300</p>
                            </div>
                            <Link to="/app/studentEditProfile">Edit</Link>
                        </div>
                    </div>  
                    <img className="icon" alt="icon" src={icon}/>
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
                            <td>MTH 121</td>
                            <td>110</td>
                            <td>2 Units</td>
                            <td>Mr Suleiman</td>
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
                </div>
        </>
     );
 }

 export default studentProfile;