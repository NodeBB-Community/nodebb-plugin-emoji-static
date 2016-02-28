"use strict";

let semver = require("semver");
let winston = require("winston");

let settings = require("./settings");
let eePkg = null;

const EMOJI_EXTENDED = "nodebb-plugin-emoji-extended";
const REQUIRED_VERSION = settings.pkg.peerDependencies[EMOJI_EXTENDED];
const REQUIRED_PACKAGE = "'" + EMOJI_EXTENDED + "@" + REQUIRED_VERSION + "'";

try { eePkg = require(EMOJI_EXTENDED + "/package.json"); } catch (e) {}

if (eePkg == null) {
  winston.error("[plugins/" + settings.id + "] " + REQUIRED_PACKAGE + " not installed.");
} else if (semver.satisfies(eePkg.version, REQUIRED_VERSION)) {
  safeInit();
} else {
  let foundPackage = "'" + EMOJI_EXTENDED + "@" + eePkg.version + "'";
  winston.error("[plugins/" + settings.id + "] " + foundPackage + " found, but " + REQUIRED_PACKAGE + " required.");
}

function safeInit() {
  let sets = require("./sets/controller");
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
