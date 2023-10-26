import React from 'react';

function Card({ image, isFlipped, onClick }) {
    const cardStyle = {
        width: '150px',
        height: '150px',
        background: isFlipped ? `url(${image})` : 'purple',
        cursor: 'pointer',
        backgroundSize: 'cover',
        margin: '40px'
    };

    return (
        <div style={cardStyle} onClick={onClick}>
        </div>
    );
}

export default Card;
