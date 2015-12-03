/// <reference path="../../typings/angular2/angular2.d.ts" />
/// <reference path="../html/main.d.ts" />

import {Component} from 'angular2/angular2';
import SubComponent from './SubComponent';
import * as template from "main-html"; 

//declare var require;

//var template = require("src/html/main.html!text");

@Component({
    selector: 'my-app',
    template: template,
    //template: "<h2>{{greeting}} from my First Angular2 application</h2> <my-component/>",
    directives: [SubComponent]
})
export default class MainComponent {
    private greeting:string;

    constructor() {
        console.log("Application starting");
        this.greeting = "Hello";
    }
}
