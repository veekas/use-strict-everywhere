'use strict';

import * as vscode from 'vscode';
import { ExtensionContext, workspace, WorkspaceEdit, Position } from 'vscode';

export function activate(context: ExtensionContext) {

    // don't do anything if a workspace folder isn't open
    if (!workspace) return;

    console.log('strict mode activated');

    // looks for newly created
    // const jsWatcher =
        // workspace.createFileSystemWatcher('/\.jsx?$/', false, true, true);

    let addUseStrict = vscode.commands.registerCommand('extension.use-strict-everywhere', () => {

        let newWorkspaceEdit = new WorkspaceEdit();
        let startOfDoc = new Position(0, 0);
        let useStrict = '\'use strict\'\;\n\n'

        // find all .js or .jsx files
        workspace.findFiles('/\.jsx?$/')
            // insert 'use strict'
            .then(files => files.map(uri => workspace.applyEdit(newWorkspaceEdit.insert(uri, startOfDoc, useStrict))))
            // save all files
            .then(updatedFiles => workspace.saveAll(false));

        // Display a message box to the user
        vscode.window.showInformationMessage('You are now using strict mode across your workspace.');
    });

    context.subscriptions.push(addUseStrict);
}

// files.map(file =>
