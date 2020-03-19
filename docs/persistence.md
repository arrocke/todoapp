# Persistence

## Model
* User
  * email - string
  * firstName - string
  * lastName - string
  * salt - string
  * hash - string
* Task
  * name - string
  * notes? - string
  * status - FK TaskStatus
  * focused - boolean
  * project? - FK Project
* TaskStatus
  * status - string
* Project
  * name - string
  * notes? - string
  * focused - boolean
* Session
  * user - FK User
  * focused - boolean
