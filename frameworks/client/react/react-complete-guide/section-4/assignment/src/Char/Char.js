import React from 'react';

const char = (props) => {
    const style = {
        display: 'inline-block',
        padding: '1rem',
        margin: '1rem',
        border: '1px solid black',
        textAlign: 'center'
    };
    return (
        <div
            onClick={props.clicked} 
            style={style}>
        { props.character }
        </div>
    )
}

export default char;