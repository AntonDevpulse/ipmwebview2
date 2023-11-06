/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/api */ "./src/lib/api.ts");

var api = new _lib_api__WEBPACK_IMPORTED_MODULE_0__.Api().api;
if (Object.keys(api).length) {
    window.desktopApi = api;
}


/***/ }),

/***/ "./src/lib/api.ts":
/*!************************!*\
  !*** ./src/lib/api.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Api": function() { return /* binding */ Api; }
/* harmony export */ });
/* harmony import */ var _initializer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./initializer */ "./src/lib/initializer.ts");
/* harmony import */ var _utils_createInstance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/createInstance */ "./src/lib/utils/createInstance.ts");
/* harmony import */ var _data_mapApi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data/mapApi */ "./src/lib/data/mapApi.ts");



/**
 * Main class.
 * Initialize API version and API type
 * Prepare global 'desktopApi' object with namespaces and methods
 * for use as window.desktopApi.{{namespace}}.{{methodName}}
 * e.g. window.desktopApi.window.close();
 */
var Api = /** @class */ (function () {
    function Api() {
        /**
         * Loop through map and set required methods for respective API version and API type
         */
        this._setApi = function () {
            var initializer = new _initializer__WEBPACK_IMPORTED_MODULE_0__.Initializer(), context = initializer.context, version = initializer.engine.version, type = initializer.engine.type, map = _data_mapApi__WEBPACK_IMPORTED_MODULE_2__.mapApi, api = {};
            //check if api exist for given type and version
            if (map[type] !== undefined && map[type][version] !== undefined) {
                //loop through each object
                map[type][version].objects.forEach(function (className) {
                    //get object class
                    var currentClass = (0,_utils_createInstance__WEBPACK_IMPORTED_MODULE_1__.createInstance)(className);
                    var classNameLower = className.toLowerCase();
                    //create class instance
                    var classInstance = new currentClass(context, version, type);
                    //get object instance methods
                    api[classNameLower] = classInstance.getMethods();
                });
            }
            return api;
        };
        this.api = this._setApi();
    }
    return Api;
}());



/***/ }),

/***/ "./src/lib/data/contextList.ts":
/*!*************************************!*\
  !*** ./src/lib/data/contextList.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "contextList": function() { return /* binding */ contextList; }
/* harmony export */ });
var contextList = [
    'chrome.webview',
    'external'
];


/***/ }),

/***/ "./src/lib/data/mapApi.ts":
/*!********************************!*\
  !*** ./src/lib/data/mapApi.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mapApi": function() { return /* binding */ mapApi; }
/* harmony export */ });
var mapApi = {
    "Engine": {
        "4.0.0": {
            "objects": [
                "Utils",
                "Window",
                "Products",
                "AppInfo",
                "Downloader" //object downloader + download + tray
            ]
        },
        "3.2.0": {
            "objects": [
                "Utils",
                "Window",
                "Products",
                "Downloader"
            ]
        },
        "3.1.0": {
            "objects": [
                "Utils",
                "Window",
                "Products",
                "Downloader"
            ]
        },
        "3.0.0": {
            "objects": [
                "Utils",
                "Window",
                "Products",
                "Downloader"
            ]
        },
        "2.0.0": {
            "objects": [
                "Utils",
                "Window",
                "Products",
                "Downloader"
            ]
        },
        "1.0.0": {
            "objects": [
                "Utils",
                "Window",
                "Products",
                "Downloader"
            ]
        }
    },
    "Tray": {
        "1.0.0": {
            "objects": [
                "Utils",
                "Window",
                "Downloader"
            ]
        }
    }
};


/***/ }),

/***/ "./src/lib/dispatcher.ts":
/*!*******************************!*\
  !*** ./src/lib/dispatcher.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Dispatcher": function() { return /* binding */ Dispatcher; }
/* harmony export */ });
/**
 * Dispatch method call with scope context and arguments
 */
var Dispatcher = /** @class */ (function () {
    function Dispatcher(versionObject) {
        var _this = this;
        this.dispatch = function (func, args) {
            if (_this._hasFunction(func)) {
                return _this._versionObject[func].call(_this._versionObject, args);
            }
            else {
                throw new Error('Function not exist.');
            }
        };
        this._hasFunction = function (func) {
            return (typeof _this._versionObject[func] === "function");
        };
        this._versionObject = versionObject;
    }
    return Dispatcher;
}());



/***/ }),

/***/ "./src/lib/initializer.ts":
/*!********************************!*\
  !*** ./src/lib/initializer.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Initializer": function() { return /* binding */ Initializer; }
/* harmony export */ });
/* harmony import */ var _data_contextList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data/contextList */ "./src/lib/data/contextList.ts");
/* harmony import */ var _objects_engine_engine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./objects/engine/engine */ "./src/lib/objects/engine/engine.ts");


/**
 * Checks what JS API injected and set engine type, engine version and context
 * Context could be 'window.external' or 'window.chrome.webview2'
 */
var Initializer = /** @class */ (function () {
    function Initializer() {
        this.context = window.external; //default value
        this._contextList = _data_contextList__WEBPACK_IMPORTED_MODULE_0__.contextList;
        for (var i = 0; i < this._contextList.length; i++) {
            if (window[this._contextList[i]] !== undefined && this._contextList[i] !== this.context) {
                this.context = window[this._contextList[i]];
                break;
            }
        }
        this.engine = new _objects_engine_engine__WEBPACK_IMPORTED_MODULE_1__.Engine(this.context);
    }
    return Initializer;
}());



/***/ }),

/***/ "./src/lib/objects/appinfo/appInfo.ts":
/*!********************************************!*\
  !*** ./src/lib/objects/appinfo/appInfo.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppInfo": function() { return /* binding */ AppInfo; }
/* harmony export */ });
/* harmony import */ var _baseObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../baseObject */ "./src/lib/objects/baseObject.ts");
/* harmony import */ var _dispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../dispatcher */ "./src/lib/dispatcher.ts");
/* harmony import */ var _appInfoEngine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./appInfoEngine */ "./src/lib/objects/appinfo/appInfoEngine.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



/**
 * applicationInfo object implements access to the application information.
 * In particular, product code, language, build id, days and time since installation, application version.
 * Use objects: applicationInfo
 * Supported since: 4.0.0
 */
var AppInfo = /** @class */ (function (_super) {
    __extends(AppInfo, _super);
    function AppInfo(context, version, type) {
        var _this = _super.call(this, context, version, type) || this;
        /**
         * Retrieves product version of the application that has initiated in-product message check.
         * Since: 4.0.0
         */
        _this.getApplicationVersion = function () {
            return _this._dispatcher.dispatch("getApplicationVersion", []);
        };
        /**
         * Retrieves product build id of the application that has initiated in-product message check.
         * Since: 4.0.0
         */
        _this.getBuildId = function () {
            return _this._dispatcher.dispatch("getBuildId", []);
        };
        /**
         * Retrieves days since install of the application that has initiated in-product message check.
         * Since: 4.0.0
         */
        _this.getDaysSinceInstall = function () {
            return _this._dispatcher.dispatch("getDaysSinceInstall", []);
        };
        /**
         * Retrieves application language code for the language that the application is set up to run in.
         * Since: 4.0.0
         */
        _this.getLanguageCode = function () {
            return _this._dispatcher.dispatch("getLanguageCode", []);
        };
        /**
         * Retrieves minutes since install of the application that has initiated in-product message check.
         * Since: 4.0.0
         */
        _this.getMinutesSinceInstall = function () {
            return _this._dispatcher.dispatch("getMinutesSinceInstall", []);
        };
        /**
         * Retrieves product code of the application that has initiated in-product message check.
         * Since: 4.0.0
         */
        _this.getProductCode = function () {
            return _this._dispatcher.dispatch("getProductCode", []);
        };
        _this.versionObject = new _appInfoEngine__WEBPACK_IMPORTED_MODULE_2__.AppInfoEngine(context, version);
        _this._dispatcher = new _dispatcher__WEBPACK_IMPORTED_MODULE_1__.Dispatcher(_this.versionObject);
        return _this;
    }
    return AppInfo;
}(_baseObject__WEBPACK_IMPORTED_MODULE_0__.BaseObject));



/***/ }),

/***/ "./src/lib/objects/appinfo/appInfoEngine.ts":
/*!**************************************************!*\
  !*** ./src/lib/objects/appinfo/appInfoEngine.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppInfoEngine": function() { return /* binding */ AppInfoEngine; }
/* harmony export */ });
/* harmony import */ var _utils_versioncompare__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/versioncompare */ "./src/lib/utils/versioncompare.js");
/* harmony import */ var _appInfoVersion_4_0_0__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./appInfoVersion_4_0_0 */ "./src/lib/objects/appinfo/appInfoVersion_4_0_0.ts");


/**
 * Helper Wrapper Class
 * Check version and return versioned class instance
 */
var AppInfoEngine = /** @class */ (function () {
    function AppInfoEngine(context, version) {
        if ((0,_utils_versioncompare__WEBPACK_IMPORTED_MODULE_0__.versionCompare)(version, '4.0.0', '>=')) {
            return new _appInfoVersion_4_0_0__WEBPACK_IMPORTED_MODULE_1__.AppInfoVersion_4_0_0(context);
        }
    }
    return AppInfoEngine;
}());



/***/ }),

/***/ "./src/lib/objects/appinfo/appInfoVersion_4_0_0.ts":
/*!*********************************************************!*\
  !*** ./src/lib/objects/appinfo/appInfoVersion_4_0_0.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppInfoVersion_4_0_0": function() { return /* binding */ AppInfoVersion_4_0_0; }
/* harmony export */ });
/* harmony import */ var _baseContextObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../baseContextObject */ "./src/lib/objects/baseContextObject.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

/**
 * applicationInfo object implements access to the application information.
 * In particular, product code, language, build id, days and time since installation, application version.
 * Use objects: applicationInfo
 * Supported since: 4.0.0
 */
var AppInfoVersion_4_0_0 = /** @class */ (function (_super) {
    __extends(AppInfoVersion_4_0_0, _super);
    function AppInfoVersion_4_0_0(context) {
        var _this = _super.call(this, context) || this;
        /**
         * Retrieves product version of the application that has initiated in-product message check.
         */
        _this.getApplicationVersion = function () {
            // @ts-ignore
            return _this.context.applicationInfo.getApplicationVersion();
        };
        /**
         * Retrieves product build id of the application that has initiated in-product message check.
         */
        _this.getBuildId = function () {
            // @ts-ignore
            return _this.context.applicationInfo.getBuildId();
        };
        /**
         * Retrieves days since install of the application that has initiated in-product message check.
         */
        _this.getDaysSinceInstall = function () {
            // @ts-ignore
            return _this.context.applicationInfo.getDaysSinceInstall();
        };
        /**
         * Retrieves application language code for the language that the application is set up to run in.
         */
        _this.getLanguageCode = function () {
            // @ts-ignore
            return _this.context.applicationInfo.getLanguageCode();
        };
        /**
         * Retrieves minutes since install of the application that has initiated in-product message check.
         */
        _this.getMinutesSinceInstall = function () {
            // @ts-ignore
            return _this.context.applicationInfo.getMinutesSinceInstall();
        };
        /**
         * Retrieves product code of the application that has initiated in-product message check.
         */
        _this.getProductCode = function () {
            // @ts-ignore
            return _this.context.applicationInfo.getProductCode();
        };
        return _this;
    }
    return AppInfoVersion_4_0_0;
}(_baseContextObject__WEBPACK_IMPORTED_MODULE_0__.BaseContextObject));



/***/ }),

/***/ "./src/lib/objects/baseContextObject.ts":
/*!**********************************************!*\
  !*** ./src/lib/objects/baseContextObject.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseContextObject": function() { return /* binding */ BaseContextObject; }
/* harmony export */ });
/**
 * Base class for versioned objects inheritance
 */
var BaseContextObject = /** @class */ (function () {
    function BaseContextObject(context) {
        this.context = context;
    }
    return BaseContextObject;
}());



/***/ }),

/***/ "./src/lib/objects/baseObject.ts":
/*!***************************************!*\
  !*** ./src/lib/objects/baseObject.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseObject": function() { return /* binding */ BaseObject; }
/* harmony export */ });
/**
 * Base class for inheritance
 */
var BaseObject = /** @class */ (function () {
    function BaseObject(context, version, type) {
        var _this = this;
        this.versionObject = {};
        /**
         * Return all versioned class methods
         * Helpful to have only available methods
         * in the global namespace
         * e.g. window.desktopApi.Window[method_name]
         */
        this.getMethods = function () {
            var methods = {}, 
            /**
             * To be compatible with old IE
             * this can be done in other way to not use polyfills for
             * `Object.getOwnPropertyNames` and `Array.filter`
            */
            //todo redone for old IE to exclude polyfills
            methodNames = Object.getOwnPropertyNames(_this.versionObject).filter(function (item) { return typeof _this.versionObject[item] === 'function'; });
            for (var i = 0; i < methodNames.length; i++) {
                methods[methodNames[i]] = _this.versionObject[methodNames[i]];
            }
            return methods;
        };
        this.context = context;
        this.version = version;
        this.type = type;
    }
    return BaseObject;
}());



/***/ }),

/***/ "./src/lib/objects/downloader/callbackObject.ts":
/*!******************************************************!*\
  !*** ./src/lib/objects/downloader/callbackObject.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CallbackObject": function() { return /* binding */ CallbackObject; }
/* harmony export */ });
/**
 * Callback object helps to communicate with C++ async download
 * C++ expect IDispatch type object that will be used for notifying caller about download progress.
 */
var CallbackObject = /** @class */ (function () {
    function CallbackObject() {
        this.onProgress = function (progress) { };
        this.onError = function () { };
        this.onCancelled = function () { };
        this.onFinished = function (downloadID) { };
    }
    return CallbackObject;
}());



/***/ }),

/***/ "./src/lib/objects/downloader/downloader.ts":
/*!**************************************************!*\
  !*** ./src/lib/objects/downloader/downloader.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Downloader": function() { return /* binding */ Downloader; }
/* harmony export */ });
/* harmony import */ var _baseObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../baseObject */ "./src/lib/objects/baseObject.ts");
/* harmony import */ var _dispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../dispatcher */ "./src/lib/dispatcher.ts");
/* harmony import */ var _downloaderTray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./downloaderTray */ "./src/lib/objects/downloader/downloaderTray.ts");
/* harmony import */ var _downloaderEngine__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./downloaderEngine */ "./src/lib/objects/downloader/downloaderEngine.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




/**
 * Downloader wrapper object gives interface to download file from internet and launch binary.
 * It downloads encrypted file and decrypts it with public key to prevent tampering.
 * On object destroy - download is canceled. Download object usually is destroyed on browser window close.
 * Use objects: downloader|tray|download
 * Downloader supported since: 4.0.0
 * Tray supported since: 1.0.0
 */
var Downloader = /** @class */ (function (_super) {
    __extends(Downloader, _super);
    function Downloader(context, version, type) {
        var _this = _super.call(this, context, version, type) || this;
        /**
         * Launches downloaded binary
         * @param downloadID
         * @param cmdParams
         * Supported since: 4.0.0
         */
        _this.execute = function (downloadID, cmdParams) {
            _this._dispatcher.dispatch("execute", [downloadID, cmdParams]);
        };
        /**
         * Launches downloaded binary and waits for process end
         * @param downloadID
         * @param cmdParams
         * Supported since: 4.0.0
         */
        _this.executeAndWait = function (downloadID, cmdParams) {
            _this._dispatcher.dispatch("executeAndWait", [downloadID, cmdParams]);
        };
        /**
         * Cancels a download in progress.
         * @param downloadID
         * Supported since: 4.0.0
         */
        _this.cancel = function (downloadID) {
            _this._dispatcher.dispatch("cancel", [downloadID]);
        };
        /**
         * Wrapper function to do simple download
         * @param urlObject
         * @param cmdParams
         * @param clientCallback
         * Supported since: 4.0.0
         */
        _this.downloadAndLaunch = function (urlObject, cmdParams, clientCallback) {
            if (urlObject === void 0) { urlObject = { url: "", secureUrl: "" }; }
            if (cmdParams === void 0) { cmdParams = ''; }
            return _this._dispatcher.dispatch("downloadAndLaunch", [urlObject, cmdParams, clientCallback]);
        };
        /**
         * Helper function for client.
         * Creating Callback Instance.
         * Client able to create callback object
         * and may redefine necessary methods
         * and pass it through downloadAndLaunch method e.g.
         *
         * //IE friendly code
         * var clientCallback = window.desktopApi.downloader.createCallbackInstance();
         * clientCallback.onProgress = function(progressValue){console.log(progressValue);}
         * var downloadId = window.desktopApi.downloader.downloadAndLaunch(url, cmdParam, clientCallback);
         */
        _this.createCallbackInstance = function () {
            return _this._dispatcher.dispatch("createCallbackInstance", []);
        };
        if (type === 'Tray') {
            _this.versionObject = new _downloaderTray__WEBPACK_IMPORTED_MODULE_2__.DownloaderTray(context);
        }
        else {
            _this.versionObject = new _downloaderEngine__WEBPACK_IMPORTED_MODULE_3__.DownloaderEngine(context, version);
        }
        _this._dispatcher = new _dispatcher__WEBPACK_IMPORTED_MODULE_1__.Dispatcher(_this.versionObject);
        return _this;
    }
    return Downloader;
}(_baseObject__WEBPACK_IMPORTED_MODULE_0__.BaseObject));



/***/ }),

/***/ "./src/lib/objects/downloader/downloaderEngine.ts":
/*!********************************************************!*\
  !*** ./src/lib/objects/downloader/downloaderEngine.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DownloaderEngine": function() { return /* binding */ DownloaderEngine; }
/* harmony export */ });
/* harmony import */ var _utils_versioncompare__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/versioncompare */ "./src/lib/utils/versioncompare.js");
/* harmony import */ var _downloaderVersion_4_0_0__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./downloaderVersion_4_0_0 */ "./src/lib/objects/downloader/downloaderVersion_4_0_0.ts");
/* harmony import */ var _downloaderVersion_1_0_0__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./downloaderVersion_1_0_0 */ "./src/lib/objects/downloader/downloaderVersion_1_0_0.ts");



/**
 * Helper Wrapper Class
 * Check version and return versioned class instance
 */
var DownloaderEngine = /** @class */ (function () {
    function DownloaderEngine(context, version) {
        if ((0,_utils_versioncompare__WEBPACK_IMPORTED_MODULE_0__.versionCompare)(version, '4.0.0', '>=')) {
            return new _downloaderVersion_4_0_0__WEBPACK_IMPORTED_MODULE_1__.DownloaderVersion_4_0_0(context);
        }
        else {
            return new _downloaderVersion_1_0_0__WEBPACK_IMPORTED_MODULE_2__.DownloaderVersion_1_0_0(context);
        }
    }
    return DownloaderEngine;
}());



/***/ }),

/***/ "./src/lib/objects/downloader/downloaderTray.ts":
/*!******************************************************!*\
  !*** ./src/lib/objects/downloader/downloaderTray.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DownloaderTray": function() { return /* binding */ DownloaderTray; }
/* harmony export */ });
/* harmony import */ var _baseContextObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../baseContextObject */ "./src/lib/objects/baseContextObject.ts");
/* harmony import */ var _callbackObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./callbackObject */ "./src/lib/objects/downloader/callbackObject.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


/**
 * Downloader wrapper object gives interface to download file from internet and launch binary.
 * It downloads encrypted file and decrypts it with public key to prevent tampering.
 * On object destroy - download is canceled. Download object usually is destroyed on browser window close.
 * Use objects: downloader|tray|download
 * Downloader supported since: 4.0.0
 * Tray supported since: 1.0.0
 */
var DownloaderTray = /** @class */ (function (_super) {
    __extends(DownloaderTray, _super);
    function DownloaderTray(context) {
        var _this = _super.call(this, context) || this;
        /**
         * Wrapper function to do simple download
         * @param urlObject
         * @param cmdParams | keep this for compatibility
         * @param clientCallback | keep this for compatibility
         */
        _this.downloadAndLaunch = function (urlObject, cmdParams, clientCallback) {
            if (urlObject === void 0) { urlObject = { url: "", secureUrl: "" }; }
            if (cmdParams === void 0) { cmdParams = ''; }
            var url = urlObject.url;
            if (!url) {
                throw new Error('Error while downloading. Missing url');
            }
            // @ts-ignore
            _this.context.tray.downloadAndLaunch(url);
        };
        /**
         * Helper function for client.
         * Creating Callback Instance.
         * Client able to create callback object
         * and may redefine necessary methods
         * and pass it through downloadAndLaunch method e.g.
         *
         * //IE friendly code
         * var clientCallback = window.desktopApi.downloader.createCallbackInstance();
         * clientCallback.onProgress = function(progressValue){console.log(progressValue);}
         * var downloadId = window.desktopApi.downloader.downloadAndLaunch(url, cmdParam, clientCallback);
         */
        _this.createCallbackInstance = function () {
            return new _callbackObject__WEBPACK_IMPORTED_MODULE_1__.CallbackObject();
        };
        return _this;
    }
    return DownloaderTray;
}(_baseContextObject__WEBPACK_IMPORTED_MODULE_0__.BaseContextObject));



/***/ }),

/***/ "./src/lib/objects/downloader/downloaderVersion_1_0_0.ts":
/*!***************************************************************!*\
  !*** ./src/lib/objects/downloader/downloaderVersion_1_0_0.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DownloaderVersion_1_0_0": function() { return /* binding */ DownloaderVersion_1_0_0; }
/* harmony export */ });
/* harmony import */ var _baseContextObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../baseContextObject */ "./src/lib/objects/baseContextObject.ts");
/* harmony import */ var _callbackObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./callbackObject */ "./src/lib/objects/downloader/callbackObject.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


/**
 * Downloader wrapper object gives interface to download file from internet and launch binary.
 * It downloads encrypted file and decrypts it with public key to prevent tampering.
 * On object destroy - download is canceled. Download object usually is destroyed on browser window close.
 * Use objects: process|download
 */
var DownloaderVersion_1_0_0 = /** @class */ (function (_super) {
    __extends(DownloaderVersion_1_0_0, _super);
    function DownloaderVersion_1_0_0(context) {
        var _this = _super.call(this, context) || this;
        /**
         * Launches downloaded binary
         * @param downloadID
         * @param cmdParams
         */
        _this.execute = function (downloadID, cmdParams) {
            // @ts-ignore
            _this.context.process.execute(downloadID, cmdParams);
        };
        /**
         * Launches downloaded binary and waits for process end
         * @param downloadID
         * @param cmdParams
         */
        _this.executeAndWait = function (downloadID, cmdParams) {
            // @ts-ignore
            _this.context.process.executeAndWait(downloadID, cmdParams);
        };
        /**
         * Downloads file asynchronously and decrypts it with RSA
         * @param url
         * @param notificationObject
         */
        _this._start = function (url, notificationObject) {
            // @ts-ignore
            return _this.context.download.start(url, notificationObject);
        };
        /**
         * Cancels a download in progress.
         * @param downloadID
         */
        _this.cancel = function (downloadID) {
            // @ts-ignore
            _this.context.download.cancel(downloadID);
        };
        /**
         * Wrapper function to do simple download
         * @param urlObject
         * @param cmdParams
         * @param clientCallback
         */
        _this.downloadAndLaunch = function (urlObject, cmdParams, clientCallback) {
            if (urlObject === void 0) { urlObject = { url: "", secureUrl: "" }; }
            if (cmdParams === void 0) { cmdParams = ''; }
            var callback = new _callbackObject__WEBPACK_IMPORTED_MODULE_1__.CallbackObject(), url = urlObject.url;
            var downloadID;
            if (!url) {
                throw new Error('Error while downloading. Missing url');
            }
            callback.onError = function () {
                // @ts-ignore
                if (clientCallback && (typeof clientCallback.onError === 'function')) {
                    // @ts-ignore
                    clientCallback.onError();
                }
                throw new Error('Error while downloading');
            };
            callback.onProgress = function (value) {
                // @ts-ignore
                if (clientCallback && (typeof clientCallback.onProgress === 'function')) {
                    // @ts-ignore
                    clientCallback.onProgress(value);
                }
            };
            callback.onCancelled = function () {
                // @ts-ignore
                if (clientCallback && (typeof clientCallback.onCancelled === 'function')) {
                    // @ts-ignore
                    clientCallback.onCancelled();
                }
                //cancel download by ID
                if (downloadID) {
                    _this.cancel(downloadID);
                }
            };
            callback.onFinished = function () {
                // @ts-ignore
                if (clientCallback && (typeof clientCallback.onFinished === 'function')) {
                    // @ts-ignore
                    clientCallback.onFinished(downloadID);
                }
                _this.execute(downloadID, cmdParams);
            };
            //start download
            downloadID = _this._start(url, callback);
            return downloadID;
        };
        /**
         * Helper function for client.
         * Creating Callback Instance.
         * Client able to create callback object
         * and may redefine necessary methods
         * and pass it through downloadAndLaunch method e.g.
         *
         * //IE friendly code
         * var clientCallback = window.desktopApi.downloader.createCallbackInstance();
         * clientCallback.onProgress = function(progressValue){console.log(progressValue);}
         * var downloadId = window.desktopApi.downloader.downloadAndLaunch(url, cmdParam, clientCallback);
         */
        _this.createCallbackInstance = function () {
            return new _callbackObject__WEBPACK_IMPORTED_MODULE_1__.CallbackObject();
        };
        return _this;
    }
    return DownloaderVersion_1_0_0;
}(_baseContextObject__WEBPACK_IMPORTED_MODULE_0__.BaseContextObject));



/***/ }),

/***/ "./src/lib/objects/downloader/downloaderVersion_4_0_0.ts":
/*!***************************************************************!*\
  !*** ./src/lib/objects/downloader/downloaderVersion_4_0_0.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DownloaderVersion_4_0_0": function() { return /* binding */ DownloaderVersion_4_0_0; }
/* harmony export */ });
/* harmony import */ var _baseContextObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../baseContextObject */ "./src/lib/objects/baseContextObject.ts");
/* harmony import */ var _callbackObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./callbackObject */ "./src/lib/objects/downloader/callbackObject.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


/**
 * Downloader wrapper object gives interface to download file from internet and launch binary.
 * It downloads encrypted file and decrypts it with public key to prevent tampering.
 * On object destroy - download is canceled. Download object usually is destroyed on browser window close.
 * Use objects: downloader
 * Downloader supported since: 4.0.0
 * Tray supported since: 1.0.0
 */
var DownloaderVersion_4_0_0 = /** @class */ (function (_super) {
    __extends(DownloaderVersion_4_0_0, _super);
    function DownloaderVersion_4_0_0(context) {
        var _this = _super.call(this, context) || this;
        /**
         * Launches downloaded binary
         * @param downloadID
         * @param cmdParams
         */
        _this.execute = function (downloadID, cmdParams) {
            // @ts-ignore
            _this.context.downloader.execute(downloadID, cmdParams);
        };
        /**
         * Launches downloaded binary and waits for process end
         * @param downloadID
         * @param cmdParams
         */
        _this.executeAndWait = function (downloadID, cmdParams) {
            // @ts-ignore
            _this.context.downloader.executeAndWait(downloadID, cmdParams);
        };
        /**
         * Downloads file asynchronously and decrypts it with RSA
         * @param url
         * @param notificationObject
         */
        _this._start = function (url, notificationObject) {
            // @ts-ignore
            return _this.context.downloader.start(url, notificationObject);
        };
        /**
         * Cancels a download in progress.
         * @param downloadID
         */
        _this.cancel = function (downloadID) {
            // @ts-ignore
            _this.context.downloader.cancel(downloadID);
        };
        /**
         * Wrapper function to do simple download
         * @param urlObject
         * @param cmdParams
         * @param clientCallback
         */
        _this.downloadAndLaunch = function (urlObject, cmdParams, clientCallback) {
            if (urlObject === void 0) { urlObject = { url: "", secureUrl: "" }; }
            if (cmdParams === void 0) { cmdParams = ''; }
            var callback = new _callbackObject__WEBPACK_IMPORTED_MODULE_1__.CallbackObject(), url = urlObject.secureUrl;
            var downloadID;
            if (!url) {
                throw new Error('Error while downloading. Missing url');
            }
            callback.onError = function () {
                // @ts-ignore
                if (clientCallback && (typeof clientCallback.onError === 'function')) {
                    // @ts-ignore
                    clientCallback.onError();
                }
                throw new Error('Error while downloading');
            };
            callback.onProgress = function (value) {
                // @ts-ignore
                if (clientCallback && (typeof clientCallback.onProgress === 'function')) {
                    // @ts-ignore
                    clientCallback.onProgress(value);
                }
            };
            callback.onCancelled = function () {
                // @ts-ignore
                if (clientCallback && (typeof clientCallback.onCancelled === 'function')) {
                    // @ts-ignore
                    clientCallback.onCancelled();
                }
                //cancel download by ID
                if (downloadID) {
                    _this.cancel(downloadID);
                }
            };
            callback.onFinished = function () {
                // @ts-ignore
                if (clientCallback && (typeof clientCallback.onFinished === 'function')) {
                    // @ts-ignore
                    clientCallback.onFinished(downloadID);
                }
                _this.execute(downloadID, cmdParams);
            };
            //start download
            downloadID = _this._start(url, callback);
            return downloadID;
        };
        /**
         * Helper function for client.
         * Creating Callback Instance.
         * Client able to create callback object
         * and may redefine necessary methods
         * and pass it through downloadAndLaunch method e.g.
         *
         * //IE friendly code
         * var clientCallback = window.desktopApi.downloader.createCallbackInstance();
         * clientCallback.onProgress = function(progressValue){console.log(progressValue);}
         * var downloadId = window.desktopApi.downloader.downloadAndLaunch(url, cmdParam, clientCallback);
         */
        _this.createCallbackInstance = function () {
            return new _callbackObject__WEBPACK_IMPORTED_MODULE_1__.CallbackObject();
        };
        return _this;
    }
    return DownloaderVersion_4_0_0;
}(_baseContextObject__WEBPACK_IMPORTED_MODULE_0__.BaseContextObject));



