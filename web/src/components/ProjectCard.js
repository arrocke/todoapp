import React from 'react'
import Card from './Card'
import { Link } from 'react-router-dom'

const ProjectCard = ({
  data: { id, name } = {},
  className
}) =>
  <Card className={className}>
    <Link
      to={`/projects/${id}`}
      className="text-black no-underline block"
    >{name}</Link>
  </Card> 

export default ProjectCard
