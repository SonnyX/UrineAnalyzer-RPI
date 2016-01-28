# The Database Collections
  This collections represent the information passed from the database through the server to the client.
  It is the content of the application, is what makes volume in your database, is what you basically want to see in the screen!
  
  In this project. the Basic idea is to present samples information in a concise and practical way.
  [Here](../lib/database) you'll see that two collections are responsible for this (Analysis and Samples) and the rest
  of the collections is basically setting up the environment so that those collections can work perfectly.

## Analysis
  >
    The concept of an Analysis is: A group of samples, simple like that, dude don't try to make it more complicate.
  
  An element of Analysis should contain:
  - An ID: Who the analysis is.
  - A counter: Amount of samples that this Analysis refers to. (0 is 1 sample)
  - A Date: indicates the date of the first sample that was taken in milliseconds.

## Messages
  This collection is an client exclusive collection that represents the messages generated in the client screen,
  indicating any kind of information. Errors, warnings, success, advises, etc...
  
  An Message should be created using the [Message class](../lib/database/classes/message.js)
  for example, when you want to show an Meteor.error in the screen you could `Messages.newErrorMsg(error);`
  Or in the [reset password scenario](../client/templates/Entry/Reset/Reset.js) where you have to show an success message:
  `Messages.insert(
          {
            msg:'Password changed successfully',
            options:{
              closeBtn:true,
              type:'success',
              fade:4000
            }
          }
        )`
  
  >
    for furture implementation it would be nice to have a non-exclusive client message system that could be passed from
    the server to the client indicating state errors in the MSP.

## Options
  This collection represents special Options exclusive for each user. For example, the frequency of sampling,
  or the current date presenting on the graphics.
  >
    For future implementation it'd be nice to have this collection elimintade and then the internal options should be included
    inside the users profile from the Meteor users collection.

## Outputs
  this collection represents the pumps, valves and heaters that there is on the declaration of the MSP.
