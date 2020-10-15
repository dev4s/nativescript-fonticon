"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fonticon = exports.TNSFontIcon = void 0;
var core_1 = require("@nativescript/core");
var lib = require("./lib");
var TNSFontIcon = (function () {
    function TNSFontIcon() {
    }
    TNSFontIcon.loadCss = function () {
        var cnt = 0;
        var currentName;
        var fontIconCollections = Object.keys(TNSFontIcon.paths);
        if (TNSFontIcon.debug) {
            console.log("Collections to load: " + fontIconCollections);
        }
        var initCollection = function () {
            currentName = fontIconCollections[cnt];
            TNSFontIcon.css[currentName] = {};
        };
        var loadFile = function (path) {
            if (TNSFontIcon.debug) {
                console.log('----------');
                console.log("Loading collection '" + currentName + "' from file: " + path);
            }
            try {
                var cssFile = core_1.knownFolders.currentApp().getFile(path).readTextSync();
                var mapCss = lib.mapCss(cssFile, TNSFontIcon.debug);
                TNSFontIcon.css[currentName] = mapCss;
                return Promise.resolve();
            }
            catch (e) {
                return Promise.reject(e);
            }
        };
        var loadFiles = function () {
            return new Promise(function (resolve) {
                initCollection();
                if (cnt < fontIconCollections.length) {
                    loadFile(TNSFontIcon.paths[currentName]).then(function () {
                        cnt++;
                        return loadFiles().then(function () {
                            resolve();
                        });
                    });
                }
                else {
                    resolve();
                }
            });
        };
        return loadFiles();
    };
    TNSFontIcon.css = {};
    TNSFontIcon.paths = {};
    TNSFontIcon.debug = false;
    return TNSFontIcon;
}());
exports.TNSFontIcon = TNSFontIcon;
function fonticon(value) {
    if (value) {
        if (value.indexOf('-') > -1) {
            var prefix = value.split('-')[0];
            return TNSFontIcon.css[prefix][value];
        }
        else {
            console.log('Fonticon classname did not contain a prefix. i.e., \'fa-bluetooth\'');
        }
    }
    return value;
}
exports.fonticon = fonticon;
//# sourceMappingURL=nativescript-fonticon.js.map