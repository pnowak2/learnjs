import React from "react";

export const UserInput = (props) => {
    const style = {
        border: 'px solid #eee',
        padding: '0.5rem'
    }
    return (
        <input 
            style={style}
            className="UserInput" 
            value={props.username} 
            onChange={props.changeName}/>
    )
}