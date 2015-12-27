/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/react/react.d.ts" />
/// <reference path="../../typings/react/react-dom.d.ts" />

import * as $ from 'jquery';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import View from "./View";

export default class ElectronBrowserApplication {
  protected element:React.ReactElement<{}>;

  constructor() {
    console.log("BrowserApplication starting up");

    this.element = React.createElement(View);

    ReactDOM.render(this.element, document.body);
  }

}

$(document).ready(function() {
  new ElectronBrowserApplication();
});
