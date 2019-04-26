import React from 'react'

const Card = ({ children, className }) => {
  return <div className={`bg-white p-3 ${className}`}>
    {children}
  </div>
}

export default Card