import React from "react"
import {Link} from "react-router-dom"
import "./timetable.css"
import logo from "../../images/Logo.png"


 const timetable = (props) => {
     return (
        <>
            <header>
                  <div>
                    <img src={logo} className="logo" alt="logo"/>
                    <p>Dashboard</p>
                  </div>
                  <div className="navMobile"> 
                  <Link to="/app/notification">
                        <div className="bell"></div>
                    </Link>
                  </div>
            </header>


            <div className="timetable">

                <div className="note">
                    <p>Lr - Lecture room</p>
                    <p>Lt - Lecture theatre</p>
                    <p>Lh - Lecture hall</p>
                </div>

                <div className="tDetails">
                    <p>Name : Timetable for 200L</p>
                    <p>Academic Session : 2020/2021</p>
                </div>

                <div className="table-container">
                        <table className="table table2">
                        <thead className="table-head">
                            <tr className="row1">
                            <th></th>
                            <th>7:00-9:00</th>
                            <th>9:00-11:00</th>
                            <th>11:00-13:00</th>
                            <th>13:00-15:00</th>
                            <th>15:00-17:00</th>
                            <th>17:00-19:00</th>
                            </tr>
                        </thead>
                        <tbody className="gfg">
                            <tr className="default default2">
                            <td>Monday</td>
                            <td>CSC 101 <br/> LT 24</td>
                            <td></td>
                            <td></td>
                            <td>CSC 408 <br/> Hardware Lab</td>
                            <td></td>
                            <td>MAT 102 <br/> Big LT</td>
                            </tr>
                            <tr className="default default2">
                            <td>Tuesday</td>
                            <td></td>
                            <td>CSC 311 <br/> LR 4</td>
                            <td></td>
                            <td>CSC 412 <br/> Projects Lab</td>
                            <td></td>
                            <td>CSC 432 <br/> Graphics Lab</td>
                            </tr>
                            <tr className="default default2">
                            <td>Wednesday</td>
                            <td></td>
                            <td>CST 406 <br/> Cbas LT II</td>
                            <td></td>
                            <td>CST 408 <br/> LT 24</td>
                            <td></td>
                            <td>PHY 102 <br/> Big LT</td>
                            </tr>
                            <tr className="default default2">
                            <td>Thursday</td>
                            <td></td>
                            <td></td>
                            <td>CSC 432 <br/> Cbas LT II</td>
                            <td></td>
                            <td></td>
                            <td>CSC 201 <br/> Networks Lab</td>
                            </tr>
                            <tr className="default default2">
                            <td>Friday</td>
                            <td></td>
                            <td>CSC 206 <br/> LT 24</td>
                            <td></td>
                            <td>CSC 317 <br/> Robotics Lab</td>
                            <td></td>
                            <td></td>
                            </tr>
                            <tr className="default default2">
                            <td>Saturday</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>CSC 208 <br/> R & D Lab</td>
                            <td></td>
                            <td>CSC 401 <br/> LR 4</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                </div>
        </>
     );
 }

 export default timetable;