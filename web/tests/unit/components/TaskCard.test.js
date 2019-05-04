import React from 'react'
import { shallow } from 'enzyme'
import TaskCard from '../../../src/components/TaskCard'

describe('TaskCard', () => {
  let task

  beforeEach(() => {
    task = {
      name: 'Test Task',
      project: {
        name: 'Test Project'
      }
    }
  })

  it('renders empty task name with no props', () => {
    const root = shallow(
      <TaskCard />
    )
    const nameElement = root.find('[data-test="task-name"]')
    expect(nameElement.text()).toEqual('')
  })

  it('renders task name from prop', () => {
    const root = shallow(
      <TaskCard task={task}/>
    )
    const nameElement = root.find('[data-test="task-name"]')
    expect(nameElement.text()).toEqual(task.name)
  })

  it('renders project name from prop', () => {
    const root = shallow(
      <TaskCard task={task}/>
    )
    const projectElement = root.find('[data-test="task-project"]')
    expect(projectElement.text()).toEqual(task.project.name)
  })

  it('does not render project field if not set on task', () => {
    delete task.project
    const root = shallow(
      <TaskCard task={task}/>
    )
    const projectElement = root.find('[data-test="task-project"]')
    expect(projectElement.exists()).toBe(false)
  })

  it('does not render project field if flag is set', () => {
    const root = shallow(
      <TaskCard task={task} hideProject={true}/>
    )
    const projectElement = root.find('[data-test="task-project"]')
    expect(projectElement.exists()).toBe(false)
  })

  it('passes className prop to root element', () => {
    const root = shallow(
      <TaskCard task={task} className="mt-2"/>
    )
    expect(root.hasClass('mt-2')).toBe(true)
  })
})