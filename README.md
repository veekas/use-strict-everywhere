# Use Strict Everywhere

This extention adds a 'use strict' string to the beginning of every javascript, extendscript, and typescript document in your project directory and saves each document.

To learn more about the benefits of strict mode, [see MDN's explanation here.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)

## Features

Describe specific features of your extension including screenshots of your extension in action. Image paths are relative to this README file.

For example if there is an image subfolder under your extension project workspace:

\!\[feature X\]\(images/feature-x.png\)

> Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow.

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: enable/disable this extension
* `myExtension.thing`: set to `blah` to do something

## Known Issues

* adds 'use strict' to documents already using strict mode in document scope

<!-- ## Release Notes

Users appreciate release notes as you update your extension. -->

### 1.0.0

Initial release of Use Strict Everywhere. Right now it is a blunt tool that indiscriminately adds 'use strict' to the document scope of every .js, .jsx, and .ts file. See "TODO" for planned modifications.


-----------------------------------------------------------------------------------------------------------

## TODO

* does not add 'use strict' when it already exists in document scope
* command to remove all 'use strict'
* undo option?
* confirmation before saving
* choose file formats to modify (e.g. omit .ts files, include .json)
