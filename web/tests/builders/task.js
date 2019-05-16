import { build, incrementingId, fake, oneOf } from 'test-data-bot'

const taskBuilder = build('Task')
  .fields({
    id: incrementingId(),
    name: fake(f => f.lorem.word()),
    state: oneOf('added', 'planned', 'in-progress', 'blocked', 'complete')
  })
  .map(({ id, ...task }) => ({
    ...task,
    id: id.toString()
  }))

export default taskBuilder
