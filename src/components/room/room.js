import React from "react"
import "./room.css"
import plus from "../../images/plus.svg"


const Room = () => {
    return (
        <>
            <div className="room">
                <div className="search-container">
                    <input placeholder="Enter keyword to search"/>
                    <button><img src={plus} alt="plus"/>Add new room</button>
                </div>
            </div>
        </>
    );
}

export default Room;