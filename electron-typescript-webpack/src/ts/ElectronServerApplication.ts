
/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/github-electron/electron-prebuilt.d.ts" />
/// <reference path="../../typings/github-electron/github-electron.d.ts" />

import ElectronServerRpc from './ElectronServerRpc';

var app = require('app');
var path = require('path');
var BrowserWindow = require('browser-window');

export default class ElectronServerApplication {
  protected rpc: ElectronServerRpc;
  protected window: GitHubElectron.BrowserWindow;

  constructor() {
    var self = this;
    var fileName = "index.html";

    console.log("ElectronApplication starting up ");

    if (process.argv.length == 3) {
      fileName = path.resolve() + "/" + process.argv[2];
    }

    app.on('ready', function() {
      self.openBrowser(fileName);
    });
    app.on('window-all-closed', function() {
      self.quit();
    });

  }

  private openBrowser(fileName:string) {
    var self = this;

    console.log("open window " + fileName);
    this.window = new BrowserWindow({ width: 800, height: 600, title: "Example" });
    this.window.loadURL('file://' + fileName);
    this.window.webContents.openDevTools();
    this.rpc = new ElectronServerRpc(this.window.webContents);
    this.window.webContents.on('did-finish-load', function() {
      setTimeout(function() {
        self.rpc.send("Message from server");
      }, 1500);
    });
  }

  private quit() {
    app.quit();
  }
}

new ElectronServerApplication();
