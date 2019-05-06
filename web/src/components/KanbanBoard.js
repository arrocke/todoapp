import React from 'react'
import TaskList from './TaskList'

export default ({
  tasks = [],
  hideProject = false,
  className = ''
} = {}) => {
  const renderList = ({
    title = '',
    state: testState
  }) =>
    <div data-test="kanban-list" key={testState}>
      <h1 data-test="kanban-list-title">{title}</h1>
      <TaskList
        tasks={tasks.filter(({ state }) => state === testState)}
        hideProject={hideProject}
      />
    </div>

  return <div
    className={className}
    data-test="kanban-board"
  >
    {renderList({
      title: 'Added',
      state: 'added'
    })}
    {renderList({
      title: 'Planned',
      state: 'planned'
    })}
    {renderList({
      title: 'In Progress',
      state: 'in-progress'
    })}
    {renderList({
      title: 'Blocked',
      state: 'blocked'
    })}
    {renderList({
      title: 'Complete',
      state: 'complete'
    })}
  </div>
}