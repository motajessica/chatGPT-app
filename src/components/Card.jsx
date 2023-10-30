import React from 'react';

function Card({ image, isFlipped, onClick }) {
    const cardStyle = {
        width: '200px',
        height: '150px',
        background: isFlipped ? `url(${image})` : 'purple',
        cursor: 'pointer' ,
        margin: '40px',
    };
    
    return (
        <div style={cardStyle} onClick={onClick}>
            {isFlipped && <img src={image} alt="Memory card" style={{width: '100%', height: '100%', objectFit: 'cover'}} />}
        </div>
    );
    
}

export default Card;
