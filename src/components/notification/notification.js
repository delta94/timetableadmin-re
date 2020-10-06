import React from "react";
import "./notification.css"
import "../../global/global.css";
import logo from "../../images/Logo.png";
import search from "../../images/search.png";
import io from "socket.io-client"


const Notif = () =>{

    // const [notif, setNotif] = useState([])

    const socket = io("https://tbe-node-deploy.herokuapp.com");

     // request permission to display notifications, if we don't alreay have it
     Notification.requestPermission();

    socket.on('connect', () => {
        console.log(socket.connected); // true
    });

   socket.on('newUser', data => {
       console.log(data)
    });
    
    
    // const persist = () => {
    //     var obj = {hello: "hi", sup: "yeah"}
    //     setNotif([...notif, obj.hello])
    //     console.log(notif)
    // }
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
                            <img src={search} className="search" alt="search"/>
                            <input placeholder="Search for messages"/>
                        </div>

                        {/* <button onClick={persist}>Persist state</button>
                        {notif.map((key,i)=> {
                            return (
                                <table className="table" key={i}>
                                    <tbody className="gfg" >
                                        <tr className="default tr-no-bottom">
                                            <td className="notif-tr">{key}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            );
                        })} */}
                </div>
            </div>
        </>
    );
}

export default Notif;