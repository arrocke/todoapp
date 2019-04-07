import React from 'react'
import useGraphQL from '../hooks/graphql'

const ProjectsView = () => {
  const [query, error] = useGraphQL({
    query: `{
      result: projects {
        projects {
          name
          id
        }
      }
    }`
  })

  return <div>
    {query ? JSON.stringify(query.result.projects) : 'no projects'}
  </div>
}

export default ProjectsView