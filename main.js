/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

// Re-indent the open document according to your current indentation settings.
define(function (require, exports, module) {
    "use strict";

    var CommandManager     = brackets.getModule("command/CommandManager"),
        EditorManager      = brackets.getModule("editor/EditorManager"),
        PreferencesManager = brackets.getModule("preferences/PreferencesManager"),
        Menus              = brackets.getModule("command/Menus"),
        COMMAND_ID         = "indentator.autoIndent";

    function autoIndent() {
        // Get the editor and document.
        var editor = EditorManager.getFocusedEditor();
        if (!editor) {
            return;
        }
        var doc = editor._codeMirror;

        // Update the editor with the current indent settings.
        doc.setOption("indentUnit", PreferencesManager.get("spaceUnits"));
        doc.setOption("tabSize", PreferencesManager.get("tabSize"));
        doc.setOption("indentWithTabs", PreferencesManager.get("useTabChar"));

        // Indent each line of the document.
        doc.eachLine(function (line) {
            doc.indentLine(line.lineNo(), "smart");
        });
    }

    CommandManager.register("Indent Document", COMMAND_ID, autoIndent);

    var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
    menu.addMenuItem(COMMAND_ID, [{ "key": "Ctrl-Alt-I" }, { "key": "Ctrl-Alt-I", "platform": "mac" }]);
});
