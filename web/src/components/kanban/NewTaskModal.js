import React, { useState, useEffect, useCallback, useRef } from 'react'
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
  const nameInput = useRef(null)

  // Focus on the name input when modal becomes visible.
  useEffect(() => {
    if (show) {
      nameInput.current.focus()
    }
  }, [show, nameInput])

  // Event handler that creates a new task,
  // and clears and closes the modal.
  const onAdd = useCallback(e => {
    e.preventDefault()
    create({ name, state: 'added' })
    setName('')
    onClose()
  }, [name])

  // Event handler for canceling adding a task.
  const onCancel = useCallback(() => {
    setName('')
    onClose()
  }, [setName, onClose])

  // Event handler to cancel adding a task when Escape is pressed.
  const onKeydown = useCallback(e => {
    if (e.key === 'Escape') {
      onCancel()
    }
  }, [onCancel])

  return show
    ? <div
        className="fixed pin-b lg:pin w-screen flex lg:items-center justify-center mb-14 lg:mb-3"
      >
        <form
          className="bg-white shadow p-3 rounded-lg max-w-screen"
          onSubmit={onAdd}
          onKeyDown={onKeydown}
          data-test="task-modal"
        >
          <input
            ref={nameInput}
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
              onClick={onCancel}
            >Cancel</button>
            <button
              type="submit"
              className="ml-2 bg-grey-light p-2 rounded"
              data-test="add-task-button" 
            >Add</button>
          </div>
        </form>
      </div>
    : null
}

export default NewTaskModal
