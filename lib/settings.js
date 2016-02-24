"use strict";

let Q = require("q");
let uuid = require("uuid");
let nconf = require("nconf");
let Settings = require.main.require("./src/settings");

let packageJSON = require("../package.json");

/*
 * This file exports a NodeBB Settings Object and a few meta-data of the project.
 *
 * See https://docs.nodebb.org/en/latest/plugins/settings.html for more details on the Settings Object.
 *
 * This file by default gets meta-replaced (thus @{...} gets resolved within the grunt-tasks).
 * It is not recommended to add any more files, rather it is recommended to add additional exports here if needed.
 */

let env = "@{env}", dev = (env === "development");
let id = "@{id}";

let defaultSetUUID = uuid.v1();
let initDefer = Q.defer();

let defaultSettings = {
  sets: [{
    id: defaultSetUUID,
    name: "My Custom Set",
    description: "",
    index: "/path/to/custom/index.json",
    attribution: "",
    license: "",
    styles: {
      main: ".emoji[data-set-id=\"" + defaultSetUUID + "\"] {\n  vertical-align: middle;\n  height: 20px;\n  width: auto;\n}",
      email: ".emoji[data-set-id=\"" + defaultSetUUID + "\"] {\n  vertical-align: middle;\n  height: 20px;\n  width: auto;\n}"
    }
  }]
};

/*===================================================== Exports  =====================================================*/

exports = module.exports = new Settings(id, packageJSON.version, defaultSettings, resolveInit, dev, false);

exports.urlBase = nconf.get("url") + "/plugins/@{name}/static";
exports.name = "@{name}";
exports.id = "@{id}";
exports.Id = "@{Id}";
exports.iD = "@{iD}";
exports.ID = "@{ID}";
exports.dev = dev;
exports.env = env;
exports.pkg = packageJSON;
exports.init = initDefer.promise;

/*==================================================== Functions  ====================================================*/

function resolveInit(err) { if (err == null) { initDefer.resolve(exports); } else { initDefer.reject(err); } }
