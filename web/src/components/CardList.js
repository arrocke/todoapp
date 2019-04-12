import React from 'react'
import Card from './Card'

const CardList = ({ list, renderCard, selectKey }) => {
  const render = (el) =>
    <li key={selectKey(el)} className="my-3">
      <Card>
        {renderCard(el)}
      </Card>
    </li>

  return <ul className="list-reset m-3">
    {list.map(render)}
  </ul>
}

export default CardList