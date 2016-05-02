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
  
## Architecture
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

# UrineAnalyzer RaspberryPi Side
To execute locally, go into the folder and use: "meteor", you can then view the app in your browser on: http://localhost:3000
To compile and send to the Raspberry Pi you may use:
```
meteor build --architecture os.linux.x86_32 ../build
scp -P port ../build/app.tar.gz  username@IPaddress:/target/dest
ssh username@IPaddress -p port
```
login and then run the command: reboot

At the startup the scripts below will be called and the bundled version will automatically be installed.

# start.sh - needs to be located in the parent folder of where you want the app to be deployed.
```
#!/bin/sh -e
cat << "EOF"

 _   _     _              _             _                  __   ___   __
| | | |_ _(_)_ _  ___    /_\  _ _  __ _| |_  _ ______ _ _  \ \ / / | /  \
| |_| | '_| | ' \/ -_)  / _ \| ' \/ _` | | || |_ / -_) '_|  \ V /| || () |
 \___/|_| |_|_||_\___| /_/ \_\_||_\__,_|_|\_, /__\___|_|     \_/ |_(_)__/
   We are currently booting up            |__/
EOF
export HOME="/root"
cd /root/piruzao/
bundle="app.tar.gz"

if [ -f "$bundle" ]; then
  echo '>>> New bundle detected'

  if [ -d "bundle" ]; then
     echo '>>> Cleaning up bundle directory'
     rm bundle/ -rf
  fi

  echo '>>> Extracting '$bundle
  tar -xf $bundle
  echo '>>> Removing '$bundle
  rm -rf $bundle
  echo '>>> Installing dependencies'
  (cd bundle/programs/server && npm install && rm -fR npm/node_modules/meteor/npm-bcrypt/node_modules/bcrypt/ && npm install serialport underscore fs mongodb-backup mongodb-restore bcrypt)
  echo '>>> Finished installing dependencies'
  echo '>>> Copying required files to bundle directory'
  cat  > bundle/index.js << "EOF"
var app = require('app')
var BrowserWindow = require('browser-window')
app.on('ready',function(){
  var mainWindow = new BrowserWindow({
    width:848,
    heigth:477,
    frame:false,
    zoomFactor:0.8
  })
mainWindow.loadUrl('http://localhost:80/');
mainWindow.setFullScreen(true);
})
EOF

  echo "xinit /usr/local/bin/xinput_calibrator --output-type xorg.conf.d --output-filename /usr/share/X11/xorg.conf.d/01-input.conf -- :1" > bundle/cal_ts.sh
  echo '>>> Finished update'
fi

export MONGO_URL=mongodb://localhost:27017/test
export ROOT_URL=http://localhost
export PORT=80
node bundle/main.js &

#Uncomment the next line if you wish to run touchscreen calibration at every boot:
#xinit /usr/local/bin/xinput_calibrator --output-type xorg.conf.d --output-filename /usr/share/X11/xorg.conf.d/01-input.conf &

while !(netstat -lnt | awk '$6 == "LISTEN" && $4 ~ ".80"' | grep -q "80"); do
sleep 1
done

xinit /usr/local/lib/node_modules/electron-prebuilt/dist/electron /root/piruzao/bundle/index.js 2>/dev/null
```

# /etc/rc.local
```
#!/bin/sh -e
#
# rc.local
#
# This script is executed at the end of each multiuser runlevel.
# Make sure that the script will "exit 0" on success or any other
# value on error.
#
# In order to enable or disable this script just change the execution
# bits.
#
# By default this script does nothing.

/bin/sh /root/bash.sh >/dev/console 2>&1 | tee &
exit 0
```
