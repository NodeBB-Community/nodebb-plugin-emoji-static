"use strict";

let _ = require("lodash");
let Q = require("q");

let setsCtrl = require("nodebb-plugin-emoji-extended/lib/sets/controller");
let parser = require("nodebb-plugin-emoji-extended/lib/parser/main");
let settings = require("../settings");
let Instance = require("./Instance");

let active = [];

/*===================================================== Exports  =====================================================*/

exports.init = init;
exports.refresh = function () { return destroyAll().then(init); };

/*==================================================== Functions  ====================================================*/

function init() {
  registerAll();
  return setsCtrl
      .resetActive()
      .then(function () { parser.refresh().done(); });
}

function registerAll() {
  active = [];
  _.each(settings.get("sets"), function (s) {
    var instance = new Instance(s);
    if (instance.valid()) {
      active.push(instance);
      setsCtrl.register(instance, s.id);
    }
  });
}

function destroyAll() {
  return Q.all(_.map(active, function (instance) {
    setsCtrl.destroy(instance.id);
    if (instance.prepared()) { return instance.purge(); }
  }));
}
