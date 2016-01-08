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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	* loglevel - https://github.com/pimterry/loglevel
	*
	* Copyright (c) 2013 Tim Perry
	* Licensed under the MIT license.
	*/
	(function (root, definition) {
	    "use strict";
	    if (typeof module === 'object' && module.exports && "function" === 'function') {
	        module.exports = definition();
	    } else if (true) {
	        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else {
	        root.log = definition();
	    }
	}(this, function () {
	    "use strict";
	    var noop = function() {};
	    var undefinedType = "undefined";

	    function realMethod(methodName) {
	        if (typeof console === undefinedType) {
	            return false; // We can't build a real method without a console to log to
	        } else if (console[methodName] !== undefined) {
	            return bindMethod(console, methodName);
	        } else if (console.log !== undefined) {
	            return bindMethod(console, 'log');
	        } else {
	            return noop;
	        }
	    }

	    function bindMethod(obj, methodName) {
	        var method = obj[methodName];
	        if (typeof method.bind === 'function') {
	            return method.bind(obj);
	        } else {
	            try {
	                return Function.prototype.bind.call(method, obj);
	            } catch (e) {
	                // Missing bind shim or IE8 + Modernizr, fallback to wrapping
	                return function() {
	                    return Function.prototype.apply.apply(method, [obj, arguments]);
	                };
	            }
	        }
	    }

	    // these private functions always need `this` to be set properly

	    function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {
	        return function () {
	            if (typeof console !== undefinedType) {
	                replaceLoggingMethods.call(this, level, loggerName);
	                this[methodName].apply(this, arguments);
	            }
	        };
	    }

	    function replaceLoggingMethods(level, loggerName) {
	        /*jshint validthis:true */
	        for (var i = 0; i < logMethods.length; i++) {
	            var methodName = logMethods[i];
	            this[methodName] = (i < level) ?
	                noop :
	                this.methodFactory(methodName, level, loggerName);
	        }
	    }

	    function defaultMethodFactory(methodName, level, loggerName) {
	        /*jshint validthis:true */
	        return realMethod(methodName) ||
	               enableLoggingWhenConsoleArrives.apply(this, arguments);
	    }

	    var logMethods = [
	        "trace",
	        "debug",
	        "info",
	        "warn",
	        "error"
	    ];

	    function Logger(name, defaultLevel, factory) {
	      var self = this;
	      var currentLevel;
	      var storageKey = "loglevel";
	      if (name) {
	        storageKey += ":" + name;
	      }

	      function persistLevelIfPossible(levelNum) {
	          var levelName = (logMethods[levelNum] || 'silent').toUpperCase();

	          // Use localStorage if available
	          try {
	              window.localStorage[storageKey] = levelName;
	              return;
	          } catch (ignore) {}

	          // Use session cookie as fallback
	          try {
	              window.document.cookie =
	                encodeURIComponent(storageKey) + "=" + levelName + ";";
	          } catch (ignore) {}
	      }

	      function getPersistedLevel() {
	          var storedLevel;

	          try {
	              storedLevel = window.localStorage[storageKey];
	          } catch (ignore) {}

	          if (typeof storedLevel === undefinedType) {
	              try {
	                  var cookie = window.document.cookie;
	                  var location = cookie.indexOf(
	                      encodeURIComponent(storageKey) + "=");
	                  if (location) {
	                      storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
	                  }
	              } catch (ignore) {}
	          }

	          // If the stored level is not valid, treat it as if nothing was stored.
	          if (self.levels[storedLevel] === undefined) {
	              storedLevel = undefined;
	          }

	          return storedLevel;
	      }

	      /*
	       *
	       * Public API
	       *
	       */

	      self.levels = { "TRACE": 0, "DEBUG": 1, "INFO": 2, "WARN": 3,
	          "ERROR": 4, "SILENT": 5};

	      self.methodFactory = factory || defaultMethodFactory;

	      self.getLevel = function () {
	          return currentLevel;
	      };

	      self.setLevel = function (level, persist) {
	          if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
	              level = self.levels[level.toUpperCase()];
	          }
	          if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
	              currentLevel = level;
	              if (persist !== false) {  // defaults to true
	                  persistLevelIfPossible(level);
	              }
	              replaceLoggingMethods.call(self, level, name);
	              if (typeof console === undefinedType && level < self.levels.SILENT) {
	                  return "No console available for logging";
	              }
	          } else {
	              throw "log.setLevel() called with invalid level: " + level;
	          }
	      };

	      self.setDefaultLevel = function (level) {
	          if (!getPersistedLevel()) {
	              self.setLevel(level, false);
	          }
	      };

	      self.enableAll = function(persist) {
	          self.setLevel(self.levels.TRACE, persist);
	      };

	      self.disableAll = function(persist) {
	          self.setLevel(self.levels.SILENT, persist);
	      };

	      // Initialize with the right level
	      var initialLevel = getPersistedLevel();
	      if (initialLevel == null) {
	          initialLevel = defaultLevel == null ? "WARN" : defaultLevel;
	      }
	      self.setLevel(initialLevel, false);
	    }

	    /*
	     *
	     * Package-level API
	     *
	     */

	    var defaultLogger = new Logger();

	    var _loggersByName = {};
	    defaultLogger.getLogger = function getLogger(name) {
	        if (typeof name !== "string" || name === "") {
	          throw new TypeError("You must supply a name when creating a logger.");
	        }

	        var logger = _loggersByName[name];
	        if (!logger) {
	          logger = _loggersByName[name] = new Logger(
	            name, defaultLogger.getLevel(), defaultLogger.methodFactory);
	        }
	        return logger;
	    };

	    // Grab the current global log variable in case of overwrite
	    var _log = (typeof window !== undefinedType) ? window.log : undefined;
	    defaultLogger.noConflict = function() {
	        if (typeof window !== undefinedType &&
	               window.log === defaultLogger) {
	            window.log = _log;
	        }

	        return defaultLogger;
	    };

	    return defaultLogger;
	}));


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var log = __webpack_require__(0);
	var EventConstant_1 = __webpack_require__(7);
	var ipcMain = __webpack_require__(8).ipcMain;
	var ElectronServerRpc = (function () {
	    function ElectronServerRpc(browser) {
	        log.info("ElectronServerRpc starting up");
	        this.browser = browser;
	        ipcMain.on(EventConstant_1.default.IPC_EVENT, function (event, message) {
	            log.info("ElectronServerRpc Received message " + message);
	        });
	    }
	    ElectronServerRpc.prototype.send = function (message) {
	        log.info("ElectronServerRpc Send message " + message);
	        this.browser.send(EventConstant_1.default.IPC_EVENT, message);
	    };
	    return ElectronServerRpc;
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ElectronServerRpc;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var fs = __webpack_require__(9);
	var Logger = (function () {
	    function Logger() {
	    }
	    Logger.initialise = function (log) {
	        Logger.addFileLogger(log);
	        log.setLevel(2);
	        return log;
	    };
	    Logger.addFileLogger = function (log) {
	        var originalFactory = log.methodFactory;
	        console.log("Create stream");
	        Logger.stream = fs.createWriteStream("/tmp/example.log");
	        log.methodFactory = function (methodName, logLevel, loggerName) {
	            var rawMethod = originalFactory(methodName, logLevel, loggerName);
	            return function (message) {
	                Logger.stream.write(message + "\n");
	                rawMethod(message);
	            };
	        };
	    };
	    return Logger;
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Logger;


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("app");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("browser-window");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var log = __webpack_require__(0);
	var ElectronServerRpc_1 = __webpack_require__(1);
	var Logger_1 = __webpack_require__(2);
	var app = __webpack_require__(3);
	var path = __webpack_require__(5);
	var BrowserWindow = __webpack_require__(4);
	var ElectronServerApplication = (function () {
	    function ElectronServerApplication() {
	        var self = this;
	        var fileName = __dirname + "/" + "index.html";
	        Logger_1.default.initialise(log);
	        log.info("ElectronApplication starting up");
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
	        log.info("open file " + fileName);
	        this.window = new BrowserWindow({ width: 800, height: 600, title: "Example" });
	        this.window.loadURL('file://' + fileName);
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
/* 7 */
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
/* 8 */
/***/ function(module, exports) {

	module.exports = require("electron");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ }
/******/ ]);