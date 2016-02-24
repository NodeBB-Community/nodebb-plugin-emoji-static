"use strict";

let winston = require("winston");

let sets = require("./sets/controller");
let settings = require("./settings");
let setsCtrl = null;

try {
  setsCtrl = require("nodebb-plugin-emoji-extended/lib/sets/controller");
} catch (e) {
  winston.error("[plugins/emoji] nodebb-plugin-emoji-extended is not installed. " + settings.name + " depends on it.");
}

if (setsCtrl != null) {

  let adminPages = require("./adminPages");
  let socketRoutes = require("./socketRoutes");

  /*==================================================== Exports  ====================================================*/

  exports.adminMenu = function (data, cb) {
    adminPages.addNavigation(data);
    cb(null, data);
  };

  exports.init = function (data, cb) {
    settings.init.then(sets.init).done();
    socketRoutes.init();
    adminPages.init(data, cb);
  };

}
