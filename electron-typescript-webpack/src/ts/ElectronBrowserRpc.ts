import EventConstant from "./EventConstant";

const ipcRenderer = require('electron').ipcRenderer;

export default class ElectronBrowserRpc {
  
  constructor() {
  	var self = this;
  	
    console.log("BrowserRpc starting up");
    ipcRenderer.on(EventConstant.IPC_EVENT, function(event, message:string) {
      console.log("BrowserRpc Received message "+message);
      self.send("Message from browser");
      
    });
  }

  public send(message:string) {
    console.log("BrowserRpc Send message "+message);
    ipcRenderer.send(EventConstant.IPC_EVENT, message);
  }
}
