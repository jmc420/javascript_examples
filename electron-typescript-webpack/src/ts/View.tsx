/// <reference path="../../typings/react/react.d.ts" />

import * as React from 'react';
import ElectronBrowserRpc from './ElectronBrowserRpc';

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
    return <div>{this.state.text}</div>
  }
}
