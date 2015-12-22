import EventConstant from "./EventConstant";

const ipcMain = require('electron').ipcMain;

export default class ElectronServerRpc {
  protected browser: any;

  constructor(browser: any) {
    var self = this;

    console.log("ServerRpc starting up");
    this.browser = browser;
    ipcMain.on(EventConstant.IPC_EVENT, function(event, message:string) {
      console.log("ServerRpc Received message " + message);
    });
  }

  public send(message:string) {
    console.log("ServerRpc Send message "+message);
    this.browser.send(EventConstant.IPC_EVENT, message);
  }
}
