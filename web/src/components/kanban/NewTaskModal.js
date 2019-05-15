import React, { useState } from 'react'
import {useTasks} from '../../contexts/task'

const NewTaskModal = ({ show = false }) => {
  const [name, setName] = useState('')
  const {create} = useTasks()

  return show
    ? <div className="fixed pin-b lg:pin w-screen flex lg:items-center justify-center mb-14 lg:mb-3">
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
          >
            Cancel
          </button>
          <button
            type="button"
            className="ml-2 bg-grey-light p-2 rounded"
            data-test="add-task-button" 
            onClick={() => create({ name, state: 'added' })}
          >
            Add
          </button>
        </div>
      </div>
    </div>
    : null
}

export default NewTaskModal
