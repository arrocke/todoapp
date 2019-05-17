import React from 'react'
import { render } from 'react-testing-library'
import TaskStateDropdown from '../../../src/components/TaskStateDropdown'


const renderDropdown = () => {
  return render(
    <TaskStateDropdown />
  )
}

it('works', () => {
  const { } = renderDropdown()
})