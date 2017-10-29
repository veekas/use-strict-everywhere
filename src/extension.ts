'use strict';

import { window, commands, ExtensionContext, workspace, SnippetString, Position, Uri, TextDocument, WorkspaceEdit, TextEdit, Range } from 'vscode';
// import utils from './utils.js';

export function activate (context: ExtensionContext) {

    // don't do anything if a directory isn't open
    // if (!workspace.textDocuments.length) {
    //     window.showInformationMessage('Please open a directory before running Use Strict Everywhere.');
    //     return;
    // }

    let addUseStrict = commands.registerCommand('extension.use-strict-everywhere', () => {

        const createPosition = (line, char) => new Position(line, char);
        const createRange = (start, end) => new Range(start, end);
        const createTextEdit = (range, newText) => new TextEdit(range, newText);
        const createWorkspaceEdit = () => new WorkspaceEdit();

        const createEdit = (coords, newText) => {
            const start = createPosition(coords.start.line, coords.start.char);
            const end = createPosition(coords.end.line, coords.end.char);
            const range = createRange(start, end);
            return createTextEdit(range, newText);
        };

        const setEdit = (uri, coords, newText) => {
            let workspaceEdit = createWorkspaceEdit();
            const edit = createEdit(coords, newText);
            workspaceEdit.set(uri, [edit]);
            return workspaceEdit;
        };

        // const openDoc = uri => workspace.openTextDocument(uri);

        // const getText = doc =>

        // const getText =

        // const checkForMatch = (uri, coords, matchText) => {
        //         .then(doc => doc.getText(range))
        //         .then(text => {
        //             console.log(text, 'is a match:', text === matchText);
        //             return text === matchText
        //         })
        // };

        const applyEditsAndSave = async (uri, coords, newText) => {
            // let match = await checkForMatch(uri, useStrictCoords, 'use strict');
            // if (!match) {
            // workspace.openTextDocument(uri);
            const edit = setEdit(uri, coords, newText);
            workspace.applyEdit(edit)
                .then(save => workspace.saveAll())

            // } else return;
        };

        const flattenArray = (array, result) => {
            for (let i = 0; i < array.length; i++) {
                Array.isArray(array[i])
                    ? flattenArray(array[i], result)
                    : result.push(array[i]);
            };
            return result;
        };

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

        let useStrictCoords = {
            start: {
                line: 0,
                char: 1
            },
            end: {
                line: 0,
                char: 11
            }
        };

        const useStrict = `'use strict';\n\n`;
        const nodeModules = '**/node_modules/**';

        const jsFiles = workspace.findFiles('**/*.js', nodeModules, 100);
        const tsFiles = workspace.findFiles('**/*.ts', nodeModules, 100);
        const jsxFiles = workspace.findFiles('**/*.jsx', nodeModules, 100);

        Promise.all([jsFiles, tsFiles, jsxFiles])
            .then(foundFiles => flattenArray(foundFiles, []))
            .then(uris => {
                if (!uris.length || !uris) {
                    window.showInformationMessage('There are no javascript files to modify.');
                }
                // console.log('These files will be modified:', uris);
                return uris.forEach(uri => {
                    return applyEditsAndSave(uri, startOfDoc, useStrict);
                    // save the document!
                });
                // console.log(uris.length);
                // console.log(Object.getOwnPropertyNames(uris));
                // for (let i = 0; i < uris.length; i++) {
                //     if (!workspace.textDocuments[i]) return;
                //     console.log(workspace.textDocuments[i].lineAt(0).text);
                // };
            })
            // .then(uris => uris.forEach(file => workspace.saveAll(false))
            .catch(error => console.error('addUseStrict action failed:', error));

        // workspace.saveAll(false);

        // Display a message box to the user
        window.showInformationMessage('You are now using strict mode across your workspace.');
    });

    context.subscriptions.push(addUseStrict);
}
