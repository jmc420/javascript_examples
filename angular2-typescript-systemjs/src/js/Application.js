var angular2_1 = require('angular2/angular2');
var MainComponent_1 = require('./MainComponent');
var Application = (function () {
    function Application() {
        console.log("Application starting");
        angular2_1.bootstrap(MainComponent_1.default);
    }
    return Application;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Application;
