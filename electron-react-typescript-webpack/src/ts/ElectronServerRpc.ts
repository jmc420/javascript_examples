/// <reference path="../../typings/loglevel/loglevel.d.ts" />

import * as log from 'loglevel';
import EventConstant from "./EventConstant";

const ipcMain = require('electron').ipcMain;

export default class ElectronServerRpc {
  protected browser: any;

  constructor(browser: any) {
    log.info("ElectronServerRpc starting up");
    this.browser = browser;
    ipcMain.on(EventConstant.IPC_EVENT, function(event, message:string) {
      log.info("ElectronServerRpc Received message " + message);
    });
  }

  public send(message:string) {
    log.info("ElectronServerRpc Send message "+message);
    this.browser.send(EventConstant.IPC_EVENT, message);
  }
}
