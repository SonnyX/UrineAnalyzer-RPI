# Server side application
  - [User Management](#user-management)
  - [Publications](./publication.js)
  - [Database functionalities](#database-functionalities)

# [User Management] (./accounts.js)
  The User Management is mainly done internally by [**Meteor _Accounts_ Api**].
  
  The only verification that we do before passing the whole administration to the Accounts library is done when creating a new user,
  we verify who created the user (so that we can give administrator power to the admin users) and if the username is valid. 
  
  If it's not a valid name then `throw new Meteor.Error(402, "Invalid character on username");` happens.
  If you try to create a user without being loged then `throw new Meteor.Error(403, "Must be logged to register new user");` happens.
  If some smart pants tries to create forcelly the user without following the flow of the interface then
  `throw new Meteor.Error(402, "This is not a Secure connection","try using the Method VerifiedCreateUser");` happens.
  
  We also have some templates for the E-mail sending system (which is not yet implemented, but yes, we got the template already!) in case
  of password lost and other stuffs and some configurations that is given from the Meteor [**Meteor _Accounts_ Api**].
  
  [**Meteor _Accounts_ Api**]:http://docs.meteor.com/#/basic/accounts
