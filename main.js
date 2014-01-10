/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

// Indentator indents each line in the open document according to your current
// preferences (i.e. tabs vs spaces, 2/4/8 spaces).
define(function (require, exports, module) {
    "use strict";
    
    var CommandManager = brackets.getModule("command/CommandManager"),
        EditorManager  = brackets.getModule("editor/EditorManager"),
        Menus          = brackets.getModule("command/Menus"),
        COMMAND_ID     = "indentator.autoIndent";
    
    function autoIndent() {
        var editor = EditorManager.getFocusedEditor();
        if (!editor) {
            return;
        }
        var doc = editor._codeMirror,
            lines = doc.lineCount(),
            index;
        for (index = 0; index < lines; index++) {
            doc.indentLine(index);
        }
    }
    
    CommandManager.register("Indent Document", COMMAND_ID, autoIndent);
    
    var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
    menu.addMenuItem(COMMAND_ID, [{ "key": "Ctrl-Alt-I" }, { "key": "Ctrl-Alt-I", "platform": "mac" }]);
});