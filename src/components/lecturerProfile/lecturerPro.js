import React from "react"
import {Link} from "react-router-dom"
import "./lecturerPro.css"
import bell from "../../images/alarm-bell@3x.png"
import logo from "../../images/Logo.png"
import propic from "../../images/Profile Picture.svg"
import icon from "../../images/Group.svg"
import search from "../../images/search.png"

 const lecturerProfile = (props) => {
     return (
        <>
            <header>
                  <div>
                    <img src={logo} className="logo" alt="logo"/>
                    <p>Lecturer Profile</p>
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
                    <input placeholder="Search for student"/>
                </div>

                <div className="profile">
                    <div className="profile-left">
                        <img src={propic} alt="profile"/>
                        <div className="name-group">
                            <div className="detail">
                                <p>Name</p>
                                <p>Prof Adebayo Johnson</p>
                            </div>
                            <div className="detail">
                                <p>Post</p>
                                <p>Professor of Bio Sciences</p>
                            </div>
                            <div className="detail">
                                <p>Level</p>
                                <p>Associate Director</p>
                            </div>
                        </div>
                    </div>  
                    <img className="icon" alt="icon" src={icon}/>
                </div>

                <div className="editProfile">
                    <h3>Profile</h3>
                    <div className="editProfileContainer">
                        <div className="input-field">
                            <div className="field-name">
                                Full Name
                            </div>
                            <div className="field-details field-details-flex">
                                <div className="field pr">
                                    <p>First Name</p>
                                    <input placeholder="Bode"/>
                                </div>
                                <div className="field">
                                    <p>Last Name</p>
                                    <input placeholder="Adam"/>
                                </div>
                            </div>
                        </div>

                        <div className="input-field field-details-flex2">
                            <div className="field-name">
                                About
                            </div>
                            <div>
                                <div className="field-details field-details-flex">
                                    <div className="field pr">
                                        <p>Position</p>
                                        <input placeholder="Senior Professor"/>
                                    </div>
                                    <div className="field">
                                        <p>Bio</p>
                                        <textarea/>
                                    </div>
                                </div>
                                <div className="field-details field-details-flex">
                                    <div className="field pr">
                                        <p>Courses</p>
                                        <input/>
                                    </div>
                                    <div className="field">
                                        <p>Unavailable periods</p>
                                        <input/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="input-field">
                            <div className="field-name">
                                Email Address
                                <p className="notbold">We send saving notifications and other account updates to your confirmed email address</p>
                            </div>
                            <div className="field-details">
                                <div className="field">
                                    <p>Email Address</p>
                                    <input placeholder="abosede@yahoo.com" className="wid-4"/>
                                </div>
                            </div>
                        </div>

                        <div className="input-field">
                            <div className="field-name">
                                Phone Number
                                <p className="notbold">We send sms verification messages to your phone number</p>
                            </div>
                            <div className="field-details">
                                <div className="field">
                                    <p>Phone Number</p>
                                    <input placeholder="08000000" className="wid-4"/>
                                </div>
                                <button className="updateProfileBtn">
                                    Update Profile
                                </button>
                            </div>
                        </div>

                        <hr/>

                        <h3>Change Password</h3>

                        <div className="input-field">
                            <div className="field-name">
                                Password
                                <p className="notbold">Please provide your current password and choose a new password</p>
                            </div>
                            <div className="field-details">
                                <div className="field">
                                    <p>Current Password</p>
                                    <input type="password" className="wid-4"/>
                                </div>

                                <div className="field">
                                    <p>New Password</p>
                                    <input type="password" className="wid-4"/>
                                </div>

                                <div className="field">
                                    <p>Retype New Password</p>
                                    <input 
                                     className="wid-4" type="password"/>
                                </div>

                                <button className="updateProfileBtn">
                                    Update Password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
 }

 export default lecturerProfile;