/***/ }),

/***/ "./src/lib/objects/engine/engine.ts":
/*!******************************************!*\
  !*** ./src/lib/objects/engine/engine.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Engine": function() { return /* binding */ Engine; }
/* harmony export */ });
/**
 * This object provides interface to retrieve information about current JavaScript engine.
 * Supported since: 2.0.0
 */
var Engine = /** @class */ (function () {
    function Engine(context) {
        this.type = 'Engine'; //default value
        this.version = '1.0.0'; //default value
        if (context['engine'] !== undefined) {
            this.version = context['engine'].version();
        }
        else if (context['tray'] !== undefined) {
            this.type = 'Tray';
        }
        /*TEST*/
        // this.type = 'Engine';
        // this.version = '4.0.0';
        /*TEST*/
        /*TEST webview2*/
        this.type = 'Engine';
        this.version = '3.2.0';
        /*TEST webview2*/
    }
    return Engine;
}());



/***/ }),

/***/ "./src/lib/objects/products/products.ts":
/*!**********************************************!*\
  !*** ./src/lib/objects/products/products.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Products": function() { return /* binding */ Products; }
/* harmony export */ });
/* harmony import */ var _baseObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../baseObject */ "./src/lib/objects/baseObject.ts");
/* harmony import */ var _dispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../dispatcher */ "./src/lib/dispatcher.ts");
/* harmony import */ var _productsEngine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./productsEngine */ "./src/lib/objects/products/productsEngine.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



/**
 * Products object is used to work with installed products (check if installed, launch with command line params)
 * Use objects: products|system|process
 * Supported since: 4.0.0
 */
var Products = /** @class */ (function (_super) {
    __extends(Products, _super);
    function Products(context, version, type) {
        var _this = _super.call(this, context, version, type) || this;
        /**
         * Executes specified product
         * @param productCode
         * @param cmdParams
         * Since: 4.0.0
         */
        //todo it is not clear where it can be used
        _this.execute = function (productCode, cmdParams) {
            if (cmdParams === void 0) { cmdParams = ''; }
            _this._dispatcher.dispatch("getApplicationVersion", [productCode, cmdParams]);
        };
        /**
         * Executes specified product and waits for its execution
         * @param productCode
         * @param cmdParams
         * Since: 4.0.0
         */
        //todo it is not clear where it can be used
        _this.executeAndWait = function (productCode, cmdParams) {
            if (cmdParams === void 0) { cmdParams = ''; }
            _this._dispatcher.dispatch("executeAndWait", [productCode, cmdParams]);
        };
        /**
         * Retrieves version for specified product code
         * @param productCode
         * Since: 4.0.0
         */
        _this.getVersion = function (productCode) {
            return _this._dispatcher.dispatch("getVersion", [productCode]);
        };
        /**
         * Checks if the product with specified product code is installed on user's system.
         * @param productCode
         * Since: 4.0.0
         */
        _this.isInstalled = function (productCode) {
            return _this._dispatcher.dispatch("isInstalled", [productCode]);
        };
        /**
         * Finds the main executable file of the application with the specified product code.
         * @param productCode
         * Supported since: 1.0.0
         * removed since 4.0.0
         */
        _this.getMainExecutablePath = function (productCode) {
            return _this._dispatcher.dispatch("getMainExecutablePath", [productCode]);
        };
        _this.versionObject = new _productsEngine__WEBPACK_IMPORTED_MODULE_2__.ProductsEngine(context, version);
        _this._dispatcher = new _dispatcher__WEBPACK_IMPORTED_MODULE_1__.Dispatcher(_this.versionObject);
        return _this;
    }
    return Products;
}(_baseObject__WEBPACK_IMPORTED_MODULE_0__.BaseObject));



/***/ }),

/***/ "./src/lib/objects/products/productsEngine.ts":
/*!****************************************************!*\
  !*** ./src/lib/objects/products/productsEngine.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProductsEngine": function() { return /* binding */ ProductsEngine; }
/* harmony export */ });
/* harmony import */ var _utils_versioncompare__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/versioncompare */ "./src/lib/utils/versioncompare.js");
/* harmony import */ var _productsVersion_4_0_0__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./productsVersion_4_0_0 */ "./src/lib/objects/products/productsVersion_4_0_0.ts");
/* harmony import */ var _productsVersion_1_0_0__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./productsVersion_1_0_0 */ "./src/lib/objects/products/productsVersion_1_0_0.ts");



/**
 * Helper Wrapper Class
 * Check version and return versioned class instance
 */
var ProductsEngine = /** @class */ (function () {
    function ProductsEngine(context, version) {
        if ((0,_utils_versioncompare__WEBPACK_IMPORTED_MODULE_0__.versionCompare)(version, '4.0.0', '>=')) {
            return new _productsVersion_4_0_0__WEBPACK_IMPORTED_MODULE_1__.ProductsVersion_4_0_0(context);
        }
        else {
            return new _productsVersion_1_0_0__WEBPACK_IMPORTED_MODULE_2__.ProductsVersion_1_0_0(context);
        }
    }
    return ProductsEngine;
}());



/***/ }),

/***/ "./src/lib/objects/products/productsVersion_1_0_0.ts":
/*!***********************************************************!*\
  !*** ./src/lib/objects/products/productsVersion_1_0_0.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProductsVersion_1_0_0": function() { return /* binding */ ProductsVersion_1_0_0; }
/* harmony export */ });
/* harmony import */ var _baseContextObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../baseContextObject */ "./src/lib/objects/baseContextObject.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

/**
 * Products object is used to work with installed products (check if installed, launch with command line params)
 * Use objects: system
 */
var ProductsVersion_1_0_0 = /** @class */ (function (_super) {
    __extends(ProductsVersion_1_0_0, _super);
    function ProductsVersion_1_0_0(context) {
        var _this = _super.call(this, context) || this;
        /**
         * Checks if the product with specified product code is installed on user's system.
         * @param productCode
         */
        _this.isInstalled = function (productCode) {
            // @ts-ignore
            return _this.context.system.isInstalled(productCode);
        };
        /**
         * Finds the main executable file of the application with the specified product code.
         * @param productCode
         */
        _this.getMainExecutablePath = function (productCode) {
            // @ts-ignore
            return _this.context.system.getMainExecutablePath(productCode);
        };
        return _this;
    }
    return ProductsVersion_1_0_0;
}(_baseContextObject__WEBPACK_IMPORTED_MODULE_0__.BaseContextObject));



/***/ }),

/***/ "./src/lib/objects/products/productsVersion_4_0_0.ts":
/*!***********************************************************!*\
  !*** ./src/lib/objects/products/productsVersion_4_0_0.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProductsVersion_4_0_0": function() { return /* binding */ ProductsVersion_4_0_0; }
/* harmony export */ });
/* harmony import */ var _baseContextObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../baseContextObject */ "./src/lib/objects/baseContextObject.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

/**
 * Products object is used to work with installed products (check if installed, launch with command line params)
 * Use objects: products
 */
var ProductsVersion_4_0_0 = /** @class */ (function (_super) {
    __extends(ProductsVersion_4_0_0, _super);
    function ProductsVersion_4_0_0(context) {
        var _this = _super.call(this, context) || this;
        /**
         * Executes specified product
         * @param productCode
         * @param cmdParams
         */
        _this.execute = function (productCode, cmdParams) {
            if (cmdParams === void 0) { cmdParams = ''; }
            // @ts-ignore
            _this.context.products.execute(productCode, cmdParams);
        };
        /**
         * Executes specified product and waits for its execution
         * @param productCode
         * @param cmdParams
         */
        _this.executeAndWait = function (productCode, cmdParams) {
            if (cmdParams === void 0) { cmdParams = ''; }
            // @ts-ignore
            _this.context.products.executeAndWait(productCode, cmdParams);
        };
        /**
         * Retrieves version for specified product code
         * @param productCode
         */
        _this.getVersion = function (productCode) {
            // @ts-ignore
            return _this.context.products.getVersion(productCode);
        };
        /**
         * Checks if the product with specified product code is installed on user's system.
         * @param productCode
         */
        _this.isInstalled = function (productCode) {
            // @ts-ignore
            return _this.context.products.isInstalled(productCode);
        };
        return _this;
    }
    return ProductsVersion_4_0_0;
}(_baseContextObject__WEBPACK_IMPORTED_MODULE_0__.BaseContextObject));



/***/ }),

/***/ "./src/lib/objects/utils/utils.ts":
/*!****************************************!*\
  !*** ./src/lib/objects/utils/utils.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Utils": function() { return /* binding */ Utils; }
/* harmony export */ });
/* harmony import */ var _baseObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../baseObject */ "./src/lib/objects/baseObject.ts");
/* harmony import */ var _dispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../dispatcher */ "./src/lib/dispatcher.ts");
/* harmony import */ var _utilsTray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utilsTray */ "./src/lib/objects/utils/utilsTray.ts");
/* harmony import */ var _utilsEngine__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utilsEngine */ "./src/lib/objects/utils/utilsEngine.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




/**
 * Utils object provide application wide common functionality
 * Use objects: system|tray
 * Supported since: 1.0.0
 */
var Utils = /** @class */ (function (_super) {
    __extends(Utils, _super);
    function Utils(context, version, type) {
        var _this = _super.call(this, context, version, type) || this;
        /**
         * Opens url in default browser currently configured on user's system.
         * @param url
         */
        _this.openInDefaultBrowser = function (url) {
            return _this._dispatcher.dispatch("openInDefaultBrowser", [url]);
        };
        if (type === 'Tray') {
            _this.versionObject = new _utilsTray__WEBPACK_IMPORTED_MODULE_2__.UtilsTray(context);
        }
        else {
            _this.versionObject = new _utilsEngine__WEBPACK_IMPORTED_MODULE_3__.UtilsEngine(context, version);
        }
        _this._dispatcher = new _dispatcher__WEBPACK_IMPORTED_MODULE_1__.Dispatcher(_this.versionObject);
        return _this;
    }
    return Utils;
}(_baseObject__WEBPACK_IMPORTED_MODULE_0__.BaseObject));



/***/ }),

/***/ "./src/lib/objects/utils/utilsEngine.ts":
/*!**********************************************!*\
  !*** ./src/lib/objects/utils/utilsEngine.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UtilsEngine": function() { return /* binding */ UtilsEngine; }
/* harmony export */ });
/* harmony import */ var _utilsVersion_1_0_0__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilsVersion_1_0_0 */ "./src/lib/objects/utils/utilsVersion_1_0_0.ts");

/**
 * Helper Class
 * Check version and return versioned class instance
 */
var UtilsEngine = /** @class */ (function () {
    function UtilsEngine(context, version) {
        //todo Add check version if available few versions
        return new _utilsVersion_1_0_0__WEBPACK_IMPORTED_MODULE_0__.UtilsVersion_1_0_0(context);
    }
    return UtilsEngine;
}());



/***/ }),

/***/ "./src/lib/objects/utils/utilsTray.ts":
/*!********************************************!*\
  !*** ./src/lib/objects/utils/utilsTray.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UtilsTray": function() { return /* binding */ UtilsTray; }
/* harmony export */ });
/* harmony import */ var _baseContextObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../baseContextObject */ "./src/lib/objects/baseContextObject.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

/**
 * Utils object provide application wide common functionality
 * Use objects: tray
 */
var UtilsTray = /** @class */ (function (_super) {
    __extends(UtilsTray, _super);
    function UtilsTray(context) {
        var _this = _super.call(this, context) || this;
        /**
         * Opens url in default browser currently configured on user's system.
         * @param url
         */
        _this.openInDefaultBrowser = function (url) {
            // @ts-ignore
            _this.context.tray.openInDefaultBrowser(url);
        };
        return _this;
    }
    return UtilsTray;
}(_baseContextObject__WEBPACK_IMPORTED_MODULE_0__.BaseContextObject));



/***/ }),

/***/ "./src/lib/objects/utils/utilsVersion_1_0_0.ts":
/*!*****************************************************!*\
  !*** ./src/lib/objects/utils/utilsVersion_1_0_0.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UtilsVersion_1_0_0": function() { return /* binding */ UtilsVersion_1_0_0; }
/* harmony export */ });
/* harmony import */ var _baseContextObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../baseContextObject */ "./src/lib/objects/baseContextObject.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

/**
 * Utils object provide application wide common functionality
 * Use objects: system
 */
var UtilsVersion_1_0_0 = /** @class */ (function (_super) {
    __extends(UtilsVersion_1_0_0, _super);
    function UtilsVersion_1_0_0(context) {
        var _this = _super.call(this, context) || this;
        /**
         * Opens url in default browser currently configured on user's system.
         * @param url
         */
        _this.openInDefaultBrowser = function (url) {
            // @ts-ignore
            _this.context.system.openInDefaultBrowser(url);
        };
        return _this;
    }
    return UtilsVersion_1_0_0;
}(_baseContextObject__WEBPACK_IMPORTED_MODULE_0__.BaseContextObject));



/***/ }),

/***/ "./src/lib/objects/window/window.ts":
/*!******************************************!*\
  !*** ./src/lib/objects/window/window.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Window": function() { return /* binding */ Window; }
/* harmony export */ });
/* harmony import */ var _baseObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../baseObject */ "./src/lib/objects/baseObject.ts");
/* harmony import */ var _dispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../dispatcher */ "./src/lib/dispatcher.ts");
/* harmony import */ var _windowTray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./windowTray */ "./src/lib/objects/window/windowTray.ts");
/* harmony import */ var _windowEngine__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./windowEngine */ "./src/lib/objects/window/windowEngine.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




/**
 * This object provides interface to work with browser window from javascript code.
 * Every browser window is created hidden, so you have to call show method when page is ready to be shown.
 * If there is no internet connection or an error occurred in java script and no show call occurred,
 * browser is closed automatically in 45 seconds after creation.
 * To improve user experience please call close, if show won't be called for some reason.
 * Use objects: basewnd|childWindow|tray
 * Supported since: 1.0.0
 */
var Window = /** @class */ (function (_super) {
    __extends(Window, _super);
    function Window(context, version, type) {
        var _this = _super.call(this, context, version, type) || this;
        /**
         * Closes browser window.
         * Since: 1.0.0
         */
        _this.close = function () {
            _this._dispatcher.dispatch("close", []);
        };
        /**
         * Closes browser window. Even if show hasn't been called, call close() if an error occurred.
         * @param exitCode
         * Since: 3.2.0
         */
        _this.closeWithExitCode = function (exitCode) {
            _this._dispatcher.dispatch("closeWithExitCode", [exitCode]);
        };
        /**
         * Hides browser window but does not closes it, so browser keeps working.
         * Since: 1.0.0
         */
        _this.hide = function () {
            _this._dispatcher.dispatch("hide", []);
        };
        /**
         * Shows browser window with specified size ( width and height in pixels ).
         * You have to call this every time page is ready to be shown. By default browser window is hidden.
         * @param width
         * @param height
         * Since: 1.0.0
         */
        _this.show = function (width, height) {
            _this._dispatcher.dispatch("show", [width, height]);
        };
        /**
         * Minimizes browser window.
         * Minimize may be not supported because "-toolwindow" command line is specified
         * or parent window is set up for an IPM. Minimize feature requires icon on the Windows taskbar.
         * Since: 3.1.0
         */
        _this.minimize = function () {
            _this._dispatcher.dispatch("minimize", []);
        };
        /**
         * Returns DPI value of the window.
         * Web-page should be rendered according to the returned value.
         * Since: 1.0.0
         */
        _this.getDPI = function () {
            return _this._dispatcher.dispatch("getDPI", []);
        };
        /**
         * Checks if window supports minimization.
         * Minimize may be not supported because "-toolwindow" command line is specified or parent window is set up for an IPM.
         * Minimize feature requires icon on the Windows taskbar.
         * Since: 3.1.0
         */
        _this.isMinimizeSupported = function () {
            return _this._dispatcher.dispatch("isMinimizeSupported", []);
        };
        /**
         * Creates new browser window with given urls.
         * @param url
         * @param modal
         * @param position
         * Since: 1.0.0
         */
        _this.createWindow = function (url, modal, position) {
            return _this._dispatcher.dispatch("createWindow", [url, modal, position]);
        };
        if (type === 'Tray') {
            _this.versionObject = new _windowTray__WEBPACK_IMPORTED_MODULE_2__.WindowTray(context);
        }
        else {
            _this.versionObject = new _windowEngine__WEBPACK_IMPORTED_MODULE_3__.WindowEngine(context, version);
        }
        _this._dispatcher = new _dispatcher__WEBPACK_IMPORTED_MODULE_1__.Dispatcher(_this.versionObject);
        return _this;
    }
    return Window;
}(_baseObject__WEBPACK_IMPORTED_MODULE_0__.BaseObject));



/***/ }),

/***/ "./src/lib/objects/window/windowEngine.ts":
/*!************************************************!*\
  !*** ./src/lib/objects/window/windowEngine.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WindowEngine": function() { return /* binding */ WindowEngine; }
/* harmony export */ });
/* harmony import */ var _utils_versioncompare__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/versioncompare */ "./src/lib/utils/versioncompare.js");
/* harmony import */ var _windowVersion_4_0_0__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./windowVersion_4_0_0 */ "./src/lib/objects/window/windowVersion_4_0_0.ts");
/* harmony import */ var _windowVersion_3_2_0__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./windowVersion_3_2_0 */ "./src/lib/objects/window/windowVersion_3_2_0.ts");
/* harmony import */ var _windowVersion_3_1_0__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./windowVersion_3_1_0 */ "./src/lib/objects/window/windowVersion_3_1_0.ts");
/* harmony import */ var _windowVersion_1_0_0__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./windowVersion_1_0_0 */ "./src/lib/objects/window/windowVersion_1_0_0.ts");





/**
 * Helper Wrapper Class
 * Check version and return versioned class instance
 */
var WindowEngine = /** @class */ (function () {
    function WindowEngine(context, version) {
        if ((0,_utils_versioncompare__WEBPACK_IMPORTED_MODULE_0__.versionCompare)(version, '4.0.0', '>=')) {
            return new _windowVersion_4_0_0__WEBPACK_IMPORTED_MODULE_1__.WindowVersion_4_0_0(context);
        }
        else if (version === '3.2.0') {
            return new _windowVersion_3_2_0__WEBPACK_IMPORTED_MODULE_2__.WindowVersion_3_2_0(context);
        }
        else if (version === '3.1.0') {
            return new _windowVersion_3_1_0__WEBPACK_IMPORTED_MODULE_3__.WindowVersion_3_1_0(context);
        }
        else {
            return new _windowVersion_1_0_0__WEBPACK_IMPORTED_MODULE_4__.WindowVersion_1_0_0(context);
        }
    }
    return WindowEngine;
}());



/***/ }),

/***/ "./src/lib/objects/window/windowTray.ts":
/*!**********************************************!*\
  !*** ./src/lib/objects/window/windowTray.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WindowTray": function() { return /* binding */ WindowTray; }
/* harmony export */ });
/* harmony import */ var _baseContextObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../baseContextObject */ "./src/lib/objects/baseContextObject.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

/**
 * This object provides interface to work with browser window from javascript code.
 * Every browser window is created hidden, so you have to call show method when page is ready to be shown.
 * If there is no internet connection or an error occurred in java script and no show call occurred,
 * browser is closed automatically in 45 seconds after creation.
 * To improve user experience please call close, if show won't be called for some reason.
 * Use objects: tray
 */
var WindowTray = /** @class */ (function (_super) {
    __extends(WindowTray, _super);
    function WindowTray(context) {
        var _this = _super.call(this, context) || this;
        /**
         * Closes browser window.
         */
        _this.close = function () {
            // @ts-ignore
            _this.context.tray.close();
        };
        /**
         * Closes browser window. Helper function
         */
        _this.closeWithExitCode = function (exitCode) {
            _this.close();
        };
        /**
         * Hides browser window but does not closes it, so browser keeps working.
         * Hook to hide tray window as tray doesn't have `hide()` method implemented
         */
        _this.hide = function () {
            // @ts-ignore
            _this.show('0', '0');
        };
        /**
         * Shows browser window with specified size ( width and height in pixels ).
         * You have to call this every time page is ready to be shown. By default browser window is hidden.
         * @param width
         * @param height
         */
        _this.show = function (width, height) {
            // @ts-ignore
            _this.context.tray.show(width, height);
        };
        return _this;
    }
    return WindowTray;
}(_baseContextObject__WEBPACK_IMPORTED_MODULE_0__.BaseContextObject));



/***/ }),

/***/ "./src/lib/objects/window/windowVersion_1_0_0.ts":
/*!*******************************************************!*\
  !*** ./src/lib/objects/window/windowVersion_1_0_0.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WindowVersion_1_0_0": function() { return /* binding */ WindowVersion_1_0_0; }
/* harmony export */ });
/* harmony import */ var _baseContextObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../baseContextObject */ "./src/lib/objects/baseContextObject.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

/**
 * This object provides interface to work with browser window from javascript code.
 * Every browser window is created hidden, so you have to call show method when page is ready to be shown.
 * If there is no internet connection or an error occurred in java script and no show call occurred,
 * browser is closed automatically in 45 seconds after creation.
 * To improve user experience please call close, if show won't be called for some reason.
 * Use objects: basewnd|childWindow
 * Supported since: 1.0.0
 */
var WindowVersion_1_0_0 = /** @class */ (function (_super) {
    __extends(WindowVersion_1_0_0, _super);
    function WindowVersion_1_0_0(context) {
        var _this = _super.call(this, context) || this;
        /**
         * Closes browser window.
         */
        _this.close = function () {
            // @ts-ignore
            _this.context.basewnd.close();
        };
        /**
         * Closes browser window. Even if show hasn't been called, call close() if an error occurred.
         */
        _this.closeWithExitCode = function (exitCode) {
            _this.close();
        };
        /**
         * Hides browser window but does not closes it, so browser keeps working.
         */
        _this.hide = function () {
            // @ts-ignore
            _this.context.basewnd.hide();
        };
        /**
         * Shows browser window with specified size ( width and height in pixels ).
         * You have to call this every time page is ready to be shown. By default browser window is hidden.
         * @param width
         * @param height
         */
        _this.show = function (width, height) {
            // @ts-ignore
            _this.context.basewnd.show(width, height);
        };
        /**
         * Returns DPI value of the window.
         * Web-page should be rendered according to the returned value.
         */
        _this.getDPI = function () {
            // @ts-ignore
            return _this.context.basewnd.getDPI();
        };
        /**
         * Creates new browser window with given urls.
         * @param url
         * @param modal
         * @param position
         */
        _this.createWindow = function (url, modal, position) {
            // @ts-ignore
            return _this.context.childWindow.createWindow(url, modal, position);
        };
        return _this;
    }
    return WindowVersion_1_0_0;
}(_baseContextObject__WEBPACK_IMPORTED_MODULE_0__.BaseContextObject));



/***/ }),

/***/ "./src/lib/objects/window/windowVersion_3_1_0.ts":
/*!*******************************************************!*\
  !*** ./src/lib/objects/window/windowVersion_3_1_0.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WindowVersion_3_1_0": function() { return /* binding */ WindowVersion_3_1_0; }
/* harmony export */ });
/* harmony import */ var _baseContextObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../baseContextObject */ "./src/lib/objects/baseContextObject.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

/**
 * This object provides interface to work with browser window from javascript code.
 * Every browser window is created hidden, so you have to call show method when page is ready to be shown.
 * If there is no internet connection or an error occurred in java script and no show call occurred,
 * browser is closed automatically in 45 seconds after creation.
 * To improve user experience please call close, if show won't be called for some reason.
 * Use objects: basewnd|childWindow
 * Supported since: 1.0.0
 */
var WindowVersion_3_1_0 = /** @class */ (function (_super) {
    __extends(WindowVersion_3_1_0, _super);
    function WindowVersion_3_1_0(context) {
        var _this = _super.call(this, context) || this;
        /**
         * Closes browser window.
         */
        _this.close = function () {
            // @ts-ignore
            _this.context.basewnd.close();
        };
        /**
         * Closes browser window. Even if show hasn't been called, call close() if an error occurred.
         * @param exitCode
         */
        _this.closeWithExitCode = function (exitCode) {
            // @ts-ignore
            _this.close();
        };
        /**
         * Hides browser window but does not closes it, so browser keeps working.
         */
        _this.hide = function () {
            // @ts-ignore
            _this.context.basewnd.hide();
        };
        /**
         * Shows browser window with specified size ( width and height in pixels ).
         * You have to call this every time page is ready to be shown. By default browser window is hidden.
         * @param width
         * @param height
         */
        _this.show = function (width, height) {
            // @ts-ignore
            _this.context.basewnd.show(width, height);
        };
        /**
         * Minimizes browser window.
         * Minimize may be not supported because "-toolwindow" command line is specified
         * or parent window is set up for an IPM. Minimize feature requires icon on the Windows taskbar.
         */
        _this.minimize = function () {
            // @ts-ignore
            _this.context.basewnd.minimize();
        };
        /**
         * Returns DPI value of the window.
         * Web-page should be rendered according to the returned value.
         */
        _this.getDPI = function () {
            // @ts-ignore
            return _this.context.basewnd.getDPI();
        };
        /**
         * Checks if window supports minimization.
         * Minimize may be not supported because "-toolwindow" command line is specified or parent window is set up for an IPM.
         * Minimize feature requires icon on the Windows taskbar.
         */
        _this.isMinimizeSupported = function () {
            // @ts-ignore
            return _this.context.basewnd.isMinimizeSupported();
        };
        /**
         * Creates new browser window with given urls.
         * @param url
         * @param modal
         * @param position
         */
        _this.createWindow = function (url, modal, position) {
            // @ts-ignore
            return _this.context.childWindow.createWindow(url, modal, position);
        };
        return _this;
    }
    return WindowVersion_3_1_0;
}(_baseContextObject__WEBPACK_IMPORTED_MODULE_0__.BaseContextObject));



/***/ }),

/***/ "./src/lib/objects/window/windowVersion_3_2_0.ts":
/*!*******************************************************!*\
  !*** ./src/lib/objects/window/windowVersion_3_2_0.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WindowVersion_3_2_0": function() { return /* binding */ WindowVersion_3_2_0; }
/* harmony export */ });
/* harmony import */ var _baseContextObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../baseContextObject */ "./src/lib/objects/baseContextObject.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

/**
 * This object provides interface to work with browser window from javascript code.
 * Every browser window is created hidden, so you have to call show method when page is ready to be shown.
 * If there is no internet connection or an error occurred in java script and no show call occurred,
 * browser is closed automatically in 45 seconds after creation.
 * To improve user experience please call close, if show won't be called for some reason.
 * Use objects: basewnd|childWindow
 * Supported since: 1.0.0
 */
