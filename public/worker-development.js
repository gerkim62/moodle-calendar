/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./worker/index.ts":
/*!*************************!*\
  !*** ./worker/index.ts ***!
  \*************************/
/***/ (() => {

eval("// @ts-nocheck\n// @ts-ignore\n// precacheAndRoute(self.__WB_MANIFEST);\nconsole.log(\"Service Worker Loaded...\");\nself.addEventListener(\"push\", (e)=>{\n    var _e_data;\n    console.log(\"Push Received...\");\n    const data = e === null || e === void 0 ? void 0 : (_e_data = e.data) === null || _e_data === void 0 ? void 0 : _e_data.json();\n    if (!data || !data.title || !data.message) {\n        console.error(\"Push notification data is invalid:\", data);\n        return;\n    }\n    console.log(\"Push Received...\");\n    const notificationPromise = self.registration.showNotification(data.title, {\n        body: data.message,\n        icon: \"/calendify-min.png\"\n    });\n    e.waitUntil(notificationPromise);\n});\n\n\n//# sourceURL=webpack://codespaces-blank/./worker/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./worker/index.ts"]();
/******/ 	
/******/ })()
;