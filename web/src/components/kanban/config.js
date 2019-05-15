// Possible states for a task.
export const STATES = [
  'added',
  'planned',
  'in-progress',
  'blocked',
  'complete'
]

// Conversion from state to list title.
export const TITLE_MAP = {
  'added': 'ADDED',
  'planned': 'PLANNED',
  'in-progress': 'IN PROGRESS',
  'blocked': 'BLOCKED',
  'complete': 'COMPLETE'
}
