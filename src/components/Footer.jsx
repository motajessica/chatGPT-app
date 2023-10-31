import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <footer className="footer">
            <p>Discover the beauty of New Zealand's sea life.</p>
            <p> © {currentYear}</p>
        </footer>
    </div>
  )
}

export default Footer