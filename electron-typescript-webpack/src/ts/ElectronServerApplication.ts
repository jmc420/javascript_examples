
/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/github-electron/electron-prebuilt.d.ts" />
/// <reference path="../../typings/github-electron/github-electron.d.ts" />

import ElectronServerRpc from './ElectronServerRpc';

var app = require('app');
var BrowserWindow = require('browser-window');

export default class ElectronServerApplication {
  protected rpc: ElectronServerRpc;
  protected window: GitHubElectron.BrowserWindow;

  constructor() {
    var self = this;

    console.log("ElectronApplication starting up ");
    app.on('ready', function() {
      self.openBrowser();
    });
    app.on('window-all-closed', function() {
      self.quit();
    });
  }

  private openBrowser() {
    var fileName: string = __dirname + '/../../index.html';
    var self = this;

    console.log("open window" + fileName);
    this.window = new BrowserWindow({ width: 800, height: 600, title: "WifiChat" });
    this.window.loadURL('file://' + fileName);
    this.window.webContents.openDevTools();
    this.rpc = new ElectronServerRpc(this.window.webContents);
    this.window.webContents.on('did-finish-load', function() {
      self.rpc.send("Message from server");
    });
  }

  private quit() {
    app.quit();
  }
}

new ElectronServerApplication();
