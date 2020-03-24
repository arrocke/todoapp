# Domain

## Users
### Entities/Value Objects
* User (AggregateRoot)
  * email - UserEmail
  * firstName - string
  * lastName - string
* UserEmail (ValueObject)
  * value - string
  * validates with email regex

### Use Cases
* Get User
* Register User
* Update User
* Log In
* Log Out
* Change Password


##  Tasks
### Entities
* Task (AggregateRoot)
  * name - string
  * notes? - string
  * status - TaskStatus
  * focused - boolean
* TaskStatus (ValueObject)
  * value - string
  * validates as one of 'backlog', 'todo', 'progress', or 'complete'

### Use Cases
* Get Tasks
* Get Task
* Create Task
* Update Task
* Move Task
* Focus Task
* Unfocus Task
* Archive Task


## Projects
### Entities
* Project (AggregateRoot)
  * name - string
  * notes? - string
  * focused - boolean
* ProjectTask (Entity)

### Use Cases
* Get Projects
* Get Project
* Get Project Tasks
* Create Project
* Update Project
* Focus Project
* Unfocus Project
* Archive Project
* Add Task To Project
* Remove Task From Project
  

## Focus
### Entities
* FocusState (Aggregate Root)
  * focused - boolean

### Use Cases
* Get Focus State
* Focus
* Unfocus
