/// <reference path="../../typings/angular2/angular2.d.ts" />

import {bootstrap} from 'angular2/angular2';
import MainComponent from './MainComponent';

export default class Application {

    constructor() {
        console.log("Application starting");
        bootstrap(MainComponent);
    }
}
