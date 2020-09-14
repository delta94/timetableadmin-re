import React from "react"
import {Link} from "react-router-dom"
import "./timetable.css"
import bell from "../../images/alarm-bell@3x.png"
import logo from "../../images/Logo.png"


 const timetable = (props) => {
     return (
        <>
            <header>
                  <div>
                    <img src={logo} className="logo" alt="logo"/>
                    <p>Timetable</p>
                  </div>
                  <div className="navMobile"> 
                    <Link to="/app/notification">
                            <img src={bell} alt="bell"/>
                    </Link>
                  </div>
            </header>


            <div className="student">

                <div className="table-container">
                        <table className="table table2">
                        <thead className="table-head">
                            <tr className="row1">
                            <th></th>
                            <th>8:00-10:00</th>
                            <th>10:00-12:00</th>
                            <th>12:00-2:00</th>
                            <th>2:00-4:00</th>
                            <th>4:00-6:00</th>
                            <th>6:00-8:00</th>
                            </tr>
                        </thead>
                        <tbody className="gfg">
                            <tr className="default default2">
                            <td>Monday</td>
                            <td>CST 104 <br/> Lr4</td>
                            <td></td>
                            <td></td>
                            <td>CST 105 <br/> Lr5</td>
                            <td></td>
                            <td>CST 109 <br/> Lr4</td>
                            </tr>
                            <tr className="default default2">
                            <td>Tuesday</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            </tr>
                            <tr className="default default2">
                            <td>Wednesday</td>
                            <td></td>
                            <td>CST 104 <br/> Lr4</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            </tr>
                            <tr className="default default2">
                            <td>Thursday</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            </tr>
                            <tr className="default default2">
                            <td>Friday</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>CST 104 <br/> Lr4</td>
                            <td></td>
                            <td></td>
                            </tr>
                            <tr className="default default2">
                            <td>Saturday</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>CST 104 <br/> Lr4</td>
                            <td></td>
                            <td></td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                </div>
        </>
     );
 }

 export default timetable;