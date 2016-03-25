"use strict";

let _ = require("lodash");
let Q = require("q");
let fs = require("fs");
let path = require("path");
let wrench = require("wrench");

let fsCommons = require("nodebb-plugin-emoji-extended/lib/commons/fs");
let indexCommons = require("nodebb-plugin-emoji-extended/lib/commons/index");
let parserCommons = require("nodebb-plugin-emoji-extended/lib/commons/parser");
let settings = require("../settings");

const URL = settings.urlBase + "/images";
const NODEBB_DIR = path.dirname(require.main.filename); // root directory of NodeBB
const ASSETS_PATH = path.resolve(path.dirname(module.filename), "../../public/static/images");

let indexBuilder = _.partial(indexCommons, require("glob"), require("image-size"));

/*===================================================== Exports  =====================================================*/

module.exports = Instance;

/*==================================================== Functions  ====================================================*/

/*----------------------------------------------------- Instance -----------------------------------------------------*/

function Instance(data) {
  // export data not relevant for emoji-extended
  this.id = data.id;
  this.assetsPath = ASSETS_PATH + "/" + this.id;
  this.indexPath = path.resolve(NODEBB_DIR, data.index);
  this.index = null;
  this.dataById = {};
  // export static data
  this.moduleId = settings.name;
  this.name = data.name;
  this.description = data.description;
  this.attribution = data.attribution || null;
  this.license = data.license || null;
  this.mainStyles = data.styles.main || null;
  this.emailStyles = data.styles.email || null;
  this.url = getURL(this.id);
  this.preview = null;
  this.mapping = null; // TODO allow admin to define mappings
  // export functions
  this.parse = _.identity; // temporary, should not get called anyways
  this.purge = Q.denodeify(_.partial(fs.unlink, this.assetsPath));
}

Instance.prototype.use = function (options) {
  let self = this;
  options.attributes.width = function () { return self.widthAttribute.apply(self, arguments); };
  options.attributes.height = function () { return self.heightAttribute.apply(self, arguments); };
  // ensure index exists and link is up-to-date
  let promise = this.index != null && this.prepared() ? Q.when() : this.updateFlow();
  return promise
      .then(function (result) {
        if (result != null) { self.index = result; }
        // generate emoji list
        return self.generateList()
            .then(function (emoji) {
              options.list = _.map(emoji, "id");
              options.parser = _.partial(parserCommons.parserWithIndex, self.dataById);
              // export new parse function
              self.parse = parserCommons.genParser(URL + "/" + self.id, options);
              return emoji;
            });
      });
};

Instance.prototype.generateList = function () {
  let self = this;
  return indexBuilder(this.index, this.assetsPath)
      .then(function (result) {
        _.assign(self.dataById, result.dataById);
        return result.list;
      });
};

Instance.prototype.update = function () {
  let self = this;
  return self.updateFlow()
      .then(function (result) {
        if (result != null) { self.index = result; }
        return self.generateList();
      });
};

Instance.prototype.updateFlow = function () {
  let self = this;
  let index = JSON.parse(fs.readFileSync(self.indexPath));
  let targetPath = path.resolve(path.dirname(self.indexPath), index.cwd || "./");
  return Q
      .nfcall(fs.realpath, self.assetsPath)
      .then(function (resolved) {
            if (resolved === targetPath) return true;
	    else return Q
                .nfcall(fs.unlink, self.assetsPath)
                .then(_.constant(false));
          },
          function () { wrench.mkdirSyncRecursive(path.dirname(self.assetsPath)); return false; })
      .then(function (ok) {
            if (ok) return;
            return Q.nfcall(fs.symlink, targetPath, self.assetsPath, "dir");
          })
      .then(function () { return _.constant(index); });
};

Instance.prototype.widthAttribute = function (ignored, name) { return this.dataById[name].width; };

Instance.prototype.heightAttribute = function (ignored, name) { return this.dataById[name].height; };

Instance.prototype.valid = function () {
  try {
    JSON.parse(fs.readFileSync(this.indexPath));
    return true;
  } catch (e) {
    return false;
  }
};

Instance.prototype.prepared = function () {
  try {
    fsCommons.accessSync(this.assetsPath, fs.F_OK);
    return fs.lstatSync(this.assetsPath).isSymbolicLink();
  } catch (e) {
    return false;
  }
};

/*------------------------------------------------------ Utils  ------------------------------------------------------*/

function getURL(id) { return [settings.urlBase + "/images/" + id + "/", {key: "file", encode: true}]; }
