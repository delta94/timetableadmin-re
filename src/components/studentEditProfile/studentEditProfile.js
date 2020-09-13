import React from "react"
import {Link} from "react-router-dom"
import "./studentEditProfile.css"
import bell from "../../images/alarm-bell@3x.png"
import logo from "../../images/Logo.png"
import search from "../../images/search.png"


 const studentProfile = (props) => {
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
                  </div>
            </header>


            <div className="student">
                <div className="search-container">
                    <img src={search} className="search" alt="search"/>
                    <input placeholder="Enter keyword to search"/>
                </div>
            </div>

            <div className="editProfile">
                    <h3>Edit Profile</h3>
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
                                        <p>Matric/No</p>
                                        <input placeholder="16/42hl016"/>
                                    </div>
                                    <div className="field">
                                        <p>Level</p>
                                        <input placeholder="300"/>
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
                                <button className="updateProfileBtn">
                                    Update Profile
                                </button>
                            </div>
                        </div>
                </div>
        </>
     );
 }

 export default studentProfile;