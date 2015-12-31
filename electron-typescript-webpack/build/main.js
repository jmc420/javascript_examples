/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { throw err; };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var EventConstant_1 = __webpack_require__(5);
	var ipcMain = __webpack_require__(6).ipcMain;
	var ElectronServerRpc = (function () {
	    function ElectronServerRpc(browser) {
	        console.log("ServerRpc starting up");
	        this.browser = browser;
	        ipcMain.on(EventConstant_1.default.IPC_EVENT, function (event, message) {
	            console.log("ServerRpc Received message " + message);
	        });
	    }
	    ElectronServerRpc.prototype.send = function (message) {
	        console.log("ServerRpc Send message " + message);
	        this.browser.send(EventConstant_1.default.IPC_EVENT, message);
	    };
	    return ElectronServerRpc;
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ElectronServerRpc;


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("app");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("browser-window");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ElectronServerRpc_1 = __webpack_require__(0);
	var app = __webpack_require__(1);
	var path = __webpack_require__(3);
	var BrowserWindow = __webpack_require__(2);
	var ElectronServerApplication = (function () {
	    function ElectronServerApplication() {
	        var self = this;
	        var fileName = "index.html";
	        console.log("ElectronApplication starting up ");
	        if (process.argv.length == 3) {
	            fileName = path.resolve() + "/" + process.argv[2];
	        }
	        app.on('ready', function () {
	            self.openBrowser(fileName);
	        });
	        app.on('window-all-closed', function () {
	            self.quit();
	        });
	    }
	    ElectronServerApplication.prototype.openBrowser = function (fileName) {
	        var self = this;
	        console.log("open window " + fileName);
	        this.window = new BrowserWindow({ width: 800, height: 600, title: "Example" });
	        this.window.loadURL('file://' + fileName);
	        this.window.webContents.openDevTools();
	        this.rpc = new ElectronServerRpc_1.default(this.window.webContents);
	        this.window.webContents.on('did-finish-load', function () {
	            setTimeout(function () {
	                self.rpc.send("Message from server");
	            }, 1500);
	        });
	    };
	    ElectronServerApplication.prototype.quit = function () {
	        app.quit();
	    };
	    return ElectronServerApplication;
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ElectronServerApplication;
	new ElectronServerApplication();


/***/ },
/* 5 */
/***/ function(module, exports) {

	var EventConstant = (function () {
	    function EventConstant() {
	    }
	    Object.defineProperty(EventConstant, "IPC_EVENT", {
	        get: function () { return "IPC"; },
	        enumerable: true,
	        configurable: true
	    });
	    return EventConstant;
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = EventConstant;


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("electron");

/***/ }
/******/ ]);