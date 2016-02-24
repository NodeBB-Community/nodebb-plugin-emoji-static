/*
 * This files gets called from the admin-page of the module to handle settings.
 *
 * Files within the public/static/scripts/ directory get meta-replaced by default (thus @{...} gets resolved within the
 * grunt-tasks).
 */

require(["settings", "translator"], function (settings) {
  "use strict";

  var moduleId = "@{id}";
  var $wrapper = $("#" + moduleId + "-settings");
  var editors = {};

  settings.sync(moduleId, $wrapper, refresh);

  $wrapper.find("#" + moduleId + "-settings-save").click(function (event) {
    event.preventDefault();
    settings.persist(moduleId, $wrapper, function () { socket.emit("admin.settings.sync@{Id}"); });
  }).removeAttr("disabled");

  $wrapper.find("#" + moduleId + "-settings-reset").click(function (event) {
    event.preventDefault();
    settings.sync(moduleId, $wrapper, refresh);
  }).removeAttr("disabled");

  function refresh() {
    $wrapper.find(".panel-set").each(function (i, el) {
      var $el = $(el);
      $(el).find(".set-editor").each(function (i, editorEl) {
        var $editorEl = $(editorEl), id = $editorEl.attr("id"), editor;
        var $holder = $el.find("#" + id + "-holder");
        if (editors.hasOwnProperty(id) && editors[id].element === editorEl) {
          editor = editors[id].editor;
        } else {
          editor = ace.edit(id);
          editors[id] = {editor: editor, element: editorEl};
          editor.getSession().setMode("ace/mode/" + $editorEl.data("mode"));
          editor.on("change", function () { $holder.val(editor.getValue()); });
          editor.resize();
        }
        editor.setValue($holder.val());
        editor.selection.moveCursorFileStart();
      });
    });
  }
});
