/// <reference path="../../typings/angular2/angular2.d.ts" />
/// <reference path="../html/main.d.ts" />

import {Component} from 'angular2/angular2';
import SubComponent from './SubComponent';
import * as html from "main-html";

//declare var require;

//var template = require("src/html/main.html!text");

@Component({
    selector: 'my-app',
    template: html,
    //template: "<h2>{{greeting}} from my First Angular2 application</h2> <my-component/>",
    directives: [SubComponent]
})
export default class MainComponent {
    private greeting:string;

    constructor() {
        console.log("Main Component starting");
        this.greeting = "Hello";
    }
}
