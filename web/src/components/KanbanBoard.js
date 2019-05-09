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
    <li className={`my-2 p-2 rounded bg-white shadow ${className}`}>
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
      className={`w-full pb-4 m-2 rounded-lg shadow-inner bg-grey-light ${className}`}
      data-test="kanban-list"
    >
      <h2
        className="p-4 pb-1 text-base"
        data-test="kanban-list-title"
      >{title}</h2>
        <ul className="px-2 m-0 list-reset">
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
    className={`flex items-start p-2 ${className}`}
    data-test="kanban-board"
  >
    <KanbanList title="ADDED" state="added" />
    <KanbanList title="PLANNED" state="planned" />
    <KanbanList title="IN PROGRESS" state="in-progress" />
    <KanbanList title="BLOCKED" state="blocked" />
    <KanbanList title="COMPLETE" state="complete" />
  </div>
}

export default KanbanBoard