# Use Strict Everywhere

This extension adds a 'use strict' string to the beginning of every javascript, extendscript, and typescript document in your project directory and saves each document. [Get it on Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=veekas.use-strict-everywhere).

To learn more about the benefits of strict mode, [see MDN's explanation here.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)

![Demo of Use Strict Everywhere](images/USE-demo.gif)

## Requirements

This extension currently has no dependencies.

## Extension Settings

This extension does not currently add or modify any VSCode settings.

## Known Issues

* adds 'use strict' to documents already listing 'use strict' on first line
* unable to undo 'use strict command'
* does not ask ofr confirmation before saving dirty files
* does not allow customization of file formats

## Release Notes

### 0.1.0

Initial release of Use Strict Everywhere. Right now it is a blunt tool that indiscriminately adds 'use strict' to first line of every .js, .jsx, and .ts file. See "TODO" for planned modifications.

----------------------------------------------------------------------------------------------------

## TODO

* do not add 'use strict' when it already exists on first line
* command to remove all 'use strict'
* undo option?
* confirmation before saving
* choose file formats to modify (e.g. omit .ts files, include .json)
