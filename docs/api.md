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

User (Entity)
-------------

### POST

### PUT
#### /users/:userid
Updates user name? (incomplete and more detail needed)

### GET ONE
#### /users/:userid
Returns current user (more detail needed)

### GET ALL \[Not available\] 

### DELETE \[Not available\]

Property (Entity)
-----------------

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

Expense (Entity)
----------------

### POST
#### /users/:userid/properties/:propertyid/expenses
Add a new expense to a property.

### PUT
#### /users/:userid/properties/:propertyid/expenses/:expenseid
Update a single expense for a property.

### GET ONE
#### /users/:userid/properties/:propertyid/expenses/:expenseid
Get a single expense from a property.

### GET ALL
#### /users/:userid/properties/:propertyid/expenses
Get all expenses from a property.

### DELETE
#### /users/:userid/properties/:propertyid/expenses/:expenseid
Delete an individual expense from a property.

Lease (Entity)
--------------

### POST
#### /users/:userid/properties/:propertyid/leases
Add a new lease to a property.

### PUT
#### /users/:userid/properties/:propertyid/leases/:leaseid
Update a single lease on a property.

### GET ONE
#### /users/:userid/properties/:propertyid/leases/:leaseid
Get a single lease from a property.

### GET ALL
#### /users/:userid/properties/:propertyid/leases
Get all leases from a property.

### DELETE
#### /users/:userid/properties/:propertyid/leases/:leaseid
Delete an individual lease from a property.

Payment (Entity)
----------------

### POST
#### /users/:userid/properties/:propertyid/leases/:leaseid/payments
Add a new payment to a property lease.

### PUT
#### /users/:userid/properties/:propertyid/leases/:leaseid/payments/:paymentid
Update a single payment from a property lease.

### GET ONE
#### /users/:userid/properties/:propertyid/leases/:leaseid/payments/:paymentid
Get a single payment from a property lease.

### GET ALL
#### /users/:userid/properties/:propertyid/leases/:leaseid/payments
Get all payments of a property lease.

### DELETE
#### /users/:userid/properties/:propertyid/leases/:leaseid/payments/:paymentid
Delete an individual payment from a property lease.

Tenant (Entity)
---------------

### POST
#### /users/:userid/properties/:propertyid/leases/:leaseid/tenants
Add a new tenant to a property lease.

### PUT
#### /users/:userid/properties/:propertyid/leases/:leaseid/tenants/:tenantid
Update a single tenant from a property lease.

### GET ONE
#### /users/:userid/properties/:propertyid/leases/:leaseid/tenants/:tenantid
Get a single tenant from a property lease.

### GET ALL
#### /users/:userid/properties/:propertyid/leases/:leaseid/tenants
Get all tenants of a property lease.

### DELETE
#### /users/:userid/properties/:propertyid/leases/:leaseid/tenants/:tenantid
Delete an individual tenant from a property lease.

