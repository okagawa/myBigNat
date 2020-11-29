/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./ts/BigNat.ts":
/*!**********************!*\
  !*** ./ts/BigNat.ts ***!
  \**********************/
/*! flagged exports */
/*! export BigNat [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.BigNat = void 0;\r\nvar BigNat = /** @class */ (function () {\r\n    function BigNat(base, n) {\r\n        this.base = base;\r\n        var count = 0;\r\n        var t = n >= 0 ? n : -n;\r\n        var sign = n >= 0 ? true : false;\r\n        this.digits = (Math.log(t) / Math.log(base)) | 0 + 1;\r\n        this.d = new Int32Array(this.digits);\r\n        while (count < this.digits) {\r\n            this.d[count] = (t % base) * (sign == true ? 1 : -1);\r\n            t = (t / base) | 0;\r\n            count++;\r\n        }\r\n    }\r\n    BigNat.prototype.toNumber = function () {\r\n        var t = 0;\r\n        var c = this.digits - 1;\r\n        var sign = this.d[0] >= 0 ? 1 : -1;\r\n        while (c >= 0) {\r\n            t = t * this.base + this.d[c] * sign;\r\n            c--;\r\n        }\r\n        return (t * sign);\r\n    };\r\n    return BigNat;\r\n}());\r\nexports.BigNat = BigNat;\r\n\n\n//# sourceURL=webpack://tstutorial/./ts/BigNat.ts?");

/***/ }),

/***/ "./ts/index.ts":
/*!*********************!*\
  !*** ./ts/index.ts ***!
  \*********************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar BigNat_1 = __webpack_require__(/*! ./BigNat */ \"./ts/BigNat.ts\");\r\n// const user = new User('岡川', '宏', 48);\r\nvar bign = new BigNat_1.BigNat(10, -7654321);\r\nvar contentsElem = document.getElementById('contents');\r\nif (!!contentsElem) {\r\n    //    contentsElem.innerText = `${user.familyName} ${user.givenName}`;\r\n    contentsElem.innerText = \"\" + bign.toNumber();\r\n}\r\n\n\n//# sourceURL=webpack://tstutorial/./ts/index.ts?");

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
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./ts/index.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;