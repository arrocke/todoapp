import client from '../../client'

export const TITLE_MAP = {
  'added': 'ADDED',
  'planned': 'PLANNED',
  'in-progress': 'IN PROGRESS',
  'blocked': 'BLOCKED',
  'complete': 'COMPLETE'
}

export const updateTask = async ({ id, name, state }) => {
  const { data } = await client.mutate({
    mutation: `
      mutation Update($input: UpdateTaskInput!) {
        updateTask(input: $input) {
          state
        }
      }
    `,
    variables: { input: { id, name, state } }
  })
  return data
}