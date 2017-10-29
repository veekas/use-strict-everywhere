'use strict';

import { window, commands, ExtensionContext, workspace, SnippetString, Position, Uri, TextDocument, WorkspaceEdit, TextEdit, Range } from 'vscode';
import utils from './utils.js';

export function activate (context: ExtensionContext) {

    // don't do anything if a directory isn't open
    // if (!workspace.textDocuments.length) {
    //     window.showInformationMessage('Please open a directory before running Use Strict Everywhere.');
    //     return;
    // }

    let addUseStrict = commands.registerCommand('extension.use-strict-everywhere', () => {

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

        function applyEdit(uri, coords, content) {
            const edit = setEdits(uri, coords, content);
            workspace.applyEdit(edit);
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

        const jsFiles = workspace.findFiles('**/*.js', '**/node_modules/**', 100);
        const tsFiles = workspace.findFiles('**/*.ts', '**/node_modules/**', 100);
        const jsxFiles = workspace.findFiles('**/*.jsx', '**/node_modules/**', 100);

        const flattenArray = (array, result) => {
            for (let i = 0; i < array.length; i++) {
                Array.isArray(array[i])
                    ? flattenArray(array[i], result)
                    : result.push(array[i]);
            }
            return result;
        }

        Promise.all([jsFiles, tsFiles, jsxFiles])
            .then(foundFiles => flattenArray(foundFiles, []))
            .then(files => {
                if (!files.length || !files) {
                    console.error('There are no .js files to modify.');
                } else {
                    console.log('These files will be modified:', files);
                    return files.forEach(file => {
                        return applyEdit(file, startOfDoc, useStrict);
                    });
                }
            })
            .catch(error => console.error('addUseStrict action failed:', error));

        // Display a message box to the user
        window.showInformationMessage('You are now using strict mode across your workspace.');
    });

    context.subscriptions.push(addUseStrict);
}
