'use strict';

import * as vscode from 'vscode';
import { ExtensionContext, workspace, SnippetString, Position } from 'vscode'; // WorkspaceEdit,
// import * as fs from 'fs';

export function activate (context: ExtensionContext) {

    // don't do anything if a workspace folder isn't open
    // if (!workspace) return;

    console.log('strict mode activated');

    // looks for newly created
    // const jsWatcher =
        // workspace.createFileSystemWatcher('/\.jsx?$/', false, true, true);

    let addUseStrict = vscode.commands.registerCommand('extension.use-strict-everywhere', () => {

        // let newWorkspaceEdit = new WorkspaceEdit();
        // let startOfDoc = new Position(0, 0);
        // let useStrict = `'use strict';\n\n`;

        // // find all .js or .jsx files
        // workspace.findFiles('/\.jsx?$/')
        // // insert 'use strict'
        // .then(files => {
        //     console.log('these are the files:', files);
        //     files.map(uri => workspace.applyEdit(newWorkspaceEdit.insert(uri, startOfDoc, useStrict)))
        // })
        // // save all files
        // .then(updatedFiles => workspace.saveAll(true));
        // .catch(next);

        const currentDoc = vscode.window.activeTextEditor;
        // const jsFiles = workspace.findFiles('**∕*.js', '**∕node_modules∕**', 10);
        // const jsFiles = workspace.findFiles(`*.{ts,js,jsx}`);
        const useStrict = new SnippetString().appendText(`'use strict';\n\n`);
        let startOfDoc = new Position(0, 0);

        // // console.log(jsFiles);
        // workspace.findFiles('**∕*.js', '**∕node_modules∕**', 10)
        //     .then(file => file.insertSnippet(useStrict, startOfDoc));

        currentDoc.insertSnippet(useStrict, startOfDoc);



    });

    context.subscriptions.push(addUseStrict);

    // Display a message box to the user
    // vscode.window.showInformationMessage('You are now using strict mode across your workspace.');
}

// files.map(file =>
