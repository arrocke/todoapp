import React, { useState } from 'react'
import { render, fireEvent } from 'react-testing-library'
import {TaskProvider} from '../../../src/contexts/task'
import AddTaskModal from '../../../src/components/kanban/NewTaskModal'
import client from '../../../src/client'

jest.mock('../../../src/client', () => ({
  query: jest.fn().mockResolvedValue({}),
  mutate: jest.fn().mockResolvedValue({})
}))

afterEach((() => {
  client.query.mockReset()
  client.mutate.mockReset()
}))

// Wraps the modal in the necessary TaskProvider
// and adds a button to show the modal.
const Test = ({ show: initialShow }) => {
  const [show, setShow] = useState(initialShow)

  return <TaskProvider load={() => Promise.resolve([])}>
    <AddTaskModal show={show} onClose={() => setShow(false)} />
    <button data-test="show-modal" onClick={() => setShow(true)} />
  </TaskProvider>
}

const renderModal = (props) => {
  const utils = render(<Test {...props} />)

  // Add utility method to show the modal.
  const showModal = () => {
    fireEvent.click(utils.getByTestId('show-modal'))
  }

  return {
    ...utils,
    showModal
  }
}

it('name input receives focus when modal is shown.', () => {
  const { showModal, getByTestId } = renderModal()
  showModal()

  // Name input should have focus.
  const nameInput = getByTestId('task-name-input')
  expect(nameInput).toHaveFocus()
})

it('cancel button cancels adding the task and closes the modal.', () => {
  const { showModal, getByText, getByTestId, queryByTestId } = renderModal({ show: true })

  // Add some text to the name input.
  let nameInput = getByTestId('task-name-input')
  fireEvent.change(nameInput, { target: { value: 'some text' } })

  // Cancel the task create.
  const cancelButton = getByText(/cancel/i)
  fireEvent.click(cancelButton)

  // Task modal should be hidden.
  expect(queryByTestId('task-modal')).toBeNull()

  // No network request should be made.
  expect(client.mutate).not.toHaveBeenCalled()

  showModal()

  // Name input should be empty
  nameInput = getByTestId('task-name-input')
  expect(nameInput).toHaveAttribute('value', '')
})

it('escape key cancels adding the task and closes the modal.', () => {
  const { showModal, getByTestId, queryByTestId } = renderModal({ show: true })

  // Add some text to the name input.
  let nameInput = getByTestId('task-name-input')
  fireEvent.change(nameInput, { target: { value: 'some text' } })

  // Cancel the task create.
  fireEvent.keyDown(nameInput, { key: 'Escape', code: 'Escape' })

  // Task modal should be hidden.
  expect(queryByTestId('task-modal')).toBeNull()

  // No network request should be made.
  expect(client.mutate).not.toHaveBeenCalled()

  showModal()

  // Name input should be empty
  nameInput = getByTestId('task-name-input')
  expect(nameInput).toHaveAttribute('value', '')
})

it('add button creates the task and closes the modal.', () => {
  const { showModal, getByText, getByTestId, queryByTestId } = renderModal({ show: true })

  // Add some text to the name input.
  let nameInput = getByTestId('task-name-input')
  fireEvent.change(nameInput, { target: { value: 'new task' } })

  // Create the task.
  const addButton = getByText(/add/i)
  fireEvent.click(addButton)

  // Task modal should be hidden.
  expect(queryByTestId('task-modal')).toBeNull()

  // Network request should be made.
  expect(client.mutate).toHaveBeenCalledTimes(1)

  showModal()

  // Name input should be empty
  nameInput = getByTestId('task-name-input')
  expect(nameInput).toHaveAttribute('value', '')
})

it('enter key creates the task and closes the modal.', () => {
  const { showModal, getByTestId, queryByTestId } = renderModal({ show: true })

  // Add some text to the name input.
  let nameInput = getByTestId('task-name-input')
  fireEvent.change(nameInput, { target: { value: 'new task' } })

  // Create the task. (Enter key submits the form by default.)
  const modal = getByTestId('task-modal')
  fireEvent.submit(modal)

  // Task modal should be hidden.
  expect(queryByTestId('task-modal')).toBeNull()

  // Network request should be made.
  expect(client.mutate).toHaveBeenCalledTimes(1)

  showModal()

  // Name input should be empty
  nameInput = getByTestId('task-name-input')
  expect(nameInput).toHaveAttribute('value', '')
})
