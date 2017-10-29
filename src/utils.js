// 'use strict';

// import { window, commands, ExtensionContext, workspace, SnippetString, Position, Uri, TextDocument, WorkspaceEdit, TextEdit, Range } from 'vscode';

// const createPosition = (line, char) => new Position(line, char);

// const createRange = (start, end) => new Range(start, end);

// const createTextEdit = (range, content) => new TextEdit(range, content);

// const createEdits = (coords, content) => {
//   const start = createPosition(coords.start.line, coords.start.char);
//   const end = createPosition(coords.end.line, coords.end.char);
//   const range = createRange(start, end);
//   return createTextEdit(range, content);
// };

// const createWorkspaceEdit = () => new WorkspaceEdit();

// const setEdits = (uri, coords, content) => {
//   let workspaceEdit = createWorkspaceEdit();
//   const edit = createEdits(coords, content);
//   workspaceEdit.set(uri, [edit]);
//   return workspaceEdit;
// };

// const applyEdit = (uri, coords, content) => {
//   const edit = setEdits(uri, coords, content);
//   workspace.applyEdit(edit);
// };
