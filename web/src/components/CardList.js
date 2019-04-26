import React from 'react'

const CardList = ({ list, Card, selectKey, className }) => {
  const render = (el) =>
    <li key={selectKey(el)} className="mb-2">
      <Card data={el}/>
    </li>

  return <ul className={`list-reset ${className}`}>
    {list.map(render)}
  </ul>
}

export default CardList