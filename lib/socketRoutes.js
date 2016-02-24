"use strict";

let sets = require("./sets/controller");
let settings = require("./settings");

/*===================================================== Exports  =====================================================*/

module.exports.init = function () { initAdminSockets(require.main.require("./src/socket.io/admin")); };

/*==================================================== Functions  ====================================================*/

/*-------------------------------------------------- Initialization --------------------------------------------------*/

function initAdminSockets(Socket) {
  Socket.settings["sync" + settings.Id] = syncSettings;
}

/*-------------------------------------------------- Socket Handler --------------------------------------------------*/

function syncSettings(ignore, ignored, cb) {
  settings.sync(function (err) {
    if (err != null) { return cb(err); }
    sets
        .refresh()
        .done(function () { cb(); }, cb);
  });
}
