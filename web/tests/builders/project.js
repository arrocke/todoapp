import { build, incrementingId, fake } from 'test-data-bot'

const projectBuilder = build('Project')
  .fields({
    id: incrementingId(),
    name: fake(f => f.random.word())
  })
  .map(({ id, name, ...project }) => ({
    ...project,
    name: `Project ${name}`,
    id: id.toString()
  }))

export default projectBuilder
