import React from 'react'
import Card from './Card'

const TaskCard = ({
  data: { name, project } = {},
  className
}) =>
  <Card className={`flex items-end leading-none ${className}`}>
    <span>{name}</span>
    <span className="flex-grow"/>
    <span className="text-xs font-bold mb-px">{project ? project.name : '' }</span>
  </Card> 

export default TaskCard
