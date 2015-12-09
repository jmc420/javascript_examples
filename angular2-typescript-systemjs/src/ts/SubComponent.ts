
/// <reference path="../../typings/angular2/angular2.d.ts" />
/// <reference path="../html/component.d.ts" />

import {Component} from 'angular2/angular2';
import * as html from "component-html";

@Component({
    selector: 'my-component',
    template: html,
    //template: "<h2>{{greeting}} My First Angular2 nested component</h2>"
})
export default class SubComponent {
    private greeting:string;

    constructor() {
        console.log("Sub Component starting");
        this.greeting = "Hello again";
    }
}
