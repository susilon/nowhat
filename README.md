# Nowhat
NodeJS WebSocket Chat Server

For Demo Purposes Only.

Limited to one room only.
<br><br>
[Live Demo](http://13.76.172.84:9090)
<br><br>
### Projects Dependencies

**Nowhat** uses a number of open source projects to work properly:

* [uWebSocket.js] - fast NodeJS websocket implementation
* [pinipig] - uWebSocket.js wrapper
* etc
<br><br>
### Installation
GIT Clone this project

NPM Install

in the project directory run

node index.js
<br><br>
### Docker
GIT Clone this project

in the project directory run

docker build -t susilon/nowhat . (<- don't forget the dot :D>)

docker run -d -p 9090:9090 --name nowhat_server susilon/nowhat

open chat client at browser http://yourserver:9090

to see server log:

docker logs --tail 100 <container ID>
<br><br>
### Local Pinipig
We user our version of pinipig, we add small changes at onclose event.

