import React from "react";
import "./notification.css"
import "../../global/global.css";
import logo from "../../images/Logo.png";

const Notif = () =>{
    return (
        <>
            <div className="notification">
                <header>
                    <div>
                        <img src={logo} className="logo" alt="logo"/>
                        <p>Notification</p>
                    </div>
                </header>

                <div className="section">
                        <div className="search-container">
                            <input placeholder="Search for messages"/>
                        </div>

                        <div className="table-container">
                                <table className="table">
                                <tbody className="gfg">
                                    <tr className="default tr-no-bottom">
                                    <td className="notif-tr"><span>Dotun Sesan: </span>Tried to login at 8:00AM</td>
                                    </tr>
                                    <tr className="default tr-no-bottom">
                                    <td className="notif-tr2"><span>Dotun Sesan: </span>Tried to login at 8:00AM</td>
                                    </tr>
                                    <tr className="default tr-no-bottom">
                                    <td className="notif-tr"><span>Dotun Sesan: </span>Tried to login at 8:00AM</td>
                                    </tr>
                                    <tr className="default tr-no-bottom">
                                    <td className="notif-tr2"><span>Dotun Sesan: </span>Tried to login at 8:00AM</td>
                                    </tr>
                                </tbody>
                                </table>
                        </div>
                </div>
            </div>
        </>
    );
}

export default Notif;