import React, { useState, useCallback } from 'react'
import {useTasks} from '../../contexts/task'

/**
 * A modal dialog to add a new task.
 * @param {Boolean} props.show Flag for the visibility of the modal.
 * @param {Function} props.onClose Function to run when the modal should close.
 */
const NewTaskModal = ({
  show = false,
  onClose = () => {}
}) => {
  const [name, setName] = useState('')
  const {create} = useTasks()

  // Event handler that creates a new task,
  // and clears and closes the modal.
  const onAdd = useCallback(() => {
    create({ name, state: 'added' })
    setName('')
    onClose()
  }, [name])

  return show
    ? <div
        className="fixed pin-b lg:pin w-screen flex lg:items-center justify-center mb-14 lg:mb-3"
        data-test="task-modal"
      >
        <div className="bg-white shadow p-3 rounded-lg max-w-screen">
          <input
            type="text"
            className="rounded rounded-none bg-grey-light shadow-inner h-8 p-2 w-96"
            data-test="task-name-input"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <div className="flex justify-end mt-4">
            <button
              type="button"
              data-test="cancel-task-button" 
              onClick={() => onClose()}
            >Cancel</button>
            <button
              type="button"
              className="ml-2 bg-grey-light p-2 rounded"
              data-test="add-task-button" 
              onClick={onAdd}
            >Add</button>
          </div>
        </div>
      </div>
    : null
}

export default NewTaskModal
