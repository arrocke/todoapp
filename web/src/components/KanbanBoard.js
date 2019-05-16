import React, { useState } from 'react'
import useMediaQuery from '../hooks/media-query'
import KanbanList from './KanbanList'
import NewTaskModal from './NewTaskModal'
import {STATES,TITLE_MAP} from '../config'

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

  const lgLists =
    STATES.map(state =>
      <KanbanList
        key={state}
        state={state}
        hideProject={hideProject}
      />)

  const smList =
    <div className="flex-1 flex justify-center px-2 py-4">
      <KanbanList
        className="w-full max-w-sm"
        state={visibleState}
        hideProject={hideProject}
      />
    </div>

  const navButtons = 
    STATES.map(state =>
      <button
        key={state} state={state}
        className={`px-1 sm:px-2 py-3 text-2xs sm:text-xs md:text-sm font-bold ${ state === visibleState ? 'bg-grey-light' : ''} ${className}`}
        type="button"
        onClick={() => setVisibleState(state)}
      >{TITLE_MAP[state]}</button>)

  const navigation =
    <nav
        className="flex justify-center border-t-2 border-black"
        data-test="kanban-navigation"
      >{navButtons}</nav>

  return <div
    className={`flex-1 flex flex-col lg:flex-row max-h-full lg:px-2 lg:py-4 ${className}`}
    data-test="kanban-board"
  >
    <button
      className="fixed pin-r pin-b w-12 h-12 m-4 mb-14 lg:mb-4 rounded-full shadow bg-white"
      type="button" 
      data-test="task-modal-button"
      onClick={() => setTaskModalVisibility(true)}
    >
      <div className="icon icon-add w-8 h-8 m-2 block"/>
    </button>
    {screen.lg ? lgLists : smList}
    {screen.lg ? null : navigation}
    <NewTaskModal
      show={showTaskModal}
      onClose={() => setTaskModalVisibility(false)}
    />
  </div>
}

export default KanbanBoard