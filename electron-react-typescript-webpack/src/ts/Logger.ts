/// <reference path="../../typings/loglevel/loglevel.d.ts" />

var fs = require('fs');

export default class Logger {
  private static stream;

  public static initialise(log:Log):Log {
    Logger.addFileLogger(log);
    log.setLevel(LogLevel.INFO);
    return log;
  }

  private static addFileLogger(log:any) {
    var originalFactory = log.methodFactory;

    console.log("Create stream");
    Logger.stream = fs.createWriteStream("/tmp/example.log");
    log.methodFactory = function (methodName, logLevel, loggerName) {
      var rawMethod = originalFactory(methodName, logLevel, loggerName);

      return function (message) {
        Logger.stream.write(message+"\n");
        rawMethod(message);
      };
    };
  }
}
