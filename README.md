# BeobleDemo
This is a task that given by bobble team.



**How to use / connect the wallet demo app?**
- In this app hit the [connect wallet] label to communicate with your metamask application.
after adding the password.  


**Android video:**
https://drive.google.com/file/d/1NQSbWATfY1SklvWzTCmZ6FrVDgt19h-8/view?usp=sharing

**Ios Video:**
https://drive.google.com/file/d/1-u99plGq9gUyi-h1EjPAbsKj1to17z_c/view?usp=sharing




**About implementation?**

- This is a react native app, using wallet connect.
This is using wallet connect as we need a bridge to connect as we are not in a browser (no window object for javascript lib) application but a mobile application to communicate.

Here we connect to wallet connect and via bridge we get a callback that gives data back to our app and with ether provider we get the data.

Here Async storage has been used to store data.
When you disconnect the app

Also ,There are some of the peer deps that are why there are some extra required packages there.
# link for meta dapp



**How to build  and run this project?**
- As shared in the repo, please clone the project.
Follow steps

FOR IOS , xcode
   1)Do npm install and cd ios and then pod install.
   2) Run the Project. React-native run-ios
   3) If you face any error duplicate symbol architecture, 
     note the file name and remove from pods -> targets -> search for that file name and select -> Build phases -> compile sources -> remove .m file that has been mentioned error , till you duplicate symbol error goes away

4) if process.split error

/Users/johnapp/Desktop/b/appOne/node_modules/react-native-crypto/node_modules/pbkdf2/browser.js 
add this line in above file
var process = require("process");  

5) Clean the  build and run projects. From xcode or terminal React-native run-ios




 


FOR ANDROID

 1) Do the  npm install && react-native run-android from terminal

2) update android sdk path if required

 3) If you face following error please check this below

 Build file '/Users/johnapp/Desktop/b/appOne/node_modules/react-native-os/android/build.gradle' line: 47
 * Where:
Build file '/Users/johnapp/Desktop/b/appOne/node_modules/react-native-tcp/android/build.gradle' line: 47

 please use 'implementation' instead of 'compile' , on error above like this.

4) you might need to add peer deps in mode_modules if there are any errors regarding that.

5) Run the project  react-native run-android









