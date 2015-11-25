chrome-extensions-reloader
==========================

So, you're developping a chrome extension ? I bet you're doing with this pattern about 3.141e+42 a day:

  1. Make a change in your code
  2. Go to chrome://extensions
  3. Find your unpacked extension
  4. Click `Reload`
  5. Go to your extension and inspect your change, debug stuff ect
  6. Repeat

So, what if you could do this:

  1. Make a change in your code
  2. Go to your extension and inspect your change, debug stuff ect
  3. Repeat


![image](http://oi67.tinypic.com/zvzrxz.jpg)

How I install this awesome stuff ? 
----------------------------------

First, you should know that i've only tested using OSX and it should also work on Linux. However i'm not brave enought to test on Windows.

Requirements
------------

1. Install `chrome-cli`

	This is script use the awesome [`chrome-cli`](https://github.com/prasmussen/chrome-cli) tool, since this CLI tool is a binary and platform dependant, you should install it before using this script. 

2. Install `chrome-extensions-reloader`, you may need `sudo`

	```
	npm install -g chrome-extensions-reloader
	```

3. Open a tab in chrome to [chrome://extensions-frame](chrome://extensions-frame) (yes, `extensions-frame`, not `extensions`) 


Usage:
------

### As a watcher:

chrome-extensions-reloader can watch a folder and reload the extension each time a change happen in this folder.

Go to your project root directoy: 

```
$ cd my-awesome-chrome-extensions
$ chrome-extensions-reloader
>> SUCCESS	 Reloaded extensions (in tab 818)
>> SUCCESS	 Reloaded extensions (in tab 818)
[...]
```

### As a sublime-text build system

You may find that watching a folder is very slow and that's true, blame `fs.watch`. That's why with a little of Sublime Text magic you can reload the extension just by pressing `ctrl+s`

1. In Sublime Text create a new Build System: `Tools > Build System > New Build System...`
2. Add this to the Build System file

	
	```
	{
	  "shell_cmd": "chrome-extensions-reloader --single-run"
	}

	```
3. There you go, each time you press `ctrl+b` it will reload the extension

You may want to install [SublimeOnSaveBuild](https://packagecontrol.io/packages/SublimeOnSaveBuild) plugin to run the build script each time you press `ctrl+s`


FAQ
---
	
1. What does this thing do under the hood ? 
	
	This script simply inject a dumb javascript snippet which trigger a `Click()` on every **Reload** links in the *chrome://extensions tab*. That's why this tab should be open.
	
2. Does it reload every extensions ?

	This script reload every **unpackaged** extensions
	
3. Why this repository name is too long ? 

	Because letters make words and sometime there is too much letters
