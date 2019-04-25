import React from 'react'
import Card from './Card'

const CardList = ({ list, renderCard, selectKey, className }) => {
  const render = (el) =>
    <li key={selectKey(el)} className="mb-2">
      <Card>
        {renderCard(el)}
      </Card>
    </li>

  return <ul className={`list-reset ${className}`}>
    {list.map(render)}
  </ul>
}

export default CardList