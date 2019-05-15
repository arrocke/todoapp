import React, { useState, useCallback } from 'react'
import {STATES, TITLE_MAP} from './config'
import {useTasks} from '../../contexts/task'

/**
 * Displays a task as a card. Includes UI to change the state of the task.
 * @param {Object} props.task The task to display.
 * @param {Boolean} props.hideProject Flag to hide the project name label for the task.
 */
const TaskCard = ({
  task,
  hideProject = false,
  className = ''
} = {}) => {
  const {update} = useTasks()
  const [menuOpen, setMenuState] = useState(false)

  // Event handler to update the state of a task.
  const onMenuClick = useCallback(state => {
    update({ ...task, state })
  }, [task])

  // Event handler to begin dragging a task to another state list.
  const onDragStart = useCallback(e => {
    e.dataTransfer.setData('task', task)
    e.dataTransfer.dropEffect = 'move'
  }, [task])

  // The list of buttons to change the task state.
  // This does not include a button for the current task state.
  const stateButtons = STATES
    .filter(state => state !== task.state)
    .map(state =>
      <button
        key={state}
        type="button"
        className="block py-2 font-bold text-sm text-right"
        onClick={() => onMenuClick(state)}
      >{TITLE_MAP[state]}</button>)

  // The label for the tasks's project.
  // Only rendered if projects are not hidden and the task has a project.
  const projectLabel = 
    !hideProject && task.project
      ? <span data-test="task-project">{task.project.name}</span>
      : null

  return <li
    className={`my-2 p-2 rounded bg-white shadow cursor-pointer relative ${className}`}
    draggable="true"
    onDragStart={onDragStart}
    data-test="task-card"
  >
    <span data-test="task-name">{task.name}</span>
    {projectLabel}
    <button
      type="button"
      className="float-right"
      onClick={() => setMenuState(isOpen => !isOpen)}
    >Move</button>
    <div className={`absolute flex-col items-stretch pin-r mt-2 mr-2 px-3 py-1 bg-white z-10 shadow rounded-b ${menuOpen ? 'flex' : 'hidden'}`}>
      {stateButtons}
    </div>
  </li>
}

export default TaskCard
