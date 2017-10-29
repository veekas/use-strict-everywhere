'use strict';

import { window, commands, ExtensionContext, workspace, SnippetString, Position, Uri, TextDocument, WorkspaceEdit, TextEdit, Range } from 'vscode';

export function activate (context: ExtensionContext) {

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

        const applyEditsAndSave = async (uri, coords, newText) => {
            const edit = setEdit(uri, coords, newText);
            workspace.applyEdit(edit)
                .then(save => workspace.saveAll())
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
                    return uris.forEach(uri => {
                        return applyEditsAndSave(uri, startOfDoc, useStrict);
                    });
                }
            })
            .catch(error => console.error('addUseStrict action failed:', error));

        // Display a message box to the user
        window.showInformationMessage('You are now using strict mode across your workspace.');
    });

    context.subscriptions.push(addUseStrict);
}
