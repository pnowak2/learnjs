import React from "react";
import './UserOutput.css';

export const UserOutput = (props) => {
    return (
        <p className="UserOutput">User Name: {props.username}</p>
    )
}