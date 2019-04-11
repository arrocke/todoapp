import React, { useState, useEffect } from 'react'
import taskService from '../services/task'

const TasksView = () => {
  const [pageNumber, setPageNumber] = useState(0)
  const [{ page, hasNext }, setPage] = useState({ page: [], hasNext: false })
  const [name, setName] = useState('')

  useEffect(() => {
    const effect = async () => {
      setPage(await taskService.getPage(pageNumber))
    }
    effect()
  }, [pageNumber])

  const createTask = async () => {
    await taskService.create({ name })
    setPage(await taskService.getPage(pageNumber))
  }

  return <div>
    <input
      type="text"
      onInput={e => setName(e.target.value)}
    />
    <button
      className="btn ml-2"
      onClick={createTask}
    >Add</button>
    <ul>
      {page.map(p => <li key={p.id}>{p.name}</li>)}
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
        disabled={!hasNext}
        type="button"
        onClick={() => setPageNumber(pageNumber + 1)}
      >Next Page</button>
    </p>
  </div>
}

export default TasksView
