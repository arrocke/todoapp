import React from 'react'

const KanbanBoard = ({
  tasks = [],
  hideProject = false,
  className = ''
} = {}) => {
  const TaskCard = ({
    task: { name, project } = {},
    className = ''
  } = {}) =>
    <li className={className}>
      <span data-test="task-name">{name}</span>
      {
        !hideProject && project
          ? <span data-test="task-project">{project.name}</span>
          : null
      }
    </li>

  const KanbanList = ({
    title = '',
    state: testState,
    className = ''
  }) =>
    <div 
      className={className}
      data-test="kanban-list"
    >
      <h1 data-test="kanban-list-title">{title}</h1>
        <ul >
          {
            tasks
              .filter(({ state }) => state === testState)
              .map(
                task => <TaskCard
                  key={task.id}
                  task={task}
                />
              )
          } 
        </ul>
    </div>

  return <div
    className={className}
    data-test="kanban-board"
  >
    <KanbanList title="Added" state="added" />
    <KanbanList title="Planned" state="planned" />
    <KanbanList title="In Progress" state="in-progress" />
    <KanbanList title="Blocked" state="blocked" />
    <KanbanList title="Complete" state="complete" />
  </div>
}

export default KanbanBoard