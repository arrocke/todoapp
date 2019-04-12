import React from 'react'

const Card = ({ children }) => {
  return <div className="bg-grey-lighter rounded-lg p-3 shadow-md">
    {children}
  </div>
}

export default Card