/// <reference path="../../typings/react/react.d.ts" />
/// <reference path="../../typings/react-bootstrap/react-bootstrap.d.ts" />

import * as React from 'react';
import ElectronBrowserRpc from './ElectronBrowserRpc';
import {Panel} from 'react-bootstrap';

export default class View extends React.Component<any, any> {
  protected rpc:ElectronBrowserRpc;

  constructor() {
    super();
    this.state = {text: "Starting"};
  }

  componentDidMount() {
    this.rpc = new ElectronBrowserRpc((text) => {
      this.setState({text:text});
    });
  }

  render() {
    return <Panel header="Example Panel" id="panel">{this.state.text}</Panel>
  }
}
