import React from "react"
import "./lecturerPro.css"
import bell from "../../images/alarm-bell@3x.png"
import logo from "../../images/Logo.png"
import propic from "../../images/Profile Picture.svg"
import icon from "../../images/Group.svg"
 const lecturerProfile = () => {
     return (
        <>
            <header>
                  <div>
                    <img src={logo} className="logo" alt="logo"/>
                    <p>Lecturer Profile</p>
                  </div>
                <img src={bell} alt="bell"/>
            </header>


            <div className="lecturer">
                <div className="search-container">
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
            </div>
        </>
     );
 }

 export default lecturerProfile;