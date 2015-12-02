
/// <reference path="../../typings/angular2/angular2.d.ts" />

import {Component} from 'angular2/angular2';

@Component({
    selector: 'my-component',
    template: "<h2>{{greeting}} My First Angular2 nested component</h2>"
})
export default class SubComponent {
    private greeting:string;

    constructor() {
        console.log("Sub Component starting");
        this.greeting = "Hello again";
    }
}