var WindowVersion_3_2_0 = /** @class */ (function (_super) {
    __extends(WindowVersion_3_2_0, _super);
    function WindowVersion_3_2_0(context) {
        var _this = _super.call(this, context) || this;
        /**
         * Closes browser window.
         */
        _this.close = function () {
            // @ts-ignore
            _this.context.basewnd.close();
        };
        /**
         * Closes browser window. Even if show hasn't been called, call close() if an error occurred.
         * @param exitCode
         */
        _this.closeWithExitCode = function (exitCode) {
            // @ts-ignore
            _this.context.basewnd.closeWithExitCode(exitCode);
        };
        /**
         * Hides browser window but does not closes it, so browser keeps working.
         */
        _this.hide = function () {
            // @ts-ignore
            _this.context.basewnd.hide();
        };
        /**
         * Shows browser window with specified size ( width and height in pixels ).
         * You have to call this every time page is ready to be shown. By default browser window is hidden.
         * @param width
         * @param height
         */
        _this.show = function (width, height) {
            // @ts-ignore
            _this.context.basewnd.show(width, height);
        };
        /**
         * Minimizes browser window.
         * Minimize may be not supported because "-toolwindow" command line is specified
         * or parent window is set up for an IPM. Minimize feature requires icon on the Windows taskbar.
         */
        _this.minimize = function () {
            // @ts-ignore
            _this.context.basewnd.minimize();
        };
        /**
         * Returns DPI value of the window.
         * Web-page should be rendered according to the returned value.
         */
        _this.getDPI = function () {
            // @ts-ignore
            return _this.context.basewnd.getDPI();
        };
        /**
         * Checks if window supports minimization.
         * Minimize may be not supported because "-toolwindow" command line is specified or parent window is set up for an IPM.
         * Minimize feature requires icon on the Windows taskbar.
         */
        _this.isMinimizeSupported = function () {
            // @ts-ignore
            return _this.context.basewnd.isMinimizeSupported();
        };
        /**
         * Creates new browser window with given urls.
         * @param url
         * @param modal
         * @param position
         */
        _this.createWindow = function (url, modal, position) {
            // @ts-ignore
            return _this.context.childWindow.createWindow(url, modal, position);
        };
        return _this;
    }
    return WindowVersion_3_2_0;
}(_baseContextObject__WEBPACK_IMPORTED_MODULE_0__.BaseContextObject));



/***/ }),

/***/ "./src/lib/objects/window/windowVersion_4_0_0.ts":
/*!*******************************************************!*\
  !*** ./src/lib/objects/window/windowVersion_4_0_0.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WindowVersion_4_0_0": function() { return /* binding */ WindowVersion_4_0_0; }
/* harmony export */ });
/* harmony import */ var _baseContextObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../baseContextObject */ "./src/lib/objects/baseContextObject.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

/**
 * This object provides interface to work with browser window from javascript code.
 * Every browser window is created hidden, so you have to call show method when page is ready to be shown.
 * If there is no internet connection or an error occurred in java script and no show call occurred,
 * browser is closed automatically in 45 seconds after creation.
 * To improve user experience please call close, if show won't be called for some reason.
 * Use objects: basewnd|childWindow
 * Supported since: 1.0.0
 */
var WindowVersion_4_0_0 = /** @class */ (function (_super) {
    __extends(WindowVersion_4_0_0, _super);
    function WindowVersion_4_0_0(context) {
        var _this = _super.call(this, context) || this;
        /**
         * Closes browser window.
         */
        _this.close = function () {
            // @ts-ignore
            _this.context.basewnd.close();
        };
        /**
         * Closes browser window. Even if show hasn't been called, call close() if an error occurred.
         * @param exitCode
         */
        _this.closeWithExitCode = function (exitCode) {
            // @ts-ignore
            _this.context.basewnd.closeWithExitCode(exitCode);
        };
        /**
         * Hides browser window but does not closes it, so browser keeps working.
         */
        _this.hide = function () {
            // @ts-ignore
            _this.context.basewnd.hide();
        };
        /**
         * Shows browser window with specified size ( width and height in pixels ).
         * You have to call this every time page is ready to be shown. By default browser window is hidden.
         * @param width
         * @param height
         */
        _this.show = function (width, height) {
            // @ts-ignore
            _this.context.basewnd.show(width, height);
        };
        /**
         * Minimizes browser window.
         * Minimize may be not supported because "-toolwindow" command line is specified
         * or parent window is set up for an IPM. Minimize feature requires icon on the Windows taskbar.
         */
        _this.minimize = function () {
            // @ts-ignore
            _this.context.basewnd.minimize();
        };
        /**
         * Returns DPI value of the window.
         * Web-page should be rendered according to the returned value.
         */
        _this.getDPI = function () {
            // @ts-ignore
            return _this.context.basewnd.getDPI();
        };
        /**
         * Checks if window supports minimization.
         * Minimize may be not supported because "-toolwindow" command line is specified or parent window is set up for an IPM.
         * Minimize feature requires icon on the Windows taskbar.
         */
        _this.isMinimizeSupported = function () {
            // @ts-ignore
            return _this.context.basewnd.isMinimizeSupported();
        };
        /**
         * Creates new browser window with given urls.
         * @param url
         * @param modal
         * @param position
         */
        _this.createWindow = function (url, modal, position) {
            // @ts-ignore
            return _this.context.childWindow.createWindow(url, modal, position);
        };
        return _this;
    }
    return WindowVersion_4_0_0;
}(_baseContextObject__WEBPACK_IMPORTED_MODULE_0__.BaseContextObject));



/***/ }),

/***/ "./src/lib/utils/createInstance.ts":
/*!*****************************************!*\
  !*** ./src/lib/utils/createInstance.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createInstance": function() { return /* binding */ createInstance; }
/* harmony export */ });
/* harmony import */ var _objects_products_products__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../objects/products/products */ "./src/lib/objects/products/products.ts");
/* harmony import */ var _objects_appinfo_appInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../objects/appinfo/appInfo */ "./src/lib/objects/appinfo/appInfo.ts");
/* harmony import */ var _objects_window_window__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../objects/window/window */ "./src/lib/objects/window/window.ts");
/* harmony import */ var _objects_utils_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../objects/utils/utils */ "./src/lib/objects/utils/utils.ts");
/* harmony import */ var _objects_engine_engine__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../objects/engine/engine */ "./src/lib/objects/engine/engine.ts");
/* harmony import */ var _objects_downloader_downloader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../objects/downloader/downloader */ "./src/lib/objects/downloader/downloader.ts");






var classes = { Utils: _objects_utils_utils__WEBPACK_IMPORTED_MODULE_3__.Utils, AppInfo: _objects_appinfo_appInfo__WEBPACK_IMPORTED_MODULE_1__.AppInfo, Window: _objects_window_window__WEBPACK_IMPORTED_MODULE_2__.Window, Products: _objects_products_products__WEBPACK_IMPORTED_MODULE_0__.Products, Engine: _objects_engine_engine__WEBPACK_IMPORTED_MODULE_4__.Engine, Downloader: _objects_downloader_downloader__WEBPACK_IMPORTED_MODULE_5__.Downloader };
/**
 * createInstance helps with dynamic creation class instances by class name
 * @param name
 */
function createInstance(name) {
    return classes[name];
}


/***/ }),

/***/ "./src/lib/polyfills/polyfills.js":
/*!****************************************!*\
  !*** ./src/lib/polyfills/polyfills.js ***!
  \****************************************/
/***/ (function() {

// ES5 15.3.4.5 Function.prototype.bind ( thisArg [, arg1 [, arg2, ... ]] )
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/bind
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function () {
        },
        fBound  = function () {
          return fToBind.apply(this instanceof fNOP && oThis
            ? this
            : oThis,
            aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype   = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}
// ES5 15.2.3.14 Object.keys ( O )
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/keys
if (!Object.keys) {
  Object.keys = (function () {
    'use strict';
    var hasOwnProperty  = Object.prototype.hasOwnProperty,
        hasDontEnumBug  = !({toString: null}).propertyIsEnumerable('toString'),
        dontEnums       = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength = dontEnums.length;

    return function (obj) {
      if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
        throw new TypeError('Object.keys called on non-object');
      }

      var result = [], prop, i;

      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }

      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }());
}
// ES5 15.4.4.18 Array.prototype.forEach ( callbackfn [ , thisArg ] )
// From https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach
if (!Array.prototype.forEach) {

  Array.prototype.forEach = function (callback/*, thisArg*/) {

    var T, k;
    if (this === null) {
      throw new TypeError('this is null or not defined');
    }
    var O   = Object(this);
    var len = O.length >>> 0;
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
    if (arguments.length > 1) {
      T = arguments[1];
    }
    k = 0;
    while (k < len) {
      var kValue;
      if (k in O) {
        kValue = O[k];
        callback.call(T, kValue, k, O);
      }
      k++;
    }
  };
}
// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
;(function (hasOwnProp) { // IIFE with guarding semicolon
  function hasOwnProperty(name) {
    if (this == null) {
      throw new TypeError("Cannot convert undefined or null to object!")
    }
    var O      = Object(this), key = String(name);
    var _proto = O.__proto__ || O.constructor.prototype || {}; // Object.prototype
    return key in O && (!(key in _proto) || O[key] !== _proto[key]);
  }

  if (!hasOwnProp) {
    try {
      Object.defineProperty(Object.prototype, 'hasOwnProperty', {
        enumerable: false, configurable: true, writable: true,
        value     : hasOwnProperty
      });
    } catch (e) { // Object.defineProperty isn't supported
      Object.prototype['hasOwnProperty'] = hasOwnProperty;
    }
  }
})(Object.prototype.hasOwnProperty);

// ES5 15.2.3.4 Object.getOwnPropertyNames ( O )
if (typeof Object.getOwnPropertyNames !== "function") {
  Object.getOwnPropertyNames = function (o) {
    if (o !== Object(o)) {
      throw TypeError("Object.getOwnPropertyNames called on non-object");
    }
    var props = [],
        p;
    for (p in o) {
      if (Object.prototype.hasOwnProperty.call(o, p)) {
        props.push(p);
      }
    }
    return props;
  };
}

// ES5 15.4.4.20 Array.prototype.filter ( callbackfn [ , thisArg ] )
// From https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/Filter
if (!Array.prototype.filter) {
  Array.prototype.filter = function (fun /*, thisp */ ) {
    if (this === void 0 || this === null) {
      throw TypeError();
    }

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== "function") {
      throw TypeError();
    }

    var res = [];
    var thisp = arguments[1],
        i;
    for (i = 0; i < len; i++) {
      if (i in t) {
        var val = t[i]; // in case fun mutates this
        if (fun.call(thisp, val, i, t)) {
          res.push(val);
        }
      }
    }

    return res;
  };
}


/***/ }),

/***/ "./src/lib/utils/versioncompare.js":
/*!*****************************************!*\
  !*** ./src/lib/utils/versioncompare.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "versionCompare": function() { return /* binding */ versionCompare; }
