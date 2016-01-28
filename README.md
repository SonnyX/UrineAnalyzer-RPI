# Urine Analyzer
  - [Server side][server]
  - [Meteor Methods][lib]
  - [Client side][client]
  - [Database][database]

## Summary
  This is the **_Urine Analyzer_** project repository. 
  
  Here you'll find the "Meteor" like files that were used to develop both Client and Server side applications
  as well as the files utilized to archtect the Database ideas.
  
  [**_Meteor docs_**](http://docs.meteor.com/#/basic/)
  
## Goals
  This repository is dedicated to the development of the **_Urine Analyzer_** project
  
  and has as it's main goal to serve as reference for the constant development of the project despite
  the changes in the development team.
  
## Archtecture
   This repository is divided in three major folders and one declaration folder: client, server, lib and collections.
  
  [**client**][client]
  >
    You'll find codes involving the design of the webpage itself.
  
  [**server**][server]
  >
    You'll find all the code that makes the contact between the server application and the MSP controller,
    as well as the code utilized to publish the database to the client 
    and the code to permit database backups and restoration.
  
  [**lib**][lib]
  >
    You'll find most of the links between client and server application in the methods.js file
    and the Database's files inside the database folder
  
  [**collections**](./collections/collections.js)
  >
    Here you'll find the collections declaration that are utilized by both server and client side applications.
  
[server]:./server
[lib]:./lib
[client]:./client
[database]:./lib/database
