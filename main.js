/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

// Indentator indents each line in the open document according to your current
// preferences (i.e. tabs vs spaces, 2/4/8 spaces).
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
        var tabSize = PreferencesManager.get("tabSize");
        var spaceUnits = PreferencesManager.get("spaceUnits");
        var useTabChar = PreferencesManager.get("useTabChar");
        doc.setOption("indentUnit", spaceUnits);
        doc.setOption("tabSize", tabSize);
        doc.setOption("indentWithTabs", useTabChar);

        // Indent each line of the document.
        doc.eachLine(function (line) {
            doc.indentLine(line.lineNo(), "smart");
        });
    }

    CommandManager.register("Indent Document", COMMAND_ID, autoIndent);

    var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
    menu.addMenuItem(COMMAND_ID, [{ "key": "Ctrl-Alt-I" }, { "key": "Ctrl-Alt-I", "platform": "mac" }]);
});
