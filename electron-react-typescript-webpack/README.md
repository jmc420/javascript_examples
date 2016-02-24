# Electron, React, typescript and webpack example

Simple Example showing how to create a desktop app using Electron, Typescript, React (and React bootstrap) and webpack.

The example shows how IPC works between the node server process and the browser renderer process. A simple react bootstrap panel displays the messages.

## Installation

npm install.

This installs and builds everything.

## compile, build and package everything

npm run all will compile (npm run compile), build webpack bundles (npm run build), build the webapp as an 
electron app (npm run electron-build) and package it as an OSX dmg (npm run electron-package).

## Run the unbundled version

npm run start compile will start electron with an index.html which loads the javascript as commonjs modules.

Within electron both browser and main node process conveniently understand commonjs - no need to browserify or
webpack the javascript to run the code within the browser.

## Run the bundled version

npm run start-prod will start electron with an index.html which loads the javascript as a webpack bundle.

## Run the electron app

open dist/osx/Example-darwin-x64/Example.app/

## Install the dmg

open dist/osx/Example.dmg

##TODO

Windows version


