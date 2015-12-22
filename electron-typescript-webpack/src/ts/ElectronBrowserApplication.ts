import ElectronBrowserRpc from './ElectronBrowserRpc';
import EventConstant from './EventConstant';

export default class ElectronBrowserApplication {
  protected rpc:ElectronBrowserRpc;

  constructor() {
    console.log("BrowserApplication starting up");

    this.rpc = new ElectronBrowserRpc();
  }
}

new ElectronBrowserApplication();
