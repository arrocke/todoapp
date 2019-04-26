import React from 'react'
import Card from './Card'
import { Link } from 'react-router-dom'

const ProjectCard = ({
  data: { id, name, taskCount = 0 } = {},
  className
}) =>
  <Card className={className}>
    <Link
      to={`/projects/${id}`}
      className="text-black no-underline block flex items-end leading-none"
    >
      <span>{name}</span>
      <span className="flex-grow"/>
      <span className="text-xs font-bold mb-px">{taskCount} tasks</span>
    </Link>
  </Card> 

export default ProjectCard
