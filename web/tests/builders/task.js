import { build, incrementingId, fake, oneOf } from 'test-data-bot'

const taskBuilder = build('Task')
  .fields({
    id: incrementingId(),
    name: fake(f => f.lorem.word()),
    state: oneOf('added', 'planned', 'in-progress', 'blocked', 'complete')
  })
  .map(task => ({
    ...task,
    id: task.id.toString()
  }))

export default taskBuilder
