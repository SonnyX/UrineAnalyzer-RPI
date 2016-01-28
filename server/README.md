# Server side application
  - [User Management](#user-management)
  - [Publications](#publications)
  - [Database functionalities](#database-functionalities)

## [User Management] (./accounts.js)
  The User Management is mainly done internally by [**Meteor _Accounts_ Api**][acc].
  
  The only verification that we do before passing the whole administration to the Accounts library is done when creating a new user,
  we verify who created the user (so that we can give administrator power to the admin users) and if the username is valid. 
  
  If it's not a valid name then `throw new Meteor.Error(402, "Invalid character on username");` happens.
  If you try to create a user without being loged then `throw new Meteor.Error(403, "Must be logged to register new user");` happens.
  If some smart pants tries to create forcelly the user without following the flow of the interface then
  `throw new Meteor.Error(402, "This is not a Secure connection","try using the Method VerifiedCreateUser");` happens.
  
  We also have some templates for the E-mail sending system (which is not yet implemented, but yes, we got the template already!) in case
  of password lost and other stuffs and some configurations that is given from the Meteor [**_Accounts_ Api**][acc].
  
## [Publications](./publication.js)
  Meteor-like applications are provided with Meteor [**_Publish and Subscribe_**][pubsub] documentation.
  Basically the Server "publishes" for the clients a given amount of data, based on what the client has requested in a subscription.
  In this project this is used to transfer database information from server to client.
  
## [Database functionalities](./database)
  - [**backup**](./database/backup.js)
    - You'll find the code for the backup of the database. Basically this is invoked by an HTTP Get method and it returns via the response a stream containing a .tar file with the backup of all the collections. We use the npm package [mongodb-backup](https://github.com/hex7c0/mongodb-backup) to create the backup.
  - [**restore**](./database/restore.js)
    - You'll find the code for the restoration of the database. Basically this is invoked by an HTTP Post method and receives via the request a .tar file with the backup of all the collections to be restored. We use the npm package [mongodb-restore](https://github.com/hex7c0/mongodb-restore) to do the restoration.
  - [csv](./database/csv.js)
    - You'll find the code for the creation of a .csv file with all the information of the samples in the database. this file basically invoke DbToCSV from [methods](../lib/methods.js) and then pass it to the client via an HTTP Get method.
  
  
  [pubsub]:http://docs.meteor.com/#/basic/pubsub
  [acc]:http://docs.meteor.com/#/basic/accounts
