import React,{useState} from "react";
import "./notification.css"
import "../../global/global.css";
import logo from "../../images/Logo.png";
import search from "../../images/search.png";
import Pusher from "pusher-js"
import axios from "axios"


const Notif = () =>{

    const [notif, setNotif] = useState([])
    
    var pusher = new Pusher('593804b4319c7294a225', { cluster: 'eu' });

    // retrieve the socket ID once we're connected
    pusher.connection.bind('connected', function () {
        // attach the socket ID to all outgoing Axios requests
        axios.defaults.headers.common['X-Socket-Id'] = pusher.connection.socket_id;
    });

    // request permission to display notifications, if we don't alreay have it
    Notification.requestPermission();
    pusher.subscribe('notifications')
            .bind('newUser', function (user) {
                // if we're on the home page, show an "Updated" badge
                // if (window.location.pathname === "/") {
                //     document.querySelector('a[href="/posts/' + post._id + '"]').append('<span class="badge badge-primary badge-pill">Updated</span>');
                // }
                var notification = new Notification(user.firstname + " was just updated" + user.createdAt);

                console.log(notification)

                setNotif([...notif, notification.title])

                console.log(notif)
                // notification.onclick = function (event) {
                //     window.location.href = '/users/' + user._id;
                //     event.preventDefault();
                //     notification.close();
                // }
    });

    const persist = () => {
        var obj = {hello: "hi", sup: "yeah"}
        setNotif([...notif, obj.hello])
        console.log(notif)
    }
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

                        {/* <button onClick={persist}>Persist state</button> */}
                        {notif.map((key,i)=> {
                            return (
                                <table className="table">
                                    <tbody className="gfg">
                                        <tr className="default tr-no-bottom" key={key}>
                                            <td className="notif-tr">{key}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            );
                        })}

                        {/* <div className="table-container">
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
                        </div> */}
                </div>
            </div>
        </>
    );
}

export default Notif;