# Server side application

#Index
  - [User Management](#user-management)
  - [Publications](./publication.js)
  - [Database functionalities](#database-functionalities)

# [User Management] (./accounts.js)
  The User Management is mainly done internally by Meteor internal package [**Accounts**](http://docs.meteor.com/#/basic/accounts).
  
  The only verification that we do before passing the whole administration to the Accounts library is done when creating a new user,
  we verify who created the user (so that we can give administrator power to the admin users) and if the username is valid. 
  
  If it's not a valid name then `throw new Meteor.Error(402, "Invalid character on username");` happens.
  If you try to create a user without being loged then `throw new Meteor.Error(403, "Must be logged to register new user");` happens.
  If some smart pants tries to create forcelly the user without following the flow of the interface then
  `throw new Meteor.Error(402, "This is not a Secure connection","try using the Method VerifiedCreateUser");` happens.
