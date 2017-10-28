'use strict';

import * as vscode from 'vscode';
import { ExtensionContext, workspace, SnippetString, Position, Uri, TextDocument, WorkspaceEdit, TextEdit, Range } from 'vscode'; // WorkspaceEdit,
// import * as fs from 'fs';

export function activate (context: ExtensionContext) {

    // don't do anything if a workspace folder isn't open
    // if (!workspace) return;

    console.log('strict mode activated');

    // looks for newly created
    // const jsWatcher =
        // workspace.createFileSystemWatcher('/\.jsx?$/', false, true, true);

    let addUseStrict = vscode.commands.registerCommand('extension.use-strict-everywhere', () => {

        // workspace.findFiles('**/*.js', '', 100).then(r => console.log(r));

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

        // const currentDoc = vscode.window.activeTextEditor;
        // const jsFiles = workspace.findFiles('**∕*.js', '**∕node_modules∕**', 10);
        // const jsFiles = workspace.findFiles(`*.{ts,js,jsx}`);
        // const useStrict = new SnippetString().appendText(`'use strict';\n\n`);

        // let startOfDoc = new Position(0, 0);
        // let startOfDoc = createPosition(0, 0);
        // let startRange = createRange(startOfDoc, startOfDoc)
        // let textEdit = createTextEdit(startRange, useStrict);
        // let newWorkspaceEdit = new WorkspaceEdit();

        const useStrict = `'use strict';\n\n`;

        const createPosition = (line, char) => new Position(line, char);

        const createRange = (start, end) => new Range(start, end);

        const createTextEdit = (range, content) => new TextEdit(range, content);

        const createEdits = (coords, content) => {
            const start = createPosition(coords.start.line, coords.start.char);
            const end = createPosition(coords.end.line, coords.end.char);
            const range = createRange(start, end);
            return createTextEdit(range, content);
        }

        const createWorkspaceEdit = () => new WorkspaceEdit();

        const setEdits = (uri, coords, content) => {
            let workspaceEdit = createWorkspaceEdit();
            const edit = createEdits(coords, content);
            workspaceEdit.set(uri, [edit]);
            return workspaceEdit;
        }

        // function getDocument(vsEditor) {
        //     return typeof vsEditor._documentData !== 'undefined' ? vsEditor._documentData : vsEditor._document
        // }

        function applyEdit(uri, coords, content) { // vsEditor instead of uri
            // const vsDocument = getDocument(vsEditor);
            const edit = setEdits(uri, coords, content); // vsDocument._uri instead of uri
            vscode.workspace.applyEdit(edit);
        }

        let startOfDoc = {
            start: {
                line: 0,
                char: 0
            },
            end: {
                line: 0,
                char: 0
            }
        };

        workspace.findFiles('**/*.js', '**/node_modules/**', 100)
            .then(files => {
                if (!files.length || !files) {
                    console.error('There are no .js files to modify.');
                } else {
                    console.log('These are the files that will be modified:', files);
                    return files.forEach(file => {
                        // console.log(Uri.parse(file));
                        return applyEdit(file, startOfDoc, useStrict)
                    });
                }
            });


        // currentDoc.insertSnippet(useStrict, startOfDoc);

    });

    context.subscriptions.push(addUseStrict);

    // Display a message box to the user
    // vscode.window.showInformationMessage('You are now using strict mode across your workspace.');
}

// files.map(file =>
