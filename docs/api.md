API Calls
=========

public (no authentication required) (currenlty in loginRoutes.js)
------

### POST
#### /register
Registers a new user (more detail needed)
#### /login
Login an existing user (more detail needed)
#### /forgot
Sends email to reset password to an existing user (more detail needed)
#### /reset/:token
Updates an existing user's password (more detail needed and may need to be a PUT)

### PUT

### GET ONE
#### /reset/:token
Displays reset password html page.

### GET ALL
#### /
Returns message saying 'API works!'

### DELETE

private (authentication required) (currently in userRoutes.js)
------

### POST

### PUT

### GET ONE

### GET ALL
#### /authenticated
Returns message saying 'YOU ARE AUTHENTICATED!'

### DELETE

user (Entity)
------

### POST

### PUT
#### /users/:userid
Updates user name? (incomplete and more detail needed)

### GET ONE
#### /users/:userid
Returns current user (more detail needed)

### GET ALL

### DELETE

property (Entity)
------

### POST
#### /users/:userid/properties
Creates new property from an existing user. (more details needed)

### PUT
#### /users/:userid/properties/:propertyid
Updates an individual property from an existing user. (incomplete, more details needed)

### GET ONE
#### /users/:userid/properties/:propertyid
Get an individual property from an existing user. (more details needed)

### GET ALL
#### /users/:userid/properties
Get all properties from an existing user. (more details needed)

### DELETE
#### /users/:userid/properties/:propertyid
Deletes an individual property from an existing user. (More details needed)

zip (Entity)
------

### POST

### PUT

### GET ONE

### GET ALL

### DELETE

expense (Entity)
------

### POST

### PUT

### GET ONE

### GET ALL

### DELETE

lease (Entity)
------

### POST

### PUT

### GET ONE

### GET ALL

### DELETE

payment (Entity)
------

### POST

### PUT

### GET ONE

### GET ALL

### DELETE

tenant (Entity)
------

### POST

### PUT

### GET ONE

### GET ALL

### DELETE

