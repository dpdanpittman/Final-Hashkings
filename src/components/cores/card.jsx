import React, { Component } from 'react';

function Card(props) {
    return (
        <div id={props.id || null} className={ "card " + props.class } style={ props.style || {} }>
            { props.children }
        </div>
    )
}

export default Card;