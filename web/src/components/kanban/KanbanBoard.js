import React, { useState } from 'react'
import useMediaQuery from '../../hooks/media-query'
import KanbanList from './KanbanList'
import NewTaskModal from './NewTaskModal'
import {STATES,TITLE_MAP} from './config'

/**
 * Displays tasks in lists by their state. Tasks can be dragged between lists.
 * @param {Boolean} props.hideProject Flag to hide the project name label for the task.
 */
const KanbanBoard = ({
  hideProject = false,
  className = ''
} = {}) => {
  const [showTaskModal, setTaskModalVisibility] = useState(false)
  const [visibleState, setVisibleState] = useState('in-progress')
  const [screen] = useMediaQuery()

  const addButton = <button
    className="fixed pin-r pin-b m-4 mb-14 lg:mb-4 rounded-full shadow bg-white w-12 h-12"
    type="button" 
    data-test="task-modal-button"
    onClick={() => setTaskModalVisibility(true)}
  />

  const newTaskModal = <NewTaskModal show={showTaskModal} />

  // Render all of the lists on larger screens.
  if (screen.lg) {
    // Generate a list for each task state.
    const lists = STATES.map(state =>
      <KanbanList
        key={state}
        state={state}
        hideProject={hideProject}
      />)

    return <div
      className={`flex-1 flex px-2 py-4 ${className}`}
      data-test="kanban-board"
    >
      {addButton}
      {lists}
      {newTaskModal}
    </div>
  }

  // On smaller screens render a single list with buttons to select other lists to display. 
  else {
    // Generate a button for each task state.
    const buttons = STATES.map(state =>
      <button
        key={state} state={state}
        className={`px-1 sm:px-2 py-3 text-2xs sm:text-xs md:text-sm font-bold ${ state === visibleState ? 'bg-grey-light' : ''} ${className}`}
        type="button"
        onClick={() => setVisibleState(state)}
      >
        {TITLE_MAP[state]}
      </button>)

    return <div
      className={`flex-1 flex flex-col max-h-full ${className}`}
      data-test="kanban-board"
    >
      {addButton}
      <div className="flex-1 flex justify-center px-2 py-4">
        <KanbanList
          className="w-full max-w-sm"
          state={visibleState}
          hideProject={hideProject}
        />
      </div>
      <nav
        className="flex justify-center border-t-2 border-black"
        data-test="kanban-navigation"
      >{buttons}</nav>
      {newTaskModal}
    </div>
  }
}

export default KanbanBoard