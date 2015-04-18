// Generated by CoffeeScript 1.9.1
var DesktopStore, Minilog, Q, detectEnv, logger,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

detectEnv = require("composite-detect");

Q = require("q");

if (detectEnv.isModule) {
  Minilog = require("minilog");
  Minilog.pipe(Minilog.suggest).pipe(Minilog.backends.console.formatClean).pipe(Minilog.backends.console);
  logger = Minilog('desktop-store');
}

if (detectEnv.isNode) {
  Minilog.pipe(Minilog.suggest).pipe(Minilog.backends.console.formatColor).pipe(Minilog.backends.console);
}

if (detectEnv.isBrowser) {
  Minilog.pipe(Minilog.suggest).pipe(Minilog.backends.console.formatClean).pipe(Minilog.backends.console);
  logger = Minilog('desktop-store');
}

DesktopStore = (function() {
  function DesktopStore(options) {
    this.read = bind(this.read, this);
    this.list = bind(this.list, this);
    this.logout = bind(this.logout, this);
    this.login = bind(this.login, this);
    var defaults;
    options = options || {};
    defaults = {
      enabled: (typeof process !== "undefined" && process !== null ? true : false),
      name: "Desktop",
      type: "",
      description: "",
      rootUri: typeof process !== "undefined" && process !== null ? process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE : null,
      isDataDumpAllowed: false,
      showPaths: true
    };
    this.timeout = 0;
  }

  DesktopStore.prototype.login = function() {};

  DesktopStore.prototype.logout = function() {};


  /*-------------------file/folder manipulation methods---------------- */


  /**
  * list all elements inside the given uri (non recursive)
  * @param {String} uri the folder whose content we want to list
  * @return {Object} a promise, that gets resolved with the content of the uri
   */

  DesktopStore.prototype.list = function(uri) {
    var deferred;
    deferred = Q.defer();
    return deferred;
  };


  /**
  * read the file at the given uri: optionally can be an html5 FILE , return its content
  * @param {String} uri absolute uri of the file whose content we want
  * @param {String} encoding the encoding used to read the file
  * @return {Object} a promise, that gets resolved with the content of file at the given uri
   */

  DesktopStore.prototype.read = function(uri) {
    var deferred, onError, onLoad, onProgress, reader;
    deferred = Q.defer();
    reader = new FileReader();
    logger.debug("reading from " + uri);
    onLoad = function(event) {
      var result;
      if (event != null) {
        result = event.target.result;
        return deferred.resolve(result);
      } else {
        throw new Error("no event data");
      }
    };
    onProgress = function(event) {
      var percentComplete;
      if (event.lengthComputable) {
        percentComplete = (event.loaded / event.total) * 100;
        logger.debug("fetching percent", percentComplete);
        return deferred.notify({
          "fetching": percentComplete,
          "total": event.total
        });
      }
    };
    onError = function(error) {
      logger.error("error", event);
      return deferred.reject(error);
    };
    reader.onload = onLoad;
    reader.onloadend = onLoad;
    reader.onprogress = onProgress;
    reader.onerror = onError;
    reader.readAsBinaryString(uri);
    return deferred;
  };


  /*-------------------Helpers---------------- */

  return DesktopStore;

})();

if (detectEnv.isModule) {
  module.exports = DesktopStore;
}