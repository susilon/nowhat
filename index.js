/**
 * 
 * Websocket Chat Basic Server Example
 * For Demo Only, no static files caching
 * author : susilonurcahyo@gmail.com
 *
*/

const pinipig = require("./pinipig/pinipig.js")
const querystring = require('querystring')
const fs = require('fs')
const port=9090
var clients = []

let Handshake = (ctx) => {    
    // get querystring    
    query = querystring.parse(ctx.req.getQuery())    
    // check existing token
    var isUserExists = false;
    for( var i = 0; i < clients.length; i++){ 
      if ( clients[i].token === query.token) { 
        isUserExists = true;        
      }
    }
    if (isUserExists) {
      // disconnect member
      ctx.ws.close();
    } else {
      console.log(query.token + ' connected')
      // set client token
      ctx.ws.token = query.token
      // send list of connected members to new member   
      ctx.ws.send(createMessage(getMembers(), 'memberinfo'))
      // broadcast new member to other connected members
      broadcast(ctx.ws.token, 'newmember')
      // insert new member to array
      clients.push(ctx.ws);
    }    
}
let WSMessage = (ctx) => {
    try{
        // new message
        let  data = Buffer.from(ctx.message).toString("binary")
        console.log(ctx.ws.token + ":" + data)        
        // is message json?
        let objData = isJson(data);
        if (objData!=null) {
            // if object
            switch(objData.tp) {                
              case "getmember":
                // client request all member
                ctx.ws.send(getMembers())
                break;
              case "prvt":
                // send private message
                for( var i = 0; i < clients.length; i++){ 
                    if ( clients[i].token === objData.to) { 
                      clients[i].send(ctx.ws.token + ":" + objData.m); 
                    }
                  }
                break;
              default:
                // broadcast message
                clients.forEach(client => {            
                    if (client.token != ctx.ws.token) {
                        client.send(ctx.ws.token + ":" + objData.m);                   
                    }                
                  });
                break;
            }
        }          
    }
  catch(e){
    console.log(e)
  }
}
let WSClose = (ctx) => {
    for( var i = 0; i < clients.length; i++){ 
      if ( clients[i].token === ctx.ws.token) { 
        clients.splice(i, 1); 
      }
    }
    broadcast(ctx.ws.token, 'memberout')
    console.log('WebSocket ' + ctx.ws.token + ' closed!');
}
let ChatForm = (ctx) => {
  try {
    ctx.res.writeHeader("content-type", "text/html")

    filedata = fs.readFileSync('./example/client.html', 'utf8')    

    ctx.res.write(filedata)
    ctx.res.end() 
  } catch (e) {
    ctx.res.end() 
    console.log(e)
  }
};
let routes = [{
      url: "/*", // handle web client page
      get: ChatForm
    },
    {
        url: "/ws", // ws://localhost:9090/ws
        ws: {
            options: {
                compression: 0,
                maxPayloadLength: 16 * 1024 * 1024,
                //idleTimeout: 10
            },
            open: Handshake,
            message: WSMessage,
            drain: null,
            close: WSClose
        }
    }
];

let options = {
    port: port,
    routes: routes,
    banner: `nowhat : NodeJS-uWebSocket-Chat-Server ` + port
};

pinipig.createServer(options);

function broadcast(message, msgtype){
    console.log(clients.length)
    clients.forEach(client => {            
        client.send(createMessage(message, msgtype));                
    });
}
function createMessage(message, msgtype) {
    return JSON.stringify({m: message,tp: msgtype})    
}
function getMembers() {
    return JSON.stringify(clients)    
}
function isJson(str) {
    try {
        return JSON.parse(str);
    } catch (e) {
        return null;
    }
}