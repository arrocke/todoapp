import React from 'react'
import { render } from 'react-testing-library'
import TaskCard from '../../../src/components/TaskCard'

test('displays the task name', () => {
  const name = 'New Task'
  const { getByTestId } = render(<TaskCard name={name} />)

  expect(getByTestId('task-name')).toHaveTextContent(name)
})

test('hides the project label if no project is given', () => {
  const { queryByTestId } = render(<TaskCard name="New Task" />)

  expect(queryByTestId('task-project')).toBeNull()
})

test('displays the project label when a project is given', () => {
  const name = 'New Task'
  const project = 'Task Project'

  const { getByTestId } = render(<TaskCard name={name} project={project} />)

  expect(getByTestId('task-project')).toHaveTextContent(project)
})