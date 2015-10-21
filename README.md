chrome_extension
----------------

A chrome extension to capture google keywords searched by user, and post it to a server

### how to install

1. clone this project
2. open chrome "extensions", check "developer mode"
3. load unpacked extension ...
4. choose the root of this project

### how to setup

1. right click on the extension icon
2. choose "Options"
3. input 'My name' (it's best to be unique)
4. input 'server url' (like `http://domain:3000/keyword`)
5. click on 'save' button

server
-------

Collect keywords and show them.

```
cd server
npm install
node index.js
```
