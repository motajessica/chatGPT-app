import React from 'react';

function Card({ image, isFlipped, onClick }) {
    const cardStyle = {
        width: '100px',
        height: '100px',
        background: isFlipped ? `url(${image})` : 'purple',
        cursor: 'pointer',
        backgroundSize: 'cover',
        margin: '50px'
    };

    return (
        <div style={cardStyle} onClick={onClick}>
        </div>
    );
}

export default Card;
