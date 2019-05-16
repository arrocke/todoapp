import React, { useState, useEffect, useContext, useMemo, createContext } from 'react'
import client from '../client'

const ProjectContext = createContext()

const getProjects = async () => {
  const { data } = await client.query({
    query: `
      {
        projects {
          id
          name
        }
      } 
    `
  })
  return data.projects
}

const ProjectProvider = (props) => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    let cancelled = false
    const effect = async () => {
      const projects = await getProjects()
      if (!cancelled) {
        setProjects(projects)
      }
    }
    effect()
    return () => { cancelled = true }
  }, [])
  
  // Expose the list and setter.
  const value = useMemo(() => {
    return {
      projects,
      setProjects
    }
  }, [projects])
  return <ProjectContext.Provider value={value} {...props} />
}

const useProjects = () => {
  const context = useContext(ProjectContext)

  // Make sure we are within a ProjectProvider.
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider')
  }
  const {projects, setProjects} = context

  return {projects}
}

export {ProjectProvider, useProjects}