/* harmony export */ });
function versionCompare (v1, v2, operator) {
//        example 1: version_compare('8.2.5rc', '8.2.5a')
//        returns 1: 1
//        example 2: version_compare('8.2.50', '8.2.52', '<')
//        returns 2: true
//        example 3: version_compare('5.3.0-dev', '5.3.0')
//        returns 3: -1
//        example 4: version_compare('4.1.0.52','4.01.0.51')
//        returns 4: 1

    // Important: compare must be initialized at 0.
    var i
    var x
    var compare = 0

    // vm maps textual PHP versions to negatives so they're less than 0.
    // PHP currently defines these as CASE-SENSITIVE. It is important to
    // leave these as negatives so that they can come before numerical versions
    // and as if no letters were there to begin with.
    // (1alpha is < 1 and < 1.1 but > 1dev1)
    // If a non-numerical value can't be mapped to this table, it receives
    // -7 as its value.
    var vm = {
        'dev': -6,
        'alpha': -5,
        'a': -5,
        'beta': -4,
        'b': -4,
        'RC': -3,
        'rc': -3,
        '#': -2,
        'p': 1,
        'pl': 1
    }

    // This function will be called to prepare each version argument.
    // It replaces every _, -, and + with a dot.
    // It surrounds any nonsequence of numbers/dots with dots.
    // It replaces sequences of dots with a single dot.
    //    version_compare('4..0', '4.0') === 0
    // Important: A string of 0 length needs to be converted into a value
    // even less than an unexisting value in vm (-7), hence [-8].
    // It's also important to not strip spaces because of this.
    //   version_compare('', ' ') === 1
    var _prepVersion = function (v) {
        v = ('' + v).replace(/[_\-+]/g, '.')
        v = v.replace(/([^.\d]+)/g, '.$1.').replace(/\.{2,}/g, '.')
        return (!v.length ? [-8] : v.split('.'))
    }
    // This converts a version component to a number.
    // Empty component becomes 0.
    // Non-numerical component becomes a negative number.
    // Numerical component becomes itself as an integer.
    var _numVersion = function (v) {
        return !v ? 0 : (isNaN(v) ? vm[v] || -7 : parseInt(v, 10))
    }

    v1 = _prepVersion(v1)
    v2 = _prepVersion(v2)
    x = Math.max(v1.length, v2.length)
    for (i = 0; i < x; i++) {
        if (v1[i] === v2[i]) {
            continue
        }
        v1[i] = _numVersion(v1[i])
        v2[i] = _numVersion(v2[i])
        if (v1[i] < v2[i]) {
            compare = -1
            break
        } else if (v1[i] > v2[i]) {
            compare = 1
            break
        }
    }
    if (!operator) {
        return compare
    }

    // Important: operator is CASE-SENSITIVE.
    // "No operator" seems to be treated as "<."
    // Any other values seem to make the function return null.
    switch (operator) {
        case '>':
        case 'gt':
            return (compare > 0)
        case '>=':
        case 'ge':
            return (compare >= 0)
        case '<=':
        case 'le':
            return (compare <= 0)
        case '===':
        case '=':
        case 'eq':
            return (compare === 0)
        case '<>':
        case '!==':
        case 'ne':
            return (compare !== 0)
        case '':
        case '<':
        case 'lt':
            return (compare < 0)
        default:
            return null
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/lib/polyfills/polyfills.js");
/******/ 	__webpack_require__("./src/index.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kZXNrdG9wYXBpLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL2Rlc2t0b3BhcGkvLi9zcmMvbGliL2FwaS50cyIsIndlYnBhY2s6Ly9kZXNrdG9wYXBpLy4vc3JjL2xpYi9kYXRhL2NvbnRleHRMaXN0LnRzIiwid2VicGFjazovL2Rlc2t0b3BhcGkvLi9zcmMvbGliL2RhdGEvbWFwQXBpLnRzIiwid2VicGFjazovL2Rlc2t0b3BhcGkvLi9zcmMvbGliL2Rpc3BhdGNoZXIudHMiLCJ3ZWJwYWNrOi8vZGVza3RvcGFwaS8uL3NyYy9saWIvaW5pdGlhbGl6ZXIudHMiLCJ3ZWJwYWNrOi8vZGVza3RvcGFwaS8uL3NyYy9saWIvb2JqZWN0cy9hcHBpbmZvL2FwcEluZm8udHMiLCJ3ZWJwYWNrOi8vZGVza3RvcGFwaS8uL3NyYy9saWIvb2JqZWN0cy9hcHBpbmZvL2FwcEluZm9FbmdpbmUudHMiLCJ3ZWJwYWNrOi8vZGVza3RvcGFwaS8uL3NyYy9saWIvb2JqZWN0cy9hcHBpbmZvL2FwcEluZm9WZXJzaW9uXzRfMF8wLnRzIiwid2VicGFjazovL2Rlc2t0b3BhcGkvLi9zcmMvbGliL29iamVjdHMvYmFzZUNvbnRleHRPYmplY3QudHMiLCJ3ZWJwYWNrOi8vZGVza3RvcGFwaS8uL3NyYy9saWIvb2JqZWN0cy9iYXNlT2JqZWN0LnRzIiwid2VicGFjazovL2Rlc2t0b3BhcGkvLi9zcmMvbGliL29iamVjdHMvZG93bmxvYWRlci9jYWxsYmFja09iamVjdC50cyIsIndlYnBhY2s6Ly9kZXNrdG9wYXBpLy4vc3JjL2xpYi9vYmplY3RzL2Rvd25sb2FkZXIvZG93bmxvYWRlci50cyIsIndlYnBhY2s6Ly9kZXNrdG9wYXBpLy4vc3JjL2xpYi9vYmplY3RzL2Rvd25sb2FkZXIvZG93bmxvYWRlckVuZ2luZS50cyIsIndlYnBhY2s6Ly9kZXNrdG9wYXBpLy4vc3JjL2xpYi9vYmplY3RzL2Rvd25sb2FkZXIvZG93bmxvYWRlclRyYXkudHMiLCJ3ZWJwYWNrOi8vZGVza3RvcGFwaS8uL3NyYy9saWIvb2JqZWN0cy9kb3dubG9hZGVyL2Rvd25sb2FkZXJWZXJzaW9uXzFfMF8wLnRzIiwid2VicGFjazovL2Rlc2t0b3BhcGkvLi9zcmMvbGliL29iamVjdHMvZG93bmxvYWRlci9kb3dubG9hZGVyVmVyc2lvbl80XzBfMC50cyIsIndlYnBhY2s6Ly9kZXNrdG9wYXBpLy4vc3JjL2xpYi9vYmplY3RzL2VuZ2luZS9lbmdpbmUudHMiLCJ3ZWJwYWNrOi8vZGVza3RvcGFwaS8uL3NyYy9saWIvb2JqZWN0cy9wcm9kdWN0cy9wcm9kdWN0cy50cyIsIndlYnBhY2s6Ly9kZXNrdG9wYXBpLy4vc3JjL2xpYi9vYmplY3RzL3Byb2R1Y3RzL3Byb2R1Y3RzRW5naW5lLnRzIiwid2VicGFjazovL2Rlc2t0b3BhcGkvLi9zcmMvbGliL29iamVjdHMvcHJvZHVjdHMvcHJvZHVjdHNWZXJzaW9uXzFfMF8wLnRzIiwid2VicGFjazovL2Rlc2t0b3BhcGkvLi9zcmMvbGliL29iamVjdHMvcHJvZHVjdHMvcHJvZHVjdHNWZXJzaW9uXzRfMF8wLnRzIiwid2VicGFjazovL2Rlc2t0b3BhcGkvLi9zcmMvbGliL29iamVjdHMvdXRpbHMvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vZGVza3RvcGFwaS8uL3NyYy9saWIvb2JqZWN0cy91dGlscy91dGlsc0VuZ2luZS50cyIsIndlYnBhY2s6Ly9kZXNrdG9wYXBpLy4vc3JjL2xpYi9vYmplY3RzL3V0aWxzL3V0aWxzVHJheS50cyIsIndlYnBhY2s6Ly9kZXNrdG9wYXBpLy4vc3JjL2xpYi9vYmplY3RzL3V0aWxzL3V0aWxzVmVyc2lvbl8xXzBfMC50cyIsIndlYnBhY2s6Ly9kZXNrdG9wYXBpLy4vc3JjL2xpYi9vYmplY3RzL3dpbmRvdy93aW5kb3cudHMiLCJ3ZWJwYWNrOi8vZGVza3RvcGFwaS8uL3NyYy9saWIvb2JqZWN0cy93aW5kb3cvd2luZG93RW5naW5lLnRzIiwid2VicGFjazovL2Rlc2t0b3BhcGkvLi9zcmMvbGliL29iamVjdHMvd2luZG93L3dpbmRvd1RyYXkudHMiLCJ3ZWJwYWNrOi8vZGVza3RvcGFwaS8uL3NyYy9saWIvb2JqZWN0cy93aW5kb3cvd2luZG93VmVyc2lvbl8xXzBfMC50cyIsIndlYnBhY2s6Ly9kZXNrdG9wYXBpLy4vc3JjL2xpYi9vYmplY3RzL3dpbmRvdy93aW5kb3dWZXJzaW9uXzNfMV8wLnRzIiwid2VicGFjazovL2Rlc2t0b3BhcGkvLi9zcmMvbGliL29iamVjdHMvd2luZG93L3dpbmRvd1ZlcnNpb25fM18yXzAudHMiLCJ3ZWJwYWNrOi8vZGVza3RvcGFwaS8uL3NyYy9saWIvb2JqZWN0cy93aW5kb3cvd2luZG93VmVyc2lvbl80XzBfMC50cyIsIndlYnBhY2s6Ly9kZXNrdG9wYXBpLy4vc3JjL2xpYi91dGlscy9jcmVhdGVJbnN0YW5jZS50cyIsIndlYnBhY2s6Ly9kZXNrdG9wYXBpLy4vc3JjL2xpYi9wb2x5ZmlsbHMvcG9seWZpbGxzLmpzIiwid2VicGFjazovL2Rlc2t0b3BhcGkvLi9zcmMvbGliL3V0aWxzL3ZlcnNpb25jb21wYXJlLmpzIiwid2VicGFjazovL2Rlc2t0b3BhcGkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZGVza3RvcGFwaS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZGVza3RvcGFwaS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2Rlc2t0b3BhcGkvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9kZXNrdG9wYXBpL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFNOEI7QUFFOUIsSUFBTSxHQUFHLEdBQUcsSUFBSSx5Q0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDO0FBRTFCLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUU7SUFDekIsTUFB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QSw4REFBOEQ7QUFDOUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUssWUFBWTtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDdEtPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdELEdBQUc7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUMxR0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDckJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSw2Q0FBNkMsd0RBQXdELEU7Ozs7O1dDQXJHO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7O1VDTkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJkZXNrdG9wLWFwaS5qcyIsInNvdXJjZXNDb250ZW50IjpbImRlY2xhcmUgZ2xvYmFsIHtcclxuICAgIGludGVyZmFjZSBXaW5kb3cge1xyXG4gICAgICAgIGRlc2t0b3BBcGk6IGFueTtcclxuICAgIH1cclxufVxyXG5cclxuaW1wb3J0IHtBcGl9IGZyb20gXCIuL2xpYi9hcGlcIjtcclxuXHJcbmNvbnN0IGFwaSA9IG5ldyBBcGkoKS5hcGk7XHJcblxyXG5pZiAoT2JqZWN0LmtleXMoYXBpKS5sZW5ndGgpIHtcclxuICAgIHdpbmRvdy5kZXNrdG9wQXBpID0gYXBpO1xyXG59XHJcbiIsImltcG9ydCB7SW5pdGlhbGl6ZXJ9IGZyb20gXCIuL2luaXRpYWxpemVyXCI7XHJcbmltcG9ydCB7Y3JlYXRlSW5zdGFuY2V9IGZyb20gXCIuL3V0aWxzL2NyZWF0ZUluc3RhbmNlXCI7XHJcbmltcG9ydCB7bWFwQXBpfSBmcm9tIFwiLi9kYXRhL21hcEFwaVwiO1xyXG5cclxuLyoqXHJcbiAqIE1haW4gY2xhc3MuXHJcbiAqIEluaXRpYWxpemUgQVBJIHZlcnNpb24gYW5kIEFQSSB0eXBlXHJcbiAqIFByZXBhcmUgZ2xvYmFsICdkZXNrdG9wQXBpJyBvYmplY3Qgd2l0aCBuYW1lc3BhY2VzIGFuZCBtZXRob2RzXHJcbiAqIGZvciB1c2UgYXMgd2luZG93LmRlc2t0b3BBcGkue3tuYW1lc3BhY2V9fS57e21ldGhvZE5hbWV9fVxyXG4gKiBlLmcuIHdpbmRvdy5kZXNrdG9wQXBpLndpbmRvdy5jbG9zZSgpO1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEFwaSB7XHJcbiAgICBhcGk6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmFwaSA9IHRoaXMuX3NldEFwaSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9vcCB0aHJvdWdoIG1hcCBhbmQgc2V0IHJlcXVpcmVkIG1ldGhvZHMgZm9yIHJlc3BlY3RpdmUgQVBJIHZlcnNpb24gYW5kIEFQSSB0eXBlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3NldEFwaSA9ICgpOiB2b2lkID0+IHtcclxuICAgICAgICBjb25zdCBpbml0aWFsaXplcjogSW5pdGlhbGl6ZXIgPSBuZXcgSW5pdGlhbGl6ZXIoKSxcclxuICAgICAgICAgICAgY29udGV4dDogYW55ID0gaW5pdGlhbGl6ZXIuY29udGV4dCxcclxuICAgICAgICAgICAgdmVyc2lvbjogc3RyaW5nID0gaW5pdGlhbGl6ZXIuZW5naW5lLnZlcnNpb24sXHJcbiAgICAgICAgICAgIHR5cGU6IHN0cmluZyA9IGluaXRpYWxpemVyLmVuZ2luZS50eXBlLFxyXG4gICAgICAgICAgICBtYXA6IGFueSA9IG1hcEFwaSxcclxuICAgICAgICAgICAgYXBpOiBhbnkgPSB7fTtcclxuXHJcbiAgICAgICAgLy9jaGVjayBpZiBhcGkgZXhpc3QgZm9yIGdpdmVuIHR5cGUgYW5kIHZlcnNpb25cclxuICAgICAgICBpZiAobWFwW3R5cGVdICE9PSB1bmRlZmluZWQgJiYgbWFwW3R5cGVdW3ZlcnNpb25dICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgLy9sb29wIHRocm91Z2ggZWFjaCBvYmplY3RcclxuICAgICAgICAgICAgbWFwW3R5cGVdW3ZlcnNpb25dLm9iamVjdHMuZm9yRWFjaCgoY2xhc3NOYW1lOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vZ2V0IG9iamVjdCBjbGFzc1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudENsYXNzID0gY3JlYXRlSW5zdGFuY2UoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNsYXNzTmFtZUxvd2VyID0gY2xhc3NOYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICAvL2NyZWF0ZSBjbGFzcyBpbnN0YW5jZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgY2xhc3NJbnN0YW5jZSA9IG5ldyBjdXJyZW50Q2xhc3MoY29udGV4dCwgdmVyc2lvbiwgdHlwZSk7XHJcbiAgICAgICAgICAgICAgICAvL2dldCBvYmplY3QgaW5zdGFuY2UgbWV0aG9kc1xyXG4gICAgICAgICAgICAgICAgYXBpW2NsYXNzTmFtZUxvd2VyXSA9IGNsYXNzSW5zdGFuY2UuZ2V0TWV0aG9kcygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFwaTtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgY29uc3QgY29udGV4dExpc3Q6YW55ID0gW1xyXG4gICAgJ2Nocm9tZS53ZWJ2aWV3JyxcclxuICAgICdleHRlcm5hbCdcclxuXTtcclxuIiwiZXhwb3J0IGNvbnN0IG1hcEFwaTogYW55ID0ge1xyXG4gICAgXCJFbmdpbmVcIjoge1xyXG4gICAgICAgIFwiNC4wLjBcIjoge1xyXG4gICAgICAgICAgICBcIm9iamVjdHNcIjogW1xyXG4gICAgICAgICAgICAgICAgXCJVdGlsc1wiLC8vb2JqZWN0IHN5c3RlbSArIHRyYXlcclxuICAgICAgICAgICAgICAgIFwiV2luZG93XCIsLy9vYmplY3QgYmFzZXduZCArIGNoaWxkV2luZG93ICsgdHJheVxyXG4gICAgICAgICAgICAgICAgXCJQcm9kdWN0c1wiLC8vb2JqZWN0IHByb2R1Y3RzICsgcHJvY2Vzc1xyXG4gICAgICAgICAgICAgICAgXCJBcHBJbmZvXCIsLy9vYmplY3QgYXBwbGljYXRpb25pbmZvXHJcbiAgICAgICAgICAgICAgICBcIkRvd25sb2FkZXJcIi8vb2JqZWN0IGRvd25sb2FkZXIgKyBkb3dubG9hZCArIHRyYXlcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCIzLjIuMFwiOiB7XHJcbiAgICAgICAgICAgIFwib2JqZWN0c1wiOiBbXHJcbiAgICAgICAgICAgICAgICBcIlV0aWxzXCIsXHJcbiAgICAgICAgICAgICAgICBcIldpbmRvd1wiLFxyXG4gICAgICAgICAgICAgICAgXCJQcm9kdWN0c1wiLFxyXG4gICAgICAgICAgICAgICAgXCJEb3dubG9hZGVyXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCIzLjEuMFwiOiB7XHJcbiAgICAgICAgICAgIFwib2JqZWN0c1wiOiBbXHJcbiAgICAgICAgICAgICAgICBcIlV0aWxzXCIsXHJcbiAgICAgICAgICAgICAgICBcIldpbmRvd1wiLFxyXG4gICAgICAgICAgICAgICAgXCJQcm9kdWN0c1wiLFxyXG4gICAgICAgICAgICAgICAgXCJEb3dubG9hZGVyXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCIzLjAuMFwiOiB7XHJcbiAgICAgICAgICAgIFwib2JqZWN0c1wiOiBbXHJcbiAgICAgICAgICAgICAgICBcIlV0aWxzXCIsXHJcbiAgICAgICAgICAgICAgICBcIldpbmRvd1wiLFxyXG4gICAgICAgICAgICAgICAgXCJQcm9kdWN0c1wiLFxyXG4gICAgICAgICAgICAgICAgXCJEb3dubG9hZGVyXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCIyLjAuMFwiOiB7XHJcbiAgICAgICAgICAgIFwib2JqZWN0c1wiOiBbXHJcbiAgICAgICAgICAgICAgICBcIlV0aWxzXCIsXHJcbiAgICAgICAgICAgICAgICBcIldpbmRvd1wiLFxyXG4gICAgICAgICAgICAgICAgXCJQcm9kdWN0c1wiLFxyXG4gICAgICAgICAgICAgICAgXCJEb3dubG9hZGVyXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCIxLjAuMFwiOiB7XHJcbiAgICAgICAgICAgIFwib2JqZWN0c1wiOiBbXHJcbiAgICAgICAgICAgICAgICBcIlV0aWxzXCIsXHJcbiAgICAgICAgICAgICAgICBcIldpbmRvd1wiLFxyXG4gICAgICAgICAgICAgICAgXCJQcm9kdWN0c1wiLFxyXG4gICAgICAgICAgICAgICAgXCJEb3dubG9hZGVyXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlRyYXlcIjoge1xyXG4gICAgICAgIFwiMS4wLjBcIjoge1xyXG4gICAgICAgICAgICBcIm9iamVjdHNcIjogW1xyXG4gICAgICAgICAgICAgICAgXCJVdGlsc1wiLFxyXG4gICAgICAgICAgICAgICAgXCJXaW5kb3dcIixcclxuICAgICAgICAgICAgICAgIFwiRG93bmxvYWRlclwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcbiIsIi8qKlxyXG4gKiBEaXNwYXRjaCBtZXRob2QgY2FsbCB3aXRoIHNjb3BlIGNvbnRleHQgYW5kIGFyZ3VtZW50c1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIERpc3BhdGNoZXIge1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdmVyc2lvbk9iamVjdDogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHZlcnNpb25PYmplY3Q6IGFueSkge1xyXG4gICAgICAgICB0aGlzLl92ZXJzaW9uT2JqZWN0ID0gdmVyc2lvbk9iamVjdDtcclxuICAgIH1cclxuXHJcbiAgICBkaXNwYXRjaCA9IChmdW5jOiBhbnksIGFyZ3M6IGFueSkgPT4ge1xyXG4gICAgICAgIGlmKHRoaXMuX2hhc0Z1bmN0aW9uKGZ1bmMpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92ZXJzaW9uT2JqZWN0W2Z1bmNdLmNhbGwodGhpcy5fdmVyc2lvbk9iamVjdCwgYXJncyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGdW5jdGlvbiBub3QgZXhpc3QuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIF9oYXNGdW5jdGlvbiA9IChmdW5jOiBhbnkpID0+IHtcclxuICAgICAgICByZXR1cm4gKHR5cGVvZiB0aGlzLl92ZXJzaW9uT2JqZWN0W2Z1bmNdID09PSBcImZ1bmN0aW9uXCIpO1xyXG4gICAgfTtcclxufVxyXG4iLCJpbXBvcnQge2NvbnRleHRMaXN0fSBmcm9tIFwiLi9kYXRhL2NvbnRleHRMaXN0XCI7XHJcbmltcG9ydCB7RW5naW5lfSBmcm9tIFwiLi9vYmplY3RzL2VuZ2luZS9lbmdpbmVcIjtcclxuXHJcbi8qKlxyXG4gKiBDaGVja3Mgd2hhdCBKUyBBUEkgaW5qZWN0ZWQgYW5kIHNldCBlbmdpbmUgdHlwZSwgZW5naW5lIHZlcnNpb24gYW5kIGNvbnRleHRcclxuICogQ29udGV4dCBjb3VsZCBiZSAnd2luZG93LmV4dGVybmFsJyBvciAnd2luZG93LmNocm9tZS53ZWJ2aWV3MidcclxuICovXHJcbmV4cG9ydCBjbGFzcyBJbml0aWFsaXplciB7XHJcbiAgICBjb250ZXh0OiBhbnkgPSB3aW5kb3cuZXh0ZXJuYWw7Ly9kZWZhdWx0IHZhbHVlXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9jb250ZXh0TGlzdDogW10gPSBjb250ZXh0TGlzdDtcclxuICAgIGVuZ2luZTogRW5naW5lO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2NvbnRleHRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3dbdGhpcy5fY29udGV4dExpc3RbaV1dICE9PSB1bmRlZmluZWQgJiYgdGhpcy5fY29udGV4dExpc3RbaV0gIT09IHRoaXMuY29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0ID0gd2luZG93W3RoaXMuX2NvbnRleHRMaXN0W2ldXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmVuZ2luZSA9IG5ldyBFbmdpbmUodGhpcy5jb250ZXh0KTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge0Jhc2VPYmplY3R9IGZyb20gXCIuLi9iYXNlT2JqZWN0XCI7XHJcbmltcG9ydCB7RGlzcGF0Y2hlcn0gZnJvbSBcIi4uLy4uL2Rpc3BhdGNoZXJcIjtcclxuaW1wb3J0IHtBcHBJbmZvRW5naW5lfSBmcm9tIFwiLi9hcHBJbmZvRW5naW5lXCI7XHJcblxyXG4vKipcclxuICogYXBwbGljYXRpb25JbmZvIG9iamVjdCBpbXBsZW1lbnRzIGFjY2VzcyB0byB0aGUgYXBwbGljYXRpb24gaW5mb3JtYXRpb24uXHJcbiAqIEluIHBhcnRpY3VsYXIsIHByb2R1Y3QgY29kZSwgbGFuZ3VhZ2UsIGJ1aWxkIGlkLCBkYXlzIGFuZCB0aW1lIHNpbmNlIGluc3RhbGxhdGlvbiwgYXBwbGljYXRpb24gdmVyc2lvbi5cclxuICogVXNlIG9iamVjdHM6IGFwcGxpY2F0aW9uSW5mb1xyXG4gKiBTdXBwb3J0ZWQgc2luY2U6IDQuMC4wXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQXBwSW5mbyBleHRlbmRzIEJhc2VPYmplY3Qge1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfZGlzcGF0Y2hlcjogRGlzcGF0Y2hlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0OiBvYmplY3QsIHZlcnNpb246IHN0cmluZywgdHlwZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoY29udGV4dCwgdmVyc2lvbiwgdHlwZSk7XHJcbiAgICAgICAgdGhpcy52ZXJzaW9uT2JqZWN0ID0gbmV3IEFwcEluZm9FbmdpbmUoY29udGV4dCwgdmVyc2lvbik7XHJcbiAgICAgICAgdGhpcy5fZGlzcGF0Y2hlciA9IG5ldyBEaXNwYXRjaGVyKHRoaXMudmVyc2lvbk9iamVjdCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZXMgcHJvZHVjdCB2ZXJzaW9uIG9mIHRoZSBhcHBsaWNhdGlvbiB0aGF0IGhhcyBpbml0aWF0ZWQgaW4tcHJvZHVjdCBtZXNzYWdlIGNoZWNrLlxyXG4gICAgICogU2luY2U6IDQuMC4wXHJcbiAgICAgKi9cclxuICAgIGdldEFwcGxpY2F0aW9uVmVyc2lvbiA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNwYXRjaGVyLmRpc3BhdGNoKFwiZ2V0QXBwbGljYXRpb25WZXJzaW9uXCIsIFtdKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZXMgcHJvZHVjdCBidWlsZCBpZCBvZiB0aGUgYXBwbGljYXRpb24gdGhhdCBoYXMgaW5pdGlhdGVkIGluLXByb2R1Y3QgbWVzc2FnZSBjaGVjay5cclxuICAgICAqIFNpbmNlOiA0LjAuMFxyXG4gICAgICovXHJcbiAgICBnZXRCdWlsZElkID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc3BhdGNoZXIuZGlzcGF0Y2goXCJnZXRCdWlsZElkXCIsIFtdKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZXMgZGF5cyBzaW5jZSBpbnN0YWxsIG9mIHRoZSBhcHBsaWNhdGlvbiB0aGF0IGhhcyBpbml0aWF0ZWQgaW4tcHJvZHVjdCBtZXNzYWdlIGNoZWNrLlxyXG4gICAgICogU2luY2U6IDQuMC4wXHJcbiAgICAgKi9cclxuICAgIGdldERheXNTaW5jZUluc3RhbGwgPSAoKTogbnVtYmVyID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGlzcGF0Y2hlci5kaXNwYXRjaChcImdldERheXNTaW5jZUluc3RhbGxcIiwgW10pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlcyBhcHBsaWNhdGlvbiBsYW5ndWFnZSBjb2RlIGZvciB0aGUgbGFuZ3VhZ2UgdGhhdCB0aGUgYXBwbGljYXRpb24gaXMgc2V0IHVwIHRvIHJ1biBpbi5cclxuICAgICAqIFNpbmNlOiA0LjAuMFxyXG4gICAgICovXHJcbiAgICBnZXRMYW5ndWFnZUNvZGUgPSAoKTogc3RyaW5nID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGlzcGF0Y2hlci5kaXNwYXRjaChcImdldExhbmd1YWdlQ29kZVwiLCBbXSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0cmlldmVzIG1pbnV0ZXMgc2luY2UgaW5zdGFsbCBvZiB0aGUgYXBwbGljYXRpb24gdGhhdCBoYXMgaW5pdGlhdGVkIGluLXByb2R1Y3QgbWVzc2FnZSBjaGVjay5cclxuICAgICAqIFNpbmNlOiA0LjAuMFxyXG4gICAgICovXHJcbiAgICBnZXRNaW51dGVzU2luY2VJbnN0YWxsID0gKCk6IG51bWJlciA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc3BhdGNoZXIuZGlzcGF0Y2goXCJnZXRNaW51dGVzU2luY2VJbnN0YWxsXCIsIFtdKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZXMgcHJvZHVjdCBjb2RlIG9mIHRoZSBhcHBsaWNhdGlvbiB0aGF0IGhhcyBpbml0aWF0ZWQgaW4tcHJvZHVjdCBtZXNzYWdlIGNoZWNrLlxyXG4gICAgICogU2luY2U6IDQuMC4wXHJcbiAgICAgKi9cclxuICAgIGdldFByb2R1Y3RDb2RlID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc3BhdGNoZXIuZGlzcGF0Y2goXCJnZXRQcm9kdWN0Q29kZVwiLCBbXSk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHt2ZXJzaW9uQ29tcGFyZX0gZnJvbSBcIi4uLy4uL3V0aWxzL3ZlcnNpb25jb21wYXJlXCI7XHJcbmltcG9ydCB7QXBwSW5mb1ZlcnNpb25fNF8wXzB9IGZyb20gXCIuL2FwcEluZm9WZXJzaW9uXzRfMF8wXCI7XHJcblxyXG4vKipcclxuICogSGVscGVyIFdyYXBwZXIgQ2xhc3NcclxuICogQ2hlY2sgdmVyc2lvbiBhbmQgcmV0dXJuIHZlcnNpb25lZCBjbGFzcyBpbnN0YW5jZVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEFwcEluZm9FbmdpbmUge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQ6IG9iamVjdCwgdmVyc2lvbjogc3RyaW5nKSB7XHJcblxyXG4gICAgICAgIGlmICh2ZXJzaW9uQ29tcGFyZSh2ZXJzaW9uLCAnNC4wLjAnLCAnPj0nKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEFwcEluZm9WZXJzaW9uXzRfMF8wKGNvbnRleHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtCYXNlQ29udGV4dE9iamVjdH0gZnJvbSBcIi4uL2Jhc2VDb250ZXh0T2JqZWN0XCI7XHJcblxyXG4vKipcclxuICogYXBwbGljYXRpb25JbmZvIG9iamVjdCBpbXBsZW1lbnRzIGFjY2VzcyB0byB0aGUgYXBwbGljYXRpb24gaW5mb3JtYXRpb24uXHJcbiAqIEluIHBhcnRpY3VsYXIsIHByb2R1Y3QgY29kZSwgbGFuZ3VhZ2UsIGJ1aWxkIGlkLCBkYXlzIGFuZCB0aW1lIHNpbmNlIGluc3RhbGxhdGlvbiwgYXBwbGljYXRpb24gdmVyc2lvbi5cclxuICogVXNlIG9iamVjdHM6IGFwcGxpY2F0aW9uSW5mb1xyXG4gKiBTdXBwb3J0ZWQgc2luY2U6IDQuMC4wXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQXBwSW5mb1ZlcnNpb25fNF8wXzAgZXh0ZW5kcyBCYXNlQ29udGV4dE9iamVjdCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29udGV4dDogb2JqZWN0KSB7XHJcbiAgICAgICAgc3VwZXIoY29udGV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZXMgcHJvZHVjdCB2ZXJzaW9uIG9mIHRoZSBhcHBsaWNhdGlvbiB0aGF0IGhhcyBpbml0aWF0ZWQgaW4tcHJvZHVjdCBtZXNzYWdlIGNoZWNrLlxyXG4gICAgICovXHJcbiAgICBnZXRBcHBsaWNhdGlvblZlcnNpb24gPSAoKTogc3RyaW5nID0+IHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5hcHBsaWNhdGlvbkluZm8uZ2V0QXBwbGljYXRpb25WZXJzaW9uKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0cmlldmVzIHByb2R1Y3QgYnVpbGQgaWQgb2YgdGhlIGFwcGxpY2F0aW9uIHRoYXQgaGFzIGluaXRpYXRlZCBpbi1wcm9kdWN0IG1lc3NhZ2UgY2hlY2suXHJcbiAgICAgKi9cclxuICAgIGdldEJ1aWxkSWQgPSAoKTogc3RyaW5nID0+IHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5hcHBsaWNhdGlvbkluZm8uZ2V0QnVpbGRJZCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlcyBkYXlzIHNpbmNlIGluc3RhbGwgb2YgdGhlIGFwcGxpY2F0aW9uIHRoYXQgaGFzIGluaXRpYXRlZCBpbi1wcm9kdWN0IG1lc3NhZ2UgY2hlY2suXHJcbiAgICAgKi9cclxuICAgIGdldERheXNTaW5jZUluc3RhbGwgPSAoKTogbnVtYmVyID0+IHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5hcHBsaWNhdGlvbkluZm8uZ2V0RGF5c1NpbmNlSW5zdGFsbCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlcyBhcHBsaWNhdGlvbiBsYW5ndWFnZSBjb2RlIGZvciB0aGUgbGFuZ3VhZ2UgdGhhdCB0aGUgYXBwbGljYXRpb24gaXMgc2V0IHVwIHRvIHJ1biBpbi5cclxuICAgICAqL1xyXG4gICAgZ2V0TGFuZ3VhZ2VDb2RlID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuYXBwbGljYXRpb25JbmZvLmdldExhbmd1YWdlQ29kZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlcyBtaW51dGVzIHNpbmNlIGluc3RhbGwgb2YgdGhlIGFwcGxpY2F0aW9uIHRoYXQgaGFzIGluaXRpYXRlZCBpbi1wcm9kdWN0IG1lc3NhZ2UgY2hlY2suXHJcbiAgICAgKi9cclxuICAgIGdldE1pbnV0ZXNTaW5jZUluc3RhbGwgPSAoKTogbnVtYmVyID0+IHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5hcHBsaWNhdGlvbkluZm8uZ2V0TWludXRlc1NpbmNlSW5zdGFsbCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlcyBwcm9kdWN0IGNvZGUgb2YgdGhlIGFwcGxpY2F0aW9uIHRoYXQgaGFzIGluaXRpYXRlZCBpbi1wcm9kdWN0IG1lc3NhZ2UgY2hlY2suXHJcbiAgICAgKi9cclxuICAgIGdldFByb2R1Y3RDb2RlID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuYXBwbGljYXRpb25JbmZvLmdldFByb2R1Y3RDb2RlKCk7XHJcbiAgICB9O1xyXG59XHJcbiIsIi8qKlxyXG4gKiBCYXNlIGNsYXNzIGZvciB2ZXJzaW9uZWQgb2JqZWN0cyBpbmhlcml0YW5jZVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJhc2VDb250ZXh0T2JqZWN0IHtcclxuICAgIGNvbnRleHQ6IG9iamVjdDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0OiBvYmplY3QpIHtcclxuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG4gICAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBCYXNlIGNsYXNzIGZvciBpbmhlcml0YW5jZVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJhc2VPYmplY3Qge1xyXG4gICAgW2luZGV4OiBzdHJpbmddOiBhbnk7XHJcblxyXG4gICAgdHlwZTogc3RyaW5nO1xyXG4gICAgdmVyc2lvbjogc3RyaW5nO1xyXG4gICAgY29udGV4dDogb2JqZWN0O1xyXG4gICAgdmVyc2lvbk9iamVjdDogYW55ID0ge307XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29udGV4dDogb2JqZWN0LCB2ZXJzaW9uOiBzdHJpbmcsIHR5cGU6IHN0cmluZyApIHtcclxuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG4gICAgICAgIHRoaXMudmVyc2lvbiA9IHZlcnNpb247XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiBhbGwgdmVyc2lvbmVkIGNsYXNzIG1ldGhvZHNcclxuICAgICAqIEhlbHBmdWwgdG8gaGF2ZSBvbmx5IGF2YWlsYWJsZSBtZXRob2RzXHJcbiAgICAgKiBpbiB0aGUgZ2xvYmFsIG5hbWVzcGFjZVxyXG4gICAgICogZS5nLiB3aW5kb3cuZGVza3RvcEFwaS5XaW5kb3dbbWV0aG9kX25hbWVdXHJcbiAgICAgKi9cclxuICAgIGdldE1ldGhvZHMgPSAoKSA9PiB7XHJcbiAgICAgICAgbGV0IG1ldGhvZHM6IGFueSA9IHt9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogVG8gYmUgY29tcGF0aWJsZSB3aXRoIG9sZCBJRVxyXG4gICAgICAgICAgICAgKiB0aGlzIGNhbiBiZSBkb25lIGluIG90aGVyIHdheSB0byBub3QgdXNlIHBvbHlmaWxscyBmb3JcclxuICAgICAgICAgICAgICogYE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzYCBhbmQgYEFycmF5LmZpbHRlcmBcclxuICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgLy90b2RvIHJlZG9uZSBmb3Igb2xkIElFIHRvIGV4Y2x1ZGUgcG9seWZpbGxzXHJcbiAgICAgICAgICAgIG1ldGhvZE5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcy52ZXJzaW9uT2JqZWN0KS5maWx0ZXIoaXRlbSA9PiB0eXBlb2YgdGhpcy52ZXJzaW9uT2JqZWN0W2l0ZW1dID09PSAnZnVuY3Rpb24nKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZXRob2ROYW1lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBtZXRob2RzW21ldGhvZE5hbWVzW2ldXSA9IHRoaXMudmVyc2lvbk9iamVjdFttZXRob2ROYW1lc1tpXV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWV0aG9kcztcclxuICAgIH1cclxufVxyXG4iLCIvKipcclxuICogQ2FsbGJhY2sgb2JqZWN0IGhlbHBzIHRvIGNvbW11bmljYXRlIHdpdGggQysrIGFzeW5jIGRvd25sb2FkXHJcbiAqIEMrKyBleHBlY3QgSURpc3BhdGNoIHR5cGUgb2JqZWN0IHRoYXQgd2lsbCBiZSB1c2VkIGZvciBub3RpZnlpbmcgY2FsbGVyIGFib3V0IGRvd25sb2FkIHByb2dyZXNzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENhbGxiYWNrT2JqZWN0IHtcclxuXHJcbiAgICBvblByb2dyZXNzID0gKHByb2dyZXNzOiBzdHJpbmcpOiBhbnkgPT4ge307XHJcblxyXG4gICAgb25FcnJvciA9ICgpOiBhbnkgPT4ge307XHJcblxyXG4gICAgb25DYW5jZWxsZWQgPSAoKTogYW55ID0+IHt9O1xyXG5cclxuICAgIG9uRmluaXNoZWQgPSAoZG93bmxvYWRJRDogc3RyaW5nKTogYW55ID0+IHt9O1xyXG59XHJcbiIsImltcG9ydCB7QmFzZU9iamVjdH0gZnJvbSBcIi4uL2Jhc2VPYmplY3RcIjtcclxuaW1wb3J0IHtEaXNwYXRjaGVyfSBmcm9tIFwiLi4vLi4vZGlzcGF0Y2hlclwiO1xyXG5pbXBvcnQge0NhbGxiYWNrT2JqZWN0fSBmcm9tIFwiLi9jYWxsYmFja09iamVjdFwiO1xyXG5pbXBvcnQge0Rvd25sb2FkZXJUcmF5fSBmcm9tIFwiLi9kb3dubG9hZGVyVHJheVwiO1xyXG5pbXBvcnQge0Rvd25sb2FkZXJFbmdpbmV9IGZyb20gXCIuL2Rvd25sb2FkZXJFbmdpbmVcIjtcclxuXHJcbi8qKlxyXG4gKiBEb3dubG9hZGVyIHdyYXBwZXIgb2JqZWN0IGdpdmVzIGludGVyZmFjZSB0byBkb3dubG9hZCBmaWxlIGZyb20gaW50ZXJuZXQgYW5kIGxhdW5jaCBiaW5hcnkuXHJcbiAqIEl0IGRvd25sb2FkcyBlbmNyeXB0ZWQgZmlsZSBhbmQgZGVjcnlwdHMgaXQgd2l0aCBwdWJsaWMga2V5IHRvIHByZXZlbnQgdGFtcGVyaW5nLlxyXG4gKiBPbiBvYmplY3QgZGVzdHJveSAtIGRvd25sb2FkIGlzIGNhbmNlbGVkLiBEb3dubG9hZCBvYmplY3QgdXN1YWxseSBpcyBkZXN0cm95ZWQgb24gYnJvd3NlciB3aW5kb3cgY2xvc2UuXHJcbiAqIFVzZSBvYmplY3RzOiBkb3dubG9hZGVyfHRyYXl8ZG93bmxvYWRcclxuICogRG93bmxvYWRlciBzdXBwb3J0ZWQgc2luY2U6IDQuMC4wXHJcbiAqIFRyYXkgc3VwcG9ydGVkIHNpbmNlOiAxLjAuMFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIERvd25sb2FkZXIgZXh0ZW5kcyBCYXNlT2JqZWN0IHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2Rpc3BhdGNoZXI6IERpc3BhdGNoZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29udGV4dDogb2JqZWN0LCB2ZXJzaW9uOiBzdHJpbmcsIHR5cGU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKGNvbnRleHQsIHZlcnNpb24sIHR5cGUpO1xyXG5cclxuICAgICAgICBpZiAodHlwZSA9PT0gJ1RyYXknKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmVyc2lvbk9iamVjdCA9IG5ldyBEb3dubG9hZGVyVHJheShjb250ZXh0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnZlcnNpb25PYmplY3QgPSBuZXcgRG93bmxvYWRlckVuZ2luZShjb250ZXh0LCB2ZXJzaW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2Rpc3BhdGNoZXIgPSBuZXcgRGlzcGF0Y2hlcih0aGlzLnZlcnNpb25PYmplY3QpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTGF1bmNoZXMgZG93bmxvYWRlZCBiaW5hcnlcclxuICAgICAqIEBwYXJhbSBkb3dubG9hZElEXHJcbiAgICAgKiBAcGFyYW0gY21kUGFyYW1zXHJcbiAgICAgKiBTdXBwb3J0ZWQgc2luY2U6IDQuMC4wXHJcbiAgICAgKi9cclxuICAgIGV4ZWN1dGUgPSAoZG93bmxvYWRJRDogc3RyaW5nLCBjbWRQYXJhbXM6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gICAgICAgIHRoaXMuX2Rpc3BhdGNoZXIuZGlzcGF0Y2goXCJleGVjdXRlXCIsIFtkb3dubG9hZElELCBjbWRQYXJhbXNdKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMYXVuY2hlcyBkb3dubG9hZGVkIGJpbmFyeSBhbmQgd2FpdHMgZm9yIHByb2Nlc3MgZW5kXHJcbiAgICAgKiBAcGFyYW0gZG93bmxvYWRJRFxyXG4gICAgICogQHBhcmFtIGNtZFBhcmFtc1xyXG4gICAgICogU3VwcG9ydGVkIHNpbmNlOiA0LjAuMFxyXG4gICAgICovXHJcbiAgICBleGVjdXRlQW5kV2FpdCA9IChkb3dubG9hZElEOiBzdHJpbmcsIGNtZFBhcmFtczogc3RyaW5nKTogdm9pZCA9PiB7XHJcbiAgICAgICAgdGhpcy5fZGlzcGF0Y2hlci5kaXNwYXRjaChcImV4ZWN1dGVBbmRXYWl0XCIsIFtkb3dubG9hZElELCBjbWRQYXJhbXNdKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYW5jZWxzIGEgZG93bmxvYWQgaW4gcHJvZ3Jlc3MuXHJcbiAgICAgKiBAcGFyYW0gZG93bmxvYWRJRFxyXG4gICAgICogU3VwcG9ydGVkIHNpbmNlOiA0LjAuMFxyXG4gICAgICovXHJcbiAgICBjYW5jZWwgPSAoZG93bmxvYWRJRDogc3RyaW5nKTogdm9pZCA9PiB7XHJcbiAgICAgICAgdGhpcy5fZGlzcGF0Y2hlci5kaXNwYXRjaChcImNhbmNlbFwiLCBbZG93bmxvYWRJRF0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFdyYXBwZXIgZnVuY3Rpb24gdG8gZG8gc2ltcGxlIGRvd25sb2FkXHJcbiAgICAgKiBAcGFyYW0gdXJsT2JqZWN0XHJcbiAgICAgKiBAcGFyYW0gY21kUGFyYW1zXHJcbiAgICAgKiBAcGFyYW0gY2xpZW50Q2FsbGJhY2tcclxuICAgICAqIFN1cHBvcnRlZCBzaW5jZTogNC4wLjBcclxuICAgICAqL1xyXG4gICAgZG93bmxvYWRBbmRMYXVuY2ggPSAodXJsT2JqZWN0OiB7fSA9IHt1cmw6IFwiXCIsIHNlY3VyZVVybDogXCJcIn0sIGNtZFBhcmFtczogc3RyaW5nID0gJycsIGNsaWVudENhbGxiYWNrPzogb2JqZWN0KTogc3RyaW5nIHwgdm9pZCA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc3BhdGNoZXIuZGlzcGF0Y2goXCJkb3dubG9hZEFuZExhdW5jaFwiLCBbdXJsT2JqZWN0LCBjbWRQYXJhbXMsIGNsaWVudENhbGxiYWNrXSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGVscGVyIGZ1bmN0aW9uIGZvciBjbGllbnQuXHJcbiAgICAgKiBDcmVhdGluZyBDYWxsYmFjayBJbnN0YW5jZS5cclxuICAgICAqIENsaWVudCBhYmxlIHRvIGNyZWF0ZSBjYWxsYmFjayBvYmplY3RcclxuICAgICAqIGFuZCBtYXkgcmVkZWZpbmUgbmVjZXNzYXJ5IG1ldGhvZHNcclxuICAgICAqIGFuZCBwYXNzIGl0IHRocm91Z2ggZG93bmxvYWRBbmRMYXVuY2ggbWV0aG9kIGUuZy5cclxuICAgICAqXHJcbiAgICAgKiAvL0lFIGZyaWVuZGx5IGNvZGVcclxuICAgICAqIHZhciBjbGllbnRDYWxsYmFjayA9IHdpbmRvdy5kZXNrdG9wQXBpLmRvd25sb2FkZXIuY3JlYXRlQ2FsbGJhY2tJbnN0YW5jZSgpO1xyXG4gICAgICogY2xpZW50Q2FsbGJhY2sub25Qcm9ncmVzcyA9IGZ1bmN0aW9uKHByb2dyZXNzVmFsdWUpe2NvbnNvbGUubG9nKHByb2dyZXNzVmFsdWUpO31cclxuICAgICAqIHZhciBkb3dubG9hZElkID0gd2luZG93LmRlc2t0b3BBcGkuZG93bmxvYWRlci5kb3dubG9hZEFuZExhdW5jaCh1cmwsIGNtZFBhcmFtLCBjbGllbnRDYWxsYmFjayk7XHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZUNhbGxiYWNrSW5zdGFuY2UgPSAoKTogQ2FsbGJhY2tPYmplY3QgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNwYXRjaGVyLmRpc3BhdGNoKFwiY3JlYXRlQ2FsbGJhY2tJbnN0YW5jZVwiLCBbXSk7XHJcbiAgICB9O1xyXG59XHJcbiIsImltcG9ydCB7dmVyc2lvbkNvbXBhcmV9IGZyb20gXCIuLi8uLi91dGlscy92ZXJzaW9uY29tcGFyZVwiO1xyXG5pbXBvcnQge0Rvd25sb2FkZXJWZXJzaW9uXzRfMF8wfSBmcm9tIFwiLi9kb3dubG9hZGVyVmVyc2lvbl80XzBfMFwiO1xyXG5pbXBvcnQge0Rvd25sb2FkZXJWZXJzaW9uXzFfMF8wfSBmcm9tIFwiLi9kb3dubG9hZGVyVmVyc2lvbl8xXzBfMFwiO1xyXG5cclxuLyoqXHJcbiAqIEhlbHBlciBXcmFwcGVyIENsYXNzXHJcbiAqIENoZWNrIHZlcnNpb24gYW5kIHJldHVybiB2ZXJzaW9uZWQgY2xhc3MgaW5zdGFuY2VcclxuICovXHJcbmV4cG9ydCBjbGFzcyBEb3dubG9hZGVyRW5naW5lIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0OiBvYmplY3QsIHZlcnNpb246IHN0cmluZykge1xyXG5cclxuICAgICAgICBpZiAodmVyc2lvbkNvbXBhcmUodmVyc2lvbiwgJzQuMC4wJywgJz49JykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEb3dubG9hZGVyVmVyc2lvbl80XzBfMChjb250ZXh0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IERvd25sb2FkZXJWZXJzaW9uXzFfMF8wKGNvbnRleHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtCYXNlQ29udGV4dE9iamVjdH0gZnJvbSBcIi4uL2Jhc2VDb250ZXh0T2JqZWN0XCI7XHJcbmltcG9ydCB7Q2FsbGJhY2tPYmplY3R9IGZyb20gXCIuL2NhbGxiYWNrT2JqZWN0XCI7XHJcblxyXG4vKipcclxuICogRG93bmxvYWRlciB3cmFwcGVyIG9iamVjdCBnaXZlcyBpbnRlcmZhY2UgdG8gZG93bmxvYWQgZmlsZSBmcm9tIGludGVybmV0IGFuZCBsYXVuY2ggYmluYXJ5LlxyXG4gKiBJdCBkb3dubG9hZHMgZW5jcnlwdGVkIGZpbGUgYW5kIGRlY3J5cHRzIGl0IHdpdGggcHVibGljIGtleSB0byBwcmV2ZW50IHRhbXBlcmluZy5cclxuICogT24gb2JqZWN0IGRlc3Ryb3kgLSBkb3dubG9hZCBpcyBjYW5jZWxlZC4gRG93bmxvYWQgb2JqZWN0IHVzdWFsbHkgaXMgZGVzdHJveWVkIG9uIGJyb3dzZXIgd2luZG93IGNsb3NlLlxyXG4gKiBVc2Ugb2JqZWN0czogZG93bmxvYWRlcnx0cmF5fGRvd25sb2FkXHJcbiAqIERvd25sb2FkZXIgc3VwcG9ydGVkIHNpbmNlOiA0LjAuMFxyXG4gKiBUcmF5IHN1cHBvcnRlZCBzaW5jZTogMS4wLjBcclxuICovXHJcbmV4cG9ydCBjbGFzcyBEb3dubG9hZGVyVHJheSBleHRlbmRzIEJhc2VDb250ZXh0T2JqZWN0IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0OiBvYmplY3QpIHtcclxuICAgICAgICBzdXBlcihjb250ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdyYXBwZXIgZnVuY3Rpb24gdG8gZG8gc2ltcGxlIGRvd25sb2FkXHJcbiAgICAgKiBAcGFyYW0gdXJsT2JqZWN0XHJcbiAgICAgKiBAcGFyYW0gY21kUGFyYW1zIHwga2VlcCB0aGlzIGZvciBjb21wYXRpYmlsaXR5XHJcbiAgICAgKiBAcGFyYW0gY2xpZW50Q2FsbGJhY2sgfCBrZWVwIHRoaXMgZm9yIGNvbXBhdGliaWxpdHlcclxuICAgICAqL1xyXG4gICAgZG93bmxvYWRBbmRMYXVuY2ggPSAodXJsT2JqZWN0ID0ge3VybDogXCJcIiwgc2VjdXJlVXJsOiBcIlwifSwgY21kUGFyYW1zOiBzdHJpbmcgPSAnJywgY2xpZW50Q2FsbGJhY2s/OiBvYmplY3QpOiB2b2lkID0+IHtcclxuXHJcbiAgICAgICAgY29uc3QgdXJsID0gdXJsT2JqZWN0LnVybDtcclxuXHJcbiAgICAgICAgaWYgKCF1cmwpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciB3aGlsZSBkb3dubG9hZGluZy4gTWlzc2luZyB1cmwnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICB0aGlzLmNvbnRleHQudHJheS5kb3dubG9hZEFuZExhdW5jaCh1cmwpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhlbHBlciBmdW5jdGlvbiBmb3IgY2xpZW50LlxyXG4gICAgICogQ3JlYXRpbmcgQ2FsbGJhY2sgSW5zdGFuY2UuXHJcbiAgICAgKiBDbGllbnQgYWJsZSB0byBjcmVhdGUgY2FsbGJhY2sgb2JqZWN0XHJcbiAgICAgKiBhbmQgbWF5IHJlZGVmaW5lIG5lY2Vzc2FyeSBtZXRob2RzXHJcbiAgICAgKiBhbmQgcGFzcyBpdCB0aHJvdWdoIGRvd25sb2FkQW5kTGF1bmNoIG1ldGhvZCBlLmcuXHJcbiAgICAgKlxyXG4gICAgICogLy9JRSBmcmllbmRseSBjb2RlXHJcbiAgICAgKiB2YXIgY2xpZW50Q2FsbGJhY2sgPSB3aW5kb3cuZGVza3RvcEFwaS5kb3dubG9hZGVyLmNyZWF0ZUNhbGxiYWNrSW5zdGFuY2UoKTtcclxuICAgICAqIGNsaWVudENhbGxiYWNrLm9uUHJvZ3Jlc3MgPSBmdW5jdGlvbihwcm9ncmVzc1ZhbHVlKXtjb25zb2xlLmxvZyhwcm9ncmVzc1ZhbHVlKTt9XHJcbiAgICAgKiB2YXIgZG93bmxvYWRJZCA9IHdpbmRvdy5kZXNrdG9wQXBpLmRvd25sb2FkZXIuZG93bmxvYWRBbmRMYXVuY2godXJsLCBjbWRQYXJhbSwgY2xpZW50Q2FsbGJhY2spO1xyXG4gICAgICovXHJcbiAgICBjcmVhdGVDYWxsYmFja0luc3RhbmNlID0gKCk6IENhbGxiYWNrT2JqZWN0ID0+IHtcclxuICAgICAgICByZXR1cm4gbmV3IENhbGxiYWNrT2JqZWN0KCk7XHJcbiAgICB9O1xyXG59XHJcbiIsImltcG9ydCB7QmFzZUNvbnRleHRPYmplY3R9IGZyb20gXCIuLi9iYXNlQ29udGV4dE9iamVjdFwiO1xyXG5pbXBvcnQge0NhbGxiYWNrT2JqZWN0fSBmcm9tIFwiLi9jYWxsYmFja09iamVjdFwiO1xyXG5cclxuLyoqXHJcbiAqIERvd25sb2FkZXIgd3JhcHBlciBvYmplY3QgZ2l2ZXMgaW50ZXJmYWNlIHRvIGRvd25sb2FkIGZpbGUgZnJvbSBpbnRlcm5ldCBhbmQgbGF1bmNoIGJpbmFyeS5cclxuICogSXQgZG93bmxvYWRzIGVuY3J5cHRlZCBmaWxlIGFuZCBkZWNyeXB0cyBpdCB3aXRoIHB1YmxpYyBrZXkgdG8gcHJldmVudCB0YW1wZXJpbmcuXHJcbiAqIE9uIG9iamVjdCBkZXN0cm95IC0gZG93bmxvYWQgaXMgY2FuY2VsZWQuIERvd25sb2FkIG9iamVjdCB1c3VhbGx5IGlzIGRlc3Ryb3llZCBvbiBicm93c2VyIHdpbmRvdyBjbG9zZS5cclxuICogVXNlIG9iamVjdHM6IHByb2Nlc3N8ZG93bmxvYWRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBEb3dubG9hZGVyVmVyc2lvbl8xXzBfMCBleHRlbmRzIEJhc2VDb250ZXh0T2JqZWN0IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0OiBvYmplY3QpIHtcclxuICAgICAgICBzdXBlcihjb250ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExhdW5jaGVzIGRvd25sb2FkZWQgYmluYXJ5XHJcbiAgICAgKiBAcGFyYW0gZG93bmxvYWRJRFxyXG4gICAgICogQHBhcmFtIGNtZFBhcmFtc1xyXG4gICAgICovXHJcbiAgICBleGVjdXRlID0gKGRvd25sb2FkSUQ6IHN0cmluZywgY21kUGFyYW1zOiBzdHJpbmcpOiB2b2lkID0+IHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgdGhpcy5jb250ZXh0LnByb2Nlc3MuZXhlY3V0ZShkb3dubG9hZElELCBjbWRQYXJhbXMpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIExhdW5jaGVzIGRvd25sb2FkZWQgYmluYXJ5IGFuZCB3YWl0cyBmb3IgcHJvY2VzcyBlbmRcclxuICAgICAqIEBwYXJhbSBkb3dubG9hZElEXHJcbiAgICAgKiBAcGFyYW0gY21kUGFyYW1zXHJcbiAgICAgKi9cclxuICAgIGV4ZWN1dGVBbmRXYWl0ID0gKGRvd25sb2FkSUQ6IHN0cmluZywgY21kUGFyYW1zOiBzdHJpbmcpOiB2b2lkID0+IHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgdGhpcy5jb250ZXh0LnByb2Nlc3MuZXhlY3V0ZUFuZFdhaXQoZG93bmxvYWRJRCwgY21kUGFyYW1zKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEb3dubG9hZHMgZmlsZSBhc3luY2hyb25vdXNseSBhbmQgZGVjcnlwdHMgaXQgd2l0aCBSU0FcclxuICAgICAqIEBwYXJhbSB1cmxcclxuICAgICAqIEBwYXJhbSBub3RpZmljYXRpb25PYmplY3RcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfc3RhcnQgPSAodXJsOiBzdHJpbmcsIG5vdGlmaWNhdGlvbk9iamVjdDogQ2FsbGJhY2tPYmplY3QpOiBzdHJpbmcgPT4ge1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LmRvd25sb2FkLnN0YXJ0KHVybCwgbm90aWZpY2F0aW9uT2JqZWN0KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYW5jZWxzIGEgZG93bmxvYWQgaW4gcHJvZ3Jlc3MuXHJcbiAgICAgKiBAcGFyYW0gZG93bmxvYWRJRFxyXG4gICAgICovXHJcbiAgICBjYW5jZWwgPSAoZG93bmxvYWRJRDogc3RyaW5nKTogdm9pZCA9PiB7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIHRoaXMuY29udGV4dC5kb3dubG9hZC5jYW5jZWwoZG93bmxvYWRJRCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV3JhcHBlciBmdW5jdGlvbiB0byBkbyBzaW1wbGUgZG93bmxvYWRcclxuICAgICAqIEBwYXJhbSB1cmxPYmplY3RcclxuICAgICAqIEBwYXJhbSBjbWRQYXJhbXNcclxuICAgICAqIEBwYXJhbSBjbGllbnRDYWxsYmFja1xyXG4gICAgICovXHJcbiAgICBkb3dubG9hZEFuZExhdW5jaCA9ICh1cmxPYmplY3QgPSB7dXJsOiBcIlwiLCBzZWN1cmVVcmw6IFwiXCJ9LCBjbWRQYXJhbXM6IHN0cmluZyA9ICcnLCBjbGllbnRDYWxsYmFjaz86IG9iamVjdCk6IHN0cmluZyB8IHZvaWQgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNhbGxiYWNrOiBDYWxsYmFja09iamVjdCA9IG5ldyBDYWxsYmFja09iamVjdCgpLFxyXG4gICAgICAgICAgICB1cmwgPSB1cmxPYmplY3QudXJsO1xyXG4gICAgICAgIGxldCBkb3dubG9hZElEOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIGlmICghdXJsKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXJyb3Igd2hpbGUgZG93bmxvYWRpbmcuIE1pc3NpbmcgdXJsJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYWxsYmFjay5vbkVycm9yID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIGlmIChjbGllbnRDYWxsYmFjayAmJiAodHlwZW9mIGNsaWVudENhbGxiYWNrLm9uRXJyb3IgPT09ICdmdW5jdGlvbicpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICBjbGllbnRDYWxsYmFjay5vbkVycm9yKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciB3aGlsZSBkb3dubG9hZGluZycpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgY2FsbGJhY2sub25Qcm9ncmVzcyA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgaWYgKGNsaWVudENhbGxiYWNrICYmICh0eXBlb2YgY2xpZW50Q2FsbGJhY2sub25Qcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJykpIHtcclxuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIGNsaWVudENhbGxiYWNrLm9uUHJvZ3Jlc3ModmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjYWxsYmFjay5vbkNhbmNlbGxlZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBpZiAoY2xpZW50Q2FsbGJhY2sgJiYgKHR5cGVvZiBjbGllbnRDYWxsYmFjay5vbkNhbmNlbGxlZCA9PT0gJ2Z1bmN0aW9uJykpIHtcclxuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIGNsaWVudENhbGxiYWNrLm9uQ2FuY2VsbGVkKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vY2FuY2VsIGRvd25sb2FkIGJ5IElEXHJcbiAgICAgICAgICAgIGlmIChkb3dubG9hZElEKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbChkb3dubG9hZElEKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY2FsbGJhY2sub25GaW5pc2hlZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBpZiAoY2xpZW50Q2FsbGJhY2sgJiYgKHR5cGVvZiBjbGllbnRDYWxsYmFjay5vbkZpbmlzaGVkID09PSAnZnVuY3Rpb24nKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgY2xpZW50Q2FsbGJhY2sub25GaW5pc2hlZChkb3dubG9hZElEKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5leGVjdXRlKGRvd25sb2FkSUQsIGNtZFBhcmFtcyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9zdGFydCBkb3dubG9hZFxyXG4gICAgICAgIGRvd25sb2FkSUQgPSB0aGlzLl9zdGFydCh1cmwsIGNhbGxiYWNrKTtcclxuICAgICAgICByZXR1cm4gZG93bmxvYWRJRDtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIZWxwZXIgZnVuY3Rpb24gZm9yIGNsaWVudC5cclxuICAgICAqIENyZWF0aW5nIENhbGxiYWNrIEluc3RhbmNlLlxyXG4gICAgICogQ2xpZW50IGFibGUgdG8gY3JlYXRlIGNhbGxiYWNrIG9iamVjdFxyXG4gICAgICogYW5kIG1heSByZWRlZmluZSBuZWNlc3NhcnkgbWV0aG9kc1xyXG4gICAgICogYW5kIHBhc3MgaXQgdGhyb3VnaCBkb3dubG9hZEFuZExhdW5jaCBtZXRob2QgZS5nLlxyXG4gICAgICpcclxuICAgICAqIC8vSUUgZnJpZW5kbHkgY29kZVxyXG4gICAgICogdmFyIGNsaWVudENhbGxiYWNrID0gd2luZG93LmRlc2t0b3BBcGkuZG93bmxvYWRlci5jcmVhdGVDYWxsYmFja0luc3RhbmNlKCk7XHJcbiAgICAgKiBjbGllbnRDYWxsYmFjay5vblByb2dyZXNzID0gZnVuY3Rpb24ocHJvZ3Jlc3NWYWx1ZSl7Y29uc29sZS5sb2cocHJvZ3Jlc3NWYWx1ZSk7fVxyXG4gICAgICogdmFyIGRvd25sb2FkSWQgPSB3aW5kb3cuZGVza3RvcEFwaS5kb3dubG9hZGVyLmRvd25sb2FkQW5kTGF1bmNoKHVybCwgY21kUGFyYW0sIGNsaWVudENhbGxiYWNrKTtcclxuICAgICAqL1xyXG4gICAgY3JlYXRlQ2FsbGJhY2tJbnN0YW5jZSA9ICgpOiBDYWxsYmFja09iamVjdCA9PiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDYWxsYmFja09iamVjdCgpO1xyXG4gICAgfTtcclxufVxyXG4iLCJpbXBvcnQge0Jhc2VDb250ZXh0T2JqZWN0fSBmcm9tIFwiLi4vYmFzZUNvbnRleHRPYmplY3RcIjtcclxuaW1wb3J0IHtDYWxsYmFja09iamVjdH0gZnJvbSBcIi4vY2FsbGJhY2tPYmplY3RcIjtcclxuXHJcbi8qKlxyXG4gKiBEb3dubG9hZGVyIHdyYXBwZXIgb2JqZWN0IGdpdmVzIGludGVyZmFjZSB0byBkb3dubG9hZCBmaWxlIGZyb20gaW50ZXJuZXQgYW5kIGxhdW5jaCBiaW5hcnkuXHJcbiAqIEl0IGRvd25sb2FkcyBlbmNyeXB0ZWQgZmlsZSBhbmQgZGVjcnlwdHMgaXQgd2l0aCBwdWJsaWMga2V5IHRvIHByZXZlbnQgdGFtcGVyaW5nLlxyXG4gKiBPbiBvYmplY3QgZGVzdHJveSAtIGRvd25sb2FkIGlzIGNhbmNlbGVkLiBEb3dubG9hZCBvYmplY3QgdXN1YWxseSBpcyBkZXN0cm95ZWQgb24gYnJvd3NlciB3aW5kb3cgY2xvc2UuXHJcbiAqIFVzZSBvYmplY3RzOiBkb3dubG9hZGVyXHJcbiAqIERvd25sb2FkZXIgc3VwcG9ydGVkIHNpbmNlOiA0LjAuMFxyXG4gKiBUcmF5IHN1cHBvcnRlZCBzaW5jZTogMS4wLjBcclxuICovXHJcbmV4cG9ydCBjbGFzcyBEb3dubG9hZGVyVmVyc2lvbl80XzBfMCBleHRlbmRzIEJhc2VDb250ZXh0T2JqZWN0IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0OiBvYmplY3QpIHtcclxuICAgICAgICBzdXBlcihjb250ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExhdW5jaGVzIGRvd25sb2FkZWQgYmluYXJ5XHJcbiAgICAgKiBAcGFyYW0gZG93bmxvYWRJRFxyXG4gICAgICogQHBhcmFtIGNtZFBhcmFtc1xyXG4gICAgICovXHJcbiAgICBleGVjdXRlID0gKGRvd25sb2FkSUQ6IHN0cmluZywgY21kUGFyYW1zOiBzdHJpbmcpOiB2b2lkID0+e1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICB0aGlzLmNvbnRleHQuZG93bmxvYWRlci5leGVjdXRlKGRvd25sb2FkSUQsIGNtZFBhcmFtcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTGF1bmNoZXMgZG93bmxvYWRlZCBiaW5hcnkgYW5kIHdhaXRzIGZvciBwcm9jZXNzIGVuZFxyXG4gICAgICogQHBhcmFtIGRvd25sb2FkSURcclxuICAgICAqIEBwYXJhbSBjbWRQYXJhbXNcclxuICAgICAqL1xyXG4gICAgZXhlY3V0ZUFuZFdhaXQgPSAoZG93bmxvYWRJRDogc3RyaW5nLCBjbWRQYXJhbXM6IHN0cmluZyk6IHZvaWQgPT57XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIHRoaXMuY29udGV4dC5kb3dubG9hZGVyLmV4ZWN1dGVBbmRXYWl0KGRvd25sb2FkSUQsIGNtZFBhcmFtcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRG93bmxvYWRzIGZpbGUgYXN5bmNocm9ub3VzbHkgYW5kIGRlY3J5cHRzIGl0IHdpdGggUlNBXHJcbiAgICAgKiBAcGFyYW0gdXJsXHJcbiAgICAgKiBAcGFyYW0gbm90aWZpY2F0aW9uT2JqZWN0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3N0YXJ0ID0gKHVybDogc3RyaW5nLCBub3RpZmljYXRpb25PYmplY3Q6IENhbGxiYWNrT2JqZWN0KTogc3RyaW5nID0+IHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5kb3dubG9hZGVyLnN0YXJ0KHVybCwgbm90aWZpY2F0aW9uT2JqZWN0KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYW5jZWxzIGEgZG93bmxvYWQgaW4gcHJvZ3Jlc3MuXHJcbiAgICAgKiBAcGFyYW0gZG93bmxvYWRJRFxyXG4gICAgICovXHJcbiAgICBjYW5jZWwgPSAoZG93bmxvYWRJRDogc3RyaW5nKTogdm9pZCA9PiB7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIHRoaXMuY29udGV4dC5kb3dubG9hZGVyLmNhbmNlbChkb3dubG9hZElEKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcmFwcGVyIGZ1bmN0aW9uIHRvIGRvIHNpbXBsZSBkb3dubG9hZFxyXG4gICAgICogQHBhcmFtIHVybE9iamVjdFxyXG4gICAgICogQHBhcmFtIGNtZFBhcmFtc1xyXG4gICAgICogQHBhcmFtIGNsaWVudENhbGxiYWNrXHJcbiAgICAgKi9cclxuICAgIGRvd25sb2FkQW5kTGF1bmNoID0gKHVybE9iamVjdCA9IHt1cmw6IFwiXCIsIHNlY3VyZVVybDogXCJcIn0sIGNtZFBhcmFtczogc3RyaW5nID0gJycsIGNsaWVudENhbGxiYWNrPzogb2JqZWN0KTogc3RyaW5nIHwgdm9pZCA9PiB7XHJcbiAgICAgICAgY29uc3QgY2FsbGJhY2s6IENhbGxiYWNrT2JqZWN0ID0gbmV3IENhbGxiYWNrT2JqZWN0KCksXHJcbiAgICAgICAgICAgIHVybCA9IHVybE9iamVjdC5zZWN1cmVVcmw7XHJcbiAgICAgICAgbGV0IGRvd25sb2FkSUQ6IHN0cmluZztcclxuXHJcbiAgICAgICAgaWYgKCF1cmwpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciB3aGlsZSBkb3dubG9hZGluZy4gTWlzc2luZyB1cmwnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhbGxiYWNrLm9uRXJyb3IgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgaWYgKGNsaWVudENhbGxiYWNrICYmICh0eXBlb2YgY2xpZW50Q2FsbGJhY2sub25FcnJvciA9PT0gJ2Z1bmN0aW9uJykpIHtcclxuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIGNsaWVudENhbGxiYWNrLm9uRXJyb3IoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Vycm9yIHdoaWxlIGRvd25sb2FkaW5nJyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjYWxsYmFjay5vblByb2dyZXNzID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBpZiAoY2xpZW50Q2FsbGJhY2sgJiYgKHR5cGVvZiBjbGllbnRDYWxsYmFjay5vblByb2dyZXNzID09PSAnZnVuY3Rpb24nKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgY2xpZW50Q2FsbGJhY2sub25Qcm9ncmVzcyh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGNhbGxiYWNrLm9uQ2FuY2VsbGVkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIGlmIChjbGllbnRDYWxsYmFjayAmJiAodHlwZW9mIGNsaWVudENhbGxiYWNrLm9uQ2FuY2VsbGVkID09PSAnZnVuY3Rpb24nKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgY2xpZW50Q2FsbGJhY2sub25DYW5jZWxsZWQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9jYW5jZWwgZG93bmxvYWQgYnkgSURcclxuICAgICAgICAgICAgaWYgKGRvd25sb2FkSUQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsKGRvd25sb2FkSUQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjYWxsYmFjay5vbkZpbmlzaGVkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIGlmIChjbGllbnRDYWxsYmFjayAmJiAodHlwZW9mIGNsaWVudENhbGxiYWNrLm9uRmluaXNoZWQgPT09ICdmdW5jdGlvbicpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICBjbGllbnRDYWxsYmFjay5vbkZpbmlzaGVkKGRvd25sb2FkSUQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmV4ZWN1dGUoZG93bmxvYWRJRCwgY21kUGFyYW1zKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL3N0YXJ0IGRvd25sb2FkXHJcbiAgICAgICAgZG93bmxvYWRJRCA9IHRoaXMuX3N0YXJ0KHVybCwgY2FsbGJhY2spO1xyXG4gICAgICAgIHJldHVybiBkb3dubG9hZElEO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhlbHBlciBmdW5jdGlvbiBmb3IgY2xpZW50LlxyXG4gICAgICogQ3JlYXRpbmcgQ2FsbGJhY2sgSW5zdGFuY2UuXHJcbiAgICAgKiBDbGllbnQgYWJsZSB0byBjcmVhdGUgY2FsbGJhY2sgb2JqZWN0XHJcbiAgICAgKiBhbmQgbWF5IHJlZGVmaW5lIG5lY2Vzc2FyeSBtZXRob2RzXHJcbiAgICAgKiBhbmQgcGFzcyBpdCB0aHJvdWdoIGRvd25sb2FkQW5kTGF1bmNoIG1ldGhvZCBlLmcuXHJcbiAgICAgKlxyXG4gICAgICogLy9JRSBmcmllbmRseSBjb2RlXHJcbiAgICAgKiB2YXIgY2xpZW50Q2FsbGJhY2sgPSB3aW5kb3cuZGVza3RvcEFwaS5kb3dubG9hZGVyLmNyZWF0ZUNhbGxiYWNrSW5zdGFuY2UoKTtcclxuICAgICAqIGNsaWVudENhbGxiYWNrLm9uUHJvZ3Jlc3MgPSBmdW5jdGlvbihwcm9ncmVzc1ZhbHVlKXtjb25zb2xlLmxvZyhwcm9ncmVzc1ZhbHVlKTt9XHJcbiAgICAgKiB2YXIgZG93bmxvYWRJZCA9IHdpbmRvdy5kZXNrdG9wQXBpLmRvd25sb2FkZXIuZG93bmxvYWRBbmRMYXVuY2godXJsLCBjbWRQYXJhbSwgY2xpZW50Q2FsbGJhY2spO1xyXG4gICAgICovXHJcbiAgICBjcmVhdGVDYWxsYmFja0luc3RhbmNlID0gKCk6IENhbGxiYWNrT2JqZWN0ID0+IHtcclxuICAgICAgICByZXR1cm4gbmV3IENhbGxiYWNrT2JqZWN0KCk7XHJcbiAgICB9O1xyXG59XHJcbiIsIi8qKlxyXG4gKiBUaGlzIG9iamVjdCBwcm92aWRlcyBpbnRlcmZhY2UgdG8gcmV0cmlldmUgaW5mb3JtYXRpb24gYWJvdXQgY3VycmVudCBKYXZhU2NyaXB0IGVuZ2luZS5cclxuICogU3VwcG9ydGVkIHNpbmNlOiAyLjAuMFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEVuZ2luZSB7XHJcbiAgICB0eXBlOiBzdHJpbmcgPSAnRW5naW5lJzsgLy9kZWZhdWx0IHZhbHVlXHJcbiAgICB2ZXJzaW9uOiBzdHJpbmcgPSAnMS4wLjAnOyAvL2RlZmF1bHQgdmFsdWVcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0OiBhbnkpIHtcclxuXHJcbiAgICAgICAgaWYgKGNvbnRleHRbJ2VuZ2luZSddICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy52ZXJzaW9uID0gY29udGV4dFsnZW5naW5lJ10udmVyc2lvbigpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dFsndHJheSddICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy50eXBlID0gJ1RyYXknO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLypURVNUKi9cclxuICAgICAgICAvLyB0aGlzLnR5cGUgPSAnRW5naW5lJztcclxuICAgICAgICAvLyB0aGlzLnZlcnNpb24gPSAnNC4wLjAnO1xyXG4gICAgICAgIC8qVEVTVCovXHJcblxyXG4gICAgICAgIC8qVEVTVCB3ZWJ2aWV3MiovXHJcbiAgICAgICAgdGhpcy50eXBlID0gJ0VuZ2luZSc7XHJcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gJzMuMi4wJztcclxuICAgICAgICAvKlRFU1Qgd2VidmlldzIqL1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7QmFzZU9iamVjdH0gZnJvbSBcIi4uL2Jhc2VPYmplY3RcIjtcclxuaW1wb3J0IHtEaXNwYXRjaGVyfSBmcm9tIFwiLi4vLi4vZGlzcGF0Y2hlclwiO1xyXG5pbXBvcnQge1Byb2R1Y3RzRW5naW5lfSBmcm9tIFwiLi9wcm9kdWN0c0VuZ2luZVwiO1xyXG5cclxuLyoqXHJcbiAqIFByb2R1Y3RzIG9iamVjdCBpcyB1c2VkIHRvIHdvcmsgd2l0aCBpbnN0YWxsZWQgcHJvZHVjdHMgKGNoZWNrIGlmIGluc3RhbGxlZCwgbGF1bmNoIHdpdGggY29tbWFuZCBsaW5lIHBhcmFtcylcclxuICogVXNlIG9iamVjdHM6IHByb2R1Y3RzfHN5c3RlbXxwcm9jZXNzXHJcbiAqIFN1cHBvcnRlZCBzaW5jZTogNC4wLjBcclxuICovXHJcbmV4cG9ydCBjbGFzcyBQcm9kdWN0cyBleHRlbmRzIEJhc2VPYmplY3Qge1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfZGlzcGF0Y2hlcjogRGlzcGF0Y2hlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0OiBvYmplY3QsIHZlcnNpb246IHN0cmluZywgdHlwZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoY29udGV4dCwgdmVyc2lvbiwgdHlwZSk7XHJcbiAgICAgICAgdGhpcy52ZXJzaW9uT2JqZWN0ID0gbmV3IFByb2R1Y3RzRW5naW5lKGNvbnRleHQsIHZlcnNpb24pO1xyXG4gICAgICAgIHRoaXMuX2Rpc3BhdGNoZXIgPSBuZXcgRGlzcGF0Y2hlcih0aGlzLnZlcnNpb25PYmplY3QpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRXhlY3V0ZXMgc3BlY2lmaWVkIHByb2R1Y3RcclxuICAgICAqIEBwYXJhbSBwcm9kdWN0Q29kZVxyXG4gICAgICogQHBhcmFtIGNtZFBhcmFtc1xyXG4gICAgICogU2luY2U6IDQuMC4wXHJcbiAgICAgKi9cclxuICAgIC8vdG9kbyBpdCBpcyBub3QgY2xlYXIgd2hlcmUgaXQgY2FuIGJlIHVzZWRcclxuICAgIGV4ZWN1dGUgPSAocHJvZHVjdENvZGU6IHN0cmluZywgY21kUGFyYW1zOiBzdHJpbmcgPSAnJyk6IHZvaWQgPT4ge1xyXG4gICAgICAgIHRoaXMuX2Rpc3BhdGNoZXIuZGlzcGF0Y2goXCJnZXRBcHBsaWNhdGlvblZlcnNpb25cIiwgW3Byb2R1Y3RDb2RlLCBjbWRQYXJhbXNdKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeGVjdXRlcyBzcGVjaWZpZWQgcHJvZHVjdCBhbmQgd2FpdHMgZm9yIGl0cyBleGVjdXRpb25cclxuICAgICAqIEBwYXJhbSBwcm9kdWN0Q29kZVxyXG4gICAgICogQHBhcmFtIGNtZFBhcmFtc1xyXG4gICAgICogU2luY2U6IDQuMC4wXHJcbiAgICAgKi9cclxuICAgIC8vdG9kbyBpdCBpcyBub3QgY2xlYXIgd2hlcmUgaXQgY2FuIGJlIHVzZWRcclxuICAgIGV4ZWN1dGVBbmRXYWl0ID0gKHByb2R1Y3RDb2RlOiBzdHJpbmcsIGNtZFBhcmFtczogc3RyaW5nID0gJycpOiB2b2lkID0+IHtcclxuICAgICAgICB0aGlzLl9kaXNwYXRjaGVyLmRpc3BhdGNoKFwiZXhlY3V0ZUFuZFdhaXRcIiwgW3Byb2R1Y3RDb2RlLCBjbWRQYXJhbXNdKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZXMgdmVyc2lvbiBmb3Igc3BlY2lmaWVkIHByb2R1Y3QgY29kZVxyXG4gICAgICogQHBhcmFtIHByb2R1Y3RDb2RlXHJcbiAgICAgKiBTaW5jZTogNC4wLjBcclxuICAgICAqL1xyXG4gICAgZ2V0VmVyc2lvbiA9IChwcm9kdWN0Q29kZTogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGlzcGF0Y2hlci5kaXNwYXRjaChcImdldFZlcnNpb25cIiwgW3Byb2R1Y3RDb2RlXSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHRoZSBwcm9kdWN0IHdpdGggc3BlY2lmaWVkIHByb2R1Y3QgY29kZSBpcyBpbnN0YWxsZWQgb24gdXNlcidzIHN5c3RlbS5cclxuICAgICAqIEBwYXJhbSBwcm9kdWN0Q29kZVxyXG4gICAgICogU2luY2U6IDQuMC4wXHJcbiAgICAgKi9cclxuICAgIGlzSW5zdGFsbGVkID0gKHByb2R1Y3RDb2RlOiBzdHJpbmcpOiBib29sZWFuID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGlzcGF0Y2hlci5kaXNwYXRjaChcImlzSW5zdGFsbGVkXCIsIFtwcm9kdWN0Q29kZV0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpbmRzIHRoZSBtYWluIGV4ZWN1dGFibGUgZmlsZSBvZiB0aGUgYXBwbGljYXRpb24gd2l0aCB0aGUgc3BlY2lmaWVkIHByb2R1Y3QgY29kZS5cclxuICAgICAqIEBwYXJhbSBwcm9kdWN0Q29kZVxyXG4gICAgICogU3VwcG9ydGVkIHNpbmNlOiAxLjAuMFxyXG4gICAgICogcmVtb3ZlZCBzaW5jZSA0LjAuMFxyXG4gICAgICovXHJcbiAgICBnZXRNYWluRXhlY3V0YWJsZVBhdGggPSAocHJvZHVjdENvZGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc3BhdGNoZXIuZGlzcGF0Y2goXCJnZXRNYWluRXhlY3V0YWJsZVBhdGhcIiwgW3Byb2R1Y3RDb2RlXSk7XHJcbiAgICB9O1xyXG59XHJcbiIsImltcG9ydCB7dmVyc2lvbkNvbXBhcmV9IGZyb20gXCIuLi8uLi91dGlscy92ZXJzaW9uY29tcGFyZVwiO1xyXG5pbXBvcnQge1Byb2R1Y3RzVmVyc2lvbl80XzBfMH0gZnJvbSBcIi4vcHJvZHVjdHNWZXJzaW9uXzRfMF8wXCI7XHJcbmltcG9ydCB7UHJvZHVjdHNWZXJzaW9uXzFfMF8wfSBmcm9tIFwiLi9wcm9kdWN0c1ZlcnNpb25fMV8wXzBcIjtcclxuXHJcbi8qKlxyXG4gKiBIZWxwZXIgV3JhcHBlciBDbGFzc1xyXG4gKiBDaGVjayB2ZXJzaW9uIGFuZCByZXR1cm4gdmVyc2lvbmVkIGNsYXNzIGluc3RhbmNlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUHJvZHVjdHNFbmdpbmUge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQ6IG9iamVjdCwgdmVyc2lvbjogc3RyaW5nKSB7XHJcblxyXG4gICAgICAgIGlmICh2ZXJzaW9uQ29tcGFyZSh2ZXJzaW9uLCAnNC4wLjAnLCAnPj0nKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb2R1Y3RzVmVyc2lvbl80XzBfMChjb250ZXh0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb2R1Y3RzVmVyc2lvbl8xXzBfMChjb250ZXh0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7QmFzZUNvbnRleHRPYmplY3R9IGZyb20gXCIuLi9iYXNlQ29udGV4dE9iamVjdFwiO1xyXG5cclxuLyoqXHJcbiAqIFByb2R1Y3RzIG9iamVjdCBpcyB1c2VkIHRvIHdvcmsgd2l0aCBpbnN0YWxsZWQgcHJvZHVjdHMgKGNoZWNrIGlmIGluc3RhbGxlZCwgbGF1bmNoIHdpdGggY29tbWFuZCBsaW5lIHBhcmFtcylcclxuICogVXNlIG9iamVjdHM6IHN5c3RlbVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFByb2R1Y3RzVmVyc2lvbl8xXzBfMCBleHRlbmRzIEJhc2VDb250ZXh0T2JqZWN0IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0OiBvYmplY3QpIHtcclxuICAgICAgICBzdXBlcihjb250ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB0aGUgcHJvZHVjdCB3aXRoIHNwZWNpZmllZCBwcm9kdWN0IGNvZGUgaXMgaW5zdGFsbGVkIG9uIHVzZXIncyBzeXN0ZW0uXHJcbiAgICAgKiBAcGFyYW0gcHJvZHVjdENvZGVcclxuICAgICAqL1xyXG4gICAgaXNJbnN0YWxsZWQgPSAocHJvZHVjdENvZGU6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LnN5c3RlbS5pc0luc3RhbGxlZChwcm9kdWN0Q29kZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmluZHMgdGhlIG1haW4gZXhlY3V0YWJsZSBmaWxlIG9mIHRoZSBhcHBsaWNhdGlvbiB3aXRoIHRoZSBzcGVjaWZpZWQgcHJvZHVjdCBjb2RlLlxyXG4gICAgICogQHBhcmFtIHByb2R1Y3RDb2RlXHJcbiAgICAgKi9cclxuICAgIGdldE1haW5FeGVjdXRhYmxlUGF0aCA9IChwcm9kdWN0Q29kZTogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5zeXN0ZW0uZ2V0TWFpbkV4ZWN1dGFibGVQYXRoKHByb2R1Y3RDb2RlKTtcclxuICAgIH07XHJcbn1cclxuIiwiaW1wb3J0IHtCYXNlQ29udGV4dE9iamVjdH0gZnJvbSBcIi4uL2Jhc2VDb250ZXh0T2JqZWN0XCI7XHJcblxyXG4vKipcclxuICogUHJvZHVjdHMgb2JqZWN0IGlzIHVzZWQgdG8gd29yayB3aXRoIGluc3RhbGxlZCBwcm9kdWN0cyAoY2hlY2sgaWYgaW5zdGFsbGVkLCBsYXVuY2ggd2l0aCBjb21tYW5kIGxpbmUgcGFyYW1zKVxyXG4gKiBVc2Ugb2JqZWN0czogcHJvZHVjdHNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBQcm9kdWN0c1ZlcnNpb25fNF8wXzAgZXh0ZW5kcyBCYXNlQ29udGV4dE9iamVjdCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29udGV4dDogb2JqZWN0KSB7XHJcbiAgICAgICAgc3VwZXIoY29udGV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeGVjdXRlcyBzcGVjaWZpZWQgcHJvZHVjdFxyXG4gICAgICogQHBhcmFtIHByb2R1Y3RDb2RlXHJcbiAgICAgKiBAcGFyYW0gY21kUGFyYW1zXHJcbiAgICAgKi9cclxuICAgIGV4ZWN1dGUgPSAocHJvZHVjdENvZGU6IHN0cmluZywgY21kUGFyYW1zOiBzdHJpbmcgPSAnJyk6IHZvaWQgPT4ge1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICB0aGlzLmNvbnRleHQucHJvZHVjdHMuZXhlY3V0ZShwcm9kdWN0Q29kZSwgY21kUGFyYW1zKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeGVjdXRlcyBzcGVjaWZpZWQgcHJvZHVjdCBhbmQgd2FpdHMgZm9yIGl0cyBleGVjdXRpb25cclxuICAgICAqIEBwYXJhbSBwcm9kdWN0Q29kZVxyXG4gICAgICogQHBhcmFtIGNtZFBhcmFtc1xyXG4gICAgICovXHJcbiAgICBleGVjdXRlQW5kV2FpdD0gKHByb2R1Y3RDb2RlOiBzdHJpbmcsIGNtZFBhcmFtczogc3RyaW5nID0gJycpOiB2b2lkID0+IHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgdGhpcy5jb250ZXh0LnByb2R1Y3RzLmV4ZWN1dGVBbmRXYWl0KHByb2R1Y3RDb2RlLCBjbWRQYXJhbXMpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlcyB2ZXJzaW9uIGZvciBzcGVjaWZpZWQgcHJvZHVjdCBjb2RlXHJcbiAgICAgKiBAcGFyYW0gcHJvZHVjdENvZGVcclxuICAgICAqL1xyXG4gICAgZ2V0VmVyc2lvbiA9IChwcm9kdWN0Q29kZTogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5wcm9kdWN0cy5nZXRWZXJzaW9uKHByb2R1Y3RDb2RlKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgdGhlIHByb2R1Y3Qgd2l0aCBzcGVjaWZpZWQgcHJvZHVjdCBjb2RlIGlzIGluc3RhbGxlZCBvbiB1c2VyJ3Mgc3lzdGVtLlxyXG4gICAgICogQHBhcmFtIHByb2R1Y3RDb2RlXHJcbiAgICAgKi9cclxuICAgIGlzSW5zdGFsbGVkID0gKHByb2R1Y3RDb2RlOiBzdHJpbmcpOiBib29sZWFuID0+IHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5wcm9kdWN0cy5pc0luc3RhbGxlZChwcm9kdWN0Q29kZSk7XHJcbiAgICB9O1xyXG59XHJcbiIsImltcG9ydCB7QmFzZU9iamVjdH0gZnJvbSBcIi4uL2Jhc2VPYmplY3RcIjtcclxuaW1wb3J0IHtEaXNwYXRjaGVyfSBmcm9tIFwiLi4vLi4vZGlzcGF0Y2hlclwiO1xyXG5pbXBvcnQge1V0aWxzVHJheX0gZnJvbSBcIi4vdXRpbHNUcmF5XCI7XHJcbmltcG9ydCB7VXRpbHNFbmdpbmV9IGZyb20gXCIuL3V0aWxzRW5naW5lXCI7XHJcblxyXG4vKipcclxuICogVXRpbHMgb2JqZWN0IHByb3ZpZGUgYXBwbGljYXRpb24gd2lkZSBjb21tb24gZnVuY3Rpb25hbGl0eVxyXG4gKiBVc2Ugb2JqZWN0czogc3lzdGVtfHRyYXlcclxuICogU3VwcG9ydGVkIHNpbmNlOiAxLjAuMFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFV0aWxzIGV4dGVuZHMgQmFzZU9iamVjdCB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9kaXNwYXRjaGVyOiBEaXNwYXRjaGVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQ6IG9iamVjdCwgdmVyc2lvbjogc3RyaW5nLCB0eXBlOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihjb250ZXh0LCB2ZXJzaW9uLCB0eXBlKTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGUgPT09ICdUcmF5Jykge1xyXG4gICAgICAgICAgICB0aGlzLnZlcnNpb25PYmplY3QgPSBuZXcgVXRpbHNUcmF5KGNvbnRleHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudmVyc2lvbk9iamVjdCA9IG5ldyBVdGlsc0VuZ2luZShjb250ZXh0LCB2ZXJzaW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2Rpc3BhdGNoZXIgPSBuZXcgRGlzcGF0Y2hlcih0aGlzLnZlcnNpb25PYmplY3QpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT3BlbnMgdXJsIGluIGRlZmF1bHQgYnJvd3NlciBjdXJyZW50bHkgY29uZmlndXJlZCBvbiB1c2VyJ3Mgc3lzdGVtLlxyXG4gICAgICogQHBhcmFtIHVybFxyXG4gICAgICovXHJcbiAgICBvcGVuSW5EZWZhdWx0QnJvd3NlciA9ICh1cmw6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNwYXRjaGVyLmRpc3BhdGNoKFwib3BlbkluRGVmYXVsdEJyb3dzZXJcIiwgW3VybF0pO1xyXG4gICAgfTtcclxufVxyXG4iLCJpbXBvcnQge1V0aWxzVmVyc2lvbl8xXzBfMH0gZnJvbSBcIi4vdXRpbHNWZXJzaW9uXzFfMF8wXCI7XHJcblxyXG4vKipcclxuICogSGVscGVyIENsYXNzXHJcbiAqIENoZWNrIHZlcnNpb24gYW5kIHJldHVybiB2ZXJzaW9uZWQgY2xhc3MgaW5zdGFuY2VcclxuICovXHJcbmV4cG9ydCBjbGFzcyBVdGlsc0VuZ2luZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29udGV4dDogb2JqZWN0LCB2ZXJzaW9uOiBzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgLy90b2RvIEFkZCBjaGVjayB2ZXJzaW9uIGlmIGF2YWlsYWJsZSBmZXcgdmVyc2lvbnNcclxuICAgICAgICByZXR1cm4gbmV3IFV0aWxzVmVyc2lvbl8xXzBfMChjb250ZXh0KTtcclxuICAgIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHtCYXNlQ29udGV4dE9iamVjdH0gZnJvbSBcIi4uL2Jhc2VDb250ZXh0T2JqZWN0XCI7XHJcblxyXG4vKipcclxuICogVXRpbHMgb2JqZWN0IHByb3ZpZGUgYXBwbGljYXRpb24gd2lkZSBjb21tb24gZnVuY3Rpb25hbGl0eVxyXG4gKiBVc2Ugb2JqZWN0czogdHJheVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFV0aWxzVHJheSBleHRlbmRzIEJhc2VDb250ZXh0T2JqZWN0IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0OiBvYmplY3QpIHtcclxuICAgICAgICBzdXBlcihjb250ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9wZW5zIHVybCBpbiBkZWZhdWx0IGJyb3dzZXIgY3VycmVudGx5IGNvbmZpZ3VyZWQgb24gdXNlcidzIHN5c3RlbS5cclxuICAgICAqIEBwYXJhbSB1cmxcclxuICAgICAqL1xyXG4gICAgb3BlbkluRGVmYXVsdEJyb3dzZXIgPSAodXJsOiBzdHJpbmcpOiB2b2lkID0+IHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgdGhpcy5jb250ZXh0LnRyYXkub3BlbkluRGVmYXVsdEJyb3dzZXIodXJsKTtcclxuICAgIH07XHJcbn1cclxuIiwiaW1wb3J0IHtCYXNlQ29udGV4dE9iamVjdH0gZnJvbSBcIi4uL2Jhc2VDb250ZXh0T2JqZWN0XCI7XHJcblxyXG4vKipcclxuICogVXRpbHMgb2JqZWN0IHByb3ZpZGUgYXBwbGljYXRpb24gd2lkZSBjb21tb24gZnVuY3Rpb25hbGl0eVxyXG4gKiBVc2Ugb2JqZWN0czogc3lzdGVtXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVXRpbHNWZXJzaW9uXzFfMF8wIGV4dGVuZHMgQmFzZUNvbnRleHRPYmplY3Qge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQ6IG9iamVjdCkge1xyXG4gICAgICAgIHN1cGVyKGNvbnRleHQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT3BlbnMgdXJsIGluIGRlZmF1bHQgYnJvd3NlciBjdXJyZW50bHkgY29uZmlndXJlZCBvbiB1c2VyJ3Mgc3lzdGVtLlxyXG4gICAgICogQHBhcmFtIHVybFxyXG4gICAgICovXHJcbiAgICBvcGVuSW5EZWZhdWx0QnJvd3NlciA9ICh1cmw6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICB0aGlzLmNvbnRleHQuc3lzdGVtLm9wZW5JbkRlZmF1bHRCcm93c2VyKHVybCk7XHJcbiAgICB9O1xyXG59XHJcbiIsImltcG9ydCB7QmFzZU9iamVjdH0gZnJvbSBcIi4uL2Jhc2VPYmplY3RcIjtcclxuaW1wb3J0IHtEaXNwYXRjaGVyfSBmcm9tIFwiLi4vLi4vZGlzcGF0Y2hlclwiO1xyXG5pbXBvcnQge1dpbmRvd1RyYXl9IGZyb20gXCIuL3dpbmRvd1RyYXlcIjtcclxuaW1wb3J0IHtXaW5kb3dFbmdpbmV9IGZyb20gXCIuL3dpbmRvd0VuZ2luZVwiO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgb2JqZWN0IHByb3ZpZGVzIGludGVyZmFjZSB0byB3b3JrIHdpdGggYnJvd3NlciB3aW5kb3cgZnJvbSBqYXZhc2NyaXB0IGNvZGUuXHJcbiAqIEV2ZXJ5IGJyb3dzZXIgd2luZG93IGlzIGNyZWF0ZWQgaGlkZGVuLCBzbyB5b3UgaGF2ZSB0byBjYWxsIHNob3cgbWV0aG9kIHdoZW4gcGFnZSBpcyByZWFkeSB0byBiZSBzaG93bi5cclxuICogSWYgdGhlcmUgaXMgbm8gaW50ZXJuZXQgY29ubmVjdGlvbiBvciBhbiBlcnJvciBvY2N1cnJlZCBpbiBqYXZhIHNjcmlwdCBhbmQgbm8gc2hvdyBjYWxsIG9jY3VycmVkLFxyXG4gKiBicm93c2VyIGlzIGNsb3NlZCBhdXRvbWF0aWNhbGx5IGluIDQ1IHNlY29uZHMgYWZ0ZXIgY3JlYXRpb24uXHJcbiAqIFRvIGltcHJvdmUgdXNlciBleHBlcmllbmNlIHBsZWFzZSBjYWxsIGNsb3NlLCBpZiBzaG93IHdvbid0IGJlIGNhbGxlZCBmb3Igc29tZSByZWFzb24uXHJcbiAqIFVzZSBvYmplY3RzOiBiYXNld25kfGNoaWxkV2luZG93fHRyYXlcclxuICogU3VwcG9ydGVkIHNpbmNlOiAxLjAuMFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFdpbmRvdyBleHRlbmRzIEJhc2VPYmplY3Qge1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfZGlzcGF0Y2hlcjogRGlzcGF0Y2hlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0OiBvYmplY3QsIHZlcnNpb246IHN0cmluZywgdHlwZTogc3RyaW5nKSB7XHJcblxyXG4gICAgICAgIHN1cGVyKGNvbnRleHQsIHZlcnNpb24sIHR5cGUpO1xyXG4gICAgICAgIGlmICh0eXBlID09PSAnVHJheScpIHtcclxuICAgICAgICAgICAgdGhpcy52ZXJzaW9uT2JqZWN0ID0gbmV3IFdpbmRvd1RyYXkoY29udGV4dCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy52ZXJzaW9uT2JqZWN0ID0gbmV3IFdpbmRvd0VuZ2luZShjb250ZXh0LCB2ZXJzaW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2Rpc3BhdGNoZXIgPSBuZXcgRGlzcGF0Y2hlcih0aGlzLnZlcnNpb25PYmplY3QpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xvc2VzIGJyb3dzZXIgd2luZG93LlxyXG4gICAgICogU2luY2U6IDEuMC4wXHJcbiAgICAgKi9cclxuICAgIGNsb3NlID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgIHRoaXMuX2Rpc3BhdGNoZXIuZGlzcGF0Y2goXCJjbG9zZVwiLCBbXSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xvc2VzIGJyb3dzZXIgd2luZG93LiBFdmVuIGlmIHNob3cgaGFzbid0IGJlZW4gY2FsbGVkLCBjYWxsIGNsb3NlKCkgaWYgYW4gZXJyb3Igb2NjdXJyZWQuXHJcbiAgICAgKiBAcGFyYW0gZXhpdENvZGVcclxuICAgICAqIFNpbmNlOiAzLjIuMFxyXG4gICAgICovXHJcbiAgICBjbG9zZVdpdGhFeGl0Q29kZSA9IChleGl0Q29kZT86IG51bWJlcik6IHZvaWQgPT4ge1xyXG4gICAgICAgIHRoaXMuX2Rpc3BhdGNoZXIuZGlzcGF0Y2goXCJjbG9zZVdpdGhFeGl0Q29kZVwiLCBbZXhpdENvZGVdKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIaWRlcyBicm93c2VyIHdpbmRvdyBidXQgZG9lcyBub3QgY2xvc2VzIGl0LCBzbyBicm93c2VyIGtlZXBzIHdvcmtpbmcuXHJcbiAgICAgKiBTaW5jZTogMS4wLjBcclxuICAgICAqL1xyXG4gICAgaGlkZSA9ICgpOiB2b2lkID0+IHtcclxuICAgICAgICB0aGlzLl9kaXNwYXRjaGVyLmRpc3BhdGNoKFwiaGlkZVwiLCBbXSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2hvd3MgYnJvd3NlciB3aW5kb3cgd2l0aCBzcGVjaWZpZWQgc2l6ZSAoIHdpZHRoIGFuZCBoZWlnaHQgaW4gcGl4ZWxzICkuXHJcbiAgICAgKiBZb3UgaGF2ZSB0byBjYWxsIHRoaXMgZXZlcnkgdGltZSBwYWdlIGlzIHJlYWR5IHRvIGJlIHNob3duLiBCeSBkZWZhdWx0IGJyb3dzZXIgd2luZG93IGlzIGhpZGRlbi5cclxuICAgICAqIEBwYXJhbSB3aWR0aFxyXG4gICAgICogQHBhcmFtIGhlaWdodFxyXG4gICAgICogU2luY2U6IDEuMC4wXHJcbiAgICAgKi9cclxuICAgIHNob3cgPSAod2lkdGg6IHN0cmluZywgaGVpZ2h0OiBzdHJpbmcpOiB2b2lkID0+IHtcclxuICAgICAgICB0aGlzLl9kaXNwYXRjaGVyLmRpc3BhdGNoKFwic2hvd1wiLCBbd2lkdGgsIGhlaWdodF0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1pbmltaXplcyBicm93c2VyIHdpbmRvdy5cclxuICAgICAqIE1pbmltaXplIG1heSBiZSBub3Qgc3VwcG9ydGVkIGJlY2F1c2UgXCItdG9vbHdpbmRvd1wiIGNvbW1hbmQgbGluZSBpcyBzcGVjaWZpZWRcclxuICAgICAqIG9yIHBhcmVudCB3aW5kb3cgaXMgc2V0IHVwIGZvciBhbiBJUE0uIE1pbmltaXplIGZlYXR1cmUgcmVxdWlyZXMgaWNvbiBvbiB0aGUgV2luZG93cyB0YXNrYmFyLlxyXG4gICAgICogU2luY2U6IDMuMS4wXHJcbiAgICAgKi9cclxuICAgIG1pbmltaXplID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgIHRoaXMuX2Rpc3BhdGNoZXIuZGlzcGF0Y2goXCJtaW5pbWl6ZVwiLCBbXSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBEUEkgdmFsdWUgb2YgdGhlIHdpbmRvdy5cclxuICAgICAqIFdlYi1wYWdlIHNob3VsZCBiZSByZW5kZXJlZCBhY2NvcmRpbmcgdG8gdGhlIHJldHVybmVkIHZhbHVlLlxyXG4gICAgICogU2luY2U6IDEuMC4wXHJcbiAgICAgKi9cclxuICAgIGdldERQSSA9ICgpOiBudW1iZXIgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNwYXRjaGVyLmRpc3BhdGNoKFwiZ2V0RFBJXCIsIFtdKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgd2luZG93IHN1cHBvcnRzIG1pbmltaXphdGlvbi5cclxuICAgICAqIE1pbmltaXplIG1heSBiZSBub3Qgc3VwcG9ydGVkIGJlY2F1c2UgXCItdG9vbHdpbmRvd1wiIGNvbW1hbmQgbGluZSBpcyBzcGVjaWZpZWQgb3IgcGFyZW50IHdpbmRvdyBpcyBzZXQgdXAgZm9yIGFuIElQTS5cclxuICAgICAqIE1pbmltaXplIGZlYXR1cmUgcmVxdWlyZXMgaWNvbiBvbiB0aGUgV2luZG93cyB0YXNrYmFyLlxyXG4gICAgICogU2luY2U6IDMuMS4wXHJcbiAgICAgKi9cclxuICAgIGlzTWluaW1pemVTdXBwb3J0ZWQgPSAoKTogYm9vbGVhbiA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc3BhdGNoZXIuZGlzcGF0Y2goXCJpc01pbmltaXplU3VwcG9ydGVkXCIsIFtdKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIG5ldyBicm93c2VyIHdpbmRvdyB3aXRoIGdpdmVuIHVybHMuXHJcbiAgICAgKiBAcGFyYW0gdXJsXHJcbiAgICAgKiBAcGFyYW0gbW9kYWxcclxuICAgICAqIEBwYXJhbSBwb3NpdGlvblxyXG4gICAgICogU2luY2U6IDEuMC4wXHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZVdpbmRvdyA9ICh1cmw6IHN0cmluZywgbW9kYWw6IHN0cmluZywgcG9zaXRpb246IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNwYXRjaGVyLmRpc3BhdGNoKFwiY3JlYXRlV2luZG93XCIsIFt1cmwsIG1vZGFsLCBwb3NpdGlvbl0pO1xyXG4gICAgfTtcclxufVxyXG4iLCJpbXBvcnQge3ZlcnNpb25Db21wYXJlfSBmcm9tIFwiLi4vLi4vdXRpbHMvdmVyc2lvbmNvbXBhcmVcIjtcclxuaW1wb3J0IHtXaW5kb3dWZXJzaW9uXzRfMF8wfSBmcm9tIFwiLi93aW5kb3dWZXJzaW9uXzRfMF8wXCI7XHJcbmltcG9ydCB7V2luZG93VmVyc2lvbl8zXzJfMH0gZnJvbSBcIi4vd2luZG93VmVyc2lvbl8zXzJfMFwiO1xyXG5pbXBvcnQge1dpbmRvd1ZlcnNpb25fM18xXzB9IGZyb20gXCIuL3dpbmRvd1ZlcnNpb25fM18xXzBcIjtcclxuaW1wb3J0IHtXaW5kb3dWZXJzaW9uXzFfMF8wfSBmcm9tIFwiLi93aW5kb3dWZXJzaW9uXzFfMF8wXCI7XHJcblxyXG4vKipcclxuICogSGVscGVyIFdyYXBwZXIgQ2xhc3NcclxuICogQ2hlY2sgdmVyc2lvbiBhbmQgcmV0dXJuIHZlcnNpb25lZCBjbGFzcyBpbnN0YW5jZVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFdpbmRvd0VuZ2luZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0OiBvYmplY3QsIHZlcnNpb246IHN0cmluZykge1xyXG5cclxuICAgICAgICBpZiAodmVyc2lvbkNvbXBhcmUodmVyc2lvbiwgJzQuMC4wJywgJz49JykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBXaW5kb3dWZXJzaW9uXzRfMF8wKGNvbnRleHQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodmVyc2lvbiA9PT0gJzMuMi4wJykge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFdpbmRvd1ZlcnNpb25fM18yXzAoY29udGV4dCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh2ZXJzaW9uID09PSAnMy4xLjAnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgV2luZG93VmVyc2lvbl8zXzFfMChjb250ZXh0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFdpbmRvd1ZlcnNpb25fMV8wXzAoY29udGV4dCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge0Jhc2VDb250ZXh0T2JqZWN0fSBmcm9tIFwiLi4vYmFzZUNvbnRleHRPYmplY3RcIjtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIG9iamVjdCBwcm92aWRlcyBpbnRlcmZhY2UgdG8gd29yayB3aXRoIGJyb3dzZXIgd2luZG93IGZyb20gamF2YXNjcmlwdCBjb2RlLlxyXG4gKiBFdmVyeSBicm93c2VyIHdpbmRvdyBpcyBjcmVhdGVkIGhpZGRlbiwgc28geW91IGhhdmUgdG8gY2FsbCBzaG93IG1ldGhvZCB3aGVuIHBhZ2UgaXMgcmVhZHkgdG8gYmUgc2hvd24uXHJcbiAqIElmIHRoZXJlIGlzIG5vIGludGVybmV0IGNvbm5lY3Rpb24gb3IgYW4gZXJyb3Igb2NjdXJyZWQgaW4gamF2YSBzY3JpcHQgYW5kIG5vIHNob3cgY2FsbCBvY2N1cnJlZCxcclxuICogYnJvd3NlciBpcyBjbG9zZWQgYXV0b21hdGljYWxseSBpbiA0NSBzZWNvbmRzIGFmdGVyIGNyZWF0aW9uLlxyXG4gKiBUbyBpbXByb3ZlIHVzZXIgZXhwZXJpZW5jZSBwbGVhc2UgY2FsbCBjbG9zZSwgaWYgc2hvdyB3b24ndCBiZSBjYWxsZWQgZm9yIHNvbWUgcmVhc29uLlxyXG4gKiBVc2Ugb2JqZWN0czogdHJheVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFdpbmRvd1RyYXkgZXh0ZW5kcyBCYXNlQ29udGV4dE9iamVjdHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0OiBvYmplY3QpIHtcclxuICAgICAgICBzdXBlcihjb250ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsb3NlcyBicm93c2VyIHdpbmRvdy5cclxuICAgICAqL1xyXG4gICAgY2xvc2UgPSAoKTogdm9pZCA9PiB7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIHRoaXMuY29udGV4dC50cmF5LmNsb3NlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xvc2VzIGJyb3dzZXIgd2luZG93LiBIZWxwZXIgZnVuY3Rpb25cclxuICAgICAqL1xyXG4gICAgY2xvc2VXaXRoRXhpdENvZGUgPSAoZXhpdENvZGU/OiBudW1iZXIpOiB2b2lkID0+IHtcclxuICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGlkZXMgYnJvd3NlciB3aW5kb3cgYnV0IGRvZXMgbm90IGNsb3NlcyBpdCwgc28gYnJvd3NlciBrZWVwcyB3b3JraW5nLlxyXG4gICAgICogSG9vayB0byBoaWRlIHRyYXkgd2luZG93IGFzIHRyYXkgZG9lc24ndCBoYXZlIGBoaWRlKClgIG1ldGhvZCBpbXBsZW1lbnRlZFxyXG4gICAgICovXHJcbiAgICBoaWRlID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICB0aGlzLnNob3coJzAnLCAnMCcpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNob3dzIGJyb3dzZXIgd2luZG93IHdpdGggc3BlY2lmaWVkIHNpemUgKCB3aWR0aCBhbmQgaGVpZ2h0IGluIHBpeGVscyApLlxyXG4gICAgICogWW91IGhhdmUgdG8gY2FsbCB0aGlzIGV2ZXJ5IHRpbWUgcGFnZSBpcyByZWFkeSB0byBiZSBzaG93bi4gQnkgZGVmYXVsdCBicm93c2VyIHdpbmRvdyBpcyBoaWRkZW4uXHJcbiAgICAgKiBAcGFyYW0gd2lkdGhcclxuICAgICAqIEBwYXJhbSBoZWlnaHRcclxuICAgICAqL1xyXG4gICAgc2hvdyA9ICh3aWR0aDogc3RyaW5nLCBoZWlnaHQ6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICB0aGlzLmNvbnRleHQudHJheS5zaG93KHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgfTtcclxufVxyXG4iLCJpbXBvcnQge0Jhc2VDb250ZXh0T2JqZWN0fSBmcm9tIFwiLi4vYmFzZUNvbnRleHRPYmplY3RcIjtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIG9iamVjdCBwcm92aWRlcyBpbnRlcmZhY2UgdG8gd29yayB3aXRoIGJyb3dzZXIgd2luZG93IGZyb20gamF2YXNjcmlwdCBjb2RlLlxyXG4gKiBFdmVyeSBicm93c2VyIHdpbmRvdyBpcyBjcmVhdGVkIGhpZGRlbiwgc28geW91IGhhdmUgdG8gY2FsbCBzaG93IG1ldGhvZCB3aGVuIHBhZ2UgaXMgcmVhZHkgdG8gYmUgc2hvd24uXHJcbiAqIElmIHRoZXJlIGlzIG5vIGludGVybmV0IGNvbm5lY3Rpb24gb3IgYW4gZXJyb3Igb2NjdXJyZWQgaW4gamF2YSBzY3JpcHQgYW5kIG5vIHNob3cgY2FsbCBvY2N1cnJlZCxcclxuICogYnJvd3NlciBpcyBjbG9zZWQgYXV0b21hdGljYWxseSBpbiA0NSBzZWNvbmRzIGFmdGVyIGNyZWF0aW9uLlxyXG4gKiBUbyBpbXByb3ZlIHVzZXIgZXhwZXJpZW5jZSBwbGVhc2UgY2FsbCBjbG9zZSwgaWYgc2hvdyB3b24ndCBiZSBjYWxsZWQgZm9yIHNvbWUgcmVhc29uLlxyXG4gKiBVc2Ugb2JqZWN0czogYmFzZXduZHxjaGlsZFdpbmRvd1xyXG4gKiBTdXBwb3J0ZWQgc2luY2U6IDEuMC4wXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgV2luZG93VmVyc2lvbl8xXzBfMCBleHRlbmRzIEJhc2VDb250ZXh0T2JqZWN0IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0OiBvYmplY3QpIHtcclxuICAgICAgICBzdXBlcihjb250ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsb3NlcyBicm93c2VyIHdpbmRvdy5cclxuICAgICAqL1xyXG4gICAgY2xvc2UgPSAoKTogdm9pZCA9PiB7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIHRoaXMuY29udGV4dC5iYXNld25kLmNsb3NlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xvc2VzIGJyb3dzZXIgd2luZG93LiBFdmVuIGlmIHNob3cgaGFzbid0IGJlZW4gY2FsbGVkLCBjYWxsIGNsb3NlKCkgaWYgYW4gZXJyb3Igb2NjdXJyZWQuXHJcbiAgICAgKi9cclxuICAgIGNsb3NlV2l0aEV4aXRDb2RlID0gKGV4aXRDb2RlPzogbnVtYmVyKTogdm9pZCA9PiB7XHJcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhpZGVzIGJyb3dzZXIgd2luZG93IGJ1dCBkb2VzIG5vdCBjbG9zZXMgaXQsIHNvIGJyb3dzZXIga2VlcHMgd29ya2luZy5cclxuICAgICAqL1xyXG4gICAgaGlkZSA9ICgpOiB2b2lkID0+IHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmJhc2V3bmQuaGlkZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNob3dzIGJyb3dzZXIgd2luZG93IHdpdGggc3BlY2lmaWVkIHNpemUgKCB3aWR0aCBhbmQgaGVpZ2h0IGluIHBpeGVscyApLlxyXG4gICAgICogWW91IGhhdmUgdG8gY2FsbCB0aGlzIGV2ZXJ5IHRpbWUgcGFnZSBpcyByZWFkeSB0byBiZSBzaG93bi4gQnkgZGVmYXVsdCBicm93c2VyIHdpbmRvdyBpcyBoaWRkZW4uXHJcbiAgICAgKiBAcGFyYW0gd2lkdGhcclxuICAgICAqIEBwYXJhbSBoZWlnaHRcclxuICAgICAqL1xyXG4gICAgc2hvdyA9ICh3aWR0aDogc3RyaW5nLCBoZWlnaHQ6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICB0aGlzLmNvbnRleHQuYmFzZXduZC5zaG93KHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgRFBJIHZhbHVlIG9mIHRoZSB3aW5kb3cuXHJcbiAgICAgKiBXZWItcGFnZSBzaG91bGQgYmUgcmVuZGVyZWQgYWNjb3JkaW5nIHRvIHRoZSByZXR1cm5lZCB2YWx1ZS5cclxuICAgICAqL1xyXG4gICAgZ2V0RFBJID0gKCk6IG51bWJlciA9PiB7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuYmFzZXduZC5nZXREUEkoKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIG5ldyBicm93c2VyIHdpbmRvdyB3aXRoIGdpdmVuIHVybHMuXHJcbiAgICAgKiBAcGFyYW0gdXJsXHJcbiAgICAgKiBAcGFyYW0gbW9kYWxcclxuICAgICAqIEBwYXJhbSBwb3NpdGlvblxyXG4gICAgICovXHJcbiAgICBjcmVhdGVXaW5kb3cgPSAodXJsOiBzdHJpbmcsIG1vZGFsOiBzdHJpbmcsIHBvc2l0aW9uOiBzdHJpbmcpOiBib29sZWFuID0+IHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5jaGlsZFdpbmRvdy5jcmVhdGVXaW5kb3codXJsLCBtb2RhbCwgcG9zaXRpb24pO1xyXG4gICAgfTtcclxufVxyXG4iLCJpbXBvcnQge0Jhc2VDb250ZXh0T2JqZWN0fSBmcm9tIFwiLi4vYmFzZUNvbnRleHRPYmplY3RcIjtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIG9iamVjdCBwcm92aWRlcyBpbnRlcmZhY2UgdG8gd29yayB3aXRoIGJyb3dzZXIgd2luZG93IGZyb20gamF2YXNjcmlwdCBjb2RlLlxyXG4gKiBFdmVyeSBicm93c2VyIHdpbmRvdyBpcyBjcmVhdGVkIGhpZGRlbiwgc28geW91IGhhdmUgdG8gY2FsbCBzaG93IG1ldGhvZCB3aGVuIHBhZ2UgaXMgcmVhZHkgdG8gYmUgc2hvd24uXHJcbiAqIElmIHRoZXJlIGlzIG5vIGludGVybmV0IGNvbm5lY3Rpb24gb3IgYW4gZXJyb3Igb2NjdXJyZWQgaW4gamF2YSBzY3JpcHQgYW5kIG5vIHNob3cgY2FsbCBvY2N1cnJlZCxcclxuICogYnJvd3NlciBpcyBjbG9zZWQgYXV0b21hdGljYWxseSBpbiA0NSBzZWNvbmRzIGFmdGVyIGNyZWF0aW9uLlxyXG4gKiBUbyBpbXByb3ZlIHVzZXIgZXhwZXJpZW5jZSBwbGVhc2UgY2FsbCBjbG9zZSwgaWYgc2hvdyB3b24ndCBiZSBjYWxsZWQgZm9yIHNvbWUgcmVhc29uLlxyXG4gKiBVc2Ugb2JqZWN0czogYmFzZXduZHxjaGlsZFdpbmRvd1xyXG4gKiBTdXBwb3J0ZWQgc2luY2U6IDEuMC4wXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgV2luZG93VmVyc2lvbl8zXzFfMCBleHRlbmRzIEJhc2VDb250ZXh0T2JqZWN0IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0OiBvYmplY3QpIHtcclxuICAgICAgICBzdXBlcihjb250ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsb3NlcyBicm93c2VyIHdpbmRvdy5cclxuICAgICAqL1xyXG4gICAgY2xvc2UgPSAoKTogdm9pZCA9PiB7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIHRoaXMuY29udGV4dC5iYXNld25kLmNsb3NlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xvc2VzIGJyb3dzZXIgd2luZG93LiBFdmVuIGlmIHNob3cgaGFzbid0IGJlZW4gY2FsbGVkLCBjYWxsIGNsb3NlKCkgaWYgYW4gZXJyb3Igb2NjdXJyZWQuXHJcbiAgICAgKiBAcGFyYW0gZXhpdENvZGVcclxuICAgICAqL1xyXG4gICAgY2xvc2VXaXRoRXhpdENvZGUgPSAoZXhpdENvZGU/OiBudW1iZXIpOiB2b2lkID0+IHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhpZGVzIGJyb3dzZXIgd2luZG93IGJ1dCBkb2VzIG5vdCBjbG9zZXMgaXQsIHNvIGJyb3dzZXIga2VlcHMgd29ya2luZy5cclxuICAgICAqL1xyXG4gICAgaGlkZSA9ICgpOiB2b2lkID0+IHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmJhc2V3bmQuaGlkZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNob3dzIGJyb3dzZXIgd2luZG93IHdpdGggc3BlY2lmaWVkIHNpemUgKCB3aWR0aCBhbmQgaGVpZ2h0IGluIHBpeGVscyApLlxyXG4gICAgICogWW91IGhhdmUgdG8gY2FsbCB0aGlzIGV2ZXJ5IHRpbWUgcGFnZSBpcyByZWFkeSB0byBiZSBzaG93bi4gQnkgZGVmYXVsdCBicm93c2VyIHdpbmRvdyBpcyBoaWRkZW4uXHJcbiAgICAgKiBAcGFyYW0gd2lkdGhcclxuICAgICAqIEBwYXJhbSBoZWlnaHRcclxuICAgICAqL1xyXG4gICAgc2hvdyA9ICh3aWR0aDogc3RyaW5nLCBoZWlnaHQ6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICB0aGlzLmNvbnRleHQuYmFzZXduZC5zaG93KHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1pbmltaXplcyBicm93c2VyIHdpbmRvdy5cclxuICAgICAqIE1pbmltaXplIG1heSBiZSBub3Qgc3VwcG9ydGVkIGJlY2F1c2UgXCItdG9vbHdpbmRvd1wiIGNvbW1hbmQgbGluZSBpcyBzcGVjaWZpZWRcclxuICAgICAqIG9yIHBhcmVudCB3aW5kb3cgaXMgc2V0IHVwIGZvciBhbiBJUE0uIE1pbmltaXplIGZlYXR1cmUgcmVxdWlyZXMgaWNvbiBvbiB0aGUgV2luZG93cyB0YXNrYmFyLlxyXG4gICAgICovXHJcbiAgICBtaW5pbWl6ZSA9ICgpOiB2b2lkID0+IHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmJhc2V3bmQubWluaW1pemUoKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIERQSSB2YWx1ZSBvZiB0aGUgd2luZG93LlxyXG4gICAgICogV2ViLXBhZ2Ugc2hvdWxkIGJlIHJlbmRlcmVkIGFjY29yZGluZyB0byB0aGUgcmV0dXJuZWQgdmFsdWUuXHJcbiAgICAgKi9cclxuICAgIGdldERQSSA9ICgpOiBudW1iZXIgPT4ge1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LmJhc2V3bmQuZ2V0RFBJKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHdpbmRvdyBzdXBwb3J0cyBtaW5pbWl6YXRpb24uXHJcbiAgICAgKiBNaW5pbWl6ZSBtYXkgYmUgbm90IHN1cHBvcnRlZCBiZWNhdXNlIFwiLXRvb2x3aW5kb3dcIiBjb21tYW5kIGxpbmUgaXMgc3BlY2lmaWVkIG9yIHBhcmVudCB3aW5kb3cgaXMgc2V0IHVwIGZvciBhbiBJUE0uXHJcbiAgICAgKiBNaW5pbWl6ZSBmZWF0dXJlIHJlcXVpcmVzIGljb24gb24gdGhlIFdpbmRvd3MgdGFza2Jhci5cclxuICAgICAqL1xyXG4gICAgaXNNaW5pbWl6ZVN1cHBvcnRlZCA9ICgpOiBib29sZWFuID0+IHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5iYXNld25kLmlzTWluaW1pemVTdXBwb3J0ZWQoKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIG5ldyBicm93c2VyIHdpbmRvdyB3aXRoIGdpdmVuIHVybHMuXHJcbiAgICAgKiBAcGFyYW0gdXJsXHJcbiAgICAgKiBAcGFyYW0gbW9kYWxcclxuICAgICAqIEBwYXJhbSBwb3NpdGlvblxyXG4gICAgICovXHJcbiAgICBjcmVhdGVXaW5kb3cgPSAodXJsOiBzdHJpbmcsIG1vZGFsOiBzdHJpbmcsIHBvc2l0aW9uOiBzdHJpbmcpOiBib29sZWFuID0+IHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5jaGlsZFdpbmRvdy5jcmVhdGVXaW5kb3codXJsLCBtb2RhbCwgcG9zaXRpb24pO1xyXG4gICAgfTtcclxufVxyXG4iLCJpbXBvcnQge0Jhc2VDb250ZXh0T2JqZWN0fSBmcm9tIFwiLi4vYmFzZUNvbnRleHRPYmplY3RcIjtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIG9iamVjdCBwcm92aWRlcyBpbnRlcmZhY2UgdG8gd29yayB3aXRoIGJyb3dzZXIgd2luZG93IGZyb20gamF2YXNjcmlwdCBjb2RlLlxyXG4gKiBFdmVyeSBicm93c2VyIHdpbmRvdyBpcyBjcmVhdGVkIGhpZGRlbiwgc28geW91IGhhdmUgdG8gY2FsbCBzaG93IG1ldGhvZCB3aGVuIHBhZ2UgaXMgcmVhZHkgdG8gYmUgc2hvd24uXHJcbiAqIElmIHRoZXJlIGlzIG5vIGludGVybmV0IGNvbm5lY3Rpb24gb3IgYW4gZXJyb3Igb2NjdXJyZWQgaW4gamF2YSBzY3JpcHQgYW5kIG5vIHNob3cgY2FsbCBvY2N1cnJlZCxcclxuICogYnJvd3NlciBpcyBjbG9zZWQgYXV0b21hdGljYWxseSBpbiA0NSBzZWNvbmRzIGFmdGVyIGNyZWF0aW9uLlxyXG4gKiBUbyBpbXByb3ZlIHVzZXIgZXhwZXJpZW5jZSBwbGVhc2UgY2FsbCBjbG9zZSwgaWYgc2hvdyB3b24ndCBiZSBjYWxsZWQgZm9yIHNvbWUgcmVhc29uLlxyXG4gKiBVc2Ugb2JqZWN0czogYmFzZXduZHxjaGlsZFdpbmRvd1xyXG4gKiBTdXBwb3J0ZWQgc2luY2U6IDEuMC4wXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgV2luZG93VmVyc2lvbl8zXzJfMCBleHRlbmRzIEJhc2VDb250ZXh0T2JqZWN0IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0OiBvYmplY3QpIHtcclxuICAgICAgICBzdXBlcihjb250ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsb3NlcyBicm93c2VyIHdpbmRvdy5cclxuICAgICAqL1xyXG4gICAgY2xvc2UgPSAoKSA9PiB7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIHRoaXMuY29udGV4dC5iYXNld25kLmNsb3NlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xvc2VzIGJyb3dzZXIgd2luZG93LiBFdmVuIGlmIHNob3cgaGFzbid0IGJlZW4gY2FsbGVkLCBjYWxsIGNsb3NlKCkgaWYgYW4gZXJyb3Igb2NjdXJyZWQuXHJcbiAgICAgKiBAcGFyYW0gZXhpdENvZGVcclxuICAgICAqL1xyXG4gICAgY2xvc2VXaXRoRXhpdENvZGUgPSAoZXhpdENvZGU6IG51bWJlcikgPT4ge1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICB0aGlzLmNvbnRleHQuYmFzZXduZC5jbG9zZVdpdGhFeGl0Q29kZShleGl0Q29kZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGlkZXMgYnJvd3NlciB3aW5kb3cgYnV0IGRvZXMgbm90IGNsb3NlcyBpdCwgc28gYnJvd3NlciBrZWVwcyB3b3JraW5nLlxyXG4gICAgICovXHJcbiAgICBoaWRlID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICB0aGlzLmNvbnRleHQuYmFzZXduZC5oaWRlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2hvd3MgYnJvd3NlciB3aW5kb3cgd2l0aCBzcGVjaWZpZWQgc2l6ZSAoIHdpZHRoIGFuZCBoZWlnaHQgaW4gcGl4ZWxzICkuXHJcbiAgICAgKiBZb3UgaGF2ZSB0byBjYWxsIHRoaXMgZXZlcnkgdGltZSBwYWdlIGlzIHJlYWR5IHRvIGJlIHNob3duLiBCeSBkZWZhdWx0IGJyb3dzZXIgd2luZG93IGlzIGhpZGRlbi5cclxuICAgICAqIEBwYXJhbSB3aWR0aFxyXG4gICAgICogQHBhcmFtIGhlaWdodFxyXG4gICAgICovXHJcbiAgICBzaG93ID0gKHdpZHRoOiBzdHJpbmcsIGhlaWdodDogc3RyaW5nKTogdm9pZCA9PiB7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIHRoaXMuY29udGV4dC5iYXNld25kLnNob3cod2lkdGgsIGhlaWdodCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWluaW1pemVzIGJyb3dzZXIgd2luZG93LlxyXG4gICAgICogTWluaW1pemUgbWF5IGJlIG5vdCBzdXBwb3J0ZWQgYmVjYXVzZSBcIi10b29sd2luZG93XCIgY29tbWFuZCBsaW5lIGlzIHNwZWNpZmllZFxyXG4gICAgICogb3IgcGFyZW50IHdpbmRvdyBpcyBzZXQgdXAgZm9yIGFuIElQTS4gTWluaW1pemUgZmVhdHVyZSByZXF1aXJlcyBpY29uIG9uIHRoZSBXaW5kb3dzIHRhc2tiYXIuXHJcbiAgICAgKi9cclxuICAgIG1pbmltaXplID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICB0aGlzLmNvbnRleHQuYmFzZXduZC5taW5pbWl6ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgRFBJIHZhbHVlIG9mIHRoZSB3aW5kb3cuXHJcbiAgICAgKiBXZWItcGFnZSBzaG91bGQgYmUgcmVuZGVyZWQgYWNjb3JkaW5nIHRvIHRoZSByZXR1cm5lZCB2YWx1ZS5cclxuICAgICAqL1xyXG4gICAgZ2V0RFBJID0gKCk6IG51bWJlciA9PiB7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuYmFzZXduZC5nZXREUEkoKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgd2luZG93IHN1cHBvcnRzIG1pbmltaXphdGlvbi5cclxuICAgICAqIE1pbmltaXplIG1heSBiZSBub3Qgc3VwcG9ydGVkIGJlY2F1c2UgXCItdG9vbHdpbmRvd1wiIGNvbW1hbmQgbGluZSBpcyBzcGVjaWZpZWQgb3IgcGFyZW50IHdpbmRvdyBpcyBzZXQgdXAgZm9yIGFuIElQTS5cclxuICAgICAqIE1pbmltaXplIGZlYXR1cmUgcmVxdWlyZXMgaWNvbiBvbiB0aGUgV2luZG93cyB0YXNrYmFyLlxyXG4gICAgICovXHJcbiAgICBpc01pbmltaXplU3VwcG9ydGVkID0gKCk6IGJvb2xlYW4gPT4ge1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LmJhc2V3bmQuaXNNaW5pbWl6ZVN1cHBvcnRlZCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgbmV3IGJyb3dzZXIgd2luZG93IHdpdGggZ2l2ZW4gdXJscy5cclxuICAgICAqIEBwYXJhbSB1cmxcclxuICAgICAqIEBwYXJhbSBtb2RhbFxyXG4gICAgICogQHBhcmFtIHBvc2l0aW9uXHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZVdpbmRvdyA9ICh1cmw6IHN0cmluZywgbW9kYWw6IHN0cmluZywgcG9zaXRpb246IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LmNoaWxkV2luZG93LmNyZWF0ZVdpbmRvdyh1cmwsIG1vZGFsLCBwb3NpdGlvbik7XHJcbiAgICB9O1xyXG59XHJcbiIsImltcG9ydCB7QmFzZUNvbnRleHRPYmplY3R9IGZyb20gXCIuLi9iYXNlQ29udGV4dE9iamVjdFwiO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgb2JqZWN0IHByb3ZpZGVzIGludGVyZmFjZSB0byB3b3JrIHdpdGggYnJvd3NlciB3aW5kb3cgZnJvbSBqYXZhc2NyaXB0IGNvZGUuXHJcbiAqIEV2ZXJ5IGJyb3dzZXIgd2luZG93IGlzIGNyZWF0ZWQgaGlkZGVuLCBzbyB5b3UgaGF2ZSB0byBjYWxsIHNob3cgbWV0aG9kIHdoZW4gcGFnZSBpcyByZWFkeSB0byBiZSBzaG93bi5cclxuICogSWYgdGhlcmUgaXMgbm8gaW50ZXJuZXQgY29ubmVjdGlvbiBvciBhbiBlcnJvciBvY2N1cnJlZCBpbiBqYXZhIHNjcmlwdCBhbmQgbm8gc2hvdyBjYWxsIG9jY3VycmVkLFxyXG4gKiBicm93c2VyIGlzIGNsb3NlZCBhdXRvbWF0aWNhbGx5IGluIDQ1IHNlY29uZHMgYWZ0ZXIgY3JlYXRpb24uXHJcbiAqIFRvIGltcHJvdmUgdXNlciBleHBlcmllbmNlIHBsZWFzZSBjYWxsIGNsb3NlLCBpZiBzaG93IHdvbid0IGJlIGNhbGxlZCBmb3Igc29tZSByZWFzb24uXHJcbiAqIFVzZSBvYmplY3RzOiBiYXNld25kfGNoaWxkV2luZG93XHJcbiAqIFN1cHBvcnRlZCBzaW5jZTogMS4wLjBcclxuICovXHJcbmV4cG9ydCBjbGFzcyBXaW5kb3dWZXJzaW9uXzRfMF8wIGV4dGVuZHMgQmFzZUNvbnRleHRPYmplY3Qge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQ6IG9iamVjdCkge1xyXG4gICAgICAgIHN1cGVyKGNvbnRleHQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xvc2VzIGJyb3dzZXIgd2luZG93LlxyXG4gICAgICovXHJcbiAgICBjbG9zZSA9ICgpOiB2b2lkID0+IHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmJhc2V3bmQuY2xvc2UoKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENsb3NlcyBicm93c2VyIHdpbmRvdy4gRXZlbiBpZiBzaG93IGhhc24ndCBiZWVuIGNhbGxlZCwgY2FsbCBjbG9zZSgpIGlmIGFuIGVycm9yIG9jY3VycmVkLlxyXG4gICAgICogQHBhcmFtIGV4aXRDb2RlXHJcbiAgICAgKi9cclxuICAgIGNsb3NlV2l0aEV4aXRDb2RlID0gKGV4aXRDb2RlOiBudW1iZXIpOiB2b2lkID0+IHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmJhc2V3bmQuY2xvc2VXaXRoRXhpdENvZGUoZXhpdENvZGUpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhpZGVzIGJyb3dzZXIgd2luZG93IGJ1dCBkb2VzIG5vdCBjbG9zZXMgaXQsIHNvIGJyb3dzZXIga2VlcHMgd29ya2luZy5cclxuICAgICAqL1xyXG4gICAgaGlkZSA9ICgpOiB2b2lkID0+IHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmJhc2V3bmQuaGlkZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNob3dzIGJyb3dzZXIgd2luZG93IHdpdGggc3BlY2lmaWVkIHNpemUgKCB3aWR0aCBhbmQgaGVpZ2h0IGluIHBpeGVscyApLlxyXG4gICAgICogWW91IGhhdmUgdG8gY2FsbCB0aGlzIGV2ZXJ5IHRpbWUgcGFnZSBpcyByZWFkeSB0byBiZSBzaG93bi4gQnkgZGVmYXVsdCBicm93c2VyIHdpbmRvdyBpcyBoaWRkZW4uXHJcbiAgICAgKiBAcGFyYW0gd2lkdGhcclxuICAgICAqIEBwYXJhbSBoZWlnaHRcclxuICAgICAqL1xyXG4gICAgc2hvdyA9ICh3aWR0aDogc3RyaW5nLCBoZWlnaHQ6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICB0aGlzLmNvbnRleHQuYmFzZXduZC5zaG93KHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1pbmltaXplcyBicm93c2VyIHdpbmRvdy5cclxuICAgICAqIE1pbmltaXplIG1heSBiZSBub3Qgc3VwcG9ydGVkIGJlY2F1c2UgXCItdG9vbHdpbmRvd1wiIGNvbW1hbmQgbGluZSBpcyBzcGVjaWZpZWRcclxuICAgICAqIG9yIHBhcmVudCB3aW5kb3cgaXMgc2V0IHVwIGZvciBhbiBJUE0uIE1pbmltaXplIGZlYXR1cmUgcmVxdWlyZXMgaWNvbiBvbiB0aGUgV2luZG93cyB0YXNrYmFyLlxyXG4gICAgICovXHJcbiAgICBtaW5pbWl6ZSA9ICgpOiB2b2lkID0+IHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmJhc2V3bmQubWluaW1pemUoKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIERQSSB2YWx1ZSBvZiB0aGUgd2luZG93LlxyXG4gICAgICogV2ViLXBhZ2Ugc2hvdWxkIGJlIHJlbmRlcmVkIGFjY29yZGluZyB0byB0aGUgcmV0dXJuZWQgdmFsdWUuXHJcbiAgICAgKi9cclxuICAgIGdldERQSSA9ICgpOiBudW1iZXIgPT4ge1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LmJhc2V3bmQuZ2V0RFBJKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHdpbmRvdyBzdXBwb3J0cyBtaW5pbWl6YXRpb24uXHJcbiAgICAgKiBNaW5pbWl6ZSBtYXkgYmUgbm90IHN1cHBvcnRlZCBiZWNhdXNlIFwiLXRvb2x3aW5kb3dcIiBjb21tYW5kIGxpbmUgaXMgc3BlY2lmaWVkIG9yIHBhcmVudCB3aW5kb3cgaXMgc2V0IHVwIGZvciBhbiBJUE0uXHJcbiAgICAgKiBNaW5pbWl6ZSBmZWF0dXJlIHJlcXVpcmVzIGljb24gb24gdGhlIFdpbmRvd3MgdGFza2Jhci5cclxuICAgICAqL1xyXG4gICAgaXNNaW5pbWl6ZVN1cHBvcnRlZCA9ICgpOiBib29sZWFuID0+IHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5iYXNld25kLmlzTWluaW1pemVTdXBwb3J0ZWQoKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIG5ldyBicm93c2VyIHdpbmRvdyB3aXRoIGdpdmVuIHVybHMuXHJcbiAgICAgKiBAcGFyYW0gdXJsXHJcbiAgICAgKiBAcGFyYW0gbW9kYWxcclxuICAgICAqIEBwYXJhbSBwb3NpdGlvblxyXG4gICAgICovXHJcbiAgICBjcmVhdGVXaW5kb3cgPSAodXJsOiBzdHJpbmcsIG1vZGFsOiBzdHJpbmcsIHBvc2l0aW9uOiBzdHJpbmcpOiBib29sZWFuID0+IHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5jaGlsZFdpbmRvdy5jcmVhdGVXaW5kb3codXJsLCBtb2RhbCwgcG9zaXRpb24pO1xyXG4gICAgfTtcclxufVxyXG4iLCJpbXBvcnQge1Byb2R1Y3RzfSBmcm9tIFwiLi4vb2JqZWN0cy9wcm9kdWN0cy9wcm9kdWN0c1wiO1xyXG5pbXBvcnQge0FwcEluZm99IGZyb20gXCIuLi9vYmplY3RzL2FwcGluZm8vYXBwSW5mb1wiO1xyXG5pbXBvcnQge1dpbmRvd30gZnJvbSBcIi4uL29iamVjdHMvd2luZG93L3dpbmRvd1wiO1xyXG5pbXBvcnQge1V0aWxzfSBmcm9tIFwiLi4vb2JqZWN0cy91dGlscy91dGlsc1wiO1xyXG5pbXBvcnQge0VuZ2luZX0gZnJvbSBcIi4uL29iamVjdHMvZW5naW5lL2VuZ2luZVwiO1xyXG5pbXBvcnQge0Rvd25sb2FkZXJ9IGZyb20gXCIuLi9vYmplY3RzL2Rvd25sb2FkZXIvZG93bmxvYWRlclwiO1xyXG5cclxuY29uc3QgY2xhc3NlczogYW55ID0ge1V0aWxzOiBVdGlscywgQXBwSW5mbzpBcHBJbmZvLCBXaW5kb3c6IFdpbmRvdywgUHJvZHVjdHM6UHJvZHVjdHMsIEVuZ2luZTpFbmdpbmUsIERvd25sb2FkZXI6RG93bmxvYWRlcn07XHJcblxyXG4vKipcclxuICogY3JlYXRlSW5zdGFuY2UgaGVscHMgd2l0aCBkeW5hbWljIGNyZWF0aW9uIGNsYXNzIGluc3RhbmNlcyBieSBjbGFzcyBuYW1lXHJcbiAqIEBwYXJhbSBuYW1lXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UobmFtZTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gY2xhc3Nlc1tuYW1lXTtcclxufVxyXG4iLCIvLyBFUzUgMTUuMy40LjUgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgKCB0aGlzQXJnIFssIGFyZzEgWywgYXJnMiwgLi4uIF1dIClcclxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvRnVuY3Rpb24vYmluZFxyXG5pZiAoIUZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kKSB7XHJcbiAgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiAob1RoaXMpIHtcclxuICAgIGlmICh0eXBlb2YgdGhpcyAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAvLyBjbG9zZXN0IHRoaW5nIHBvc3NpYmxlIHRvIHRoZSBFQ01BU2NyaXB0IDVcclxuICAgICAgLy8gaW50ZXJuYWwgSXNDYWxsYWJsZSBmdW5jdGlvblxyXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdGdW5jdGlvbi5wcm90b3R5cGUuYmluZCAtIHdoYXQgaXMgdHJ5aW5nIHRvIGJlIGJvdW5kIGlzIG5vdCBjYWxsYWJsZScpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBhQXJncyAgID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSxcclxuICAgICAgICBmVG9CaW5kID0gdGhpcyxcclxuICAgICAgICBmTk9QICAgID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZkJvdW5kICA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIHJldHVybiBmVG9CaW5kLmFwcGx5KHRoaXMgaW5zdGFuY2VvZiBmTk9QICYmIG9UaGlzXHJcbiAgICAgICAgICAgID8gdGhpc1xyXG4gICAgICAgICAgICA6IG9UaGlzLFxyXG4gICAgICAgICAgICBhQXJncy5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgZk5PUC5wcm90b3R5cGUgICA9IHRoaXMucHJvdG90eXBlO1xyXG4gICAgZkJvdW5kLnByb3RvdHlwZSA9IG5ldyBmTk9QKCk7XHJcblxyXG4gICAgcmV0dXJuIGZCb3VuZDtcclxuICB9O1xyXG59XHJcbi8vIEVTNSAxNS4yLjMuMTQgT2JqZWN0LmtleXMgKCBPIClcclxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2tleXNcclxuaWYgKCFPYmplY3Qua2V5cykge1xyXG4gIE9iamVjdC5rZXlzID0gKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIHZhciBoYXNPd25Qcm9wZXJ0eSAgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LFxyXG4gICAgICAgIGhhc0RvbnRFbnVtQnVnICA9ICEoe3RvU3RyaW5nOiBudWxsfSkucHJvcGVydHlJc0VudW1lcmFibGUoJ3RvU3RyaW5nJyksXHJcbiAgICAgICAgZG9udEVudW1zICAgICAgID0gW1xyXG4gICAgICAgICAgJ3RvU3RyaW5nJyxcclxuICAgICAgICAgICd0b0xvY2FsZVN0cmluZycsXHJcbiAgICAgICAgICAndmFsdWVPZicsXHJcbiAgICAgICAgICAnaGFzT3duUHJvcGVydHknLFxyXG4gICAgICAgICAgJ2lzUHJvdG90eXBlT2YnLFxyXG4gICAgICAgICAgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJyxcclxuICAgICAgICAgICdjb25zdHJ1Y3RvcidcclxuICAgICAgICBdLFxyXG4gICAgICAgIGRvbnRFbnVtc0xlbmd0aCA9IGRvbnRFbnVtcy5sZW5ndGg7XHJcblxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnICYmICh0eXBlb2Ygb2JqICE9PSAnZnVuY3Rpb24nIHx8IG9iaiA9PT0gbnVsbCkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3Qua2V5cyBjYWxsZWQgb24gbm9uLW9iamVjdCcpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgcmVzdWx0ID0gW10sIHByb3AsIGk7XHJcblxyXG4gICAgICBmb3IgKHByb3AgaW4gb2JqKSB7XHJcbiAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkge1xyXG4gICAgICAgICAgcmVzdWx0LnB1c2gocHJvcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaGFzRG9udEVudW1CdWcpIHtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZG9udEVudW1zTGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgZG9udEVudW1zW2ldKSkge1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChkb250RW51bXNbaV0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfTtcclxuICB9KCkpO1xyXG59XHJcbi8vIEVTNSAxNS40LjQuMTggQXJyYXkucHJvdG90eXBlLmZvckVhY2ggKCBjYWxsYmFja2ZuIFsgLCB0aGlzQXJnIF0gKVxyXG4vLyBGcm9tIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L2ZvckVhY2hcclxuaWYgKCFBcnJheS5wcm90b3R5cGUuZm9yRWFjaCkge1xyXG5cclxuICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjay8qLCB0aGlzQXJnKi8pIHtcclxuXHJcbiAgICB2YXIgVCwgaztcclxuICAgIGlmICh0aGlzID09PSBudWxsKSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3RoaXMgaXMgbnVsbCBvciBub3QgZGVmaW5lZCcpO1xyXG4gICAgfVxyXG4gICAgdmFyIE8gICA9IE9iamVjdCh0aGlzKTtcclxuICAgIHZhciBsZW4gPSBPLmxlbmd0aCA+Pj4gMDtcclxuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihjYWxsYmFjayArICcgaXMgbm90IGEgZnVuY3Rpb24nKTtcclxuICAgIH1cclxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xyXG4gICAgICBUID0gYXJndW1lbnRzWzFdO1xyXG4gICAgfVxyXG4gICAgayA9IDA7XHJcbiAgICB3aGlsZSAoayA8IGxlbikge1xyXG4gICAgICB2YXIga1ZhbHVlO1xyXG4gICAgICBpZiAoayBpbiBPKSB7XHJcbiAgICAgICAga1ZhbHVlID0gT1trXTtcclxuICAgICAgICBjYWxsYmFjay5jYWxsKFQsIGtWYWx1ZSwgaywgTyk7XHJcbiAgICAgIH1cclxuICAgICAgaysrO1xyXG4gICAgfVxyXG4gIH07XHJcbn1cclxuLy8gRnJvbSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvaGFzT3duUHJvcGVydHlcclxuOyhmdW5jdGlvbiAoaGFzT3duUHJvcCkgeyAvLyBJSUZFIHdpdGggZ3VhcmRpbmcgc2VtaWNvbG9uXHJcbiAgZnVuY3Rpb24gaGFzT3duUHJvcGVydHkobmFtZSkge1xyXG4gICAgaWYgKHRoaXMgPT0gbnVsbCkge1xyXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNvbnZlcnQgdW5kZWZpbmVkIG9yIG51bGwgdG8gb2JqZWN0IVwiKVxyXG4gICAgfVxyXG4gICAgdmFyIE8gICAgICA9IE9iamVjdCh0aGlzKSwga2V5ID0gU3RyaW5nKG5hbWUpO1xyXG4gICAgdmFyIF9wcm90byA9IE8uX19wcm90b19fIHx8IE8uY29uc3RydWN0b3IucHJvdG90eXBlIHx8IHt9OyAvLyBPYmplY3QucHJvdG90eXBlXHJcbiAgICByZXR1cm4ga2V5IGluIE8gJiYgKCEoa2V5IGluIF9wcm90bykgfHwgT1trZXldICE9PSBfcHJvdG9ba2V5XSk7XHJcbiAgfVxyXG5cclxuICBpZiAoIWhhc093blByb3ApIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPYmplY3QucHJvdG90eXBlLCAnaGFzT3duUHJvcGVydHknLCB7XHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUsXHJcbiAgICAgICAgdmFsdWUgICAgIDogaGFzT3duUHJvcGVydHlcclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlKSB7IC8vIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBpc24ndCBzdXBwb3J0ZWRcclxuICAgICAgT2JqZWN0LnByb3RvdHlwZVsnaGFzT3duUHJvcGVydHknXSA9IGhhc093blByb3BlcnR5O1xyXG4gICAgfVxyXG4gIH1cclxufSkoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSk7XHJcblxyXG4vLyBFUzUgMTUuMi4zLjQgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgKCBPIClcclxuaWYgKHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyAhPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgPSBmdW5jdGlvbiAobykge1xyXG4gICAgaWYgKG8gIT09IE9iamVjdChvKSkge1xyXG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXCJPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyBjYWxsZWQgb24gbm9uLW9iamVjdFwiKTtcclxuICAgIH1cclxuICAgIHZhciBwcm9wcyA9IFtdLFxyXG4gICAgICAgIHA7XHJcbiAgICBmb3IgKHAgaW4gbykge1xyXG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSB7XHJcbiAgICAgICAgcHJvcHMucHVzaChwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHByb3BzO1xyXG4gIH07XHJcbn1cclxuXHJcbi8vIEVTNSAxNS40LjQuMjAgQXJyYXkucHJvdG90eXBlLmZpbHRlciAoIGNhbGxiYWNrZm4gWyAsIHRoaXNBcmcgXSApXHJcbi8vIEZyb20gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvRmlsdGVyXHJcbmlmICghQXJyYXkucHJvdG90eXBlLmZpbHRlcikge1xyXG4gIEFycmF5LnByb3RvdHlwZS5maWx0ZXIgPSBmdW5jdGlvbiAoZnVuIC8qLCB0aGlzcCAqLyApIHtcclxuICAgIGlmICh0aGlzID09PSB2b2lkIDAgfHwgdGhpcyA9PT0gbnVsbCkge1xyXG4gICAgICB0aHJvdyBUeXBlRXJyb3IoKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgdCA9IE9iamVjdCh0aGlzKTtcclxuICAgIHZhciBsZW4gPSB0Lmxlbmd0aCA+Pj4gMDtcclxuICAgIGlmICh0eXBlb2YgZnVuICE9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgdGhyb3cgVHlwZUVycm9yKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHJlcyA9IFtdO1xyXG4gICAgdmFyIHRoaXNwID0gYXJndW1lbnRzWzFdLFxyXG4gICAgICAgIGk7XHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgaWYgKGkgaW4gdCkge1xyXG4gICAgICAgIHZhciB2YWwgPSB0W2ldOyAvLyBpbiBjYXNlIGZ1biBtdXRhdGVzIHRoaXNcclxuICAgICAgICBpZiAoZnVuLmNhbGwodGhpc3AsIHZhbCwgaSwgdCkpIHtcclxuICAgICAgICAgIHJlcy5wdXNoKHZhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlcztcclxuICB9O1xyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiB2ZXJzaW9uQ29tcGFyZSAodjEsIHYyLCBvcGVyYXRvcikge1xyXG4vLyAgICAgICAgZXhhbXBsZSAxOiB2ZXJzaW9uX2NvbXBhcmUoJzguMi41cmMnLCAnOC4yLjVhJylcclxuLy8gICAgICAgIHJldHVybnMgMTogMVxyXG4vLyAgICAgICAgZXhhbXBsZSAyOiB2ZXJzaW9uX2NvbXBhcmUoJzguMi41MCcsICc4LjIuNTInLCAnPCcpXHJcbi8vICAgICAgICByZXR1cm5zIDI6IHRydWVcclxuLy8gICAgICAgIGV4YW1wbGUgMzogdmVyc2lvbl9jb21wYXJlKCc1LjMuMC1kZXYnLCAnNS4zLjAnKVxyXG4vLyAgICAgICAgcmV0dXJucyAzOiAtMVxyXG4vLyAgICAgICAgZXhhbXBsZSA0OiB2ZXJzaW9uX2NvbXBhcmUoJzQuMS4wLjUyJywnNC4wMS4wLjUxJylcclxuLy8gICAgICAgIHJldHVybnMgNDogMVxyXG5cclxuICAgIC8vIEltcG9ydGFudDogY29tcGFyZSBtdXN0IGJlIGluaXRpYWxpemVkIGF0IDAuXHJcbiAgICB2YXIgaVxyXG4gICAgdmFyIHhcclxuICAgIHZhciBjb21wYXJlID0gMFxyXG5cclxuICAgIC8vIHZtIG1hcHMgdGV4dHVhbCBQSFAgdmVyc2lvbnMgdG8gbmVnYXRpdmVzIHNvIHRoZXkncmUgbGVzcyB0aGFuIDAuXHJcbiAgICAvLyBQSFAgY3VycmVudGx5IGRlZmluZXMgdGhlc2UgYXMgQ0FTRS1TRU5TSVRJVkUuIEl0IGlzIGltcG9ydGFudCB0b1xyXG4gICAgLy8gbGVhdmUgdGhlc2UgYXMgbmVnYXRpdmVzIHNvIHRoYXQgdGhleSBjYW4gY29tZSBiZWZvcmUgbnVtZXJpY2FsIHZlcnNpb25zXHJcbiAgICAvLyBhbmQgYXMgaWYgbm8gbGV0dGVycyB3ZXJlIHRoZXJlIHRvIGJlZ2luIHdpdGguXHJcbiAgICAvLyAoMWFscGhhIGlzIDwgMSBhbmQgPCAxLjEgYnV0ID4gMWRldjEpXHJcbiAgICAvLyBJZiBhIG5vbi1udW1lcmljYWwgdmFsdWUgY2FuJ3QgYmUgbWFwcGVkIHRvIHRoaXMgdGFibGUsIGl0IHJlY2VpdmVzXHJcbiAgICAvLyAtNyBhcyBpdHMgdmFsdWUuXHJcbiAgICB2YXIgdm0gPSB7XHJcbiAgICAgICAgJ2Rldic6IC02LFxyXG4gICAgICAgICdhbHBoYSc6IC01LFxyXG4gICAgICAgICdhJzogLTUsXHJcbiAgICAgICAgJ2JldGEnOiAtNCxcclxuICAgICAgICAnYic6IC00LFxyXG4gICAgICAgICdSQyc6IC0zLFxyXG4gICAgICAgICdyYyc6IC0zLFxyXG4gICAgICAgICcjJzogLTIsXHJcbiAgICAgICAgJ3AnOiAxLFxyXG4gICAgICAgICdwbCc6IDFcclxuICAgIH1cclxuXHJcbiAgICAvLyBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHRvIHByZXBhcmUgZWFjaCB2ZXJzaW9uIGFyZ3VtZW50LlxyXG4gICAgLy8gSXQgcmVwbGFjZXMgZXZlcnkgXywgLSwgYW5kICsgd2l0aCBhIGRvdC5cclxuICAgIC8vIEl0IHN1cnJvdW5kcyBhbnkgbm9uc2VxdWVuY2Ugb2YgbnVtYmVycy9kb3RzIHdpdGggZG90cy5cclxuICAgIC8vIEl0IHJlcGxhY2VzIHNlcXVlbmNlcyBvZiBkb3RzIHdpdGggYSBzaW5nbGUgZG90LlxyXG4gICAgLy8gICAgdmVyc2lvbl9jb21wYXJlKCc0Li4wJywgJzQuMCcpID09PSAwXHJcbiAgICAvLyBJbXBvcnRhbnQ6IEEgc3RyaW5nIG9mIDAgbGVuZ3RoIG5lZWRzIHRvIGJlIGNvbnZlcnRlZCBpbnRvIGEgdmFsdWVcclxuICAgIC8vIGV2ZW4gbGVzcyB0aGFuIGFuIHVuZXhpc3RpbmcgdmFsdWUgaW4gdm0gKC03KSwgaGVuY2UgWy04XS5cclxuICAgIC8vIEl0J3MgYWxzbyBpbXBvcnRhbnQgdG8gbm90IHN0cmlwIHNwYWNlcyBiZWNhdXNlIG9mIHRoaXMuXHJcbiAgICAvLyAgIHZlcnNpb25fY29tcGFyZSgnJywgJyAnKSA9PT0gMVxyXG4gICAgdmFyIF9wcmVwVmVyc2lvbiA9IGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgdiA9ICgnJyArIHYpLnJlcGxhY2UoL1tfXFwtK10vZywgJy4nKVxyXG4gICAgICAgIHYgPSB2LnJlcGxhY2UoLyhbXi5cXGRdKykvZywgJy4kMS4nKS5yZXBsYWNlKC9cXC57Mix9L2csICcuJylcclxuICAgICAgICByZXR1cm4gKCF2Lmxlbmd0aCA/IFstOF0gOiB2LnNwbGl0KCcuJykpXHJcbiAgICB9XHJcbiAgICAvLyBUaGlzIGNvbnZlcnRzIGEgdmVyc2lvbiBjb21wb25lbnQgdG8gYSBudW1iZXIuXHJcbiAgICAvLyBFbXB0eSBjb21wb25lbnQgYmVjb21lcyAwLlxyXG4gICAgLy8gTm9uLW51bWVyaWNhbCBjb21wb25lbnQgYmVjb21lcyBhIG5lZ2F0aXZlIG51bWJlci5cclxuICAgIC8vIE51bWVyaWNhbCBjb21wb25lbnQgYmVjb21lcyBpdHNlbGYgYXMgYW4gaW50ZWdlci5cclxuICAgIHZhciBfbnVtVmVyc2lvbiA9IGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgcmV0dXJuICF2ID8gMCA6IChpc05hTih2KSA/IHZtW3ZdIHx8IC03IDogcGFyc2VJbnQodiwgMTApKVxyXG4gICAgfVxyXG5cclxuICAgIHYxID0gX3ByZXBWZXJzaW9uKHYxKVxyXG4gICAgdjIgPSBfcHJlcFZlcnNpb24odjIpXHJcbiAgICB4ID0gTWF0aC5tYXgodjEubGVuZ3RoLCB2Mi5sZW5ndGgpXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgeDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHYxW2ldID09PSB2MltpXSkge1xyXG4gICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgIH1cclxuICAgICAgICB2MVtpXSA9IF9udW1WZXJzaW9uKHYxW2ldKVxyXG4gICAgICAgIHYyW2ldID0gX251bVZlcnNpb24odjJbaV0pXHJcbiAgICAgICAgaWYgKHYxW2ldIDwgdjJbaV0pIHtcclxuICAgICAgICAgICAgY29tcGFyZSA9IC0xXHJcbiAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgfSBlbHNlIGlmICh2MVtpXSA+IHYyW2ldKSB7XHJcbiAgICAgICAgICAgIGNvbXBhcmUgPSAxXHJcbiAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKCFvcGVyYXRvcikge1xyXG4gICAgICAgIHJldHVybiBjb21wYXJlXHJcbiAgICB9XHJcblxyXG4gICAgLy8gSW1wb3J0YW50OiBvcGVyYXRvciBpcyBDQVNFLVNFTlNJVElWRS5cclxuICAgIC8vIFwiTm8gb3BlcmF0b3JcIiBzZWVtcyB0byBiZSB0cmVhdGVkIGFzIFwiPC5cIlxyXG4gICAgLy8gQW55IG90aGVyIHZhbHVlcyBzZWVtIHRvIG1ha2UgdGhlIGZ1bmN0aW9uIHJldHVybiBudWxsLlxyXG4gICAgc3dpdGNoIChvcGVyYXRvcikge1xyXG4gICAgICAgIGNhc2UgJz4nOlxyXG4gICAgICAgIGNhc2UgJ2d0JzpcclxuICAgICAgICAgICAgcmV0dXJuIChjb21wYXJlID4gMClcclxuICAgICAgICBjYXNlICc+PSc6XHJcbiAgICAgICAgY2FzZSAnZ2UnOlxyXG4gICAgICAgICAgICByZXR1cm4gKGNvbXBhcmUgPj0gMClcclxuICAgICAgICBjYXNlICc8PSc6XHJcbiAgICAgICAgY2FzZSAnbGUnOlxyXG4gICAgICAgICAgICByZXR1cm4gKGNvbXBhcmUgPD0gMClcclxuICAgICAgICBjYXNlICc9PT0nOlxyXG4gICAgICAgIGNhc2UgJz0nOlxyXG4gICAgICAgIGNhc2UgJ2VxJzpcclxuICAgICAgICAgICAgcmV0dXJuIChjb21wYXJlID09PSAwKVxyXG4gICAgICAgIGNhc2UgJzw+JzpcclxuICAgICAgICBjYXNlICchPT0nOlxyXG4gICAgICAgIGNhc2UgJ25lJzpcclxuICAgICAgICAgICAgcmV0dXJuIChjb21wYXJlICE9PSAwKVxyXG4gICAgICAgIGNhc2UgJyc6XHJcbiAgICAgICAgY2FzZSAnPCc6XHJcbiAgICAgICAgY2FzZSAnbHQnOlxyXG4gICAgICAgICAgICByZXR1cm4gKGNvbXBhcmUgPCAwKVxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsXHJcbiAgICB9XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvbGliL3BvbHlmaWxscy9wb2x5ZmlsbHMuanNcIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXgudHNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdleHBvcnRzJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG4iXSwic291cmNlUm9vdCI6IiJ9