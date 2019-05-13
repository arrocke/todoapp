import React, { useState, useCallback } from 'react'
import useMediaQuery from '../hooks/media-query'
import KanbanList, { TITLE_MAP } from './KanbanList'

const KanbanBoard = ({
  tasks = [],
  hideProject = false,
  className = '',
  onTasksChange = () => {}
} = {}) => {
  const [visibleState, setVisibleState] = useState('in-progress')
  const [screen] = useMediaQuery()

  const ListButton = useCallback(({
    state,
    className = ''
  }) => {
    return <button
      className={`px-1 sm:px-2 py-3 text-2xs sm:text-xs md:text-sm font-bold ${ state === visibleState ? 'bg-grey-light' : ''} ${className}`}
      type="button"
      onClick={() => setVisibleState(state)}
    >
      {TITLE_MAP[state]}
    </button>
  }, [visibleState])

  // Render more lists on larger screens.
  if (screen.lg) {
    // Generate a list for each task state.
    const lists = Object
      .getOwnPropertyNames(TITLE_MAP)
      .map(state => <KanbanList
        key={state}
        tasks={tasks}
        state={state}
        hideProject={hideProject}
        onTasksChange={onTasksChange}
      />)

    return <div
      className={`flex-1 flex px-2 py-4 ${className}`}
      data-test="kanban-board"
    >{lists}</div>
  }
  // On smaller screens render a single list with buttons to select other lists to display. 
  else {
    // Generate a button for each task state.
    const buttons = Object
      .getOwnPropertyNames(TITLE_MAP)
      .map(state => <ListButton key={state} state={state} />)

    return <div
      className={`flex-1 flex flex-col max-h-full ${className}`}
      data-test="kanban-board"
    >
      <div className="flex-1 flex justify-center px-2 py-4">
        <KanbanList
          className="w-full max-w-sm"
          tasks={tasks}
          state={visibleState}
          hideProject={hideProject}
        />
      </div>
      <nav className="flex justify-center border-t-2 border-black">{buttons}</nav>
    </div>
  }
}

export default KanbanBoard