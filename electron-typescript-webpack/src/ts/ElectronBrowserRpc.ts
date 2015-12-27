import EventConstant from "./EventConstant";

const ipcRenderer = require('electron').ipcRenderer;

export default class ElectronBrowserRpc {
  protected listener:Function;
  constructor(listener:Function) {
  	var self = this;

    this.listener = listener;
    console.log("BrowserRpc starting up");
    ipcRenderer.on(EventConstant.IPC_EVENT, function(event, message:string) {
      console.log("BrowserRpc Received message "+message);
      self.send("Message from browser");
      self.listener(message);
    });
  }

  public send(message:string) {
    console.log("BrowserRpc Send message "+message);
    ipcRenderer.send(EventConstant.IPC_EVENT, message);
  }
}
