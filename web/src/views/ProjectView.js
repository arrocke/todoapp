import React, { useState, useEffect } from 'react'
import projectService from '../services/project'

const ProjectView = ({ match }) => {
  const { id } = match.params
  const [project, setProject] = useState({})

  useEffect(() => {
    const effect = async () => {
      setProject(await projectService.getOne(id))
    }
    effect()
  }, [id])

  return <div>
    <h2>{project.name}</h2>
  </div>
}

export default ProjectView