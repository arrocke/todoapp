import { build, incrementingId, fake, oneOf, perBuild } from 'test-data-bot'

const taskBuilder = build('Task')
  .fields({
    id: incrementingId(),
    name: fake(f => f.random.word()),
    state: oneOf('added', 'planned', 'in-progress', 'blocked', 'complete'),
    project:{
      name: fake(f => f.random.word())
    }
  })
  .map(({ id, ...task }) => ({
    ...task,
    id: id.toString()
  }))

export default taskBuilder
