import React, { useState } from 'react'
import useGraphQL from '../hooks/graphql'

const LIMIT = 5

const ProjectsView = () => {
  const [pageNumber, setPageNumber] = useState(0)
  const [query] = useGraphQL({
    query: `query Projects($input: ProjectsInput) {
      projects(input: $input) {
        page {
          name
          id
        }
        hasNext
      }
    }`,
    variables: {
      input: {
        pageNumber,
        limit: LIMIT
      }
    }
  }, [pageNumber])

  if (query) {
    const projects = query.projects.page.map(p => <li key={p.id}>{p.name}</li>)

    return <div>
      <ul>
        {projects}
      </ul>
      <p className="mt-4">
        <button
          className="btn"
          disabled={pageNumber === 0}
          type="button"
          onClick={() => setPageNumber(pageNumber - 1)}
        >Previous Page</button>
        <span className="mx-2">{pageNumber + 1}</span>
        <button
          className="btn"
          disabled={!query.projects.hasNext}
          type="button"
          onClick={() => setPageNumber(pageNumber + 1)}
        >Next Page</button>
      </p>
    </div>
  } else {
    return null
  }
}

export default ProjectsView